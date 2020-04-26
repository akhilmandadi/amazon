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
               productname: productdetails?productdetails[0]?productdetails[0].name:"":"",
                quantity:temp.totalquantity,
               
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
            { $project: {  name:1,rating: 1 } },
            { $limit: 10 },
 

        ]);
        return { "status": 200, body: resp }
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
           { $project: {  name:1,topviews: 1 } },
           { $limit: 10 },


       ]);
       return { "status": 200, body: resp }
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
                         totalamt: { $multiply:  ['$products.quantity', '$products.price'] },
                         total:{$sum: 'totalamt'}
                    },
                    count: { $sum: 1 }
                },
                
            },
            { $group:{
                _id:"$_id.seler_id",
                 "totalq":{$sum: "$_id.totalamt"},
            }
            },
            { $sort: { totalq: -1 } }, { $limit: 5 }])
            let finalresult1 = [];
            for (temp of resp) {
                let sid = temp._id;
                let pname=temp.name;
                let productdetails = await seller.find({_id:sid})
                let finalresult = {}
                 finalresult = {
                   
                     name:productdetails[0]?productdetails[0].name:"",
                     amount:temp.totalq
                    
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
                         totalamt: { $multiply:  ['$products.quantity', '$products.price'] },
                         total:{$sum: 'totalamt'}
                    },
                    count: { $sum: 1 }
                }, 
            },
            { $group:{
                _id:"$_id.customer_id",
                 "totalq":{$sum: "$_id.totalamt"},
            }
            },
            { $sort: { totalq: -1 } }, { $limit: 5 }])
            let finalresult1 = [];
            for (temp of resp) {
                let cid = temp._id;
                let productdetails = await customer.find({_id:cid})
                let finalresult = {}
                 finalresult = {
                   
                     name:productdetails[0]?productdetails[0].name:"",
                     amount:temp.totalq
                    
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
        
        let orders=await order.find({"products.product_id":"5e9f93afcc55d0ce0e5bfb50"});
          
            
      


        return { "status": 200, body:orders }
    } catch (ex) {
        logger.error(ex);
        const message = ex.message ? ex.message : 'Error while fetching customer orders';
        const code = ex.statusCode ? ex.statusCode : 500;
        return { "status": code, body: { message } }
    }
}



sellerstatictics  = async (request) => {
    try {
        let sid=request.params.id
        const resp = await products.find({seller_id:sid})
              let finalresult1 = [];
              for (temp of resp) {
                  let pid = temp._id;
                  let pname=temp.name;
                  let productdetails = await order.find({'products.product_id':pid})
                  let finalresult = {}
                   finalresult = {
                     
                       pname:pname,
                       productquantity:productdetails[0]?productdetails[0].products[0].quantity:0,
                       productprice:productdetails[0]?productdetails[0].products[0].price:0,
                       totalamount:(productdetails[0]?productdetails[0].products[0].quantity:0)*
                       (productdetails[0]?productdetails[0].products[0].price:0),
                      date:productdetails[0]?productdetails[0].placed_on:"",
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
sellermonthlystatictics  = async (request) => {
    try {
        let sid=request.params.id
        const resp = await products.find({seller_id:sid})
              let finalresult1 = [];
              for (temp of resp) {
                  let pid = temp._id;
                  let pname=temp.name;
                  var productdetails = await order.aggregate([
                    { $match : { 'products.product_id': pid } },
                    { $unwind: '$products' }, {
                        $group: {
                            "_id": {
                                 _id: {month:  { $substr : ["$placed_on", 5, 2 ] }}, 
                                 "productid": "$products.product_id",
                                 totalamt: { $multiply:  ['$products.quantity', '$products.price'] },
                                 total:{$sum: 'totalamt'}
                            },
                            count: { $sum: 1 }
                        },
                        
                    },
                    { $group:{
                        _id:"$_id._id.month",
                         "totalq":{$sum: "$_id.totalamt"},
                    }
                    },
                   
                ]);

                  let finalresult = {}
                   finalresult = {
                      name:pname,
                      month:productdetails?productdetails[0]?productdetails[0]._id:"":"",
                      amount:productdetails?productdetails[0]?productdetails[0].totalq:"":"",
                  }
                 
                  finalresult1.push(finalresult)
                }
                let m1=0,m2=0,m3=0,m4=0,m5=0,m6=0,m7=0,m8=0,m9=0,m10=0,m11=0,m12=0;
                for(i=0;i<finalresult1.length;i++)
                {
                    if(finalresult1[i].month==01)
                    {
                        m1=m1+finalresult1[i].amount  
                    }
                    else if(finalresult1[i].month==02)
                    {
                        m2=m2+finalresult1[i].amount
                    }
                    else if(finalresult1[i].month==03)
                    {
                        m3=m3+finalresult1[i].amount
                    }
                    else if(finalresult1[i].month==04)
                    {
                        m4=m4+finalresult1[i].amount
                    }
                    else if(finalresult1[i].month==05)
                    {
                        m5=m5+finalresult1[i].amount
                    }
                    else if(finalresult1[i].month==06)
                    {
                        m6=m6+finalresult1[i].amount
                    }
                    else if(finalresult1[i].month==07)
                    {
                        m7=m7+finalresult1[i].amount
                    }
                    else if(finalresult1[i].month==08)
                    {
                        m8=m8+finalresult1[i].amount
                    }
                    else if(finalresult1[i].month==09)
                    {
                        m9=m9+finalresult1[i].amount
                    }
                    else if(finalresult1[i].month==10)
                    {
                        m10=m10+finalresult1[i].amount
                    }
                    else if(finalresult1[i].month==11)
                    {
                        m11=m12+finalresult1[i].amount
                    }
                    else if(finalresult1[i].month==12)
                    {
                        m12=m12+finalresult1[i].amount
                    }

                }
                let list=[]
                list.push({month:"Jan",amount:m1})
                list.push({month:"Feb",amount:m2})
                list.push({month:"Mar",amount:m3})
                list.push({month:"Apr",amount:m4})
                list.push({month:"May",amount:m5})
                list.push({month:"Jun",amount:m6})
                list.push({month:"Jul",amount:m7})
                list.push({month:"Aug",amount:m8})
                list.push({month:"Sep",amount:m9})
                list.push({month:"Oct",amount:m10})
                list.push({month:"Nov",amount:m11})
                list.push({month:"Dec",amount:m12})
                
                

        return { "status": 200, body:list}
    } catch (ex) {
        logger.error(ex);
        const message = ex.message ? ex.message : 'Error while fetching customer orders';
        const code = ex.statusCode ? ex.statusCode : 500;
        return { "status": code, body: { message } }
    }
}








exports.handle_request = handle_request;



