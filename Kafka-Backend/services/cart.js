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
var ObjectId = require('mongodb').ObjectID;

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
        case 'getProductsFromCart':
            return getProductsFromCart(request)
        case 'updateProductInCart':
            return updateProductInCart(request)
        case 'addProductInCart':
            return addProductInCart(request)
        default:
            return { "status": 404, body: { message: 'Invalid Route in Kafka' } }
    }
};

getCustomerSaveForLaterlist = async (request) => {
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
                console.log(product)
                console.log(request.params)
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
       
        console.log(request.body)
        let resp=await customer.updateOne({ _id:request.params.id}, { $pull: { saveforlater: { product: request.body.productid } } })
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
       
        console.log(request.body)
        let resp=await customer.updateOne({ _id:request.params.id}, { $pull: { saveforlater: { product: request.body.productid } } })
        let resp2 = await operations.updateField(customers,
                                        { _id:request.params.customer_id},
                                        {$push:{"cart":{
                                        "product" : request.body.product_id,
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

getProductsFromCart = async (request) => {
    try{
        console.log(request.params)
        const resp = await customer.find({ _id: request.params.id }).
        populate('cart.product', { name: 1, price: 1, discountedPrice:1, _id: 1, images: 1, description:1, active:1 })
        return { "status": 200, body: resp[0].cart }
    } catch (ex) {
        logger.error(ex);
        const message = ex.message ? ex.message : 'Error while fetching Customer Cart';
        const code = ex.statusCode ? ex.statusCode : 500;
        return { "status": code, body: { message } }
    }
}

addProductInCart = async (request) => {
    try{
        console.log(request.body)

        update =  {$push:{"cart":{
                "product" : request.body.product_id,
                "gift"    : request.body.gift,
                "quantity"  : request.body.quantity
            }}}

        logger.log(update)

        const resp = await operations.updateField(customer,{ _id:request.params.customer_id},update)
        console.log(resp)
        return { "status": 200, body: resp.cart }
    } catch (ex) {
        logger.error(ex);
        const message = ex.message ? ex.message : 'Error while fetching Customer Cart';
        const code = ex.statusCode ? ex.statusCode : 500;
        return { "status": code, body: { message } }
    }
}

updateProductInCart = async (request) => {
    try{
        console.log(request.params)
        update = {'cart.$.gift': request.body.gift,
            'cart.$.quantity': request.body.quantity}
        const resp = await operations.updateField(customer,{ _id:request.params.customer_id,'cart._id':request.params.product_id},update)
        return { "status": 200, body: resp.cart }
    } catch (ex) {
        logger.error(ex);
        const message = ex.message ? ex.message : 'Error while fetching Customer Cart';
        const code = ex.statusCode ? ex.statusCode : 500;
        return { "status": code, body: { message } }
    }
}


exports.handle_request = handle_request;
