// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { instance } from "@/middleware/mongoose";
import orderModel from "@/models/orders";

export default async function handler(req, res) {
    const options = {
        amount: +req.body.amount * 100,  
        currency: "INR",
      };
      try{
          const order = await instance.orders.create(options);
          var orderData = new orderModel({
            orderId : order?.id,
            email : req.body.email,
            products : JSON.stringify(req.body.products),
            address : req.body.address,
            amount : order?.amount,
          });
         let data = await orderData.save()
        // check cart is tempar 
          // check item is out of stock or not
          console.log('order', order)
          res.status(200).json({ order : order });
      }catch(err){
        console.log("pp",err);
        res.status(400).json({ message : "Server Issue" });
      }
  }
  