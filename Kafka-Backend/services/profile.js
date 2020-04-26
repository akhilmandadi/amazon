const logger = require('tracer').colorConsole();
const _ = require('lodash');
const createError = require('http-errors');
const uuid = require('shortid');
const jwt = require('jsonwebtoken');
const customer = require('../db/schema/customer').createModel();
const seller = require('../db/schema/seller').createModel();
const operations = require('../db/operations');
const uuidv1 = require('uuid/v1')
const products = require('../db/schema/product').createModel();
const pool = require('../db/sqlConnection');

async function handle_request(request) {
    switch (request.type) {
        case 'UpdateCustomerProfilepic':
            return UpdateCustomerProfilepic(request)
        case 'UpdateCustomerCoverpic':
            return UpdateCustomerCoverpic(request)
        case 'fetchCustomerProfile':
            return fetchCustomerProfile(request)
        case 'upadteCustomerInfo':
            return upadteCustomerInfo(request)
        case 'fetchCustomerRatings':
            return fetchCustomerRatings(request)
        default:
            return { "status": 404, body: { message: 'Invalid Route in Kafka' } }
    }
};

UpdateCustomerProfilepic = async (request) => {
    try {

        id = request.body.id
        const resp = await customer.findOneAndUpdate({ _id: id },
            {
                profileimage: request.imagelocation

            },
            {
                new: true,
            })
        return { "status": 200, body: resp }
    } catch (ex) {
        logger.error(ex);
        const message = ex.message ? ex.message : 'Error while fetching products';
        const code = ex.statusCode ? ex.statusCode : 500;
        return { "status": code, body: { message } }
    }
}
UpdateCustomerCoverpic = async (request) => {
    try {
        id = request.body.id
        const resp = await customer.findOneAndUpdate({ _id: id },
            {
                coverimage: request.imagelocation
            },
            {
                new: true,
            })
      
        return { "status": 200, body: resp }
    } catch (ex) {
        logger.error(ex);
        const message = ex.message ? ex.message : 'Error while fetching products';
        const code = ex.statusCode ? ex.statusCode : 500;
        return { "status": code, body: { message } }
    }
}
fetchCustomerProfile = async (request) => {
    try {
        id = request.params.id
        const resp = await customer.find({ _id: id }, { __v: 0 })
        return { "status": 200, body: resp }
    } catch (ex) {
        logger.error(ex);
        const message = ex.message ? ex.message : 'Error while fetching customer orders';
        const code = ex.statusCode ? ex.statusCode : 500;
        return { "status": code, body: { message } }
    }
}
upadteCustomerInfo = async (request) => {
    try {
        
        const resp = await customer.findOneAndUpdate({ _id: request.body.id },
            {
                name: request.body.name,
                email: request.body.email,
                location: request.body.location,
                phonenumber: request.body.phonenumber,

            },
            {
                new: true,
            }, (err, result) => {
                if (err) {
                    return err
                }
                return result
            })
        return { "status": 200, body: resp }
    } catch (ex) {
        logger.error(ex);
        const message = ex.message ? ex.message : 'Error while fetching customer orders';
        const code = ex.statusCode ? ex.statusCode : 500;
        return { "status": code, body: { message } }
    }
}

fetchCustomerRatings = async (request) => {
    try {
        finalresult1 = []
        const query1 = 'select * from reviews where reviews.customer_id=?';
        let reviewdata = await pool.query(query1, [request.params.id])
        let c1=0,c2=0;
        for (temp of reviewdata) {
            let pid = temp.product_id;
            if(temp.rating!=null)
            {
                c1=c1+1;
            }
            if(temp.review!=null)
            {
                c2=c2+1;
            }
            let productdetails = await products.find({ _id: pid })
            let finalresult = {}
            finalresult = {
                ...temp,
                productname: productdetails?productdetails[0]?productdetails[0].name:"":"",
                productdescription: productdetails? productdetails[0]?productdetails[0].description:"":"",

                productimage: productdetails?productdetails[0]?productdetails[0].images?productdetails.images:"":"":"",

            }
            finalresult1.push(finalresult)
        }
        
    
        return { "status": 200, body: {finalresult1,c1,c2 }}
    } catch (ex) {
        logger.error(ex);
        const message = ex.message ? ex.message : 'Error while fetching customer orders';
        const code = ex.statusCode ? ex.statusCode : 500;
        return { "status": code, body: { message } }
    }
}




exports.handle_request = handle_request;

           