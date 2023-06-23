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

const now = dayjs().format('YYYY-MM-DD');
const dateFormat = 'DD-MM-YYYY';

const provinceData = ['Zhejiang', 'Jiangsu'];
const cityData = {
  Zhejiang: ['Hangzhou', 'Ningbo', 'Wenzhou'],
  Jiangsu: ['Nanjing', 'Suzhou', 'Zhenjiang'],
};

const TimesheetEventModal = () => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [listPJ, setListPJ] = useState([]);
    const [listTags, setListTags] = useState([]);
    // const [selectedLabel, setSelectedLabel] = useState(labelsClasses[0]);
    const [cities, setCities] = useState(cityData[provinceData[0]]);
    const [secondCity, setSecondCity] = useState(cityData[provinceData[0]][0]);

    const accessToken = localStorage.getItem("accessToken");

    //zustand
    const showEventModal = useStore((state) => state.showEventModal);
    const setShowEventModal = useStore((state) => state.setShowEventModal);
    const daySelected = useStore((state) => state.daySelected);
    // const createProject = useStore((state) => state.createProject);
    const createTimesheet = useStore((state) => state.createTimesheet);
    const getProjectByUser = useStore((state) => state.getProjectByUser);
    const getTags = useStore((state) => state.getTags);

    // console.log("getProjectByUser>>", getProjectByUser)
    

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

    const runProjectByUser = async () => {
        let resP = await getProjectByUser(accessToken);
        let resT = await getTags(accessToken);
        console.log("resT", resT)
        if(resP.success) {
            setListPJ(resP.result)
            setListTags(resT.data.result.data)
        };
    }
    
   
    const createTsByGetProj = async (token, values)=> {
        // console.log("inputted ts >> ", values)
        // let res = await getProjectByUser(token);
        createTimesheet(token, values)
        setShowEventModal(false);
        // if (res.success){
        //     let k = res.result
            // for (let i = 0; i < k.length; i++) {
            //     if (k[i].title == values.project_name) {
            //         createTimesheet(token, k[i].project_id)
            //         setShowEventModal(false);
            //         break;
            //     } 
            // }
        // }
    }

    
 
    const formik = useFormik({
        initialValues: {
            project_id: "",
            tag_id: "",
        },
        onSubmit: (values, actions) => {
            createTimesheet(accessToken, values)
            setShowEventModal(false);
        },
    });

    
    const handleProvinceChange = (value) => {
        setCities(cityData[value]);
        setSecondCity(cityData[value][0]);
    };

    const onSecondCityChange = (value) => {
        setSecondCity(value);
    };

  
    // console.log('watch', watch("example")); // watch input value by passing the name of it

    const labelClass = "flex items-baseline p-2";

    // const handleSubmit =()=> {
    //   console.log('masuk handle subujm')
    // }


    useEffect(() => {
      runProjectByUser()
    }, [showEventModal])
    

    return (
        <>
            <div className="flex flex-col fixed min-h-screen w-full z-20 bg-stone-800 bg-opacity-90 left-0 top-0 justify-center items-center">
                <div className=" bg-gray-100 w-[100vh] lg:w-[80vh] md:w-[60vh] sm:w-[40vh] h-full rounded-xl">
                    <header className="flex flex-wrap lg:flex-wrap-reverse md:flex-wrap sm:flex-wrap mb-4 z-30 py-2 px-4 text-center  bg-gray-200 rounded-t-xl justify-between items-center">
                        <div className="w-full flex justify-end px-2">
                            <button
                                className="flex justify-end align-middle text-white font-bold w-10 rounded-xl"
                                onClick={() => {setShowEventModal(false);}}
                            >
                            <span className=" cursor-pointer text-gray-400"><FaTimes /></span>
                            </button>
                        </div>
                    </header>
                    <form onSubmit={formik.handleSubmit} className="p-6">
                        <div className="m-2 grid grid-cols-1 sm:grid-cols-1">

                            <span className="font-extrabold text-2xl flex ml-4 text-green-500">Create timesheet! </span>

                            <label className={labelClass}>
                                <label className="pb-[14px] bg-blue-500 text-white font-bold py-2 px-4 border-b-4 border-blue-700 rounded-l-xl">
                                    Date
                                </label>
                                <input
                                    type="date"
                                    id="work_date"
                                    placeholder="date..."
                                    defaultValue={now}
                                    onChange={formik.handleChange}
                                    value={formik.values.work_date}
                                    className={
                                        "pt-[13px] w-full fill-white dark:bg-stone-800 hover:bg-white-400  py-2 px-4 border-b-4 dark:border-stone-900 border-gray-200 rounded-r-xl shadow-inner hover:bg-gray-100 "
                                    }
                                />
                                {/* <DatePicker 
                                    id="work_date" 
                                    value={formik.values.work_date} 
                                    defaultValue={dayjs()} 
                                    format={dateFormat} 
                                /> */}
                            </label>
                            <label className={labelClass}>
                                <label className="bg-blue-500 text-white font-bold py-2 px-4 border-b-4 border-blue-700 rounded-l-xl">
                                    Project
                                </label>
                                <select 
                                    id="project_id"
                                    placeholder="Select project..."
                                    onChange={formik.handleChange}
                                    value={formik.values.project_id}
                                    className={ "w-full fill-white dark:bg-stone-800 hover:bg-white-400  py-2 px-4 border-b-4 dark:border-stone-900 border-gray-200 rounded-r-xl shadow-inner hover:bg-gray-100 "}
                                >
                                    <option> Select project...</option>
                                    {
                                        
                                        listPJ.map((val, i) => (
                                            <option value={val.project_id}> {val.title} </option>
                                        ))
                                    }
                                    
                                </select>
                            </label>
                            <label className={labelClass}>
                                <label className="bg-blue-500 text-white font-bold py-2 px-4 border-b-4 border-blue-700 rounded-l-xl">
                                    Activity
                                </label>
                                <select 
                                    id="tag_id"
                                    placeholder="Activity..."
                                    onChange={formik.handleChange}
                                    onSelect={(value, event) => this.handleOnChange(value, event)}
                                    value={formik.values.tag_id}
                                    className={ "w-full fill-white dark:bg-stone-800 hover:bg-white-400  py-2 px-4 border-b-4 dark:border-stone-900 border-gray-200 rounded-r-xl shadow-inner hover:bg-gray-100 "}
                                >
                                    <option> Select activity</option>
                                    { 
                                        listTags.map((val, i) => (
                                            listTags.fk_project_id == listPJ.project_id 
                                            ? <option value={val.tag_id}> {val.tag_id} - {val.tag_name} </option>
                                            : <option value={val.tag_id}> Create an activity first </option>
                                        ))
                                    }
                                    
                                </select>
                                {/* <Select onSelect={(value, event) => this.handleOnChange(value, event)}>

                                        <Option value="1">text 1</Option>
                                        <Option value="2">text 2</Option>
                                </Select> */}
                            </label>
                            <label className={labelClass}>
                                <label className="bg-blue-500 text-white font-bold py-2 px-4 border-b-4 border-blue-700 rounded-l-xl">
                                    Duration
                                </label>
                                <input
                                    type="text"
                                    id="duration"
                                    name="duration"
                                    placeholder="hour(s)"
                                    onChange={formik.handleChange}
                                    value={formik.values.duration}
                                    className={
                                        " w-11/12 fill-white dark:bg-stone-800 hover:bg-white-400  py-2 px-4 border-b-4 dark:border-stone-900 border-gray-200 rounded-r-xl shadow-inner hover:bg-gray-100 "
                                    }
                                />
                            </label>
                            <label className={labelClass}>
                                <label className="bg-blue-500 h-[92px] text-white font-bold py-2 px-4 border-b-4 border-blue-700 rounded-l-xl">
                                    Description
                                </label>
                                <textarea
                                    rows="3"
                                    id="description"
                                    name="description"
                                    placeholder="Description..."
                                    onChange={formik.handleChange}
                                    value={formik.values.description}
                                    className={
                                        " w-11/12 fill-white dark:bg-stone-800 hover:bg-white-400  py-2 px-4 border-b-4 dark:border-stone-900 border-gray-200 rounded-r-xl shadow-inner hover:bg-gray-100 "
                                    } 
                                />
                            </label>
                            
                            <div className="m-3 grid justify-items-end">
                                <button type="submit" className=" font-bold bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-xl text-white border-b-4 border-b-blue-700" >
                                    Save
                                </button>
                            </div>
                        </div>

                    </form>
                    {/* <footer className="flex justify-center border-t p-3 mt-5 text-xs bottom-0">
                        {" "}
                        this is footer
                    </footer> */}
                </div>
            </div>
        </>
    );
};

export default TimesheetEventModal;
