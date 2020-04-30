const express = require('express');
const router = express.Router();
const { secret } = require('../auth/config');
const logger = require('tracer').colorConsole();
var kafka = require('../kafka/client');

router.get('/products', async (request, response) => {
    try {
      console.log(request.query)
      const data = {
        "body": request.body,
        "params": request.params,
        "query": request.query,
        "type": "fetchProducts"
      }
      await kafka.make_request('products', data, function (err, data){
        if (err) throw new Error(err)
        response.status(data.status).json(data.body);
      });
    } catch (ex) {
      logger.error(ex);
      const message = ex.message ? ex.message : 'Error while fetching Products';
      const code = ex.statusCode ? ex.statusCode : 500;
      return response.status(code).json({ message });
    }
  });

  router.get('/product/:id', async (request, response) => {
    try {
      const data = {
        "params": request.params,
        "type": "fetchProductDetails"
      }
      await kafka.make_request('products', data, function (err, data){
        if (err) throw new Error(err)
        response.status(data.status).json(data.body);
      });
    } catch (ex) {
      logger.error(ex);
      const message = ex.message ? ex.message : 'Error while fetching Products';
      const code = ex.statusCode ? ex.statusCode : 500;
      return response.status(code).json({ message });
    }
  });

  router.get('/productreviews/:id', async (request, response) => {
    try {
      const data = {
        "params": request.params,
        "type": "fetchProductReviews"
      }
      await kafka.make_request('products', data, function (err, data){
        if (err) throw new Error(err)
        response.status(data.status).json(data.body);
      });
    } catch (ex) {
      logger.error(ex);
      const message = ex.message ? ex.message : 'Error while fetching Products';
      const code = ex.statusCode ? ex.statusCode : 500;
      return response.status(code).json({ message });
    }
  });

  module.exports = router;