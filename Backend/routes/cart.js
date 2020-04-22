const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { secret } = require('../auth/config');

var kafka = require('../kafka/client');

router.get('/saveforlater/:id', async (request, response) => {
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
    router.post('/saveforlater/:id', async (request, response) => {
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
    router.post('/saveforlater/delete/:id', async (request, response) => {
        try {
            console.log(request.body)
            
            const data = {
                "body": request.body,
                "params": request.params,
                "query": request.query,
                "type": "deleteProductfromSaveForLaterlist"
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
    router.post('/movetocart/:id', async (request, response) => {
        try {
            console.log(request.body)
            
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

    
module.exports = router;