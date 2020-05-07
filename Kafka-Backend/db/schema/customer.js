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
  password: { type: String, required: true } ,
  profileimage: { type: String, required: false },
  coverimage: { type: String, required: false },
  location: { type: String, required: false },
  phonenumber: { type: Number, required: false },
  addresses: [
    {
      name: String,
      line1: String,
      line2: String,
      city: String,
      state: String,
      country: String,
      zipcode: String,
      phone: Number
    }
  ],
  cards: [
    {
      name: String,
      card_number: String,
      expiry: String,
      cvv: Number
    }
  ],
  cart: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
      gift: Boolean,
      message:String,
      quantity: Number
    }
  ],
  saveforlater: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "products" }
    }
  ]
}, { collection: 'customers' });

customerSchema.plugin(uniqueValidator);
const createModel = function () {
  return mongoose.model("customers", customerSchema)
}

module.exports.createModel = createModel;