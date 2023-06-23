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

const TimesheetEventModal = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [selectedLabel, setSelectedLabel] = useState(labelsClasses[0]);

  const accessToken = localStorage.getItem("accessToken");


  //zustand
  // const showEventModal = useStore((state) => state.showEventModal);
  // const setShowEventModal = useStore((state) => state.setShowEventModal);
  const showProjectModal = useStore((state) => state.showProjectModal);
  const setShowProjectModal = useStore((state) => state.setShowProjectModal);
  const createProject = useStore((state) => state.createProject);
  const assignProject = useStore((state) => state.assignProject);
  const daySelected = useStore((state) => state.daySelected);

  const formSpanClass = "inline-flex items-center px-3 text-sm rounded-l-lg bg-green-300 dark:bg-stone-800"

  const createAssignProj = async (values)=> {
    let res = await createProject(accessToken, values);
    if (res.success){
      let path = res.result
      let isiVal= {
              company_id: path.fk_company_id,
              createdby_id: path.fk_createdby_id,
              project_id: path.project_id
          }
      assignProject(accessToken, isiVal) 
    }
  }

  const formik = useFormik({
    initialValues: {
        project_name: "Dashboard pestCare",
        tasktitle: "Patching DB X",
        description: "follow up PIC Epicor",
    },
    onSubmit: (values, actions) => {
        // alert(JSON.stringify(values, null, 2));
        setShowProjectModal(false)
        createAssignProj(values)
    },
  });

  const labelClass = "flex items-baseline p-2";


  

  return (
    <>
      <div className="h-screen w-full z-10 bg-stone-800 bg-opacity-90 fixed left-0 top-0 flex justify-center items-center">
        <form className="bg-white rounded-xl shadow-2xl w-2/4 " onSubmit={formik.handleSubmit}>
          <header className="bg-gray-200 rounded-t-xl px-4 py-2 flex justify-between items-center">
            <span className="cursor-pointer text-gray-400">
              <FaGripHorizontal />
            </span>
            {/* {selectedEvent && ( */}
            <button
              className="mr-2"
              onClick={() => {
                setShowProjectModal(false);
                // dispatchCalEvent({ type: "delete", payload: selectedEvent });
              }}
            >
              <span className="text-red-800 cursor-pointer">
                <FaTrash />
              </span>
            </button>
            {/* )} */}
            <button onClick={() => setShowProjectModal(false) }>
              <span className="cursor-pointer text-gray-400">
                <FaTimes />
              </span>
            </button>
          </header>
          <div className=" p-3">
            <span className="font-bold text-xl flex ml-4 text-green-500">Create A Project</span>
            <div className={labelClass}>
              <label className="bg-blue-500 text-white font-bold py-2 px-4 border-b-4 border-blue-700 rounded-l-xl">Name</label>
          
              <input
                  type="text"
                  id="project_name"
                  placeholder="project name ..."
                  onChange={formik.handleChange}
                  value={formik.values.project_name}
                  className={
                      "w-full fill-white dark:bg-stone-800 hover:bg-white-400 font-bold py-2 px-4 border-b-4 dark:border-stone-900 border-gray-200 rounded-r-xl shadow-inner hover:bg-gray-100 "
                  }
              />
            </div>

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
            </div>
           
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

export default TimesheetEventModal;
