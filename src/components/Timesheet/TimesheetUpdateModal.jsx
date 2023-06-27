import React, { useState, useEffect } from "react";
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
} from "react-icons/fa";
import { useStore } from "../../store/zustand";
import dayjs from "dayjs";
import { Form, Formik, useFormik } from "formik";


const labelsClasses = ["green", "blue", "red", "yellow", "purple"];

const TimesheetUpdateModal = ({resVal}) => {

  const [listPJ, setListPJ] = useState([]);
  const [listTags, setListTags] = useState([]);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [selectedLabel, setSelectedLabel] = useState(labelsClasses[0]);

  const accessToken = localStorage.getItem("accessToken");

  //zustand
  const showProjectModal = useStore((state) => state.showProjectModal);
  const getProjectByUser = useStore((state) => state.getProjectByUser);
  const getTags = useStore((state) => state.getTags);
  
  const updateTimesheet = useStore((state) => state.updateTimesheet);
  const daySelected = useStore((state) => state.daySelected);
  const updTSModal = useStore((state) => state.updTSModal);
  const setUpdTSModal = useStore((state) => state.setUpdTSModal);

  const formSpanClass = "inline-flex items-center px-3 text-sm rounded-l-lg bg-green-300 dark:bg-stone-800"
  const labelClass = "flex items-baseline p-2";

  const runProjectByUser = async () => {
      let resP = await getProjectByUser(accessToken);
      let resT = await getTags(accessToken);
      if(resP.success) {
          setListPJ(resP.result)
          setListTags(resT.data.result.data)
      };
  }

  const formik = useFormik({
      initialValues: {
        project_id: resVal.project_id,
        tag_id: resVal.tag_id,
        duration: resVal.timesheet_duration,
        work_date: resVal.timesheet_work_date,
        description: resVal.timesheet_description
      },
    onSubmit: (values, actions) => {
        setUpdTSModal(false);
        updateSelectedTS(values)
    },
  });

  const updateSelectedTS = (values) => {
    let updVal = {
        timesheet_id: resVal.timesheet_id,
        work_date: values.work_date,
        project_id: values.project_id,
        tag_id: values.tag_id,
        duration: values.duration,
        description: values.description,
    }
    updateTimesheet(accessToken, updVal);
    setUpdTSModal(false);
  }

  useEffect(() => {
    runProjectByUser()
  }, [
    showProjectModal,
    updTSModal,
  ])

  return (
    <>
      <div className=" h-screen w-full z-50 bg-stone-800 bg-opacity-90 fixed left-0 top-0 flex justify-center items-center">
        <form className="bg-white rounded-xl shadow-2xl w-2/4 " onSubmit={formik.handleSubmit}>
          <header className="flex flex-wrap bg-gray-200 rounded-t-xl py-4 px-4 items-center">
            <div className="w-full flex justify-end ">
              <button className="flex justify-end align-middle" onClick={() => setUpdTSModal(false) }>
                <span className="cursor-pointer col-span-end text-gray-400">
                  <FaTimes />
                </span>
              </button>
            </div>
          </header>
          <div className=" p-3">
            <span className="font-bold text-xl flex ml-4 text-green-500">Edit Timesheet!</span>
    
            <label className={labelClass}>
                <label className="pb-[13px] bg-blue-500 text-white font-bold py-2 px-4 border-b-4 border-blue-700 rounded-l-xl">
                    Date
                </label>
                <input
                    type="date"
                    id="work_date"
                    name="work_date"
                    placeholder="date..."
                    onChange={formik.handleChange}
                    value={formik.values.work_date}
                    className={
                        "pt-[13px] w-full fill-white dark:bg-stone-800 hover:bg-white-400  py-2 px-4 border-b-4 dark:border-stone-900 border-gray-200 rounded-r-xl shadow-inner hover:bg-gray-100 "
                    }
                />
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
           
            {/* <div className="flex items-start mb-6">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                  required
                />
              </div>
              <label
                htmlFor="terms"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                I agree with the{" "}
                <a
                  href="#"
                  className="text-blue-600 hover:underline dark:text-blue-500"
                >
                  terms and conditions
                </a>
              </label>
            </div> */}
           
          </div>
          <footer className="flex justify-end border-t p-3 mt-5">
            <button
              type="submit"
              className=" font-bold bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-xl text-white border-b-4 border-b-blue-700"
            >
              Save
            </button>
          </footer>
        </form>
      </div>
    </>
  );
};

export default TimesheetUpdateModal;
