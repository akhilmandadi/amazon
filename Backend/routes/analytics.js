const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { secret } = require('../auth/config');
const logger = require('tracer').colorConsole();
var kafka = require('../kafka/client');
const { checkAuth } = require("../auth/auth");


router.get('/topsoldproducts',checkAuth, async (request, response) => {
    try {
        const data = {
            "body":request.body,
            "params": request.params,
            "query": request.query,
            "type": "topsoldproducts"
        }
        await kafka.make_request('analytics', data, function (err, data) {
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

router.get('/topsellers',checkAuth, async (request, response) => {
    try {
        const data = {
            "body":request.body,
            "params": request.params,
            "query": request.query,
            "type": "topsellers"
        }
        await kafka.make_request('analytics', data, function (err, data) {
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

router.get('/topcustomers',checkAuth, async (request, response) => {
    try {
        const data = {
            "body":request.body,
            "params": request.params,
            "query": request.query,
            "type": "topcustomers"
        }
        await kafka.make_request('analytics', data, function (err, data) {
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
router.post('/ordersperday', checkAuth ,async (request, response) => {
    try {
        const data = {
            "body":request.body,
            "params": request.params,
            "query": request.query,
            "type": "ordersperday"
        }
        await kafka.make_request('analytics', data, function (err, data) {
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
router.get('/topratedproducts',checkAuth , async (request, response) => {
    try {
        const data = {
            "body":request.body,
            "params": request.params,
            "query": request.query,
            "type": "topratedproducts"
        }
        await kafka.make_request('analytics', data, function (err, data) {
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
router.get('/topviewedproducts', checkAuth ,async (request, response) => {
    try {
        const data = {
            "body":request.body,
            "params": request.params,
            "query": request.query,
            "type": "topviewedproducts"
        }
        await kafka.make_request('analytics', data, function (err, data) {
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

router.get('/sellerstatictics/:id',checkAuth , async (request, response) => {
    try {
        const data = {
            "body":request.body,
            "params": request.params,
            "query": request.query,
            "type": "sellerstatictics"
        }
        await kafka.make_request('analytics', data, function (err, data) {
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
router.post('/sellermonthlystatictics/:id',checkAuth , async (request, response) => {
    try {
        const data = {
            "body":request.body,
            "params": request.params,
            "query": request.query,
            "type": "sellermonthlystatictics"
        }
        await kafka.make_request('analytics', data, function (err, data) {
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