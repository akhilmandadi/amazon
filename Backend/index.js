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
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const logger = require('tracer').colorConsole();
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.REACT_URL);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});
const connection = require('./db/connection');

async function initializeApplication() {
  try {
    app.use(authentication);
    app.use(orders)
    app.use("/user", user)
    app.use("/profile", profile)
    app.use("/cart", cart)
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


  const storage = multer.diskStorage({

    destination: (req, file, cb) => {
      console.log("bhavana") 
      console.log(req.body) 
      console.log("bhavana123") 
      if (file.mimetype != 'application/pdf' && req.body.pictype==='cover') {
        cb(null, './public/coverpic');
      } else {
        cb(null, './public/profilepic');
      }
    },
    filename: (req, file, cb) => {
      if (file.mimetype === 'application/pdf') {
        cb(null, file.originalname + path.extname(file.originalname));
      } else {
        cb(null,  file.originalname + path.extname(file.originalname));
      }
    },
  });
  
  
  const AWS = require('aws-sdk');

  const upload = multer({
    storage,
  });
  
  const s3 = new AWS.S3({
    accessKeyId: 'AKIAI72XJ4B436BWHDZA',
    secretAccessKey: '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',
  });


app.post('/customer/profilepic', upload.single('profilepic'), async (request, response) => {
  console.log("customerprofilepic")
  try {
    if (request.file) {
      const fileContent = fs.readFileSync(`./public/profilepic/${request.file.originalname}${path.extname(request.file.originalname)}`);
      const params = {
        Bucket: 'handshakeresume-273',
        Key: `${request.file.originalname}${path.extname(request.file.originalname)}`,
        Body: fileContent,
        ContentType: request.file.mimetype,
      };
      console.log(params);
      s3.upload(params, async (err, data) => {
        if (err) {
          return response.status(500).json({ error: err.message });
        }
          const data1 = {
              "imagelocation" : data.Location,
              "body": request.body,
              "type": "UpdateCustomerProfilepic"
          }
          await kafka.make_request('profile', data1, function (err, data) {
              if (err) throw new Error(err)
              console.log(data.body)
              response.status(data.status).json(data.body);
          });
      })
  }
       
  } catch (ex) {
    const message = ex.message ? ex.message : 'Error while uploading resume';
    const code = ex.statusCode ? ex.statusCode : 500;
    return response.status(code).json({ message });
  }
});

app.post('/customer/coverpic', upload.single('profilepic'), async (request, response) => {
  try {
    if (request.file) {
      console.log("hi");
      console.log(request.body);
      const fileContent = fs.readFileSync(`./public/coverpic/${request.file.originalname}${path.extname(request.file.originalname)}`);
      const params = {
        Bucket: 'handshakeresume-273',
        Key: `${request.file.originalname}${path.extname(request.file.originalname)}`,
        Body: fileContent,
        ContentType: request.file.mimetype,
      };
      console.log(params);
      s3.upload(params, async (err, data) => {
        if (err) {
          return response.status(500).json({ error: err.message });
        }
          const data1 = {
              "imagelocation" : data.Location,
              "body": request.body,
              "type": "UpdateCustomerCoverpic"
          }
          await kafka.make_request('profile', data1, function (err, data) {
              if (err) throw new Error(err)
              response.status(data.status).json(data.body);
          });
      })
  }
       
  } catch (ex) {
    const message = ex.message ? ex.message : 'Error while uploading resume';
    const code = ex.statusCode ? ex.statusCode : 500;
    return response.status(code).json({ message });
  }
});
  

module.exports = app;