const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { secret } = require('../auth/config');

var kafka = require('../kafka/client');

router.get('/customer/:id', async (request, response) => {
        try {
            const data = {
               "body": request.body,

                "params": request.params,
                "query": request.query,
                "type": "fetchCustomerProfile"
            }
            await kafka.make_request('profile', data, function (err, data) {
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

router.post('/customerInfoUpdate', async (request, response) => {
    try {
        const data = {
      
            "body": request.body,

            "params": request.params,
            "query": request.query,
            "type": "upadteCustomerInfo"
        }
        await kafka.make_request('profile', data, function (err, data) {
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
router.get('/customerRatings/:id', async (request, response) => {
    console.log("customerrating")
    try {
        const data = {
           "body": request.body,
            "params": request.params,
            "query": request.query,
            "type": "fetchCustomerRatings"
        }
        await kafka.make_request('profile', data, function (err, data) {
            console.log("customerratingkafka")
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