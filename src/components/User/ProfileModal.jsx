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
import { Button, Input, Select, DatePicker, Collapse } from "antd";
import ava from "../../assets/cak_lontong02.jpeg";

const myUser = JSON.parse(localStorage.getItem("account"));
// console.log(" myUser.module_access",  myUser.module_access)

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;


// export const items = [
//     {
//       key: '1',
//       label: 'This is panel header 1',
//       children: <p>{text}</p>,
//     },
//     {
//       key: '2',
//       label: 'This is panel header 2',
//       children: <p>{text}</p>,
//     },
//     {
//       key: '3',
//       label: 'This is panel header 3',
//       children: <p>{text}</p>,
//     },
// ];


function ProfileModal() {
     
    //zustand
    const showProfileModal = useStore((state) => state.showProfileModal);
    const setShowProfileModal = useStore((state) => state.setShowProfileModal);
    const userInfo = useStore((state) => state.userInfo);

    const [items, setItems] = useState(null)    
    const [usrInfo, setUsrInfo] = useState(myUser)    
    
    const getUserInfo =(ui) => {    
        console.log("ui >>> ", ui)
       
        if (ui) {
    
            let arrObj = []
            let obj = {}
            for (let i = 0; i < ui.module_access.length; i++) {
                obj = {
                    key: i,
                    label: ui.module_access[i].module_app_name,
                    children: <div className="flex flex-wrap">
                        {
                            ui.module_access[i].permission.map((key, j)=> (
                                <div className=" m-0.5 w-fit bg-green-100 text-green-800 text-xs border-green-600 border-1 font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                                {key}</div>
                            ))
                        }
                    </div>
                }
                arrObj.push(obj)
                setItems(arrObj)
            }
            
        } else {
            alert("userINfo tidak dtiermukan")
        }

    }
    
    useEffect(()=>{
        console.log("myUser >>> ", myUser)
        if (myUser.user_id) { 
            alert("User ID detected")
            getUserInfo(myUser)
            
        } else { alert("No User ID detected") }
    }, [])

    const onChangeAccordion = (key) => {
        // console.log(key);
    };


  return (
    <div className=" md:flex-row  flex flex-col fixed min-h-screen w-full z-20 bg-stone-800 bg-opacity-90 left-0 top-0 justify-center items-center">
                <div className=" bg-gray-100 w-[100vh] lg:w-[80vh] md:w-[60vh] sm:w-[40vh] rounded-xl">
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

                    <div className="w-full h-[600px] overflow-y-auto shadow dark:bg-stone-800 rounded-b-xl">
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
                        <div className="flex flex-col text-left items-center pb-10">
                            <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={ava} alt="Bonnie image"/>
                            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{usrInfo.employee_fullname}</h5>
                            <span className="text-sm text-gray-500 dark:text-gray-400">{usrInfo.employee_job_title_name}</span>

                            <div className="flex flex-wrap w-fit">
                                <div className="m-4 col-start-1">
                                    <dl className="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                                        <div className="flex flex-col pb-3">
                                            <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Company</dt>
                                            <dd className="text-base font-semibold">{usrInfo.employee_company_code}</dd>
                                        </div>
                                        <div className="flex flex-col py-3">
                                            <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Branch</dt>
                                            <dd className="text-base font-semibold">{usrInfo.employee_branch_name} ({usrInfo.employee_branch})</dd>
                                        </div>
                                        <div className="flex flex-col pt-3">
                                            <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Department</dt>
                                            <dd className="text-base font-semibold">{usrInfo.employee_department_code}</dd>
                                        </div>
                                        <div className="flex flex-col pt-3">
                                            <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">User Email</dt>
                                            <dd className="text-base font-semibold">{usrInfo.user_email}</dd>
                                        </div>
                                    </dl>

                                </div>
                                <div className="m-4 col-span-1">
                                    <dl className="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                                        <div className="flex flex-col pb-3">
                                            <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Sex</dt>
                                            <dd className="text-base font-semibold">{usrInfo.employee_gender}</dd>
                                        </div>
                                        <div className="flex flex-col pt-3">
                                            <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">NIK</dt>
                                            <dd className="text-base font-semibold">{usrInfo.employee_nik}</dd>
                                        </div>
                                        <div className="flex flex-col py-3">
                                            <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Contract</dt>
                                            <dd className="text-base font-semibold">{usrInfo.employee_job_type_code} - {usrInfo.employee_job_type_name}</dd>
                                        </div>
                                        <div className="flex flex-col pt-3">
                                            <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Join Date</dt>
                                            <dd className="text-base font-semibold">{usrInfo.employee_join_date}</dd>
                                        </div>
                                    </dl>
                                </div>
                                <div className="m-4 col-span-1">
                                    <dl className="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                                        <div className="flex flex-col pb-3">
                                            <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">User Role</dt>
                                            <dd className="text-base font-semibold">{usrInfo.user_role_display_name} - {usrInfo.user_role_name}</dd>
                                        </div>
                                        <div className="flex flex-col pt-3">
                                            <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Last Login</dt>
                                            <dd className="text-base font-semibold">{usrInfo.user_last_login_at}</dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>

                            <div className="flex w-full flex-wrap text-left items-center px-9">
                                <div className=" w-full col-span-start m-3">
                                        <div className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Module Access</div>
                                    <Collapse items={items} onChange={onChangeAccordion()} />
                                </div>
                            </div>

                            <div className="flex mt-4 space-x-3 md:mt-6">
                                <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-extrabold text-center text-white bg-blue-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 border-blue-700 border-b-4 ">Change Password</a>
                                <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">Go to settings</a>
                            </div>
                        </div>
                        

                    </div>

                    
                </div>
            </div>
  )
}

export default ProfileModal