const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderId: {type: String, required: true},
    email: {type: String, required: true},
    paymentInfo: {type: String, default : ""},
    products : {type: Object, required: true},
    address: {type: String, required: true},
    amount: {type: Number, required: true},
    status: {type: String, default: 'initiated'}
    
},{timestamps: true});

// module.exports.productModel = mongoose.model('product',productSchema)
const orderModel = mongoose.models.order || mongoose.model('order', orderSchema );
export default orderModel;