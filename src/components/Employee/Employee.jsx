import React from "react";
import EmployeeTable, { SelectColumnFilter, AvatarCell } from "./EmployeeTable";
import EmployeeEventModal from "../Employee/EmployeeEventModal";
import Header from "../Header";

import { getData } from "../../store/dummy";
import { useStore } from "../../store/zustand";
import { ordersData, contextMenuItems, ordersGrid, scheduleData } from "../../data/dummy";

const Employee = () => {

  //zustand
  const showEventModal = useStore((state) => state.showEventModal);
  const setShowEventModal = useStore((state) => state.setShowEventModal);

  const editing = { allowDeleting: true, allowEditing: true };
  const isStaff = true;
  
  const columns = React.useMemo(
    () => [
      {
        Header: "NIK",
        accessor: "nik",
      },
      {
        Header: "Name",
        accessor: "name",
        Cell: AvatarCell,
        imgAccessor: "imgUrl",
        emailAccessor: "email",
      },
      {
        Header: "Birthdate",
        accessor: "birthdate",
      },
      {
        Header: "Cabang",
        accessor: "cabang",
      },
      {
        Header: "Department",
        accessor: "department",
      },
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Dept. Head",
        accessor: "dephead",
      },
      {
        Header: "Div. Head",
        accessor: "divhead",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Role",
        accessor: "role",
        Filter: SelectColumnFilter, // new
        filter: "includes", // new
      },
      {
        Header: "Action",
        accessor: "action"
      },
    ],
    []
  );

  const dataOld = React.useMemo(() => getData(), []);

  const tempStatus =(isi)=> {
    return (
      isi == "Active" 
      ? (
        <span className="inline-flex items-center gap-1 rounded-full bg-green-50 dark:bg-green-600 px-2 py-1 text-xs font-semibold text-green-600 dark:text-green-50">
          <span className="h-1.5 w-1.5 rounded-full bg-green-600 dark:bg-green-50"></span>
          {isi}
        </span>
      ) : (
        <span className="inline-flex items-center gap-1 rounded-full bg-red-50 dark:bg-red-600 px-2 py-1 text-xs font-semibold text-red-600 dark:text-red-50">
          <span className="h-1.5 w-1.5 rounded-full bg-red-600 dark:bg-red-50"></span>
          {isi}
        </span>
      )
    )
  }
  const data = [
      {
        nik: 2772600022278,
        name: "Rudy Cooper",
        birthdate: "1992-05-07",
        cabang: "Head Office",
        department: "Information Technology",
        email: "rudy.cooper@ecocare.co.id",
        title: "Fullstack Developer",
        dephead: "Alfian Prayanta",
        divhead: "Wincent Yunanda",
        status: tempStatus("Active"),
        role: "ESS",
        imgUrl:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      },
      {
        nik: 2798200074812,
        name: "Angga Fisher",
        birthdate: "1997-01-79",
        cabang: "Head Office",
        department: "Information Technology",
        email: "angga.fisher@ecocare.co.id",
        title: "IT Support",
        dephead: "Alfian Prayanta",
        divhead: "Wincent Yunanda",
        status: tempStatus("Inactive"),
        role: "ESS",
        imgUrl:
          "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
        action: <div className="flex flex-wrap" >
                    <div className=' mr-5'>
                        <div className='w-6 relative before:z-10 before:absolute before:left-1/2 before:-top-3 before:w-max before:max-w-xs before:-translate-x-1/2 before:-translate-y-full before:rounded-lg before:bg-gray-700 before:px-2 before:py-1.5 before:text-white before:invisible before:content-[attr(data-tip)] after:z-10 after:absolute after:left-1/2 after:-top-3 after:h-0 after:w-0 after:-translate-x-1/2 after:border-8 after:border-t-gray-700 after:border-l-transparent after:border-b-transparent after:border-r-transparent after:invisible hover:before:visible hover:after:visible'
                            data-tip='Edit'>
                            <button 
                            type="secondary"
                            onClick={() => {
                                // showUpdModal(accessToken, record);
                            }}
                            className='m-1 p-2 border-b-4 rounded-lg  border-b-blue-600 font-bold bg-blue-500 text-stone-100  hover:border-blue-900 hover:bg-blue-600'>
                                <svg className="w-5 h-5 text-white" fill="currentColor" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="M24,8H0v-1C0,4.243,2.243,2,5,2h1V1c0-.552,.447-1,1-1s1,.448,1,1v1h8V1c0-.552,.447-1,1-1s1,.448,1,1v1h1c2.757,0,5,2.243,5,5v1Zm-14,14.545c0-.892,.187-1.753,.535-2.545H6c-.553,0-1-.448-1-1s.447-1,1-1c0,0,4.022,0,5.92,.001l2.001-2.001H6c-.553,0-1-.448-1-1s.447-1,1-1H15.922l2.741-2.741c.812-.812,1.891-1.259,3.039-1.259H0v9c0,2.757,2.243,5,5,5h5v-1.455Zm10.077-9.872c.897-.897,2.353-.897,3.25,0,.897,.897,.897,2.353,0,3.25l-6.807,6.807c-.813,.813-1.915,1.27-3.065,1.27h-1.455v-1.455c0-1.15,.457-2.252,1.27-3.065l6.807-6.807Z"/></svg>

                            </button>
                        </div>
                    </div>
                    <div className='mr-5'>
                        <div className='w-6 relative before:z-10 before:absolute before:left-1/2 before:-top-3 before:w-max before:max-w-xs before:-translate-x-1/2 before:-translate-y-full before:rounded-lg before:bg-gray-700 before:px-2 before:py-1.5 before:text-white before:invisible before:content-[attr(data-tip)] after:z-10 after:absolute after:left-1/2 after:-top-3 after:h-0 after:w-0 after:-translate-x-1/2 after:border-8 after:border-t-gray-700 after:border-l-transparent after:border-b-transparent after:border-r-transparent after:invisible hover:before:visible hover:after:visible'
                            data-tip='Delete'>
                            <button 
                                type="secondary"
                                onClick={() => {
                                    // if (confirm("Are you sure?") == true) {
                                    //     // delProject(accessToken, record);
                                    // }
                                }}
                                className='m-1 p-2 border-b-4 rounded-lg border-b-stone-600 font-bold bg-stone-400 text-stone-100  hover:border-stone-900 hover:bg-stone-500'>
                                <svg className="w-5 h-5 text-white" fill="currentColor" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512">
                                <path d="M0,10v9c0,2.757,2.243,5,5,5h14c2.757,0,5-2.243,5-5V10H0Zm15,8h-6c-.552,0-1-.448-1-1s.448-1,1-1h6c.552,0,1,.448,1,1s-.448,1-1,1ZM0,8v-1C0,4.243,2.243,2,5,2h1V1c0-.552,.448-1,1-1s1,.448,1,1v1h8V1c0-.552,.448-1,1-1s1,.448,1,1v1h1c2.757,0,5,2.243,5,5v1H0Z"/>
                            </svg>
                            </button>
                        </div>
                    </div>
                </div>,
      },
  ]

  return (
    <div className="flex flex-col p-10 mx-10 mt-20 mb-10 h-[88vh] justify-items-center bg-white dark:bg-stone-700 rounded-3xl overflow-x-auto drop-shadow-2xl">
      {/* <Header /> */}
      <span className="font-bold text-3xl flex mb-4 text-green-500">Employee!</span>
      <EmployeeTable columns={columns} data={data} />
      {showEventModal && <EmployeeEventModal />}
    </div>
  );
};
export default Employee;
