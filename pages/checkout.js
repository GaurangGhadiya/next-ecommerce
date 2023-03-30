import Link from "next/link";
import React from "react";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";

const Checkout = ({cart, addToCart, removeFromCart,subTotal,clearCart}) => {
  return (
    <div className="container  mx-auto">
      <h1 className=" font-semibold text-center my-7 text-2xl">Checkout</h1>
      <h2 className="font-semibold my-2">1. Delivery Details</h2>
      <div className="flex mx-auto">
        <div className="px-2 w-1/2">
          <div class=" mb-4">
            <label for="name" class="leading-7 text-sm text-gray-600">
              Name
            </label>
            <input
              type="name"
              id="name"
              name="name"
              class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div class=" mb-4">
            <label for="email" class="leading-7 text-sm text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>
      <div className="flex mx-auto">

        <div className="px-2 w-full">
        <div class="mb-4">
        <label for="address" class="leading-7 text-sm text-gray-600">Address</label>
        <textarea id="address" name="address" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
      </div>
        </div>
</div>
      <div className="flex mx-auto">
        <div className="px-2 w-1/2">
          <div class=" mb-4">
            <label for="phone" class="leading-7 text-sm text-gray-600">
              Phone
            </label>
            <input
              type="phone"
              id="phone"
              name="phone"
              class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div class=" mb-4">
            <label for="state" class="leading-7 text-sm text-gray-600">
              State
            </label>
            <input
              type="state"
              id="state"
              name="state"
              class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>
      <div className="flex mx-auto">
        <div className="px-2 w-1/2">
          <div class=" mb-4">
            <label for="city" class="leading-7 text-sm text-gray-600">
              City
            </label>
            <input
              type="city"
              id="city"
              name="city"
              class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div class=" mb-4">
            <label for="pincode" class="leading-7 text-sm text-gray-600">
              Pincode
            </label>
            <input
              type="pincode"
              id="pincode"
              name="pincode"
              class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>

      <h2 className="font-semibold my-2">2. Review Cart Items & Pay</h2>
      <div className="bg-white  shadow-md p-6  ">
         
          <div className="my-7">
            <ul className="list-decimal">{
              Object.keys(cart)?.length == 0 && <div className="font-semibold text-center tex-black">Opps!, Your Cart is empty</div>
            }
              {Object.keys(cart)?.length > 0 && Object.keys(cart)?.map((v,i) => {
                return <li className="my-3 flex items-center justify-between tex-black" key={v}>
                <div className="flex ">
                  <div>{i+1}.</div>
                  <div className="mx-2 tex-black">{cart[v]?.name} </div>
                </div>
                <div className="flex items-center justify-between">
                  <AiOutlinePlusCircle onClick={() => addToCart(cart[v]?.itemCode, 1,cart[v]?.price,cart[v]?.name,cart[v]?.size,cart[v]?.variant )} className="cursor-pointer" />
                  <span className="mx-2">{cart[v]?.qty}</span>
                  <AiOutlineMinusCircle onClick={() => removeFromCart(cart[v]?.itemCode, 1,cart[v]?.price,cart[v]?.name,cart[v]?.size,cart[v]?.variant )} className="cursor-pointer" />
                </div>
              </li>
              })}
            </ul>
          </div>
          <div className="font-bold">Subtotal : ₹{subTotal}</div>
          <div className="flex align-middle">
            <Link href="/checkout" className="flex mx-auto mt-6  text-white bg-black border-0 py-2 px-6 focus:outline-none hover:bg-black rounded text-lg shadow-md text-sm">
              Pay ₹{subTotal}
            </Link>
           
          </div>
        </div>
    </div>
  );
};

export default Checkout;
