const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { secret } = require('../auth/config');
const logger = require('tracer').colorConsole();
var kafka = require('../kafka/client');

router.get('/customer/:id/orders', async (request, response) => {
    try {
        const data = {
            "params": request.params,
            "query": request.query,
            "type": "getCustomerOrders"
        }
        await kafka.make_request('orders', data, function (err, data) {
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

router.get('/orders/:id', async (request, response) => {
    try {
        const data = {
            "params": request.params,
            "query": request.query,
            "type": "getOrderDetails"
        }
        await kafka.make_request('orders', data, function (err, data) {
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

router.put('/orders/:orderId/product/:productId', async (request, response) => {
    try {
        const data = {
            "params": request.params,
            "query": request.query,
            "body": request.body,
            "type": "updateOrderStatus"
        }
        await kafka.make_request('orders', data, function (err, data) {
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

router.get('/seller/:id/orders', async (request, response) => {
    try {
        const data = {
            "params": request.params,
            "query": request.query,
            "type": "getSellerOrders"
        }
        await kafka.make_request('orders', data, function (err, data) {
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

router.get('/seller/:sellerId/orders/:orderId', async (request, response) => {
    try {
        const data = {
            "params": request.params,
            "query": request.query,
            "type": "getSellerOrderDetails"
        }
        await kafka.make_request('orders', data, function (err, data) {
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