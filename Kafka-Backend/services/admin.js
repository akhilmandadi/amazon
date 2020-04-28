const logger = require('tracer').colorConsole();
const _ = require('lodash');
const createError = require('http-errors');
const uuid = require('shortid');
const jwt = require('jsonwebtoken');
const product = require('../db/schema/product').createModel();
const seller = require('../db/schema/seller').createModel();
const productCategory = require("../db/schema/productCategory").createModel();
const operations = require('../db/operations');
const uuidv1 = require('uuid/v1')

async function handle_request(request) {
    switch (request.type) {
        case 'getAllSellers':
            return getAllSellers(request)
        case 'getAllCategories':
            return getAllCategories(request)
        case 'saveCategory':
            return saveCategory(request)
        case 'removeCategory':
            return removeCategory(request)
        case 'fetchAdminProducts':
            return fetchAdminProducts(request)
        default:
            return { "status": 404, body: { message: 'Invalid Route in Kafka' } }
    }
};

fetchAdminProducts = async (request) => {
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
    const count = await operations.countDocumentsByQuery(product, query)

    const resp = await product.find( query).populate('seller_id');
    // const resp = await operations.findDocumentsByQueryOffset(product, query,{ _id: 1, name: 1, price: 1, description: 1,seller_id : 1 , discount: 1, cumulative_rating: 1, images: 1, category: 1 }, { skip: Number(displayResultsOffset) - 1, limit: 50, sort: sortBy }).populate('seller_id');

        let res = {Products:resp , count : count }
        return { "status": 200, body: res }; 
}
getAllCategories = async (request) => {
    try {
        let resp = await productCategory.find({}, { __v: 0 })
        return { "status": 200, body: resp }
    } catch (ex) {
        logger.error(ex);
        const message = ex.message ? ex.message : 'Error while fetching seller';
        const code = ex.statusCode ? ex.statusCode : 500;
        return { "status": code, body: { message } }
    }
}

saveCategory = async (request) => {
    try {
        let resp = await operations.saveDocuments(productCategory, request.body, { runValidators: true });
        return { "status": 200, body: resp }
    } catch (ex) {
        logger.error(ex);
        const message = ex.message ? ex.message : 'Error while fetching seller';
        const code = ex.statusCode ? ex.statusCode : 500;
        return { "status": code, body: { message } }
    }
}

removeCategory = async (request) => {
    try {
        let resp = await productCategory.deleteOne({ _id: request.params.id })
        return { "status": 200, body: resp }
    } catch (ex) {
        logger.error(ex);
        const message = ex.message ? ex.message : 'Error while fetching seller';
        const code = ex.statusCode ? ex.statusCode : 500;
        return { "status": code, body: { message } }
    }
}


getAllSellers = async (request) => {
    try {
        let query = { 'products.currentStatus': request.query.search }
        let resp = await seller.find({ name: { '$regex': request.query.search, '$options': 'i' } }, { __v: 0, password: 0 })
        return { "status": 200, body: resp }
    } catch (ex) {
        logger.error(ex);
        const message = ex.message ? ex.message : 'Error while fetching seller';
        const code = ex.statusCode ? ex.statusCode : 500;
        return { "status": code, body: { message } }
    }
}

exports.handle_request = handle_request;
