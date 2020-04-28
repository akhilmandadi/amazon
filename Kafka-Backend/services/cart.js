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
        case 'deleteProductInCart':
            return deleteProductInCart(request)
        case 'getCustomerCheckoutDetails':
            return getCustomerCheckoutDetails(request)
        case 'placeOrderByCustomer':
            return placeOrderByCustomer(request)
        default:
            return { "status": 404, body: { message: 'Invalid Route in Kafka' } }
    }
};

getCustomerSaveForLaterlist = async (request) => {
    console.log("getCustomerSaveForLaterlist")
    try {
        const resp = await customer.find({ _id: request.params.id }).
        populate('saveforlater.product', { name: 1, price: 1, _id: 1, images: 1,description:1,expired:1 ,active:1})
        let finalresult1=[];
        for (temp of resp[0].saveforlater) {
            console.log("bhavana")
            console.log(temp)
            if(temp.product.active==true)
            {
             finalresult1.push(temp)
            }
        }
        return { "status": 200, body: finalresult1}
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
deleteProductfromSaveForLaterlist = async (request) => {
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

moveToCart = async (request) => {
    try {

        console.log(request.body)
        let resp = await customer.updateOne({ _id: request.params.id }, { $pull: { saveforlater: { product: request.body.productid } } })
        let resp2 = await operations.updateField(customers,
            { _id: request.params.customer_id },
            {
                $push: {
                    "cart": {
                        "product": request.body.product_id,
                        "gift": request.body.gift,
                        "quantity": request.body.quantity
                    }
                }
            })
        let resp1 = await getCustomerSaveForLaterlist(request)
        return { "status": 200, body: resp1.body }
    } catch (ex) {
        logger.error(ex);
        const message = ex.message ? ex.message : 'Error while fetching customer orders';
        const code = ex.statusCode ? ex.statusCode : 500;
        return { "status": code, body: { message } }
    }
}

getProductsFromCart = async (request) => {
    try {
        console.log(request.params)
        const resp = await customer.find({ _id: request.params.id }).
            populate('cart.product', { name: 1, seller_id:1, price: 1, discountedPrice: 1, _id: 1, images: 1, description: 1, active: 1 })
        return { "status": 200, body: resp[0].cart }
    } catch (ex) {
        logger.error(ex);
        const message = ex.message ? ex.message : 'Error while fetching Customer Cart';
        const code = ex.statusCode ? ex.statusCode : 500;
        return { "status": code, body: { message } }
    }
}

addProductInCart = async (request) => {
    try {
        console.log(request.body)
        update = {
            $push: {
                "cart": {
                    "product": request.body.product_id,
                    "gift": request.body.gift,
                    "quantity": request.body.quantity
                }
            }
        }

        const resp = await operations.updateField(customer, { _id : request.params.customer_id, product : request.body.product_id }, update)
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
    try {
        console.log(request.params)
        // if (request.params.product_id !== 'null') {
        update = {
            'cart.$.gift': request.body.gift,
            'cart.$.quantity': request.body.quantity
        }
        let resp = await operations.updateField(customer, { _id: request.params.customer_id, 'cart.product': request.params.product_id }, update)
        // } 
        // else {
        //     console.log()
        //     update = { $set: { 'cart.$.gift': request.body.gift } }
        //     // let resp = await operations.updateField(customer, { _id: request.params.customer_id }, update)
        //     await customer.find({ _id: request.params.customer_id})
        //     .then((doc)=> {
        //             logger.log(doc)
        //             doc[0].cart.forEach(function (item) {
        //                     item.gift = request.body.gift;
        //                     update = {
        //                         $push: {
        //                             "cart": {
        //                                 "product": item.product_id,
        //                                 "gift": request.body.gift,
        //                                 "quantity": request.body.quantity
        //                             }
        //                         }
        //                     }
        //             });
        //             // logger.log(doc)
        //             // let data = new customer(doc);
        //             // data.save({ runValidators: true });
        //             // customer.save(doc);
        //             update = {
        //                 $push: {
        //                     "cart": {
        //                         "product": request.body.product_id,
        //                         "gift": request.body.gift,
        //                         "quantity": request.body.quantity
        //                     }
        //                 }
        //             }

        //             logger.log(update)

        //             const resp = await operations.updateField(customer, { _id: request.params.customer_id }, update)
        //         });
        // }

        resp = await customer.find({ _id: request.params.customer_id }).
            populate('cart.product', { name: 1, price: 1, discountedPrice: 1, _id: 1, images: 1, description: 1, active: 1 })
        return { "status": 200, body: resp[0].cart }
    } catch (ex) {
        logger.error(ex);
        const message = ex.message ? ex.message : 'Error while fetching Customer Cart';
        const code = ex.statusCode ? ex.statusCode : 500;
        return { "status": code, body: { message } }
    }
}

deleteProductInCart = async (request) => {
    try {
        update = {
            $pull: {
                "cart": {
                    "product": request.params.product_id
                }
            }
        }

        let resp = await operations.updateField(customer, { _id: request.params.customer_id }, update)

        resp = await customer.find({ _id: request.params.customer_id }).
            populate('cart.product', { name: 1, price: 1, discountedPrice: 1, _id: 1, images: 1, description: 1, active: 1 })

        if (request.params.type === 'saveforlater') {
            console.log(request.body.type)
            save = await operations.updateField(customer, { _id: request.params.customer_id }, { $push: { 'saveforlater': { 'product': request.params.product_id } } })
        }

        return { "status": 200, body: resp[0].cart }
    } catch (ex) {
        logger.error(ex);
        const message = ex.message ? ex.message : 'Error while fetching Customer Cart';
        const code = ex.statusCode ? ex.statusCode : 500;
        return { "status": code, body: { message } }
    }
}

getCustomerCheckoutDetails = async (request) => {
    try {
        console.log(request.params)
        const resp = await customer.find({ _id: request.params.id }, { cart: 1, addresses: 1, cards: 1 }).
            populate('cart.product', { name: 1, seller_id:1, price: 1, discountedPrice: 1, _id: 1, images: 1, description: 1, active: 1 })
        console.log(resp)
        return { "status": 200, body: resp[0] }
    } catch (ex) {
        logger.error(ex);
        const message = ex.message ? ex.message : 'Error while fetching Customer Cart';
        const code = ex.statusCode ? ex.statusCode : 500;
        return { "status": code, body: { message } }
    }
}

placeOrderByCustomer = async (request) => {
    try {
        let orderData = {
            customer_id: request.params.id,
            products: request.body.products,
            address: request.body.address,
            payment : request.body.card,
            total: request.body.total,
            placed_on: request.body.placed_on
        }
        let resp = await operations.saveDocuments(order, orderData, { runValidators: true });
        let clearcart = await operations.updateField(customer, { _id: request.params.id }, {cart:[]})
        return { "status": 200, body: resp }
    } catch (ex) {
        logger.error(ex);
        const message = ex.message ? ex.message : 'Error while saving customer orders';
        const code = ex.statusCode ? ex.statusCode : 500;
        return { "status": code, body: { message } }
    }
}


exports.handle_request = handle_request;
