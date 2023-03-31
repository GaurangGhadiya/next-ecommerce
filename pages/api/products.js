
import { connectMongoDb } from "@/middleware/mongoose"
import productModel from "@/models/product"

export default async function handler(req, res) {
    try{
        await connectMongoDb()
        if(req.method == "GET"){
            try{
                let data;
                if(req?.query?.category){
                    data = await productModel.find({category: req.query?.category})
                }else{

                     data = await productModel.find({})
                }
                if(data) res.status(200).json({ data, count: data?.length})
            }catch(err){
               return res.status(400).json({ error : "Something went wrong" })
            }

        }else if(req.method == "POST"){
            console.log("req.body.variant",req.body.variant)
            try{
                var productData = new productModel({
                    title : req.body.title,
                    slug : req.body.slug,
                    desc : req.body.desc,
                    image : req.body.image,
                    category : req.body.category,
                    variant : req.body.variant,
                    price : req.body.price,
                  });
                 let data = await productData.save()
                 if(data) return res.status(200).json({ message :"Product sucessfully added" , data: data })
            }catch(err){
               return res.status(400).json({ error :"Something went wrong" , err : err })
            }
    
        }else if(req.method == "PUT"){
            try{
                let data = await productModel.findByIdAndUpdate({_id : req.query.id}, req.body)
                if(data){
                    return res.status(200).json({ message :"Product sucessfully Updated" })
                }else{
                    return res.status(404).json({ error :"Product not found"  })
                }
            }catch(err){
               return res.status(400).json({ error : "Something went wrong" })
            }
    
        }else if(req.method == "DELETE"){
            try{
                let data = await productModel.findByIdAndDelete({_id : req.query.id})
                if(data){
                    return res.status(200).json({ message :"Product sucessfully deleted" })
                }else{
                    return res.status(404).json({ error :"Product not found"  })
                }
               
            }catch(err){
                console.log("err",err)
               return res.status(400).json({ error : err })
            }
    
        }else{
          return  res.status(400).json({ error : "This method is not allowed" })
        }
    }catch(e){
       return res.status(500).json({ error: "Internal server error" })
    }
   
  }
  