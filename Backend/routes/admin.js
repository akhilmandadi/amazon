const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { secret } = require('../auth/config');
const logger = require('tracer').colorConsole();
var kafka = require('../kafka/client');
const { checkAuth } = require("../auth/auth");

router.get('/sellers',checkAuth, async (request, response) => {
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

router.get('/allCategories',checkAuth, async (request, response) => {
    try {
        const data = {
            "params": request.params,
            "query": request.query,
            "type": "getAllCategories"
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

router.post('/category',checkAuth, async (request,response)=>{
    try {
        const data = {
            "body": request.body,
            "params": request.params,
            "query": request.query,
            "type": "saveCategory"
        }
        await kafka.make_request('admin', data, function (err, data) {
            if (err) throw new Error(err)
            response.status(data.status).json(data.body);
        });
    } catch (ex) {
        logger.error(ex);
        const message = ex.message ? ex.message : 'Error while fetching orders';
        const code = ex.statusCode ? ex.statusCode : 500;
        return response.status(code).json({ message });
    }
})

router.delete('/category/:id',checkAuth, async (request,response)=>{
    try {
        const data = {
            "body": request.body,
            "params": request.params,
            "query": request.query,
            "type": "removeCategory"
        }
        await kafka.make_request('admin', data, function (err, data) {
            if (err) throw new Error(err)
            response.status(data.status).json(data.body);
        });
    } catch (ex) {
        logger.error(ex);
        const message = ex.message ? ex.message : 'Error while fetching orders';
        const code = ex.statusCode ? ex.statusCode : 500;
        return response.status(code).json({ message });
    }
})

router.get('/admin/products',checkAuth, async (request, response) => {
    try {
      console.log(request.query)
      const data = {
        "body": request.body,
        "params": request.params,
        "query": request.query,
        "type": "fetchAdminProducts"
      }
      await kafka.make_request('admin', data, function (err, data){
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