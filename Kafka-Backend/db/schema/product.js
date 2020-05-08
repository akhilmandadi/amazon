const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true
    },
    name: { type: String, required: true },
    seller_id: { type: mongoose.Schema.Types.ObjectId, ref: "sellers" },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    description: { type: String, required: false },
    discountedPrice : { type: Number, required: false },
    discount: { type: Number, required: false },
    views: { type: Number, required: false },
    active: { type: Boolean, required: false },
    cumulative_rating: { type: Number, required: true, default: 0 },
    cumulative_comment: { type: Number, required: false },
    images: { type: Array, required: true }
}, { _id: false }, { collection: 'products' });

const createModel = function () {
    return mongoose.model("products", productSchema)
}

module.exports.createModel = createModel;