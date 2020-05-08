const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { secret } = require('../auth/config');
const multer = require('multer');
var path = require('path')
const fs = require('fs');
const logger = require('tracer').colorConsole();
var kafka = require('../kafka/client');
const shortid = require('shortid');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId:
        process.env.ACC,
    secretAccessKey:  process.env.SACC

})

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.mimetype === "application/pdf") {
            cb(null, './public/applications')
        } else {
            cb(null, './public/images')
        }
    },
    filename: (req, file, cb) => {
        if (file.mimetype === "application/pdf") {
            cb(null, "company" + req.body.companyId + path.extname(file.originalname))
        } else {

            cb(null, "product" + file.originalname);

        }
    }
});
const upload = multer({
    storage
})

router.put("/profile",async (request, response) => {
    try {
      const data = {
        "body": request.body,
        "params": request.params,
        "query": request.query,
        "type": "updateSellerProfile"
      }
      await kafka.make_request('seller', data, function (err, data){
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

  router.get('/:id/profile',async(request,response) =>{
    try {
        const data = {
          "body": request.body,
          "params": request.params,
          "query": request.query,
          "type": "getProfile"
        }
        await kafka.make_request('seller', data, function (err, data){
          if (err) throw new Error(err)
          response.status(data.status).json(data.body[0]);
        });
      } catch (ex) {
        logger.error(ex);
        const message = ex.message ? ex.message : 'Error while fetching Products';
        const code = ex.statusCode ? ex.statusCode : 500;
        return response.status(code).json({ message });
      }
  })

router.put("/profilePic",upload.single('picture'),async(request,response)=>{
      try{
          let file = request.file
        const fileContent = fs.readFileSync('./public/images/' + "product" + file.originalname);
        const params = {
            Bucket: process.env.BUCKETNAME,
            Key: shortid.generate() + path.extname(file.originalname),
            Body: fileContent,
            ContentType: file.mimetype
        };
        let result = await s3.upload(params).promise();
        let body = {
            ...request.body,
            image : result.Location
        }
        let data = {
            "body": body,
            "params": request.params,
            "query": request.query,
            "type": "updateProfilePic"
        }
        await kafka.make_request('seller', data, function (err, data) {
            if (err) throw new Error(err)
            response.status(data.status).json(data.body);
          });

      }
      catch (ex) {
        logger.error(ex);
        const message = ex.message ? ex.message : 'Error while fetching credentials';
        const code = ex.statusCode ? ex.statusCode : 500;
        return response.status(code).json({ message });
    }
  })

router.post('/product', upload.array('pictures'), async (request, response) => {
    try {
        let data = {
            "body": request.body,
            "params": request.params,
            "query": request.query,
            "type": "addProduct"
        }
        console.log(request.files);
        let list = [];
        console.log("Images");
        console.log(data.images);
        if(data.body.images)
        list = data.body.images.split(',') ;
        for (let file of request.files) {

            const fileContent = fs.readFileSync('./public/images/' + "product" + file.originalname);
            console.log(process.env.BUCKETNAME);
            
            const params = {
                Bucket: process.env.BUCKETNAME,
                Key: shortid.generate() + path.extname(file.originalname),
                Body: fileContent,
                ContentType: file.mimetype
            };
            let result = await s3.upload(params).promise();
            console.log(result);
            list.push(result.Location);
        }
        let body = {
            ...request.body,
            images: list
        }
        data = {
            ...data,
            body: body
        }
        await kafka.make_request('seller', data, function (err, data) {
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

router.get('/:id/products', async (request, response) => {
    try {
      console.log("requested")
      const data = {
        "body": request.body,
        "params": request.params,
        "query": request.query,
        "type": "fetchProducts"
      }
      await kafka.make_request('seller', data, function (err, data){
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