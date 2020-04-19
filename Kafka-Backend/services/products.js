const logger = require('tracer').colorConsole();
const _ = require('lodash');
const createError = require('http-errors');
const product = require('../db/schema/product').createModel();
const operations = require('../db/operations');

async function handle_request(request) {
    switch (request.type) {
        case 'fetchProducts':
            return fetchProducts(request)
        default:
            return { "status": 404, body: { message: 'Invalid Route in Kafka' } }
    }
};

fetchProducts = async (request) => {
    try {
        console.log(request)
        const { searchText, filterCategory, displayResultsOffset } = request.query;
        if (searchText === "" && filterCategory === ""){
            query = {}
        }else{
            query = {'name':new RegExp(searchText), 'category':filterCategory};
        }

        const resp = await operations.findDocumentsByQuery(product, query, {_id:1, name:1, price:1, description:1, discount:1, cumulative_rating:1, images:1}, {skip:Number(displayResultsOffset),limit:50})
        console.log(resp)
        return { "status": 200, body: resp }
    } catch (ex) {
        logger.error(ex);
        const message = ex.message ? ex.message : 'Error while fetching products';
        const code = ex.statusCode ? ex.statusCode : 500;
        return { "status": code, body: { message } }
    }
}

exports.handle_request = handle_request;
