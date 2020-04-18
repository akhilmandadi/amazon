const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ordersSchema = new Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
    customer_id: String,
    products: [{
        product_id: String,
        quantity: Number,
        seller_id: String
    }],
    address_id: String,
    payment_id: String,
    tracking: [{
        status: String,
        updated_at: Date
    }]
}, {
    collection: 'order'
});

module.exports = mongoose.model('order', ordersSchema);