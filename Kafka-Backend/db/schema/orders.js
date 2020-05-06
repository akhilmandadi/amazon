const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ordersSchema = new Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
    customer_id: { type: mongoose.Schema.Types.ObjectId, ref: "customers" },
    products: [{
        product_id: {type: mongoose.Schema.Types.ObjectId, ref: "products" },
        quantity: Number,
        price: Number,
        gift: Boolean,
        message:String,
        seller_id: { type: mongoose.Schema.Types.ObjectId, ref: "sellers" },
        tracking: [{
            status: String,
            updated_at: Date,
            location: String
        }],
        currentStatus: {
            type: String,
            required: true,
            enum: ["Ordered", "Packing", 'Out For Shipping', "Package Arrived", "Out For Delivery", "Delivered", "Cancelled"]
        }
    }],
    address: {
        name: String,
        line1: String,
        line2: String,
        city: String,
        state: String,
        country: String,
        zipcode: Number,
        phone: Number
    },
    payment: {
        name: String,
        card_number: String,
        expiry: String,
        cvv: Number
    },
    total: Number,
    placed_on: { type: Date, required: true },
}, {
    collection: 'orders'
});

const createModel = function () {
    return mongoose.model("orders", ordersSchema)
}

module.exports.createModel = createModel;