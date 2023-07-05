import React, { useState, useEffect } from "react";
import { FaTimes, } from "react-icons/fa";
import { useStore } from "../../store/zustand";
import dayjs from "dayjs";
import { Form, Formik, useFormik } from "formik";
const labelsClasses = ["green", "blue", "red", "yellow", "purple"];

function CreateTag() {
        const [listPJ, setListPJ] = useState([]);

        const accessToken = localStorage.getItem("accessToken");
        const labelClass = "flex items-baseline p-2";
      
        //zustand
        const showTagModal = useStore((state) => state.showTagModal);
        const setShowTagModal = useStore((state) => state.setShowTagModal);
        const getProjectByUser = useStore((state) => state.getProjectByUser);
        const createTag = useStore((state) => state.createTag);

      
        const createAssignProj = async (values)=> {
        //   let res = await createProject(accessToken, values);
          
            if (res.success){
                console.log("val createAssignProj >>", values)
                console.log("res createProject >>", res)
                let path = res.result
                let isiVal= {
                        company_id: path.fk_company_id,
                        createdby_id: path.fk_createdby_id,
                        project_id: path.project_id
                    }
                // assignProject(accessToken, res) 
            }
        }

        const runProjectByUser = async () => {
            let resP = await getProjectByUser(accessToken);
            // let resT = await getTags(accessToken);
            setListPJ([])
            if(resP.success) {
              setListPJ(resP.result)
            };
        }

        const formik = useFormik({
            initialValues: {
                company_id: 2, // hard code
                project_id: 18,
                name: "Implementasi Third Party",
            },
          onSubmit: (values, actions) => {
              // alert(JSON.stringify(values, null, 2));
              console.log("-->",values)
              setShowTagModal(false);
              createTag(accessToken, values)
            //   createAssignProj(values)
          },
        });

        const handleChangeProject = async (e)=> {
          // let params= {
          //     "project_id": e.target.value
          // }
          // setListTags([]);
          // const res = await postData(params)
          // if(res.success){
          //     setListTags(res.result);
          // }
          console.log("e.target.value >>", e.target.value)
        }
      
        useEffect(() => {
            runProjectByUser()
        
        }, [
          showTagModal
        ])
        
      
        return (
          <>
            <div className="h-screen w-full z-20 bg-stone-800 bg-opacity-90 fixed left-0 top-0 flex justify-center items-center">
              <form className="bg-white rounded-xl shadow-2xl w-2/4 " onSubmit={formik.handleSubmit}>
                <header className="flex flex-wrap lg:flex-wrap-reverse md:flex-wrap sm:flex-wrap mb-4 z-30 py-2 px-4 text-center  bg-gray-200 rounded-t-xl justify-between items-center">
                    <div className="w-full flex justify-end px-2">
                        <button
                            className="flex justify-end align-middle text-white font-bold w-10 rounded-xl"
                            onClick={() => {setShowTagModal(false)}}
                        >
                        <span className=" cursor-pointer text-gray-400"><FaTimes /></span>
                        </button>
                    </div>
                </header>
                <div className=" p-3">
                  <span className="font-extrabold text-xl flex ml-4 text-green-500">Create Activity</span>
                  <div className={labelClass}>
                    <label className="bg-blue-500 text-white font-bold py-2 px-4 border-b-4 border-blue-700 rounded-l-xl">
                        Company</label>
                
                    <select 
                        id="company_id"
                        name="company_id"
                        placeholder="Select company..."
                        onChange={formik.handleChange}
                        value={formik.values.company_id}
                        className={ "w-full fill-white dark:bg-stone-800 hover:bg-white-400 font-medium py-2 px-4 border-b-4 dark:border-stone-900 border-gray-200 rounded-r-xl shadow-inner hover:bg-gray-100 "}
                    >
                        <option value={2}>EcoCare</option>
                        <option value={3} disabled>Tukang Bersih Indonesia</option>
                        <option value={4} disabled>PestCare</option>
                    </select>
                  </div>
      
                  <label className={labelClass}>
                      <label className="bg-blue-500 text-white font-bold py-2 px-4 border-b-4 border-blue-700 rounded-l-xl">
                          Project
                      </label>
                       <select 
                            id="project_id"
                            name="project_id"
                            placeholder="Select project..."
                            onChange={(e) => {
                                formik.setFieldValue("project_id", project_id)
                                formik.handleChange(e)
                                handleChangeProject(e)
                            }}
                            value={formik.values.project_id}
                            className={ "w-full fill-white dark:bg-stone-800 hover:bg-white-400 font-medium py-2 px-4 border-b-4 dark:border-stone-900 border-gray-200 rounded-r-xl shadow-inner hover:bg-gray-100 "}
                        >
                            <option value={null}>Select project...</option> 
                            {
                                listPJ.map((val, i) => (
                                    <option value={val.project_id}> {val.title} </option>
                                ))
                            }
                            
                        </select>
                        
                  </label>
      
                  <label className={labelClass}>
                      <label className="bg-blue-500 text-white font-bold py-2 px-4 border-b-4 border-blue-700 rounded-l-xl">
                          Name
                      </label>
                      <input
                          type="text"
                          id="name"
                          placeholder="name ..."
                          onChange={formik.handleChange}
                          value={formik.values.name}
                          className={
                              "w-full fill-white dark:bg-stone-800 hover:bg-white-400 font-medium py-2 px-4 border-b-4 dark:border-stone-900 border-gray-200 rounded-r-xl shadow-inner hover:bg-gray-100 "
                          }
                      />
                  </label>
                  
                 
                </div>
                <footer className="flex justify-end border-t p-3 mt-5">
                  <button
                    type="submit"
                    className=" font-bold bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-xl text-white border-b-4 border-b-blue-700"
                  >
                    Create
                  </button>
                </footer>
              </form>
            </div>
          </>
        );
}

export default CreateTag