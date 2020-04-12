const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const { Schema } = mongoose;

const customerSchema = new Schema({
  

  customer_name: {
    type: String,
    required: true,
  },
  customer_mail: {
    type: String,
    required: true,
    unique: true,
  
  },
  password: {
    type: String,
    required: true,
  },
  
  
  

});


customerSchema.plugin(uniqueValidator);
module.exports = mongoose.model('customer', customerSchema);
