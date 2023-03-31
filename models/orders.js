const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    products : [{
        productId: {type: String, required: true},
        quantity: {type: Number, required: true}
    }],
    adddress: {type: String, required: true},
    amount: {type: Number, required: true},
    status: {type: String, required: true}
    
},{timestamps: true});

// module.exports.productModel = mongoose.model('product',productSchema)
const orderModel = mongoose.models.order || mongoose.model('order', orderSchema );
export default orderModel;