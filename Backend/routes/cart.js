const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { secret } = require('../auth/config');

var kafka = require('../kafka/client');

router.get('/customer/:id/saveforlater', async (request, response) => {
        try {
            const data = {
                "body": request.body,
                "params": request.params,
                "query": request.query,
                "type": "getCustomerSaveForLaterlist"
            }
            await kafka.make_request('cart', data, function (err, data) {
                if (err) throw new Error(err)
                response.status(data.status).json(data.body);
            });
        } catch (ex) {
            logger.error(ex);
            const message = ex.message ? ex.message : 'Error while fetching orders';
            const code = ex.statusCode ? ex.statusCode : 500;
            return response.status(code).json({ message });
        }
    });
    router.post('/customer/:id/saveforlater', async (request, response) => {
        try {
            const data = {
                "body": request.body,
                "params": request.params,
                "query": request.query,
                "type": "addProducttoSaveForLaterlist"
            }
            await kafka.make_request('cart', data, function (err, data) {
                if (err) throw new Error(err)
                response.status(data.status).json(data.body);
            });
        } catch (ex) {
            logger.error(ex);
            const message = ex.message ? ex.message : 'Error while fetching orders';
            const code = ex.statusCode ? ex.statusCode : 500;
            return response.status(code).json({ message });
        }
    });
    router.delete('/customer/:id/product/:pid/saveforlater', async (request, response) => {
        try {
            console.log("hi")
    
            
            const data = {
                "body": request.body,
                "params": request.params,
                "query": request.query,
                "type": "deleteProductfromSaveForLaterlist"
            }
            console.log(data)
            await kafka.make_request('cart', data, function (err, data) {
                if (err) throw new Error(err)
                response.status(data.status).json(data.body);
            });
        } catch (ex) {
            logger.error(ex);
            const message = ex.message ? ex.message : 'Error while fetching orders';
            const code = ex.statusCode ? ex.statusCode : 500;s
            return response.status(code).json({ message });
        }
    });
    router.post('/movetocart/:id', async (request, response) => {
        try {
        
            
            const data = {
                "body": request.body,
                "params": request.params,
                "query": request.query,
                "type": "movetocart"
            }
           
            await kafka.make_request('cart', data, function (err, data) {
                if (err) throw new Error(err)
                response.status(data.status).json(data.body);
            });
        } catch (ex) {
            logger.error(ex);
            const message = ex.message ? ex.message : 'Error while fetching orders';
            const code = ex.statusCode ? ex.statusCode : 500;
            return response.status(code).json({ message });
        }
    });

    router.get('/customer/:id/cart', async (request, response) => {  
        try {
            const data = {
                "body": request.body,
                "params": request.params,
                "query": request.query,
                "type": "getProductsFromCart"
            }
            await kafka.make_request('cart', data, function (err, data) {
                if (err) throw new Error(err)
                response.status(data.status).json(data.body);
            });
        } catch (ex) {
            logger.error(ex);
            const message = ex.message ? ex.message : 'Error while fetching Customer Cart';
            const code = ex.statusCode ? ex.statusCode : 500;
            return response.status(code).json({ message });
        }
    });

    router.post('/customer/:customer_id/cart', async (request, response) => {  
        try {
            const data = {
                "body": request.body,
                "params": request.params,
                "query": request.query,
                "type": "addProductInCart"
            }
            console.log(data)
            await kafka.make_request('cart', data, function (err, data) {
                if (err) throw new Error(err)
                response.status(data.status).json(data.body);
            });
        } catch (ex) {
            logger.error(ex);
            const message = ex.message ? ex.message : 'Error while adding Products to Customer Cart';
            const code = ex.statusCode ? ex.statusCode : 500;
            return response.status(code).json({ message });
        }
    });
    
    router.put('/customer/:customer_id/cart/product/:product_id', async (request, response) => {  
        try {
            const data = {
                "body": request.body,
                "params": request.params,
                "query": request.query,
                "type": "updateProductInCart"
            }
            await kafka.make_request('cart', data, function (err, data) {
                if (err) throw new Error(err)
                response.status(data.status).json(data.body);
            });
        } catch (ex) {
            logger.error(ex);
            const message = ex.message ? ex.message : 'Error while updating Customer Cart';
            const code = ex.statusCode ? ex.statusCode : 500;
            return response.status(code).json({ message });
        }
    });

    router.delete('/customer/:customer_id/cart/product/:product_id/:type', async (request, response) => {  
        try {
            const data = {
                "body": request.body,
                "params": request.params,
                "query": request.query,
                "type": "deleteProductInCart"
            }
            await kafka.make_request('cart', data, function (err, data) {
                if (err) throw new Error(err)
                response.status(data.status).json(data.body);
            });
        } catch (ex) {
            logger.error(ex);
            const message = ex.message ? ex.message : 'Error while updating Customer Cart';
            const code = ex.statusCode ? ex.statusCode : 500;
            return response.status(code).json({ message });
        }
    });

    router.get('/customer/:id/checkout', async (request, response) => {  
        try {
            const data = {
                "body": request.body,
                "params": request.params,
                "query": request.query,
                "type": "getCustomerCheckoutDetails"
            }
            await kafka.make_request('cart', data, function (err, data) {
                if (err) throw new Error(err)
                response.status(data.status).json(data.body);
            });
        } catch (ex) {
            logger.error(ex);
            const message = ex.message ? ex.message : 'Error while fetching Customer Checkout Details';
            const code = ex.statusCode ? ex.statusCode : 500;
            return response.status(code).json({ message });
        }
    });

    router.post('/customer/:id/orders', async (request, response) => {  
        try {
            const data = {
                "body": request.body,
                "params": request.params,
                "query": request.query,
                "type": "placeOrderByCustomer"
            }
            await kafka.make_request('cart', data, function (err, data) {
                if (err) throw new Error(err)
                response.status(data.status).json(data.body);
            });
        } catch (ex) {
            logger.error(ex);
            const message = ex.message ? ex.message : 'Error while placing Customer Order';
            const code = ex.statusCode ? ex.statusCode : 500;
            return response.status(code).json({ message });
        }
    });

    
module.exports = router;