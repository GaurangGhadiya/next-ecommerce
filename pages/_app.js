import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import "@/styles/globals.css";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")));
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  const saveCart = (myCart) => {
    localStorage.setItem("cart", JSON.stringify(myCart));
    let subt = Object.keys(myCart)?.length > 0 ? Object.keys(myCart)?.reduce(v => myCart[v].qty * myCart[v].price) : 0
    setSubTotal(subt)
  };

  const addToCart = (itemCode, qty, price, name, size, variant) => {
    let myCart = cart;
    if (itemCode in myCart) {
      myCart[itemCode].qty = cart[itemCode]?.qty + qty;
    } else {
      myCart[itemCode] = { itemCode, qty: 1, price, name, size, variant };
    }
    setCart(myCart);
    saveCart(myCart);
  };
  const removeFromCart = (itemCode, qty, price, name, size, variant) => {
    let myCart = cart;
    if (itemCode in myCart) {
      myCart[itemCode].qty = cart[itemCode]?.qty - qty;
    }
    if (myCart[itemCode].qty <= 0) {
      delete myCart[itemCode];
    }
    setCart(myCart);
    saveCart(myCart);
  };

  const clearCart = () => {
    setCart({});
    saveCart({});
  };
  return (
    <>
      <Navbar cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal}/>
      <Component {...pageProps} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal}/>
      <Footer />
    </>
  );
}
