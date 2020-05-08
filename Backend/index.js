const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const multer = require('multer');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
app.use(cors({ origin: process.env.REACT_URL, credentials: true }));
app.use(express.static('public'));
const authentication = require('./routes/authentication');
const orders = require('./routes/orders')
const user = require('./routes/user');
const seller = require('./routes/seller');
const admin = require('./routes/admin')
const profile = require('./routes/profile')
const cart = require('./routes/cart')

const analytics = require('./routes/analytics')
var kafka = require('./kafka/client');
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const logger = require('tracer').colorConsole();
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.REACT_URL);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  next();
});
const connection = require('./db/connection');

async function initializeApplication() {
  try {
    app.use(authentication);
    app.use(orders)
    app.use("/user", user)
    app.use("/profile", profile)
    app.use(admin)
    app.use(cart)
    app.use('/seller',seller);
    app.use('/analytics',analytics);
    await connection.createConnection();
    app.listen(process.env.PORT || 8080, () => {
      logger.debug('App listening on port 8080');
    });
  } catch (error) {
    return Promise.reject(error.message);
  }
}

initializeApplication()
  .then((response) => logger.info("Server Running"))
  .catch(error => logger.error(`Error in Initalizing Application  : ${error}`));
module.exports = app;