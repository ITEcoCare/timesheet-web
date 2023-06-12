import React, { Fragment } from "react";
import { useState } from "react";
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
import dayjs from "dayjs";

import { useForm } from "react-hook-form";

// import { Button, Form, Input, Select } from "antd";

const TimesheetEventModal = () => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    // const [selectedLabel, setSelectedLabel] = useState(labelsClasses[0]);

    //zustand
    const showEventModal = useStore((state) => state.showEventModal);
    const setShowEventModal = useStore((state) => state.setShowEventModal);
    const daySelected = useStore((state) => state.daySelected);

    const formSpanClass =
        "inline-flex items-center px-3 text-sm rounded-l-lg bg-green-300 dark:bg-stone-800";

    // const [form] = Form.useForm();
    // const onFinish = (values) => {
    //   console.log(values);
    // };
    // const onReset = () => {
    //   form.resetFields();
    // };

    // const {
    //   register,
    //   handleSubmit,
    //   watch,
    //   formState: { errors },
    // } = useForm();
    // const onSubmit = (data) => {
    //   alert("masuk nih")
    //   console.log('data==>', data);
    // }

    const formik = useFormik({
        initialValues: {
            tasktitle: "Patching DB X",
            description: "follow up PIC Epicor",
        },
        onSubmit: (values, actions) => {
            // alert(values)
            console.log("values ==>", values); // watch input value by passing the name of it
            // post(values);
        },
    });

    // console.log('watch', watch("example")); // watch input value by passing the name of it

    const labelClass = "flex items-baseline p-2";

    // const handleSubmit =()=> {
    //   console.log('masuk handle subujm')
    // }

    return (
        <>
            <div className="min-h-screen w-full z-10 bg-stone-800 bg-opacity-90 fixed left-0 top-0 flex justify-center items-center">
                <div className=" bg-gray-100 w-[80vh] lg:w-[60vh] md:w-[40vh] sm:w-[30vh] h-[40vw] rounded-xl">
                    <header className="bg-gray-200 rounded-t-xl px-4 py-2 flex justify-between items-center">
                        <span className="cursor-pointer text-gray-400">
                            <FaGripHorizontal />
                        </span>
                        <button
                            className="mr-2"
                            onClick={() => {
                                  setShowEventModal(false);
                                  // dispatchCalEvent({ type: "delete", payload: selectedEvent });
                              }
                            }
                        >
                            <span className="text-red-800 cursor-pointer">
                                <FaTrash />
                            </span>
                        </button>
                        <button 
                            onClick={() => {
                                setShowEventModal(false);
                            }}>
                            <span className="cursor-pointer text-gray-400">
                                <FaTimes />
                            </span>
                        </button>
                    </header>
                    <form
                        id="formLogin"
                        onSubmit={formik.handleSubmit}
                    >
                        <div className="m-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <label className={labelClass}>
                                <label className="bg-blue-500 text-white font-bold py-2 px-4 border-b-4 border-blue-700 rounded-l-xl">
                                    Task
                                </label>
                                <input
                                    type="text"
                                    id="tasktitle"
                                    name="tasktitle"
                                    placeholder="tasktitle..."
                                    onChange={formik.handleChange}
                                    value={formik.values.tasktitle}
                                    className={
                                        " w-full fill-white dark:bg-stone-800 hover:bg-white-400 font-bold py-2 px-4 border-b-4 dark:border-stone-900 border-gray-200 rounded-r-xl shadow-inner hover:bg-gray-100 "
                                    }
                                />
                            </label>

                            <label className={labelClass}>
                                <label className="bg-blue-500 text-white font-bold py-2 px-4 border-b-4 border-blue-700 rounded-l-xl">
                                    Description
                                </label>
                                <input
                                    type="text"
                                    id="description"
                                    placeholder="description..."
                                    onChange={formik.handleChange}
                                    value={formik.values.description}
                                    className={
                                        "w-full fill-white dark:bg-stone-800 hover:bg-white-400 font-bold py-2 px-4 border-b-4 dark:border-stone-900 border-gray-200 rounded-r-xl shadow-inner hover:bg-gray-100 "
                                    }
                                />
                            </label>
                        </div>

                        <div className="m-3 grid justify-items-end">
                            <button
                                type="submit"
                                className=" font-bold bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-xl text-white border-b-4 border-b-blue-700"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                    {/* <footer className="flex justify-center border-t p-3 mt-5 text-xs bottom-0"> this is footer</footer> */}
                </div>
            </div>
        </>
    );
};

export default TimesheetEventModal;
