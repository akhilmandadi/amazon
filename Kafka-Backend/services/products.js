const logger = require('tracer').colorConsole();
const _ = require('lodash');
const createError = require('http-errors');
const product = require('../db/schema/product').createModel();
const customer = require('../db/schema/customer').createModel();
const seller = require('../db/schema/seller').createModel();
const productCategory = require('../db/schema/productCategory').createModel();
const operations = require('../db/operations');
const redisClient = require('../redis');
const pool = require('../db/sqlConnection');

async function handle_request(request) {
    switch (request.type) {
        case 'fetchProducts':
            return getProductsforCustomer(request);
        case 'fetchProductDetails':
            return fetchProductDetails(request)
        case "fetchCategoryProducts":
            return fetchCategoryProducts(request);
        case "fetchProductReviews":
            return fetchProductReviews(request);
        default:
            return { "status": 404, body: { message: 'Invalid Route in Kafka' } }
    }
};

fetchCategoryProducts = async (request) => {
    try {
        const { searchText, filterCategory, displayResultsOffset, sortType } = request.query;
        const resp = await operations.findDocumentsByQuery(product, query, { _id: 1, name: 1, price: 1, discountedPrice: 1, cumulative_rating: 1, images: 1, seller_id: 1 }, { skip: 48*(Number(displayResultsOffset) - 1), limit: 48, sort: sortBy })

        return { "status": 200, body: resp }
    } catch (ex) {
        logger.error(ex);
        const message = ex.message ? ex.message : 'Error while fetching products';
        const code = ex.statusCode ? ex.statusCode : 500;
        return { "status": code, body: { message } }
    }
}

fetchFromCache = (key) => {
    return new Promise((resolve, reject) => {
        redisClient.get(key, (error, data) => {
            if (!error && data) resolve(data)
            else resolve(error)
        })
    })
}

getProductsforCustomer = async (request) => {
    try {
        const { searchText, filterCategory, displayResultsOffset, sortType } = request.query;
        if (searchText === "" && filterCategory === "" && displayResultsOffset === 50) {
            // let cacheData = await fetchFromCache("products")
            // if (cacheData !== null) return { "status": 200, body: JSON.parse(cacheData) }
        }
        
        if (searchText === "" && filterCategory === "") {
            query = { 'active': true }
        } else if (searchText === "") {
            query = { 'category': filterCategory, 'active': true };
        } else if (filterCategory === "") {
            query = {
                $or: [{ 'name': { $regex: searchText, $options: 'i' }, 'active': true },
                { 'category': { $regex: searchText, $options: 'i' }, 'active': true }]
            };
        } else {
            query = { 'name': { $regex: searchText, $options: 'i' }, 'category': filterCategory, 'active': true };
        }
        if (sortType === 'PriceLowtoHigh') {
            sortBy = { discountedPrice: 1 }
        } else if (sortType === 'PriceHightoLow') {
            sortBy = { discountedPrice: -1 }
        } else if (sortType === 'AvgReview') {
            sortBy = { cumulative_rating: -1 }
        } else {
            sortBy = {}
        }
        
        console.log((48*(displayResultsOffset - 1)))

        const cate = await operations.findDocumentsByQuery(productCategory, {}, { _id: 0 }, {})

        const resp = await operations.findDocumentsByQueryOffset(product, query, { _id: 1, name: 1, price: 1, discountedPrice: 1, cumulative_rating: 1, images: 1 }, { skip: (48*(displayResultsOffset - 1)), limit: 48, sort: sortBy })

        const count = await operations.countDocumentsByQuery(product, query)

        let res = { Products: resp, Categories: cate, Count: count }
        // redisClient.set("products", JSON.stringify(resp));
        return { "status": 200, body: res }
    } catch (ex) {
        logger.error(ex);
        const message = ex.message ? ex.message : 'Error while fetching products';
        const code = ex.statusCode ? ex.statusCode : 500;
        return { "status": code, body: { message } }
    }
}

fetchProductDetails = async (request) => {
    try {
        let res = await product.find({ _id: request.params.id }).populate('seller_id')
        if (request.query.persona !== "" && request.query.persona === "customer") {
            let res1 = await product.findOneAndUpdate({ "_id": request.params.id }, {
                $set: {
                    "views": (res[0].views ? res[0].views + 1 : 1)
                }
            })
        }
        return { "status": 200, body: res[0] }

    } catch (ex) {
        logger.error(ex);
        const message = ex.message ? ex.message : 'Error while fetching products';
        const code = ex.statusCode ? ex.statusCode : 500;
        return { "status": code, body: { message } }
    }
}

fetchProductReviews = async (request) => {
    try {
         let cacheData = await fetchFromCache(request.params.id)
         if (cacheData !== null) return { "status": 200, body: JSON.parse(cacheData) }
        let res = await pool.query('select * from reviews where product_id=?', [request.params.id])
        for (i = 0; i < res.length; i++) {
            res[i]["customer"] = await (customer.find({ _id: res[i].customer_id }))
            console.log(res[i]["customer"])
        }
        //  redisClient.set(request.params.id, JSON.stringify(res));
        return { "status": 200, body: res }
    } catch (ex) {
        logger.error(ex);
        const message = ex.message ? ex.message : 'Error while fetching product reviews.';
        const code = ex.statusCode ? ex.statusCode : 500;
        return { "status": code, body: { message } }
    }
}

exports.handle_request = handle_request;
