const logger = require('tracer').colorConsole();
const _ = require('lodash');
const createError = require('http-errors');
const product = require('../db/schema/product').createModel();
const seller = require('../db/schema/seller').createModel();
const productCategory = require('../db/schema/productCategory').createModel();
const operations = require('../db/operations');

async function handle_request(request) {
    switch (request.type) {
        case 'fetchProducts':
            return getProductsforCustomer(request);
        case 'fetchProductDetails':
            return fetchProductDetails(request)
        default:
            return { "status": 404, body: { message: 'Invalid Route in Kafka' } }
    }
};

getProductsforCustomer = async (request) => {
    try {
        const { searchText, filterCategory, displayResultsOffset, sortType } = request.query;
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
            sortBy = { discounted_price: 1 }
        } else if (sortType === 'PriceHightoLow') {
            sortBy = { discounted_price: -1 }
        } else if (sortType === 'AvgReview') {
            sortBy = { cumulative_rating: -1 }
        } else {
            sortBy = {}
        }

        console.log(query)

        const cate = await operations.findDocumentsByQuery(productCategory, {}, { _id: 0 }, {})

        const resp = await operations.findDocumentsByQuery(product, query, { _id: 1, name: 1, price: 1, discounted_price: 1, cumulative_rating: 1, images: 1 }, { skip: Number(displayResultsOffset) - 1, limit: 50, sort: sortBy })

        const count = await operations.countDocumentsByQuery(product, query)

        let res = {Products:resp,Categories:cate,Count:count}

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
        let res = await product.find({ _id:request.params.id }).populate('seller_id')
        return { "status": 200, body: res[0] }
    } catch (ex) {
        logger.error(ex);
        const message = ex.message ? ex.message : 'Error while fetching products';
        const code = ex.statusCode ? ex.statusCode : 500;
        return { "status": code, body: { message } }
    }
}

exports.handle_request = handle_request;
