const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    auto: true
  },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { collection: 'customers' });

customerSchema.plugin(uniqueValidator);
const createModel = function () {
  return mongoose.model("customers", customerSchema)
}

module.exports.createModel = createModel;