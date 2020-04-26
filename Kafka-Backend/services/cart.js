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
        case 'getCustomerSaveForLaterlist':
            return getCustomerSaveForLaterlist(request)
        case 'addProducttoSaveForLaterlist':
                return addProducttoSaveForLaterlist(request)
        case 'deleteProductfromSaveForLaterlist':
                return deleteProductfromSaveForLaterlist(request)
        case 'movetocart':
                    return moveToCart(request)
            
        default:
            return { "status": 404, body: { message: 'Invalid Route in Kafka' } }
    }
};

getCustomerSaveForLaterlist = async (request) => {
    console.log("getCustomerSaveForLaterlist")
    try {
   
        const resp = await customer.find({ _id: request.params.id }).
        populate('saveforlater.product', { name: 1, price: 1, _id: 1, images: 1,description:1,expired:1 })
        return { "status": 200, body: resp[0].saveforlater }
    } catch (ex) {
        logger.error(ex);
        const message = ex.message ? ex.message : 'Error while fetching customer orders';
        const code = ex.statusCode ? ex.statusCode : 500;
        return { "status": code, body: { message } }
    }
}
addProducttoSaveForLaterlist = async (request) => {
    try {
            const product = {
                product: request.body.productid,  
                };
               
         let resp= await customer.updateOne({ _id: request.params.id }, { $push: { 'saveforlater': product }},{})
         let resp1= await getCustomerSaveForLaterlist(request)
         return { "status": 200, body: resp1.body }
         
    } catch (ex) {
        logger.error(ex);
        const message = ex.message ? ex.message : 'Error while fetching customer orders';
        const code = ex.statusCode ? ex.statusCode : 500;
        return { "status": code, body: { message } }
    }
}
deleteProductfromSaveForLaterlist= async (request) => {
    try {
       
        console.log(request.params)
        let resp=await customer.updateOne({ _id:request.params.id}, { $pull: { saveforlater: { product: request.params.pid } } })
        let resp1= await getCustomerSaveForLaterlist(request)
        return { "status": 200, body: resp1.body }
    } catch (ex) {
        logger.error(ex);
        const message = ex.message ? ex.message : 'Error while fetching customer orders';
        const code = ex.statusCode ? ex.statusCode : 500;
        return { "status": code, body: { message } }
    }
}

moveToCart= async (request) => {
    try {
        console.log(request.params.id)
        console.log(request.body.productid)
        let resp=await customer.updateOne({ _id:request.params.id}, { $pull: { saveforlater: { product: request.body.productid } } })
        let resp2 = await operations.updateField(customer,
            { _id:request.params.id},
            {$push:{"cart":{
            "product" : request.body.productid,
            "gift"    : request.body.gift,
            "quantity"  : request.body.quantity
        }}})
        let resp1= await getCustomerSaveForLaterlist(request)
        return { "status": 200, body: resp1.body }
    } catch (ex) {
        logger.error(ex);
        const message = ex.message ? ex.message : 'Error while fetching customer orders';
        const code = ex.statusCode ? ex.statusCode : 500;
        return { "status": code, body: { message } }
    }
}


exports.handle_request = handle_request;
