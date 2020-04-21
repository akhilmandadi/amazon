const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const sellerSchema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    auto: true
  },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String, required: false },
  image: { type: String, required: false }
}, { collection: 'sellers' });

sellerSchema.plugin(uniqueValidator);
const createModel = function () {
  return mongoose.model("sellers", sellerSchema)
}

module.exports.createModel = createModel;