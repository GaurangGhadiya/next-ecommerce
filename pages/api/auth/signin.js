import { connectMongoDb } from "@/middleware/mongoose";
import productModel from "@/models/product";
import userModel from "@/models/user";
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');


export default async function handler(req, res) {
  try {
    await connectMongoDb();
    if (req.method == "POST") {
      try {
        let userData = await userModel.findOne({ email: req.body.email });
        if (userData) {
          var bytes  = CryptoJS.AES.decrypt(userData.password, process.env.AES_SECRET);
var originalText = bytes.toString(CryptoJS.enc.Utf8);
          if (
            req.body.email == userData.email &&
            req.body.password == originalText
          ) {
            var token = jwt.sign({...userData}, process.env.JWT_SECRET);

            return res
              .status(200)
              .json({ message: "Sign in Successfully", token});
          } else {
            return res.status(400).json({ message: "invalid credential" });
          }
        } else {
          return res.status(400).json({ error: "user not found"});
        }
      } catch (err) {
        console.error(err);
        return res
          .status(400)
          .json({ error: "Something went wrong", err: err });
      }
    } else {
      return res.status(400).json({ error: "This method is not allowed" });
    }
  } catch (e) {
    return res.status(500).json({ error: "Internal server error" });
  }
}
