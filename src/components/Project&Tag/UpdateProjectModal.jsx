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

const UpdateProjectModal = ({resVal}) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [selectedLabel, setSelectedLabel] = useState(labelsClasses[0]);

  const accessToken = localStorage.getItem("accessToken");

  //zustand
  const showProjectModal = useStore((state) => state.showProjectModal);
  const setShowProjectModal = useStore((state) => state.setShowProjectModal);
  const createProject = useStore((state) => state.createProject);
  const assignProject = useStore((state) => state.assignProject);
  const updateProject = useStore((state) => state.updateProject);
  const daySelected = useStore((state) => state.daySelected);
  const updModal = useStore((state) => state.updModal);
  const setUpdModal = useStore((state) => state.setUpdModal);

  const formSpanClass = "inline-flex items-center px-3 text-sm rounded-l-lg bg-green-300 dark:bg-stone-800"
  const labelClass = "flex items-baseline p-2";

  const updateSelectedProj = (values) => {
    let updVal = {
        id: resVal.project_id,
        title: values.title,
        description: values.description,
        start_date: values.start_date,
        end_date: values.end_date,
    }
    updateProject(accessToken, updVal);
  }

  const formik = useFormik({
      initialValues: {
        title: resVal.project_title,
        description: resVal.project_description,
        start_date: resVal.start_date,
        end_date: resVal.end_date,
      },
    onSubmit: (values, actions) => {
        alert(JSON.stringify(values, null, 2));
        setUpdModal(false);
        updateSelectedProj(values)
    },
  });

  useEffect(() => {
  }, [
    showProjectModal
  ])

  return (
    <>
      <div className="h-screen w-full z-10 bg-stone-800 bg-opacity-90 fixed left-0 top-0 flex justify-center items-center">
        <form className="bg-white rounded-xl shadow-2xl w-2/4 " onSubmit={formik.handleSubmit}>
          <header className="flex flex-wrap lg:flex-wrap-reverse md:flex-wrap sm:flex-wrap mb-4 z-30 py-2 px-4 text-center  bg-gray-200 rounded-t-xl justify-between items-center">
              <div className="w-full flex justify-end px-2">
                  <button
                      className="flex justify-end align-middle text-white font-bold w-10 rounded-xl"
                      onClick={() => {setUpdModal(false)}}
                  >
                  <span className=" cursor-pointer text-gray-400"><FaTimes /></span>
                  </button>
              </div>
          </header>
          <div className="m-2 p-3">
            <span className="font-bold text-xl flex ml-4 text-green-500">Edit Project</span>
            {/* <div className={labelClass}>
              <label className="bg-blue-500 text-white font-bold py-2 px-4 border-b-4 border-blue-700 rounded-l-xl">Company</label>
              <input
                  type="text"
                  id="company_id"
                  placeholder="company_id"
                  onChange={formik.handleChange}
                  value={formik.values.company_id}
                  className={"w-full fill-white dark:bg-stone-800 hover:bg-white-400 font-bold py-2 px-4 border-b-4 dark:border-stone-900 border-gray-200 rounded-r-xl shadow-inner hover:bg-gray-100 "}
              />
            </div> */}
            <div className={labelClass}>
              <label className="bg-blue-500 text-white font-bold py-2 px-4 border-b-4 border-blue-700 rounded-l-xl">Title</label>
          
              <input
                  type="text"
                  id="title"
                  placeholder="project title ..."
                  onChange={formik.handleChange}
                  value={formik.values.title}
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

            <label className={labelClass}>
                <label className="bg-blue-500 text-white font-bold py-2 px-4 border-b-4 border-blue-700 rounded-l-xl">
                    StartDate
                </label>
                <input
                    type="text"
                    id="start_date"
                    placeholder="start date..."
                    onChange={formik.handleChange}
                    value={formik.values.start_date}
                    className={
                        "w-full fill-white dark:bg-stone-800 hover:bg-white-400 font-bold py-2 px-4 border-b-4 dark:border-stone-900 border-gray-200 rounded-r-xl shadow-inner hover:bg-gray-100 "
                    }
                />
            </label>
            <label className={labelClass}>
                <label className="bg-blue-500 text-white font-bold py-2 px-4 border-b-4 border-blue-700 rounded-l-xl">
                    EndDate
                </label>
                <input
                    type="text"
                    id="end_date"
                    placeholder="end date..."
                    onChange={formik.handleChange}
                    value={formik.values.end_date}
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

export default UpdateProjectModal;
