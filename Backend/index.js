/* eslint-disable no-unused-vars */

const express = require('express');

const passportJWT = require('passport-jwt');

const rooturl = 'http://localhost:3000';
const port = process.env.PORT || 5000;
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const mysql = require('mysql');
const _ = require('lodash');
const createError = require('http-errors');
const mongoose = require('mongoose');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;


const multer = require('multer');
//var customerSchema = require('../Backend/source/models/customer');
// var studentSchema = require('../Backend/source/models/student');
// var companySchema = require('../Backend/source/models/company');
// var messages = require('../Backend/source/models/messages');

const jwt = require('jsonwebtoken');

app.set('view engine', 'ejs');


app.use(express.static('public'));
const db = require('./source/helpers/setting').mongoURI;

mongoose
  .connect(db, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log('mongo connected'))
  .catch((err) => console.log(err));

console.log('********');



const AWS = require('aws-sdk');
const pool = require('./source/dbconnect/pool');

const s3 = new AWS.S3({
  accessKeyId: 'AKIAI72XJ4B436BWHDZA',
  secretAccessKey: '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',
});


// use cors to allow cross origin resource sharing
//  app.use(cors({ origin: rooturl, credentials: true }));
app.use(cors({ origin: true, credentials: true }));
const connection = mongoose.createConnection(db, {
  useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true,
});


// use express session to maintain session data
app.use(session({
  secret: 'cmpe273_kafka_passport_mongo',
  resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
  saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
  duration: 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
  activeDuration: 5 * 60 * 1000,
}));


// Allow Access Control
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', rooturl);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

const signup = require('./source/routes/signup');
// const company = require('./source/routes/company');
// const event = require('./source/routes/event');

app.use(express.static('public'));
const signupPath = '/signup';
// const companyPath = '/company';
// const eventPath = '/event';

app.use(express.json());
app.use(bodyParser.json());
app.use(cors({ origin: rooturl, credentials: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(signupPath, signup);

app.use('/uploads', express.static(path.join(__dirname, '/uploads/')));

















app.listen(port);
console.log(`Server Listening port ${port}`);
module.exports = app;
