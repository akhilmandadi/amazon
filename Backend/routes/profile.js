const express = require('express');
var kafka = require('../kafka/client');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { secret } = require('../auth/config');
const multer = require('multer');
var path = require('path')
const fs = require('fs');
const logger = require('tracer').colorConsole();
const shortid = require('shortid');
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
  
    accessKeyId:process.env.ACC,
    secretAccessKey: process.env.SACC,
})
var storage = multer.diskStorage({

    destination: (req, file, cb) => {
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
  
const upload = multer({
    storage
})
 router.post('/customer/profilepic', upload.single('profilepic'), async (request, response) => {
    try {

      if (request.file) {
        const fileContent = fs.readFileSync(`./public/profilepic/${request.file.originalname}${path.extname(request.file.originalname)}`);
        const params = {
          Bucket: process.env.Bucket,
          Key: `${request.file.originalname}${path.extname(request.file.originalname)}`,
          Body: fileContent,
          ContentType: request.file.mimetype,
        };
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
                          response.status(data.status).json(data.body);
                      });
                  })
              }
                   
              }
     catch (ex) {

      const message = ex.message ? ex.message : 'Error while uploading resume';
      const code = ex.statusCode ? ex.statusCode : 500;
      return response.status(code).json({ message });
    }
  });
  router.post('/customer/coverpic', upload.single('profilepic'), async (request, response) => {
    try {
      if (request.file) {
        const fileContent = fs.readFileSync(`./public/coverpic/${request.file.originalname}${path.extname(request.file.originalname)}`);
        const params = {
          Bucket: process.env.Bucket,
          Key: `${request.file.originalname}${path.extname(request.file.originalname)}`,
          Body: fileContent,
          ContentType: request.file.mimetype,
        };
        
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
   
    try {
        const data = {
           "body": request.body,
            "params": request.params,
            "query": request.query,
            "type": "fetchCustomerRatings"
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

    
module.exports = router;