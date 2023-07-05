import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { ToastContainer, toast } from "react-toastify";
import SVGFastWork from "../assets/3d/SVG_FastWorking_Isometric"

import { useStore } from "../store/zustand";

const Intro = () => {
    const count = useStore((state) => state.count);
    const countPlus = useStore((state) => state.countPlus);
    const countMinus = useStore((state) => state.countMinus);
    const countReset = useStore((state) => state.countReset);
    const userInfo = useStore((state) => state.userInfo);
    const initialState = useStore((state) => state.initialState);
    const theme = useStore((state) => state.theme);

    const myUser = JSON.parse(localStorage.getItem("account"));
    // console.log("myUser", myUser);

    useEffect(() => {}, [theme]);

    return (
        <div className="flex flex-col mx-10 mt-[75px] mb-10 h-[88vh] justify-items-center bg-white dark:bg-stone-700 rounded-3xl overflow-x-auto drop-shadow-2xl bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')] dark:bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg')]">
            {/* <Navbar /> */}
            {/* <p className="font-extrabold text-5xl md:text-6xl mb-1 md:mb-3 ">
        Intro iz Hom Content
      </p> */}

            <div className="bg-gradient-to-b from-green-400 to-transparent dark:from-green-900 w-full h-full absolute top-0 left-0 z-0"></div>
            {/* <section className="bg-white dark:bg-stone-900 bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')] dark:bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg')]"> */}
            <div className=" mx-auto max-w-screen-2xl text-center lg:py-16 z-10 relative">
                <a
                    href="#"
                    className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-blue-700 bg-blue-50 rounded-full dark:bg-blue-900 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800"
                >
                    <span
                        className="text-xs bg-green-600 rounded-full text-white px-4 py-1.5 mr-3"
                        onClick={() => {
                            console.log("uawauuw");
                        }}
                    >
                        New
                    </span>{" "}
                    <span className="text-sm font-medium">
                        Jumbotron component was launched! See what's new
                    </span>
                    <svg
                        aria-hidden="true"
                        className="ml-2 w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                </a>

                <div className="flex flex-wrap w-full justify-center items-center">
                    <div className="xl:w-1/2 md:w-1/2 sm:w-full">
                        <SVGFastWork /> 
                    </div>
                    <div className="xl:w-1/2 md:w-1/2 sm:w-full text-left">
                        {!initialState._isLoggedIn ? (
                        <h1 className="mb-4 text-4xl font-extrabold  text-stone-900 md:text-5xl lg:text-6xl dark:text-white">
                            This is Timesheet, <br/> Let's sign in!
                        </h1>
                        ) : (
                            <h1 className="mb-4 font-extrabold tracking-tight leading-none text-stone-900 md:text-5xl lg:text-6xl dark:text-white">
                                Welcome to Timesheet,
                                <br/>
                                <span
                                    className={`${
                                        theme == "light"
                                            ? "text-blue-500"
                                            : "text-gray-50"
                                    }`}
                                >
                                    {` ${
                                        myUser.user_role_name == "ROOT"
                                            ? myUser.user_role_name
                                            : myUser.employee_fullname
                                    }.`}
                                </span>
                            </h1>
                        )}
                        <p className="text-md text-lg font-medium  text-stone-900 md:text-md lg:text-md dark:text-stone-200">
                            Here we share our focus regarding daily tasks and activities. Through group timesheets, we can unlock long-term value commitment and
                            individual growth.
                        </p>
                        
                    </div>
                </div>
                
                
            </div>

            {/* <h1 className="mb-4 text-xl font-bold tracking-tight leading-none text-stone-900 md:text-2xl lg:text-3xl dark:text-white z-30">
                {" "}
                Count: {count}{" "}
            </h1>
            <div className="flex flex-wrap lg:flex-wrap-reverse md:flex-wrap sm:flex-wrap mb-4 z-30 py-8 px-4 mx-auto text-center">
                <div className="w-1/3 h-12 px-2">
                    <button
                        className=" bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 w-20 border-b-4 border-green-700 hover:border-green-500 rounded-xl"
                        onClick={countPlus}
                    >
                        Add{" "}
                    </button>
                </div>
                <div className="w-1/3 h-12 px-2">
                    <button
                        className=" bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 w-20 border-b-4 border-blue-700 hover:border-blue-500 rounded-xl"
                        onClick={countMinus}
                    >
                        Less
                    </button>
                </div>
                <div className="w-1/3 h-12 px-2">
                    <button
                        className=" bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 w-20 border-b-4 border-red-700 hover:border-red-500 rounded-xl"
                        onClick={countReset}
                    >
                        Reset{" "}
                    </button>
                </div>
            </div> */}
            <form className="w-full max-w-md mx-auto">
                <label
                    htmlFor="default-email"
                    className="mb-2 text-sm font-medium text-stone-900 sr-only dark:text-white"
                >
                    Email sign-up
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                            className="w-5 h-5 text-stone-500 dark:text-stone-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                        >
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                        </svg>
                    </div>
                    <input
                        type="email"
                        id="default-email"
                        className="block w-full p-4 pl-10 text-sm text-stone-900 border border-stone-300 rounded-xl bg-white focus:ring-green-500 focus:border-green-500 dark:bg-stone-800 dark:border-stone-700 dark:placeholder-stone-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                        placeholder="Enter your email here..."
                        required
                    />
                    <button
                        type="submit"
                        className="text-white absolute right-2 top-2 bg-green-500 hover:bg-green-400 hover:border-green-500 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 border-b-4 border-b-green-700 dark:bg-green-600 dark:hover:bg-green-500 dark:focus:ring-green-800"
                    >
                        Sign up
                    </button>
                </div>
            </form>

            <div className="flex flex-wrap  mx-auto max-w-screen-xl lg:py-16">
                <div className="w-full mx-2 bg-blue-500 dark:bg-stone-800 border-2 border-blue-700 border-b-4 dark:border-stone-700 rounded-lg md:p-12 mb-8">
                    <h1 className="text-stone-100 dark:text-white text-3xl md:text-5xl font-extrabold mb-2">
                        Kabar Terbaru
                    </h1>
                    <a
                        href="#"
                        className="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md dark:bg-stone-700 dark:text-green-400 mb-2"
                    >
                        <svg
                            className="w-3 h-3 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                            // aria-hidden="true"
                        >
                            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
                        </svg>
                        Link
                    </a>
                    <p className="text-lg font-normal text-stone-50 dark:text-stone-400 mb-6">
                        Static websites are now used to bootstrap lots of
                        websites and are becoming the basis for a variety of
                        tools that even influence both web designers and
                        developers.
                    </p>
                    <a
                        href="#"
                        className="inline-flex justify-center items-center py-2.5 px-5 text-base font-medium text-center text-white rounded-lg bg-green-500 border-b-green-800 border-b-4 hover:bg-green-800 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-900"
                    >
                        Read more
                        <svg
                            aria-hidden="true"
                            className="ml-2 -mr-1 w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </a>
                </div>
                <div className="flex flex-wrap w-full mx-2">
                    <div className="xl:w-1/2 md:w-1/2 sm:w-full">
                        <div className="mr-4 p-4 bg-green-200 border-2 dark:bg-stone-800 border-b-4 border-green-600 dark:border-b-stone-700 rounded-xl ">
                            <a
                                href="#"
                                className="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md dark:bg-stone-700 dark:text-green-400 mb-2"
                            >
                                <svg
                                    className="w-3 h-3 mr-1"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                    // aria-hidden="true"
                                >
                                    <path
                                        clipRule="evenodd"
                                        fillRule="evenodd"
                                        d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z"
                                    ></path>
                                </svg>
                                Design
                            </a>
                            <h2 className="text-stone-900 dark:text-white text-3xl font-extrabold mb-2">
                                Start with Flowbite Design System
                            </h2>
                            <p className="text-lg font-normal text-stone-600 dark:text-stone-400 mb-4">
                                Static websites are now used to bootstrap lots
                                of websites and are becoming the basis for a
                                variety of tools that even influence both web
                                designers and developers.
                            </p>
                            <a
                                href="#"
                                className="text-green-600 dark:text-green-500 hover:underline font-medium text-lg inline-flex items-center"
                            >
                                Read more
                                <svg
                                    aria-hidden="true"
                                    className="w-4 h-4 ml-2"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    // aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    ></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                    <div className="xl:w-1/2 md:w-1/2 sm:w-full ">
                        <div className="ml-4 p-4 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg">
                            <a
                                href="#"
                                className="bg-purple-100 text-purple-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md dark:bg-stone-700 dark:text-purple-400 mb-2"
                            >
                                <svg
                                    className="w-3 h-3 mr-1"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden="true"
                                >
                                    <path
                                        clipRule="evenodd"
                                        fillRule="evenodd"
                                        d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                                    ></path>
                                </svg>
                                Code
                            </a>
                            <h2 className="text-stone-900 dark:text-white text-3xl font-extrabold mb-2">
                                Best react libraries around the web
                            </h2>
                            <p className="text-lg font-normal text-stone-500 dark:text-stone-400 mb-4">
                                Static websites are now used to bootstrap lots
                                of websites and are becoming the basis for a
                                variety of tools that even influence both web
                                designers and developers.
                            </p>
                            <a
                                href="#"
                                className="text-green-600 dark:text-green-500 hover:underline font-medium text-lg inline-flex items-center"
                            >
                                Read more
                                <svg
                                    aria-hidden="true"
                                    className="w-4 h-4 ml-2"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    // aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    ></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* </section> */}

            {/* <section className="bg-white dark:bg-stone-900">
      </section> */}

            {/* <div className='font-extrabold text-2xl md:text-3xl mb-1 md:mb-3 '>Outlet</div>
      <Outlet /> */}
        </div>
    );
};

export default Intro;
