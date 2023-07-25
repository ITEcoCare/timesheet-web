import "regenerator-runtime/runtime";
import React, { useEffect, useState } from "react";
import TimesheetEventModal from "../Project&Tag/TimesheetEventModalcopy";
import UpdateProjectModal from "../Project&Tag/UpdateProjectModal";
import { PlusCircleTwoTone, MinusCircleTwoTone } from "@ant-design/icons";
import Tag from "../Project&Tag/Tag";
import { useStore } from "../../store/zustand";
import { Table, Form } from "antd";
import SVGsettings from "../../assets/3d/SVG_Settings"

import dayjs from "dayjs";
import {
    FaTimes,
    FaTrash,
    FaGripHorizontal,
    FaRegClock,
    FaTag,
    FaPen,
    FaRegFlag,
    FaSeedling,
    FaCheck,
    FaBeer,
    FaAngleRight,
} from "react-icons/fa";
import { Formik, useFormik } from "formik";

const myUser = JSON.parse(localStorage.getItem("account"));

const labelsClasses = ["green", "blue", "red", "yellow", "purple"];
const clsinpt = "w-full fill-white dark:bg-stone-800 hover:bg-white-400 py-2 px-4 border-1 border-b-4 dark:border-stone-900 border-gray-400 rounded-r-xl shadow-inner hover:bg-gray-100 "

export const ActionButton = () => {
    return (
        <>
            <a x-data="{ tooltip: 'Delete' }" href="#">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6"
                    x-tooltip="tooltip"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                </svg>
            </a>
            <a x-data="{ tooltip: 'Edite' }" href="#">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6"
                    x-tooltip="tooltip"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                    />
                </svg>
            </a>
        </>
    );
};

function Settings({ columns, data }) {
    //zustand
    const showEventModal = useStore((state) => state.showEventModal);
    const setShowEventModal = useStore((state) => state.setShowEventModal);
    const showProjectModal = useStore((state) => state.showProjectModal);
    const setShowProjectModal = useStore((state) => state.setShowProjectModal);
    const showTagModal = useStore((state) => state.showTagModal);
    const setShowTagModal = useStore((state) => state.setShowTagModal);
    const updModal = useStore((state) => state.updModal);
    const setUpdModal = useStore((state) => state.setUpdModal);
    const getTimesheet = useStore((state) => state.getTimesheet);
    const getProject = useStore((state) => state.getProject);
    const getProjectByUser = useStore((state) => state.getProjectByUser);
    const userUpdate = useStore((state) => state.userUpdate);
    const userInfo = useStore((state) => state.userInfo);
    const createAWeek = useStore((state) => state.createAWeek);
    const flagDelete = useStore((state) => state.flagDelete);
    const currTimesheet = useStore((state) => state.currTimesheet);

    const [dataSource, setDataSource] = useState([]);
    const [dataPJ, setDataPJ] = useState([]);
    const [editingRow, setEditingRow] = useState(null);
    const [getActivites, setGetActivities] = useState(null);
    const [resVal, setResVal] = useState({});
    const [usrInfo, setUsrInfo] = useState({});

    const [form] = Form.useForm();

    const accessToken = localStorage.getItem("accessToken");

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [selectedLabel, setSelectedLabel] = useState(labelsClasses[0]);

    const createProject = useStore((state) => state.createProject);
    const assignProject = useStore((state) => state.assignProject);
    const daySelected = useStore((state) => state.daySelected);

    const formSpanClass =
        "inline-flex items-center px-3 text-sm rounded-l-lg bg-green-300 dark:bg-stone-800";

    const createAssignProj = async (values) => {
        let res = await createProject(accessToken, values);

        if (res.success) {
            console.log("val createAssignProj >>", values);
            console.log("res createProject >>", res);
            let path = res.result;
            let isiVal = {
                company_id: path.fk_company_id,
                createdby_id: path.fk_createdby_id,
                project_id: path.project_id,
            };
            assignProject(accessToken, res);
        }
    };

    const formik = useFormik({
        initialValues: {
            id: myUser.user_id || null,
            email: myUser.user_email,
    
        },
        onSubmit: (values, actions) => {
            // alert(JSON.stringify(values, null, 2));
            userUpdate(accessToken, values)
        },
    });

    const labelClass = "flex items-baseline py-2";
    const clslabel = "bg-green-500 text-white text-sm font-bold py-2 px-4 border-1 border-b-4 border-green-700 rounded-l-xl";
    const clsInput = "w-full fill-white text-sm dark:bg-stone-800 hover:bg-white-400 py-2 px-4 border-1 border-b-4 dark:border-stone-900 border-gray-400 rounded-r-xl shadow-inner hover:bg-gray-100 "

    const runUserUpd = async () => {
        // let resP = await userUpdate(accessToken, val);
        // if (resP.data.success) {
        //     const dataPJ = [];
        //     let p = resP.data.result;
          
        //     setDataPJ(dataPJ);
        // }
    };

    const showUpdModal = async (token, record) => {
        setResVal(record);
        setUpdModal(true);
    };

    useEffect(() => {
        if (userInfo) { setUsrInfo(userInfo) 
        } else { alert("No User ID detected") }
    }, [showProjectModal, flagDelete, updModal, showTagModal]);
    

    return (
        <div className="  flex flex-col p-10 mx-10 mt-20 mb-10 h-[88vh] justify-items-center bg-gradient-to-t from-green-300 to-transparent dark:from-blue-900 rounded-3xl overflow-x-auto drop-shadow-2xl">
            <span className="text-3xl font-extrabold flex mb-4 border-b-1 py-2 border-stone-200">
                Settings
            </span>
            <div className=" h-screen flex flex-wrap w-full justify-center items-center">
                <div className=" xl:w-1/2 md:w-1/2 sm:w-full text-left">
                    <form className=" mx-auto " onSubmit={formik.handleSubmit}>
                        <div className=" ">
                            <span className="font-bold text-xl flex text-blue-500">
                                Change Password
                            </span>
                            <div className={labelClass}>
                                <label className={clslabel}>Email</label>
                                <input
                                    required
                                    type="text"
                                    id="email"
                                    placeholder="email ..."
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                    className={clsInput}
                                />
                            </div>
                            <div></div>
                            <label className={labelClass}>
                                <label className={clslabel}>Password</label>
                                <input
                                    required
                                    type="password"
                                    id="password"
                                    placeholder="password..."
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
                                    className={clsInput}
                                />
                            </label>

                            <div className="flex items-start mb-6">
                                <div className="flex items-center h-5">
                                    <input
                                        id="terms"
                                        type="checkbox"
                                        value=""
                                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                                        required
                                    />
                                </div>
                                <label htmlFor="terms" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                    I confirm the change of password
                                </label>
                            </div>
                        </div>
                        <footer className="flex justify-end p-3 mt-5">
                            <button type="submit" className="text-sm font-bold bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-xl text-white border-b-4 border-b-blue-700">
                                Save
                            </button>
                        </footer>
                    </form>
                    <form className=" mx-auto " >
                        <div className=" ">
                            <span className="font-bold text-xl ml-2 flex text-blue-500">
                                Other Menu
                            </span>
                            <div className={labelClass}>
                                <label className={clslabel}>
                                    judul
                                </label>

                                <input
                                    disabled
                                    type="text"
                                    id="judul"
                                    placeholder="project judul ..."
                                    className={clsInput}
                                />
                            </div>

                            <label className={labelClass}>
                                <label className={clslabel}>
                                    isi
                                </label>
                                <input
                                    disabled
                                    type="text"
                                    id="isi"
                                    placeholder="isi..."
                                    className={clsInput}
                                />
                            </label>
                            <label className={labelClass}>
                                <label className={clslabel}>
                                    isi
                                </label>
                                <input
                                    disabled
                                    type="text"
                                    id="isi"
                                    placeholder="isi..."
                                    className={clsInput}
                                />
                            </label>
                            <label className={labelClass}>
                                <label className={clslabel}>
                                    isi
                                </label>
                                <input
                                    disabled
                                    type="text"
                                    id="isi"
                                    placeholder="isi..."
                                    className={clsInput}
                                />
                            </label>
                            <label className={labelClass}>
                                <label className={clslabel}>
                                    isi
                                </label>
                                <input
                                    disabled
                                    type="text"
                                    id="isi"
                                    placeholder="isi..."
                                    className={clsInput}
                                />
                            </label>
                            <label className={labelClass}>
                                <label className={clslabel}>
                                    isi
                                </label>
                                <input
                                    disabled
                                    type="text"
                                    id="isi"
                                    placeholder="isi..."
                                    className={clsInput}
                                />
                            </label>
                        </div>
                        <footer className="flex justify-end p-3 mt-5">
                            <button
                                type="submit"
                                className="text-sm font-bold bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-xl text-white border-b-4 border-b-blue-700"
                            >
                                Save
                            </button>
                        </footer>
                    </form>
                </div>
                <div className=" xl:w-1/2 md:w-1/2 sm:w-full"><SVGsettings /></div>
                
            </div>
        </div>
    );
}

export default Settings;
