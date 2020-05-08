const logger = require('tracer').colorConsole();
const _ = require('lodash');
const createError = require('http-errors');
const uuid = require('shortid');
const jwt = require('jsonwebtoken');
const customer = require('../db/schema/customer').createModel();
const seller = require('../db/schema/seller').createModel();
const order = require('../db/schema/orders').createModel();
const products = require('../db/schema/product').createModel();
const operations = require('../db/operations');
const uuidv1 = require('uuid/v1')

async function handle_request(request) {
    switch (request.type) {
        case 'topsoldproducts':
            return topsoldproducts(request)
        case 'topsellers':
            return topsellers(request)
        case 'topcustomers':
            return topcustomers(request)
        case 'ordersperday':
            return ordersperday(request)
        case 'topratedproducts':
            return topratedproducts(request)
        case 'topviewedproducts':
            return topviewedproducts(request)
        case 'sellerstatictics':
            return sellerstatictics(request)
        case 'sellermonthlystatictics':
            return sellermonthlystatictics(request)


        default:
            return { "status": 404, body: { message: 'Invalid Route in Kafka' } }
    }
};
topsoldproducts = async (request) => {
    try {

        const resp = await order.aggregate([
            {
                $group: {
                    _id: '$products.product_id',
                    totalquantity: { $sum: { $sum: '$products.quantity' } },
                    count: { $sum: 1 }
                },
            },

            { $sort: { totalquantity: -1 } },

            { $limit: 5 },
        ]);
        let finalresult1 = [];
        for (temp of resp) {
            let pid = temp._id;
            let productdetails = await products.find({ _id: pid })

            let finalresult = {}
            finalresult = {
                productname: productdetails ? productdetails[0] ? productdetails[0].name : "" : "",
                quantity: temp.totalquantity,

            }
            finalresult1.push(finalresult)
        }

        return { "status": 200, body: finalresult1 }
    } catch (ex) {
        logger.error(ex);
        const message = ex.message ? ex.message : 'Error while fetching customer orders';
        const code = ex.statusCode ? ex.statusCode : 500;
        return { "status": code, body: { message } }
    }
}
topratedproducts = async (request) => {
    try {
        const resp = await products.aggregate([
            {
                $group: {
                    "_id": "$_id",
                    name: { "$first": "$name" },

                    rating: { $max: "$cumulative_rating" }
                },
            },
            { $sort: { rating: -1 } },
            { $project: { name: 1, rating: 1 } },
            { $limit: 10 },


        ]);
        let finalresult1 = [];
        for (temp of resp) {
            let finalresult = {}
            finalresult = {

                name: temp.name.slice(0,15),
                rating: temp.rating
            }
            finalresult1.push(finalresult)
        }

    
        return { "status": 200, body:  finalresult1  }
    } catch (ex) {
        logger.error(ex);
        const message = ex.message ? ex.message : 'Error while fetching customer orders';
        const code = ex.statusCode ? ex.statusCode : 500;
        return { "status": code, body: { message } }
    }
}
topviewedproducts = async (request) => {
    try {
        const resp = await products.aggregate([
            {
                $group: {
                    "_id": "$_id",
                    name: { "$first": "$name" },

                    topviews: { $max: "$views" }
                },
            },
            { $sort: { topviews: -1 } },
            { $project: { name: 1, topviews: 1 } },
            { $limit: 10 },


        ]);
        let finalresult1 = [];
        for (temp of resp) {
            let finalresult = {}
            finalresult = {

                name: temp.name.slice(0,15),
                topviews: temp.topviews
            }
            finalresult1.push(finalresult)
        }

        return { "status": 200, body: finalresult1 }
    } catch (ex) {
        logger.error(ex);
        const message = ex.message ? ex.message : 'Error while fetching customer orders';
        const code = ex.statusCode ? ex.statusCode : 500;
        return { "status": code, body: { message } }
    }
}

topsellers = async (request) => {
    try {
        const resp = await order.aggregate([
            { $unwind: '$products' }, {
                $group: {
                    "_id": {
                        "seler_id": "$products.seller_id",
                        "productid": "$products.product_id",
                        totalamt: { $multiply: ['$products.quantity', '$products.price'] },
                        total: { $sum: 'totalamt' }
                    },
                    count: { $sum: 1 }
                },

            },
            {
                $group: {
                    _id: "$_id.seler_id",
                    "totalq": { $sum: "$_id.totalamt" },
                }
            },
            { $sort: { totalq: -1 } }, { $limit: 5 }])
        let finalresult1 = [];
        for (temp of resp) {
            let sid = temp._id;
            let pname = temp.name;
            let productdetails = await seller.find({ _id: sid })
            let finalresult = {}
            finalresult = {

                name: productdetails[0] ? productdetails[0].name : "",
                amount: temp.totalq

            }
            finalresult1.push(finalresult)
        }


        return { "status": 200, body: finalresult1 }
    } catch (ex) {
        logger.error(ex);
        const message = ex.message ? ex.message : 'Error while fetching customer orders';
        const code = ex.statusCode ? ex.statusCode : 500;
        return { "status": code, body: { message } }
    }
}
topcustomers = async (request) => {
    try {
        const resp = await order.aggregate([
            { $unwind: '$products' }, {
                $group: {
                    "_id": {
                        "customer_id": "$customer_id",
                        "productid": "$products.product_id",
                        totalamt: { $multiply: ['$products.quantity', '$products.price'] },
                        total: { $sum: 'totalamt' }
                    },
                    count: { $sum: 1 }
                },
            },
            {
                $group: {
                    _id: "$_id.customer_id",
                    "totalq": { $sum: "$_id.totalamt" },
                }
            },
            { $sort: { totalq: -1 } }, { $limit: 5 }])
        let finalresult1 = [];
        for (temp of resp) {
            let cid = temp._id;
            let productdetails = await customer.find({ _id: cid })
            let finalresult = {}
            finalresult = {

                name: productdetails[0] ? productdetails[0].name: "",
                amount: temp.totalq

            }
            finalresult1.push(finalresult)
        }
        return { "status": 200, body: finalresult1 }

    } catch (ex) {
        logger.error(ex);
        const message = ex.message ? ex.message : 'Error while fetching customer orders';
        const code = ex.statusCode ? ex.statusCode : 500;
        return { "status": code, body: { message } }
    }
}
ordersperday = async (request) => {
    try {
        let orders = await order.aggregate([
            {
                $group: {
                    _id: {
                        day: { $substr: ["$placed_on", 8, 2] }, year: { $substr: ["$placed_on", 0, 4] }, month: { $substr: ["$placed_on", 5, 2] },
                    },
                    count: { $sum: 1 },
                },
            },
            { $sort: { _id: 1 } },
        ]);
        let list = []
        calculateorders = () => {
            let d1 = 0, d2 = 0, d3 = 0, d4 = 0, d5 = 0, d6 = 0, d7 = 0, d8 = 0, d9 = 0, d10 = 0, d11 = 0;
            let d12 = 0, d13 = 0, d14 = 0, d15 = 0, d16 = 0, d17 = 0, d18 = 0, d19 = 0, d20 = 0, d21 = 0;
            let d22 = 0, d23 = 0, d24 = 0, d25 = 0, d26 = 0, d27 = 0, d28 = 0, d29 = 0, d30 = 0, d31 = 0;
            for (temp of orders) {
                if (temp._id.year == request.body.year && temp._id.month == request.body.month) {
                    switch (temp._id.day) {
                        case "01":
                            d1 = d1 + temp.count;
                            break;
                        case "02":
                            d2 = d2 + temp.count;
                            break;
                        case "03":

                            d3 = d3 + temp.count
                            break;
                        case "04":
                            d4 = d4 + temp.count
                            break;
                        case "05":
                            d5 = d5 + temp.count
                            break;
                        case "06":
                            d6 = d6 + temp.count
                            break;
                        case "07":
                            d7 = d7 + temp.count
                            break;

                        case "08":
                            d8 = d8 + temp.count
                            break;
                        case "09":
                            d9 = d9 + temp.count
                            break;
                        case "10":
                            d10 = d10 + temp.count
                            break;
                        case "11":
                            d11 = d11 + temp.count
                            break;
                        case "12":
                            d12 = d12 + temp.count
                            break;
                        case "13":
                            d13 = d13 + temp.count
                            break;
                        case "14":
                            d14 = d14 + temp.count
                            break;
                        case "15":
                            d15 = d15 + temp.count
                            break;
                        case "16":
                            d16 = d16 + temp.count
                            break;
                        case "17":
                            d17 = d17 + temp.count
                            break;
                        case "18":
                            d18 = d18 + temp.count
                            break;
                        case "19":
                            d19 = d19 + temp.count
                            break;
                        case "20":
                            d20 = d20 + temp.count
                            break;
                        case "21":
                            d21 = d21 + temp.count
                            break;
                        case "22":
                            d22 = d22 + temp.count
                            break;
                        case "23":
                            d23 = d23 + temp.count
                            break;
                        case "24":
                            d28 = d28 + temp.count
                            break;
                        case "25":
                            d27 = d27 + temp.count
                            break;
                        case "26":
                            d26 = d26 + temp.count
                            break;
                        case "27":
                            d27 = d27 + temp.count
                            break;
                        case "28":
                            d28 = d28 + temp.count
                            break;
                        case "29":
                            d29 = d29 + temp.count
                            break;
                        case "30":
                            d30 = d30 + temp.count
                            break;
                        case "31":
                            d31 = d31 + temp.count
                            break;
                        default:
                            d1 = 0
                            break;


                    }
                }

            }
            list.push({ day: 1, count: d1 })
            list.push({ day: 2, count: d2 })
            list.push({ day: 3, count: d3 })
            list.push({ day: 4, count: d4 })
            list.push({ day: 5, count: d5 })
            list.push({ day: 6, count: d6 })
            list.push({ day: 7, count: d7 })
            list.push({ day: 8, count: d8 })
            list.push({ day: 9, count: d9 })
            list.push({ day: 10, count: d10 })
            list.push({ day: 11, count: d11 })
            list.push({ day: 12, count: d12 })
            list.push({ day: 13, count: d13 })
            list.push({ day: 14, count: d14 })
            list.push({ day: 15, count: d15 })
            list.push({ day: 16, count: d16 })
            list.push({ day: 17, count: d17 })
            list.push({ day: 18, count: d18 })
            list.push({ day: 19, count: d19 })
            list.push({ day: 20, count: d20 })
            list.push({ day: 21, count: d21 })
            list.push({ day: 22, count: d22 })
            list.push({ day: 23, count: d23 })
            list.push({ day: 24, count: d24 })
            list.push({ day: 25, count: d25 })
            list.push({ day: 26, count: d26 })
            list.push({ day: 27, count: d27 })
            list.push({ day: 28, count: d28 })
            list.push({ day: 29, count: d29 })
            list.push({ day: 30, count: d30 })
            list.push({ day: 31, count: d31 })

            return list;

        }
        list1 = await calculateorders()
        return { "status": 200, body: list1 }
    } catch (ex) {
        logger.error(ex);
        const message = ex.message ? ex.message : 'Error while fetching customer orders';
        const code = ex.statusCode ? ex.statusCode : 500;
        return { "status": code, body: { message } }
    }
}
sellerstatictics = async (request) => {
    try {
    
        let sid = request.params.id
        const resp = await products.find({ seller_id: sid })
        let finalresult1 = [];
        for (temp of resp) {
            let pid = temp._id;
            let pname = temp.name;
            let productdetails = await order.find({ 'products.product_id': pid })
            let finalresult = {}
            finalresult = {
                pname: pname.slice(0,12),
                totalamount: (productdetails[0] ? productdetails[0].products[0].quantity : 0) *
                    (productdetails[0] ? productdetails[0].products[0].price : 0),
               
            }
            finalresult1.push(finalresult)
        }

        return { "status": 200, body: finalresult1 }
    } catch (ex) {
        logger.error(ex);
        const message = ex.message ? ex.message : 'Error while fetching customer orders';
        const code = ex.statusCode ? ex.statusCode : 500;
        return { "status": code, body: { message } }
    }
}
sellermonthlystatictics = async (request) => {

    try {
        let sid = request.params.id;
        let givenyear = request.body.year;
        const resp = await products.find({ seller_id: sid })
        let finalresult1 = [];
        for (temp of resp) {
            let pid = temp._id;
            let pname = temp.name;
            var productdetails = await order.aggregate([
                { $match: { 'products.product_id': pid } },

                { $unwind: '$products' }, {
                    $group: {
                        "_id": {
                            _id: { month: { $substr: ["$placed_on", 0, 4] }, year: { $substr: ["$placed_on", 5, 2] } },

                            "productid": "$products.product_id",
                            totalamt: { $multiply: ['$products.quantity', '$products.price'] },
                            total: { $sum: 'totalamt' },

                        },
                        count: { $sum: 1 }
                    },

                },
                {
                    $group: {
                        "_id": {
                            _id: { y: "$_id._id.year", m: "$_id._id.month" }

                        },
                        "totalq": { $sum: "$_id.totalamt" },
                    }
                },
            ]);
            p = productdetails ? productdetails.length : 1
            for (c = 0; c < p; c++) {
                let finalresult = {}
                finalresult = {
                    name: pname,
                    month: productdetails ? productdetails[c] ? productdetails[c]._id._id.y : "" : "",
                    year: productdetails ? productdetails[c] ? productdetails[c]._id._id.m : "" : "",
                    amount: productdetails ? productdetails[c] ? productdetails[c].totalq : "" : "",
                }
                finalresult1.push(finalresult)
            }
        }
        let m1 = 0, m2 = 0, m3 = 0, m4 = 0, m5 = 0, m6 = 0, m7 = 0, m8 = 0, m9 = 0, m10 = 0, m11 = 0, m12 = 0;
        for (i = 0; i < finalresult1.length; i++) {
            if (finalresult1[i].year == givenyear) {
                if (finalresult1[i].month == 01) {
                    m1 = m1 + finalresult1[i].amount
                }
                else if (finalresult1[i].month == 02) {
                    m2 = m2 + finalresult1[i].amount
                }
                else if (finalresult1[i].month == 03) {
                    m3 = m3 + finalresult1[i].amount
                }
                else if (finalresult1[i].month == 04) {
                    m4 = m4 + finalresult1[i].amount
                }
                else if (finalresult1[i].month == 05) {
                    m5 = m5 + finalresult1[i].amount
                }
                else if (finalresult1[i].month == 06) {
                    m6 = m6 + finalresult1[i].amount
                }
                else if (finalresult1[i].month == 07) {
                    m7 = m7 + finalresult1[i].amount
                }
                else if (finalresult1[i].month == 08) {
                    m8 = m8 + finalresult1[i].amount
                }
                else if (finalresult1[i].month == 09) {
                    m9 = m9 + finalresult1[i].amount
                }
                else if (finalresult1[i].month == 10) {
                    m10 = m10 + finalresult1[i].amount
                }
                else if (finalresult1[i].month == 11) {
                    m11 = m12 + finalresult1[i].amount
                }
                else if (finalresult1[i].month == 12) {
                    m12 = m12 + finalresult1[i].amount
                }
            }
        }
        let list = []
        list.push({ month: "Jan", amount: m1 })
        list.push({ month: "Feb", amount: m2 })
        list.push({ month: "Mar", amount: m3 })
        list.push({ month: "Apr", amount: m4 })
        list.push({ month: "May", amount: m5 })
        list.push({ month: "Jun", amount: m6 })
        list.push({ month: "Jul", amount: m7 })
        list.push({ month: "Aug", amount: m8 })
        list.push({ month: "Sep", amount: m9 })
        list.push({ month: "Oct", amount: m10 })
        list.push({ month: "Nov", amount: m11 })
        list.push({ month: "Dec", amount: m12 })
        return { "status": 200, body: list }
    } catch (ex) {
        logger.error(ex);
        const message = ex.message ? ex.message : 'Error while fetching customer orders';
        const code = ex.statusCode ? ex.statusCode : 500;
        return { "status": code, body: { message } }
    }
}
exports.handle_request = handle_request;



