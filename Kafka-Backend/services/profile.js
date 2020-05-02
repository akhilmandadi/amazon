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
const bcrypt = require('bcryptjs')
const saltRounds = 10;

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
        case 'addAddress':
            return addAddress(request)
        case 'getAddresses':
            return getAddresses(request)
        case 'removeAddress':
            return removeAddress(request)
        case 'editAddress':
            return editAddress(request)
        case 'editCard':
            return editCard(request)
        case 'removeCard':
            return removeCard(request)
        case 'addCard':
            return addCard(request)
        case 'getCards':
            return getCards(request)
        default:
            return { "status": 404, body: { message: 'Invalid Route in Kafka' } }
    }
};
async function insertproduct(request) {
    let i = 10000
    try {

        let images1 = ["https://www.att.com/catalog/en/idse/Apple/Apple%20iPhone%2011%20Pro%20Max/Gold-hero-zoom.png",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR-RgRtRRgsNbbpKLgzAwx-m8aHE_PwohnGI-LW6OLeMdSjlzosaQ&usqp=CAc",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQLIRgMZ-RpPcS4rHUtyKaJCkZYrtCDKE9-QRekszq9uHjm--Va9qA&usqp=CAc",
        "https://cdn.vox-cdn.com/thumbor/E8c5U6A_RrsyiwRANmcCLNE2dzc=/0x0:2040x1360/1400x933/filters:focal(860x560:1186x886):no_upscale()/cdn.vox-cdn.com/uploads/chorus_image/image/55855309/akrales_190913_3628_0277.19.jpg"
         ]
        let images2=["https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ5KJtl2WOMELHPzdGgPe_DAy4JNk4zxmOW4aRMpApquk4zMFUF&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRQHySt_dTXIg1z02S4dqturS3eBApVReUV87SukkGibigY5xmr&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ5wgCmsNnu93ipLmT4cfQQd8olYnK82L1PJbOZNPAgu5zLiOhW&usqp=CAU"]

        let images3=[
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRaiV2JDQpHM-zUH8DYodmr-e471G5XlutA38xN0xRHAAJuwc1r&usqp=CAU",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSkEG7cQtuiXRL-8IIrIz-_IVR0_TsQBZSlqWtpTCadXQ9BwDpE&usqp=CAU",
           "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQNYL_FdGXwO55FvK2Vu646BZ2cyCbJ4bDnneFxxwmCyAwlGgXr&usqp=CAU",
        ]
let images4=["https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTRCcf-mKBXbBkUJ8PjHMinCytr0-4PSOeLT_-cxyGoHHlZ2kJk&usqp=CAU",
"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSoNQeys6O11ixkJK14RCodwsNVrd5vndgy-pE6nYVWSnNQW1xJ&usqp=CAU"]

let images5=["https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTd3VIPg7Jg1a0Q1pPP_6WqjRER0tJ5iz6Wn8GK9j3SzBeZRq5e&usqp=CAU","https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRO5rPXqRXZ7dmGhuaHJCei0LqaV8vlqbRJlrxRd27n-8P1Zk0e&usqp=CAU"]
let images6=["https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRTD296teY93s_8GvUABlqYb_OAwJ4ADh3knIeey28iOtcQIacX&usqp=CAU","https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTIxW_VjYBTV-hiHBHISOWgIdWIMiZV04W0XsUjRYwn7sg9HSl_&usqp=CAU"]
let imgarray=[images1,images2,images3,images4,images5,images6]
let rating=[4,3,1,2,5]
//let comments=["Good choice for basic computing needs"," Won't be wrong at this price"," A really good one","waste of money","worst quality"]
let active=["true","false","true","true","true"]
let dp=[10,100,1000]
let price=[1000,10000,100000]
let sellerid=["5ea8c6eacd396b417ad52fc1","5ea8c6ebcd396b417ad52fc2","5ea8c6ebcd396b417ad52fc3","5ea8c6ebcd396b417ad52fc4",
"5ea8c6ebcd396b417ad52fc5","5ea8c6eccd396b417ad52fc6","5ea8c6eccd396b417ad52fc7","5ea8c6eccd396b417ad52fc8","5ea8c6edcd396b417ad52fc9","5ea8c6edcd396b417ad52fca"]
let description=["Aviviho  Flowers Purple Heads with Hydrangea Flowers Artificial for Wedding Home Party Shop Baby Shower Decoration","Bare Home California King Sheet Set - 1800 Ultra-Soft Microfiber Bed Sheets  Deep Pocket","Mini PC, Beelink X45 Intel  J4105 Processor 8GB/256GB SSD Mini Computer,, Mini Computer","SHINE ARMOR Fortify Quick Coat – Ceramic Coating - Car Wax Spray - Waterless Car Wash & Wax  Paint Sealant Protection","Boon Flair Pedestal High Chair - White & Gray"]
    
        let categories=[ "Books","Electronics","Beauty and Personal care","health and hosuehold","sports and outdoor","baby","Pet supplies","Fashionand clothing"]
        
    
        while (i < 10010) {

      
      
           
           
            const newproducts = new products({
                name: "product"+i,
                seller_id:sellerid[i%10],
                price:Math.ceil(Math.random() * price[i%3]),
                category: categories[i%8],
                description: description[i%5],
                discountedPrice:Math.ceil(Math.random() * dp[i%3]),
                discount:Math.ceil(Math.random() * 10),
                views: Math.ceil(Math.random() * 10),
                active: active[i%5],
                cumulative_rating: rating[i%5],
                cumulative_comment:  Math.ceil(Math.random() * 10),
                images:imgarray[i%6]
            });
         

            let result1 = await newproducts.save()
            i = i + 1;

            console.log(i);

        }
        return { "status": 200, body: {} }


    }
    catch (ex) {
        logger.error(ex);
        const message = ex.message ? ex.message : 'Error while signup';
        const code = ex.statusCode ? ex.statusCode : 500;
        return { "status": code, body: { message } }
    }
    
}


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
        let c1 = 0, c2 = 0;
        for (temp of reviewdata) {
            let pid = temp.product_id;
            if (temp.rating != null) {
                c1 = c1 + 1;
            }
            if (temp.review != null) {
                c2 = c2 + 1;
            }
            let productdetails = await products.find({ _id: pid })
            let finalresult = {}
            finalresult = {
                ...temp,
                productname: productdetails ? productdetails[0] ? productdetails[0].name : "" : "",
                productdescription: productdetails ? productdetails[0] ? productdetails[0].description : "" : "",

                productimage: productdetails ? productdetails[0] ? productdetails[0].images ? productdetails.images : "" : "" : "",

            }
            finalresult1.push(finalresult)
        }


        return { "status": 200, body: { finalresult1, c1, c2 } }
    } catch (ex) {
        logger.error(ex);
        const message = ex.message ? ex.message : 'Error while fetching customer orders';
        const code = ex.statusCode ? ex.statusCode : 500;
        return { "status": code, body: { message } }
    }
}

addAddress = async (request) => {
    try {
        let res = await customer.findOneAndUpdate({ _id: request.body.customer_id }, {
            $push: {
                addresses: request.body
            }
        })
        return { "status": 200, body: res[0] }
    } catch (ex) {
        logger.error(ex);
        const message = ex.message ? ex.message : 'Error while adding address of a customer';
        const code = ex.statusCode ? ex.statusCode : 500;
        return { "status": code, body: { message } }
    }
}

editAddress = async (request) => {
    try {
        let res = await customer.findOneAndUpdate({ "addresses._id": request.body._id }, {
            $set: {
                "addresses.$": request.body
            }
        })
        return { "status": 200, body: res[0] }
    } catch (ex) {
        logger.error(ex);
        const message = ex.message ? ex.message : 'Error while updating address of a customer';
        const code = ex.statusCode ? ex.statusCode : 500;
        return { "status": code, body: { message } }
    }
}

getAddresses = async (request) => {
    try {
        let res = await customer.find({ _id: request.params.id }, { addresses: 1 })
        return { "status": 200, body: res[0] }
    } catch (ex) {
        logger.error(ex);
        const message = ex.message ? ex.message : 'Error while fetching addresses of a customer';
        const code = ex.statusCode ? ex.statusCode : 500;
        return { "status": code, body: { message } }
    }
}

removeAddress = async (request) => {
    try {
        let res1 = await customer.update({ _id: request.body.customer_id }, {
            $pull: {
                addresses: { _id: request.body.address_id }
            }
        })
        let res2 = await customer.find({ _id: request.body.customer_id }, { addresses: 1 })
        return { "status": 200, body: res2[0] }
    } catch (ex) {
        logger.error(ex);
        const message = ex.message ? ex.message : 'Error while deleting address of a customer';
        const code = ex.statusCode ? ex.statusCode : 500;
        return { "status": code, body: { message } }
    }
}

addCard = async (request) => {
    try {
        let res1 = await customer.findOneAndUpdate({ _id: request.body.customer_id }, {
            $push: {
                cards: request.body
            }
        })
        let res2 = await customer.find({ _id: request.body.customer_id }, { cards: 1 })
        return { "status": 200, body: res2[0] }
    } catch (ex) {
        logger.error(ex);
        const message = ex.message ? ex.message : 'Error while adding card of a customer';
        const code = ex.statusCode ? ex.statusCode : 500;
        return { "status": code, body: { message } }
    }
}

editCard = async (request) => {
    try {
        let res = await customer.findOneAndUpdate({ "cards._id": request.body._id }, {
            $set: {
                "cards.$": request.body
            }
        })
        return { "status": 200, body: res[0] }
    } catch (ex) {
        logger.error(ex);
        const message = ex.message ? ex.message : 'Error while updating card of a customer';
        const code = ex.statusCode ? ex.statusCode : 500;
        return { "status": code, body: { message } }
    }
}

getCards = async (request) => {
    try {
        let res = await customer.find({ _id: request.params.id }, { cards: 1 })
        return { "status": 200, body: res[0] }
    } catch (ex) {
        logger.error(ex);
        const message = ex.message ? ex.message : 'Error while fetching cards of a customer';
        const code = ex.statusCode ? ex.statusCode : 500;
        return { "status": code, body: { message } }
    }
}

removeCard = async (request) => {
    try {
        let res1 = await customer.update({ _id: request.body.customer_id }, {
            $pull: {
                cards: { _id: request.body.card_id }
            }
        })
        let res2 = await customer.find({ _id: request.body.customer_id }, { cards: 1 })
        return { "status": 200, body: res2[0] }
    } catch (ex) {
        logger.error(ex);
        const message = ex.message ? ex.message : 'Error while deleting card of a customer';
        const code = ex.statusCode ? ex.statusCode : 500;
        return { "status": code, body: { message } }
    }
}

exports.handle_request = handle_request;

