
import { connectMongoDb } from "@/middleware/mongoose"
import productModel from "@/models/product"
import userModel from "@/models/user";
var CryptoJS = require("crypto-js");


export default async function handler(req, res) {
    try{
        await connectMongoDb()
         if(req.method == "POST"){
            try{
              let user = await userModel.findOne({email:req.body.email})
              if(user){
              return res.status(400).json({ error :"user already found" })

              }else{
                var ciphertext = CryptoJS.AES.encrypt(req.body.password, 'secret key 123').toString();

                var userData = new userModel({
                    name : req.body.name,
                    email : req.body.email,
                    password : ciphertext,
                  });
                 let data = await userData.save()
                 console.log('data', data)
                 if(data) return res.status(200).json({ message :"Sign Up Successfully" , data: data })
              }
                 
            }catch(err){
              console.log('err', err)
               return res.status(400).json({ error :err , err : err })
            }
    
        }else{
          return  res.status(400).json({ error : "This method is not allowed" })
        }
    }catch(e){
       return res.status(500).json({ error: "Internal server error" })
    }
   
  }
  