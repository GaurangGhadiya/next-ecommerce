import { SuccessToast } from "@/components/common/toast";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Toaster } from 'react-hot-toast';
import LoadingBar from 'react-top-loading-bar'


export default function App({ Component, pageProps }) {
  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  const [user, setUser] = useState("");
  const [reRender, setReRender] = useState(0)
  const [progress, setProgress] = useState(0)
  const [userData, setUserData] = useState({})

  const router = useRouter();

  useEffect(() => {

    router.events.on('routeChangeStart', () => {
      setProgress(40)
    })
    router.events.on('routeChangeComplete', () => {
      setProgress(100)
    })
    try {
      if (localStorage.getItem("userData")) {
        setUserData(JSON.parse(localStorage.getItem("userData")));
      }
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")));
      }
    } catch (e) {
      console.log(e);
    }
    let token = localStorage.getItem("token");
    if(token){
      setUser(token);   
    }
    setReRender(Math.random())
  }, [router.query]);

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
      [itemCode]: { itemCode, qty: qty, price, name, size, variant },
    };

    setCart(myCart);
    saveCart(myCart);
    router.push("/checkout");
  }; 
  const logout = () => {
    localStorage.removeItem("token")
    setUser("")
    setReRender(Math.random())
    router.push("/signin")
  }

  const clearCart = () => {
    setCart({});
    saveCart({});
  };

  console.log("subTotal", subTotal);
  return (
    <>
    <LoadingBar
        color='#f11946'
        progress={progress}
        waitingTime={500}
        onLoaderFinished={() => setProgress(0)}
      />
      <Navbar
      logout={logout}
      reRender={reRender}
      user={user}
      userData={userData}
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
        userData={userData}
        user={user}
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
