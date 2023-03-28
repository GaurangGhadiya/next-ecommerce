import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <>
    <header className="text-white bg-black body-font shadow-md">
  <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <Link href={"/"} className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
      {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
      </svg> */}
      <span className="text-white text-xl">Tailblocks</span>
    </Link>
    <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
      <Link href={"/tshirts"} className="mr-5 hover:text-white">Tshirts</Link>
      <Link href={"/hoodies"} className="mr-5 hover:text-white">Hoodies</Link>
      <Link href={"/stickers"} className="mr-5 hover:text-white">Stickers</Link>
      <Link href={"/mugs"} className="mr-5 hover:text-white">Mugs</Link>
    </nav>
    <button className="inline-flex text-black items-center bg-white border-0 py-1 px-3 focus:outline-none hover:bg-white rounded text-base mt-4 md:mt-0">Cart
      {/* <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
        <path d="M5 12h14M12 5l7 7-7 7"></path>
      </svg> */}
    </button>
  </div>
</header>
    </>
  )
}

export default Navbar