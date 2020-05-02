
const logger = require('tracer').colorConsole();
const product = require('../db/schema/product').createModel();
const seller = require("../db/schema/seller").createModel();
const operations = require('../db/operations');

async function handle_request(request) {
    switch (request.type) {
        case 'addProduct':
            return addProduct(request)
        case 'getOrderDetails':
            return getOrderDetails(request)
        case 'fetchProducts':
            return fetchProducts(request)
        case "updateSellerProfile":
            return updateAddress(request)
        case "updateProfilePic":
            return updateSellerProfilePic(request);
        case "getProfile":
            return getSellerProfile(request);
        default:
            return { "status": 404, body: { message: 'Invalid Route in Kafka' } }
    }
};


async function getSellerProfile(request){
    try{
        const resp = await operations.findDocumentsByQuery(seller, {_id : request.params.id}, { _id: 1, name: 1, address: 1, image: 1 })
        console.log(resp)
        return { "status": 200, body: resp }
    }
    catch (ex) {
        logger.error(ex);
        const message = ex.message ? ex.message : 'Error while fetching customer orders';
        const code = ex.statusCode ? ex.statusCode : 500;
        return { "status": code, body: { message } }
    }
}

async function updateAddress(request) {
    try{
        let resp = await operations.updateField(seller, { "_id": request.body.id }, { $set: {address : request.body.address ,name : request.body.name } })
        return { "status": 200, body: resp }
 
    }
    catch (ex) {
        logger.error(ex);
        const message = ex.message ? ex.message : 'Error while fetching customer orders';
        const code = ex.statusCode ? ex.statusCode : 500;
        return { "status": code, body: { message } }
    }

}
async function updateSellerProfilePic(request) {
    try{
        let resp = await operations.updateField(seller, { "_id": request.body.id }, { $set: {image : request.body.image} })
        return { "status": 200, body: resp }
    }
    catch (ex) {
        logger.error(ex);
        const message = ex.message ? ex.message : 'Error while fetching customer orders';
        const code = ex.statusCode ? ex.statusCode : 500;
        return { "status": code, body: { message } }
    }
}
async function addProduct(request) {
    try {
        console.log(addProduct)
        console.log(request.body);
        if (request.body.id) {
            return editProduct(request);
        }
        else {
            let prodData = {
                name: request.body.name,
                seller_id: request.body.seller_id,
                price: request.body.price,
                category: request.body.category,
                description: request.body.description,
                discountedPrice: (request.body.price * (100 - request.body.discount) / 100),
                discount: request.body.discount,
                active: true,
                images: request.body.images
            }
            let resp = await operations.saveDocuments(product, prodData, { runValidators: true });
            return { "status": 200, body: resp }
        }
        
    } catch (ex) {
        logger.error(ex);
        const message = ex.message ? ex.message : 'Error while fetching customer orders';
        const code = ex.statusCode ? ex.statusCode : 500;
        return { "status": code, body: { message } }
    }
}

async function editProduct(request) {
    try {
        let edittedProduct = {
            name: request.body.name,
            seller_id: request.body.seller_id,
            price: request.body.price,
            category: request.body.category,
            description: request.body.description,
            discountedPrice: (request.body.price * (100 - request.body.discount) / 100),
            discount: request.body.discount,
            active: request.body.active,
            images: request.body.images
        }
        let resp = await operations.updateField(product, { "_id": request.body.id }, { $set: edittedProduct })
        return { "status": 200, body: resp }
    }
    catch (ex) {
        logger.error(ex);
        const message = ex.message ? ex.message : 'Error while fetching customer orders';
        const code = ex.statusCode ? ex.statusCode : 500;
        return { "status": code, body: { message } }
    }
}

fetchProducts = async (request) => {
    try {
        console.log(request.params.id)
        const { searchText, filterCategory, displayResultsOffset } = request.query;
        console.log("222")
        console.log(searchText);
        if (searchText === "" && filterCategory === "") {
            query = { seller_id: request.params.id, active: true }
        } else {
            query = {
                $or: [{ 'name': { $regex: searchText, $options: 'i' }, 'active': true , seller_id: request.params.id,},
                       ]
            };
        }
        const resp = await operations.findDocumentsByQueryOffset(product, query, {  }, { skip: Number(displayResultsOffset) - 1, limit: 50 })
        const count = await operations.countDocumentsByQuery(product, query)

        let result = {
            products : resp ,
            count : count
        }
        // const resp = await operations.findDocumentsByQueryOffset(product, query, { _id: 1, name: 1, price: 1, description: 1, discount: 1, cumulative_rating: 1, images: 1, category: 1 }, { skip: Number(displayResultsOffset), limit: 50 })
        console.log(resp)
        return { "status": 200, body: result }
    } catch (ex) {
        logger.error(ex);
        const message = ex.message ? ex.message : 'Error while fetching products';
        const code = ex.statusCode ? ex.statusCode : 500;
        return { "status": code, body: { message } }
    }
}

exports.handle_request = handle_request;