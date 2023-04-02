import mongoose from "mongoose";
import Razorpay from "razorpay";

export const connectMongoDb = async() => {
    console.log('first')
    if(mongoose.connection.readyState == 1){
        console.log("Connect ==1")
        return mongoose.connection.asPromise();
    }
    console.log('first')

    await mongoose.connect(process.env.MONGO_URI)
}

export const instance = new Razorpay({
    key_id: process.env.PAYMENT_API_KEY,
    key_secret: process.env.PAYMENT_API_SECRET,
  });