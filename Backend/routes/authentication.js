const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { secret } = require('../auth/config');
const logger = require('tracer').colorConsole();
var kafka = require('../kafka/client');
const { auth } = require("../auth/auth");
const { checkAuth } = require("../auth/auth");
auth();

router.post('/signin', async (request, response) => {
  try {
    const data = {
      "body": request.body,
      "params": request.params,
      "query": request.query,
      "type": "signin"
    }
    await kafka.make_request('common', data, function (err, data) {
      if (err) throw new Error(err)
      response.status(data.status).json(data.body);
    });
  } catch (ex) {
    logger.error(ex);
    const message = ex.message ? ex.message : 'Error while fetching credentials';
    const code = ex.statusCode ? ex.statusCode : 500;
    return response.status(code).json({ message });
  }
});

router.post('/signup', async (request, response) => {
  try {
    const data = {
      "body": request.body,
      "params": request.params,
      "query": request.query,
      "type": "signup"
    }
    await kafka.make_request('common', data, function (err, data) {
      if (err) throw new Error(err)
      response.status(data.status).json(data.body);
    });
  } catch (ex) {
    logger.error(ex);
    const message = ex.message ? ex.message : 'Error while signup';
    const code = ex.statusCode ? ex.statusCode : 500;
    return response.status(code).json({ message });
  }
});

module.exports = router;