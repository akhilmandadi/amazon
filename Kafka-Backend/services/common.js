const logger = require('tracer').colorConsole();
const _ = require('lodash');
const createError = require('http-errors');
const uuid = require('shortid');
const jwt = require('jsonwebtoken');
const customer = require('../db/schema/customer').createModel();
const seller = require('../db/schema/seller').createModel();
const operations = require('../db/operations');
const { secret } = require('../auth/config');
const uuidv1 = require('uuid/v1')
const bcrypt = require('bcryptjs')

async function handle_request(request) {
    switch (request.type) {
        case 'signin':
            return signin(request)
        case 'signup':
            return signup(request)
        default:
            return { "status": 404, body: { message: 'Invalid Route in Kafka' } }
    }
};

signin = async (request) => {
    try {
        const { email, password, persona } = request.body;
        if (persona === "admin") {
            if (email === "admin@amazon.com" && password === "admin") {

                const token = jwt.sign({ email, persona }, secret, {
                    expiresIn: 1008000
                });
                return { "status": 200, body: { "token": "JWT " + token } }
            } else {
                throw createError(401, 'Invalid Credentials');
            }
        }
        const model = (persona === "customer" ? customer : seller)
        const resp = await operations.findDocumentsByQuery(model, { email }, { __v: 0 })

        if (_.isEmpty(resp) || !await bcrypt.compare(password, resp[0]['password'])) {

            throw createError(401, 'Invalid Credentials');
        }
        
        resp[0]['persona'] = persona;
        delete resp[0]['password'];
        const token = jwt.sign(resp[0], secret, {
            expiresIn: 1008000
        });
        
     
        return { "status": 200, body: { "token": "JWT " + token } }
    } catch (ex) {
        logger.error(ex);
        const message = ex.message ? ex.message : 'Error while fetching credentials';
        const code = ex.statusCode ? ex.statusCode : 500;
        return { "status": code, body: { message } }
    }
}

signup = async (request) => {
    try {
        const { persona, email, password, name } = request.body;
        const data = {
            name,
            email,
            password: await bcrypt.hash(password, 10)
        };
        const model = (persona === "customer" ? customer : seller)
        await operations.saveDocuments(model, data, { runValidators: true })
        return { "status": 200, body: { message: 'Signup Successful' } }
    } catch (ex) {
        logger.error(ex);
        const message = ex.message ? ex.message : 'Error while signup';
        const code = ex.statusCode ? ex.statusCode : 500;
        return { "status": code, body: { message } }
    }
}

exports.handle_request = handle_request;
