import { ErrorToast, SuccessToast } from '@/components/common/toast'
import Head from 'next/head'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

const Signin = ({user}) => {
  const [data, setData] = useState({})
  const router = useRouter()
  useEffect(() => {
    if(localStorage.getItem('token')) router.push("/")
  }, [])
  

  const handleChange = (e) => {
    const {name , value} = e.target;
    setData({...data, [name] : value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${process.env.NEXT_PUBLIC_API_URL}api/auth/signin`, data).then(res => {
      console.log('res', res)
      SuccessToast("Login Sucessfull")
      localStorage.setItem('token',res?.data?.token)
      localStorage.setItem('userData',JSON.stringify(res?.data?.data))
      router.push("/")
    }).catch(e => {
      console.log('e', e)
      ErrorToast(e?.response?.data?.error)
    })
  }
  return (
    <>
     <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div class="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
  <div class="w-full max-w-md space-y-8">
    <div>
      <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
      <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Or
        <Link href="/signup" class="font-medium ml-2 text-indigo-600 hover:text-indigo-500">Signup</Link>
      </p>
    </div>
    <form class="mt-8 space-y-6" onSubmit={handleSubmit}>
      <input type="hidden" name="remember" value="true" />
      <div class="-space-y-px rounded-md shadow-sm">
        <div>
          <label for="email" class="sr-only">Email address</label>
          <input value={data?.email} onChange={handleChange} id="email" name="email" type="email" autocomplete="email" required class="pl-2 relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Email address" />
        </div>
        <div>
          <label for="password" class="sr-only">Password</label>
          <input value={data?.password} onChange={handleChange} id="password" name="password" type="password" autocomplete="current-password" required class="pl-2 relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Password" />
        </div>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
          <label for="remember-me" class="ml-2 block text-sm text-gray-900">Remember me</label>
        </div>

        <div class="text-sm">
          <Link href="/forgot-password" class="font-medium text-indigo-600 hover:text-indigo-500">Forgot your password?</Link>
        </div>
      </div>

      <div>
        <button type="submit" class="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" >
          <span class="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clip-rule="evenodd" />
            </svg>
          </span>
          Sign in
        </button>
      </div>
    </form>
  </div>
</div>
    </>
  )
}

export default Signin