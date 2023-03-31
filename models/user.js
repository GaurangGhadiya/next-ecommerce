const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true},
    password: {type: String, required: true}
},{timestamps: true});

// module.exports.productModel = mongoose.model('product',productSchema)
const userModel = mongoose.models.user || mongoose.model('user', userSchema );
export default userModel;