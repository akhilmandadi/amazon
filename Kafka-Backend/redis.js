const redis = require("redis");
const logger = require('tracer').colorConsole();

const redisClient = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);

redisClient.on("connect", (err) => {
    if (err) {
        logger.error("Error in Connecting to Redis");
    }
    else {
        logger.debug("Connection to Redis Successful");
    }
});

module.exports = redisClient;