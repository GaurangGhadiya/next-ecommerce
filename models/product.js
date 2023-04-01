const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {type: String, required: true},
    slug: {type: String, required: true, unique: true},
    desc : {type: String, required: true},
    image : {type: String, required: true},
    category : {type: String, required: true},
    
    price : {type: Number, required: true},
    variant : [{
        size : {type: String},
        color : {type: String},
        quantity : {type: Number}
    }
    ]

},{timestamps: true});

// module.exports.productModel = mongoose.model('product',productSchema)
const productModel = mongoose.models.product || mongoose.model('product', productSchema );
export default productModel;