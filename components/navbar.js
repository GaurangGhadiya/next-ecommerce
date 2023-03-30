import Link from "next/link";
import React, { useState } from "react";
import {
  AiOutlineCloseCircle,
  AiOutlinePlusCircle,
  AiOutlineMinusCircle,
} from "react-icons/ai";

const Navbar = ({ cart, addToCart, removeFromCart, clearCart, subTotal }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCartOpen = () => {
    setIsCartOpen(!isCartOpen);
  };
  return (
    <>
      <header className=" bg-black body-font shadow-md sticky top-0 z-20">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <Link
            href={"/"}
            className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
          >
            <span className="text-white text-xl">Tailblocks</span>
          </Link>
          <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
            <Link href={"/tshirts"} className="mr-5 hover:text-white text-white">
              Tshirts
            </Link>
            <Link href={"/hoodies"} className="mr-5 hover:text-white text-white">
              Hoodies
            </Link>
            <Link href={"/stickers"} className="mr-5 hover:text-white text-white">
              Stickers
            </Link>
            <Link href={"/mugs"} className="mr-5 hover:text-white text-white">
              Mugs
            </Link>
          </nav>
          <button
            onClick={handleCartOpen}
            className="inline-flex mr-2 text-black items-center bg-white border-0 py-1 px-3 focus:outline-none hover:bg-white rounded text-base mt-4 md:mt-0"
          >
            Cart
          </button>
          <Link
            href="/signin"
            className="inline-flex text-black items-center bg-white border-0 py-1 px-3 focus:outline-none hover:bg-white rounded text-base mt-4 md:mt-0"
          >
            Signin
          </Link>
        </div>
      {isCartOpen && (
        <div className="bg-white w-80 shadow-md h-[100vh] p-6 absolute top-0 right-0 z-50 ">
          <div
            onClick={handleCartOpen}
            className="absolute top-2 right-2 cursor-pointer tex-black"
          >
            <AiOutlineCloseCircle size={22} />
          </div>
          <h1 className="my-5 text-center text-xl font-bold tex-black">Shopping Cart</h1>
          <hr />
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
              Checkout
            </Link>
            <button
              className="flex mx-auto mt-6 text-white bg-black border-0 py-2 px-6 focus:outline-none hover:bg-black rounded text-lg shadow-md text-sm"
              onClick={clearCart}
            >
              Clear All
            </button>
          </div>
        </div>
      )}
      </header>
    </>
  );
};

export default Navbar;
