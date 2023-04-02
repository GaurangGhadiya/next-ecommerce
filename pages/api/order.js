
import { connectMongoDb } from "@/middleware/mongoose"
import orderModel from "@/models/orders";
import productModel from "@/models/product"
import jwt from 'jsonwebtoken'

export default async function handler(req, res) {
    try{
        await connectMongoDb()
        if(req.method == "GET"){
            try{
                let data;
                if(req?.query?.id){
                    data = await orderModel.findOne({orderId: req.query?.id})
                }else  if(req.query?.email){
                    let order = await orderModel.find({email : req.query?.email})
                   if(order) return res.status(200).json({data : order, message : "get successfull" })
                }else{

                     data = await orderModel.find({})
                }
                if(data) res.status(200).json({ data, count: data?.length})
            }catch(err){
                console.log('err', err)
               return res.status(400).json({ error : "Something went wrong" })
            }

        }
        else{
          return  res.status(400).json({ error : "This method is not allowed" })
        }
    }catch(e){
       return res.status(500).json({ error: "Internal server error" })
    }
   
  }
  