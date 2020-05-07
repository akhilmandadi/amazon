const logger = require('tracer').colorConsole();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const createConnection = async function () {
  const options = {
    autoIndex: false,
    poolSize: 10,
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    family: 4,
    useNewUrlParser: true,
    useUnifiedTopology: true
  };

  if (!process.env.MONGO_CONN_URL) {
    logger.error("MongoDB environment variables not set");
    throw "Error While connecting to MongoDB"
  }
  const mongo_url = process.env.MONGO_CONN_URL
  console.log(mongo_url)
  await mongoose.connect(mongo_url, options)
    .then(() => {
      logger.debug('Connected to MongoDB')
      console.log(process.env.MONGO_CONN_URL)
    })
    .catch((err) => {
      logger.error('Failed to connect to MongoDB');
      logger.error(err);
    });
}

const closeConnection = async function () {
  mongoose.connection.close();
}

module.exports.createConnection = createConnection;
module.exports.closeConnection = closeConnection;
