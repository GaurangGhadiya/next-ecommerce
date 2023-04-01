import { SuccessToast } from "@/components/common/toast";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Toaster } from 'react-hot-toast';


export default function App({ Component, pageProps }) {
  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  const router = useRouter();

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
    console.log("myCart", myCart);
    let subt =
      Object.keys(myCart)?.length > 0
        ? Object.keys(myCart)?.map((v) => myCart[v].qty * myCart[v].price)?.[0]
        : 0;
    console.log("myCart", subt);
    if (subt > 0) {
      setSubTotal(subt);
    }
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
    SuccessToast("Product add success!");
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

  const buyNow = (itemCode, qty, price, name, size, variant) => {
    let myCart = {
      itemCode: { itemCode, qty: qty, price, name, size, variant },
    };

    setCart(myCart);
    saveCart(myCart);
    router.push("/checkout");
  };

  const clearCart = () => {
    setCart({});
    saveCart({});
  };

  console.log("subTotal", subTotal);
  return (
    <>
      <Navbar
        buyNow={buyNow}
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        subTotal={subTotal}
      />
              <Toaster position="top-center" reverseOrder={false} />

      <Component
        {...pageProps}
        buyNow={buyNow}
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        subTotal={subTotal}
      />
      <Footer />
    </>
  );
}
