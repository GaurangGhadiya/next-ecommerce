import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Tshirts = ({products}) => {
  console.log("new products",products)
  // const [products, setProducts] = useState([])

  // useEffect(() => {
  //   axios.get('http://localhost:7000/api/products?category=tshirt').then((res) => {
  //     console.log("res",res)
  //     setProducts(res?.data?.data)
  //   }).catch((error) => {
  //     console.log("error",error)
  //   })
  // }, [])
  
  return (
    <>
     <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
   <section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-wrap -m-4">
      {products?.map(v => {
        return <div key={v?._id} className="lg:w-1/5 md:w-1/2 p-4 w-full ">
        <div className='border-solid border-2 rounded-t-md'>
        <Link href={`product/${v?.slug}`} className="block relative rounded-t overflow-hidden">
           <div style={{ width: "100%", height: "35vh", position: "relative" }}>
           <Image  loading="lazy" layout="fill"
             objectFit="contain" alt="ecommerce" className=" h-[35vh] block m-auto" src={v?.image} />
         </div></Link>
         <div className="m-4 text-center">
           <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">T-Shirts</h3>
           <h2 className="text-gray-900 text-ellipsis line-clamp-1 title-font text-lg font-medium">{v?.title}</h2>
           <p className="mt-1 text-ellipsis line-clamp-2"> {v?.desc}</p>
           <p className="mt-2 font-semibold text-lg text-black">₹{v?.price?.toFixed(2)}</p>
         </div>
        </div>
       </div>
      })}
      
     
    </div>
  </div>
</section>
    </>
  )
}

export async function getServerSideProps() {
 let products = await axios.get('http://localhost:7000/api/products?category=tshirt').then((res) => {
    console.log("res",res)
    return res?.data?.data
  }).catch((error) => {
    console.log("error",error)
  })
  return { props: { products : products} }
}

export default Tshirts