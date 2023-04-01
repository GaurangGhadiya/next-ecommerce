
import { connectMongoDb } from "@/middleware/mongoose"
import productModel from "@/models/product"
import userModel from "@/models/user";

export default async function handler(req, res) {
    try{
        await connectMongoDb()
         if(req.method == "POST"){
            try{
                var userData = new userModel({
                    name : req.body.name,
                    email : req.body.email,
                    password : req.body.password,
                  });
                 let data = await userData.save()
                 if(data) return res.status(200).json({ message :"Sign Up Successfully" , data: data })
            }catch(err){
               return res.status(400).json({ error :"Something went wrong" , err : err })
            }
    
        }else{
          return  res.status(400).json({ error : "This method is not allowed" })
        }
    }catch(e){
       return res.status(500).json({ error: "Internal server error" })
    }
   
  }
  