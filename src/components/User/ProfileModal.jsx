import React, { Fragment, useEffect, useState } from "react";
import { Form, Formik, useFormik } from "formik";
import {
    FaTag,
    FaPen,
    FaTrash,
    FaCheck,
    FaTimes,
    FaGripHorizontal,
} from "react-icons/fa";
import { useStore } from "../../store/zustand";
import Tempo from "../Tempo";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { Button, Input, Select, DatePicker } from "antd";
import ava from "../../assets/cak_lontong02.jpeg";


function ProfileModal() {
     
    //zustand
    const showProfileModal = useStore((state) => state.showProfileModal);
    const setShowProfileModal = useStore((state) => state.setShowProfileModal);

  return (
    <div className=" mt-2 md:flex-row  flex flex-col fixed min-h-screen w-full z-20 bg-stone-800 bg-opacity-90 left-0 top-0 justify-center items-center">
                <div className=" bg-gray-100 w-[100vh] lg:w-[80vh] md:w-[60vh] sm:w-[40vh] h-full rounded-xl">
                    <header className="flex flex-wrap lg:flex-wrap-reverse md:flex-wrap sm:flex-wrap z-30 py-2 px-4 text-center  bg-gray-200 rounded-t-xl justify-between items-center">
                        <div className="w-full flex justify-end px-2">
                            <button
                                className="flex justify-end align-middle text-white font-bold w-10 rounded-xl"
                                onClick={() => {setShowProfileModal(false);}}
                            >
                            <span className=" cursor-pointer text-gray-400"><FaTimes /></span>
                            </button>
                        </div>
                    </header>

                    <div className="w-full shadow dark:bg-stone-800 rounded-b-xl">
                        <div className="flex justify-end px-4 pt-4">
                            <button id="dropdownButton" data-dropdown-toggle="dropdown" className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" type="button">
                                <span className="sr-only">Open dropdown</span>
                                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path></svg>
                            </button>
                            <div id="dropdown" className="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                                <ul className="py-2" aria-labelledby="dropdownButton">
                                <li>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Edit</a>
                                </li>
                                <li>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Export Data</a>
                                </li>
                                <li>
                                    <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
                                </li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex flex-col items-center pb-10">
                            <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={ava} alt="Bonnie image"/>
                            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Bonnie Green</h5>
                            <span className="text-sm text-gray-500 dark:text-gray-400">Visual Designer</span>
                            <div className="flex mt-4 space-x-3 md:mt-6">
                                <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add friend</a>
                                <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">Message</a>
                            </div>
                        </div>
                    </div>

                    
                </div>
            </div>
  )
}

export default ProfileModal