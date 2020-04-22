const logger = require('tracer').colorConsole();
const _ = require('lodash');
const createError = require('http-errors');
const uuid = require('shortid');
const jwt = require('jsonwebtoken');
const customer = require('../db/schema/customer').createModel();
const seller = require('../db/schema/seller').createModel();
const order = require('../db/schema/orders').createModel();
const products = require('../db/schema/product').createModel();
const operations = require('../db/operations');
const pool = require('../db/sqlConnection');
const uuidv1 = require('uuid/v1')

async function handle_request(request) {
    switch (request.type) {
        case 'getCustomerOrders':
            return getCustomerOrders(request)
        case 'getOrderDetails':
            return getOrderDetails(request)
        case 'updateOrderStatus':
            return updateOrderStatus(request)
        case 'getSellerOrders':
            return getSellerOrders(request)
        case 'getSellerOrderDetails':
            return getSellerOrderDetails(request)
        case 'getAllOrders':
            return getAllOrders(request)
        case 'postReview':
            return postReview(request)
        default:
            return { "status": 404, body: { message: 'Invalid Route in Kafka' } }
    }
};

filterProductsOnOrderStatus = async (orders, filter) => {
    let ordersData = []
    for (const order of orders) {
        let products = [];
        for (let product of order.products) {
            if (filter[0].indexOf(product.currentStatus) > -1) {
                products.push(product)
            }
        }
        order.products = products;
        ordersData.push(order)
    }
    return ordersData;
}

getCustomerOrders = async (request) => {
    try {
        let status = request.query.status.split(",");
        let query = { customer_id: request.params.id, 'products.currentStatus': { $in: status } }
        if (status[0] === "Ordered") query = { customer_id: request.params.id }
        if (status.length > 1) query = { customer_id: request.params.id, 'products.currentStatus': { $in: ["Ordered", "Packing", 'Out For Shipping', "Package Arrived", "Out For Delivery"] } }
        let resp = await order.
            find(query, { __v: 0 }).
            populate('products.product_id', { name: 1, price: 1, _id: 1, images: 1 }).
            populate('products.seller_id', { name: 1, _id: 1 })
        if (status.length === 1 && status[0] === "Ordered") return { "status": 200, body: resp }
        resp = await filterProductsOnOrderStatus(resp, status)
        return { "status": 200, body: resp }
    } catch (ex) {
        logger.error(ex);
        const message = ex.message ? ex.message : 'Error while fetching customer orders';
        const code = ex.statusCode ? ex.statusCode : 500;
        return { "status": code, body: { message } }
    }
}

getOrderDetails = async (request) => {
    try {
        const resp = await order.
            find({ _id: request.params.id }, { __v: 0 }).
            populate('products.product_id', { name: 1, price: 1, _id: 1, images: 1 }).
            populate('products.seller_id', { name: 1, _id: 1 })
        return { "status": 200, body: resp[0] }
    } catch (ex) {
        logger.error(ex);
        const message = ex.message ? ex.message : 'Error while fetching Order Details';
        const code = ex.statusCode ? ex.statusCode : 500;
        return { "status": code, body: { message } }
    }
}

updateOrderStatus = async (request) => {
    try {
        console.log(request.body)
        let resp = operations.updateField(order,
            { "products._id": request.body.productId },
            {
                $push: { "products.$.tracking": request.body.status },
                "products.$.currentStatus": request.body.status.status
            })
        return { "status": 200, body: resp }
    } catch (ex) {
        logger.error(ex);
        const message = ex.message ? ex.message : 'Error while updating Order Details';
        const code = ex.statusCode ? ex.statusCode : 500;
        return { "status": code, body: { message } }
    }
}

filterSellerProductsOnOrderStatus = async (orders, filter, sellerId) => {
    let ordersData = []
    for (const order of orders) {
        let products = [];
        for (let product of order.products) {
            if (filter[0] === "Ordered") {
                if (sellerId === product.seller_id._id.toString()) {
                    products.push(product)
                }
            } else {
                if ((filter.indexOf(product.currentStatus) > -1) && (sellerId === product.seller_id._id.toString())) {
                    products.push(product)
                }
            }
        }
        if (products.length > 0) {
            order.products = products;
            ordersData.push(order)
        }
    }
    return ordersData;
}

getSellerOrders = async (request) => {
    try {
        let status = request.query.status.split(",");
        let query = { "products.seller_id": request.params.id, 'products.currentStatus': { $in: status } }
        if (status[0] === "Ordered") query = { "products.seller_id": request.params.id }
        if (status.length > 1) query = { "products.seller_id": request.params.id, 'products.currentStatus': { $in: ["Ordered", "Packing", 'Out For Shipping', "Package Arrived", "Out For Delivery"] } }
        let resp = await order.
            find(query, { __v: 0 }).
            populate('products.product_id', { name: 1, price: 1, _id: 1, images: 1 }).
            populate('customer_id', { name: 1, _id: 1 })
        resp = await filterSellerProductsOnOrderStatus(resp, status, request.params.id)
        resp = _.orderBy(resp, ['placed_on'], ['desc']);
        return { "status": 200, body: resp }
    } catch (ex) {
        logger.error(ex);
        const message = ex.message ? ex.message : 'Error while fetching customer orders';
        const code = ex.statusCode ? ex.statusCode : 500;
        return { "status": code, body: { message } }
    }
}

filterSellerProductsOfAnOrder = async (orders, sellerId) => {
    let ordersData = []
    for (const order of orders) {
        let products = [];
        for (let product of order.products) {
            if (sellerId.toString() === product.seller_id._id.toString()) {
                products.push(product)
            }
        }
        order.products = products;
        ordersData.push(order)
    }
    return ordersData;
}

getSellerOrderDetails = async (request) => {
    try {
        let resp = await order.
            find({ "_id": request.params.orderId }, { __v: 0 }).
            populate('products.product_id', { name: 1, price: 1, _id: 1, images: 1 }).
            populate('products.seller_id', { name: 1, _id: 1 })
        resp = await filterSellerProductsOfAnOrder(resp, request.params.sellerId)
        return { "status": 200, body: resp[0] }
    } catch (ex) {
        logger.error(ex);
        const message = ex.message ? ex.message : 'Error while fetching Order Details';
        const code = ex.statusCode ? ex.statusCode : 500;
        return { "status": code, body: { message } }
    }
}

filterSearchResults = async (orders, search) => {
    let ordersData = []
    for (const order of orders) {
        let products = [];
        for (let product of order.products) {
            if (product.seller_id.name.toLowerCase().indexOf(search.toLowerCase()) > -1) {
                products.push(product)
            }
        }
        if (products.length > 0) {
            order.products = products;
            ordersData.push(order)
        }
    }
    return ordersData;
}

filterProductsResults = async (orders, status) => {
    let ordersData = []
    for (const order of orders) {
        let products = [];
        for (let product of order.products) {
            if (product.currentStatus === status) {
                products.push(product)
            }
        }
        if (products.length > 0) {
            order.products = products;
            ordersData.push(order)
        }
    }
    return ordersData;
}

getAllOrders = async (request) => {
    try {
        let query = { 'products.currentStatus': request.query.status }
        if (request.query.status === "All") query = {}
        let resp = await order.
            find(query, { __v: 0 }).
            populate('products.product_id', { name: 1, price: 1, _id: 1, images: 1 }).
            populate('customer_id', { name: 1, _id: 1 }).
            populate('products.seller_id', { name: 1, _id: 1 })
        if (request.query.search !== "") resp = await filterSearchResults(resp, request.query.search)
        if (request.query.status !== "All") resp = await filterProductsResults(resp, request.query.status)
        resp = _.orderBy(resp, ['placed_on'], ['desc']);
        return { "status": 200, body: resp }
    } catch (ex) {
        logger.error(ex);
        const message = ex.message ? ex.message : 'Error while fetching all orders';
        const code = ex.statusCode ? ex.statusCode : 500;
        return { "status": code, body: { message } }
    }
}

postReview = async (request) => {
    try {
        const { product_id, customer_id, timestamp, rating, headline, review } = request.body;
        const query = 'INSERT INTO reviews(id,product_id, customer_id, timestamp, rating, headline, review) values(?,?,?,?,?,?,?)';
        await pool.query(query,
            [uuidv1(), product_id, customer_id, timestamp, rating, headline, review]);
        let cumulativeRating = await pool.query('select round(avg(rating),1) as cumRating, count(*) as total from reviews');
        console.log(cumulativeRating)
        await operations.updateField(products,
            { "_id": product_id },
            {
                "cumulative_rating": cumulativeRating[0].cumRating,
                "cumulative_comment": cumulativeRating[0].total
            })
        return { "status": 200, body: { "message": "success" } }
    } catch (ex) {
        logger.error(ex);
        const message = ex.message ? ex.message : 'Error while fetching all orders';
        const code = ex.statusCode ? ex.statusCode : 500;
        return { "status": code, body: { message } }
    }
}

exports.handle_request = handle_request;
