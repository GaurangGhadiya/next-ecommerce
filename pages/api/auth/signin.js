import { connectMongoDb } from "@/middleware/mongoose";
import productModel from "@/models/product";
import userModel from "@/models/user";

export default async function handler(req, res) {
  try {
    await connectMongoDb();
    if (req.method == "POST") {
      try {
        let userData = await userModel.findOne({ email: req.body.email });
        if (userData) {
          if (
            req.body.email == userData.email &&
            req.body.password == userData.password
          ) {
            return res
              .status(200)
              .json({ message: "Sign in Successfully"});
          } else {
            return res.status(400).json({ message: "invalid credential" });
          }
        } else {
          return res.status(400).json({ error: "user not found"});
        }
      } catch (err) {
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
