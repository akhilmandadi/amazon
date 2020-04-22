const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { secret } = require('../auth/config');
const logger = require('tracer').colorConsole();
var kafka = require('../kafka/client');

router.get('/sellers', async (request, response) => {
    try {
        const data = {
            "params": request.params,
            "query": request.query,
            "type": "getAllSellers"
        }
        await kafka.make_request('admin', data, function (err, data) {
            if (err) throw new Error(err)
            response.status(data.status).json(data.body);
        });
    } catch (ex) {
        logger.error(ex);
        const message = ex.message ? ex.message : 'Error while fetching seller details';
        const code = ex.statusCode ? ex.statusCode : 500;
        return response.status(code).json({ message });
    }
});

module.exports = router;