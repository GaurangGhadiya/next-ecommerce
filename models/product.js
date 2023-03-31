const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {type: String, required: true},
    slug: {type: String, required: true, unique: true},
    desc : {type: String, required: true},
    image : {type: String, required: true},
    category : {type: String, required: true},
    size : {type: String},
    color : {type: String},
    price : {type: Number, required: true},
    availableQty : {type: Number, required: true},

},{timestamps: true});

// module.exports.productModel = mongoose.model('product',productSchema)
const productModel = mongoose.models.product || mongoose.model('product', productSchema );
export default productModel;