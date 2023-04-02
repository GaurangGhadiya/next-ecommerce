// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import orderModel from "@/models/orders";
import crypto from "crypto";

export default async function handler(req, res) {
  console.log(req.body);
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
console.log('razorpay_order_id', razorpay_order_id)
  try {
    let body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.PAYMENT_API_SECRET)
      .update(body.toString())
      .digest("hex");
    if (expectedSignature === razorpay_signature) {
      await orderModel.findOneAndUpdate({orderId : razorpay_order_id}, {status : 'paid', paymentInfo : JSON.stringify(req.body)})

      res.redirect(`${process.env.NEXT_PUBLIC_API_URL}api/order?orderId=${razorpay_order_id}`);
    } else {
      await orderModel.findOneAndUpdate({orderId : razorpay_order_id}, {status : 'pending'})

      res.status(400).json({ message: "verification error" });
    }
  } catch (err) {
    console.log("pp", err);

    res.status(400).json({ message: "Server Issue" });
  }
}
