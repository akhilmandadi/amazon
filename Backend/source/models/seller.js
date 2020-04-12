const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const { Schema } = mongoose;

const sellerSchema = new Schema({
  

  seller_name: {
    type: String,
    required: true,
  
  },
  seller_mail: {
    type: String,
    required: true,
    unique: true,

  },
  password: {
    type: String,
    required: true,
  },
  
  
  

});


sellerSchema.plugin(uniqueValidator);
module.exports = mongoose.model('seller', sellerSchema);
