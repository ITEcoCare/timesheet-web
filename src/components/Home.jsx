import React, { useEffect } from 'react'
import { Route, Routes, useRoutes, Outlet } from 'react-router-dom'
import Navbar from './Navbar'
// import toast, { Toaster } from 'react-hot-toast';
import { ToastContainer, toast } from 'react-toastify';
import { useStore } from '../store/zustand';
import { Link, Navigate } from 'react-router-dom';



const Home = () => {

  const initialState = useStore((state) => state.initialState);
  
  useEffect(() => {
    if (!initialState._isLoggedIn) {
      <Navigate to="/siginin" />;
      // return (!initialState._isLoggedIn) ? <Navigate to="/signin" /> : <Navigate to="/calendar" />
    }
  }, [])

  const contextClass = {
    success: "bg-blue-600",
    error: "bg-red-600",
    info: "bg-gray-600",
    warning: "bg-orange-400",
    default: "bg-indigo-600",
    dark: "bg-white-600 font-gray-300",
  };

  return (
    <main className=''>
      <div className='flex justify-center'>
        <Navbar></Navbar>
        <ToastContainer />
      </div>
      {/* <p className="font-extrabold text-3xl md:text-4xl mb-1 md:mb-3 ">Home Page Tetap</p> */}
        {/* <Toaster /> */}
      <Outlet />
    </main>
  )
}

export default Home