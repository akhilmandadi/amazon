var connection = new require('./kafka/Connection');
const mongoConnection = require('./db/connection');
const logger = require('tracer').colorConsole();
var common = require('./services/common');
<<<<<<< Updated upstream
=======
var orders = require('./services/orders')
var products = require('./services/products');
var profile = require('./services/profile');
var cart = require('./services/cart');
>>>>>>> Stashed changes

async function initializeApplication() {
    await mongoConnection.createConnection();
}
initializeApplication()
    .then((response) => logger.info("Server Running"))
    .catch(error => logger.error(`Error in Initalizing Application  : ${error}`));

async function handleTopicRequest(topic_name, fname) {
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    await consumer.on('message', async function (message) {
        console.log('Message received for Topic: ' + topic_name);
        var data = JSON.parse(message.value);
        let res = await fname.handle_request(data.data)
        var payloads = [
            {
                topic: data.replyTo,
                messages: JSON.stringify({
                    correlationId: data.correlationId,
                    data: res
                }),
                partition: 0
            }
        ];
        await producer.send(payloads, async function (err, data) {console.log(data) });
        return;
    });
}

<<<<<<< Updated upstream
handleTopicRequest("common", common)
=======
handleTopicRequest("common", common)
handleTopicRequest("orders", orders)
handleTopicRequest("products", products)
handleTopicRequest("profile", profile)
handleTopicRequest("cart", cart)

>>>>>>> Stashed changes
