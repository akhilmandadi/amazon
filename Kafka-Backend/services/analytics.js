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
const uuidv1 = require('uuid/v1')

async function handle_request(request) {
    switch (request.type) {
        case 'topsoldproducts':
            return topsoldproducts(request)
    
        default:
            return { "status": 404, body: { message: 'Invalid Route in Kafka' } }
    }
};

topsoldproducts = async (request) => {
    try {
   
        const resp = await order.aggregate([{
            $group :
              {
                _id : "$products.product_id",
                totalquantitysold:{ $sum: "$products.quantity" },
              }
           },
          { $sort: { totalquantitysold: -1 } },
          { $limit: 5 },
        ]);
        console.log( resp)
    
            // populate('products.product_id', { name: 1, price: 1, _id: 1, images: 1 }).
            // populate('products.seller_id', { name: 1, _id: 1 })
        return { "status": 200, body: resp }
    } catch (ex) {
        logger.error(ex);
        const message = ex.message ? ex.message : 'Error while fetching customer orders';
        const code = ex.statusCode ? ex.statusCode : 500;
        return { "status": code, body: { message } }
    }
}

  
    
    


exports.handle_request = handle_request;
