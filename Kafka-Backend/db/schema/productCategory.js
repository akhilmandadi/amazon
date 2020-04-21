const mongoose = require("mongoose");

const { Schema } = mongoose;

const ProductCategorySchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true
    },
    name: {
        type: String,
        required: true,
    },
});

const createModel = function () {
    return mongoose.model("productcategories", ProductCategorySchema)
}

module.exports.createModel = createModel;