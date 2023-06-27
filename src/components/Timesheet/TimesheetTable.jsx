import "regenerator-runtime/runtime";
import React, { useEffect, useState } from "react";
import {
    useTable,
    useGlobalFilter,
    useAsyncDebounce,
    useFilters,
    useSortBy,
    usePagination,
} from "react-table";
import { Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import ava from "../../assets/cak_lontong02.jpeg";
import {Formik, useFormik } from "formik";

import {
    FaBeer,
    FaAngleRight,
    FaAngleLeft,
    FaAngleDoubleLeft,
    FaAngleDoubleRight,
    FaTag,
    FaPen,
    FaTrash,
    FaCheck,
    FaTimes,
    FaGripHorizontal,
} from "react-icons/fa";
import { useStore } from "../../store/zustand";
import TimesheetEventModal from "./TimesheetEventModal";
import TimesheetUpdateModal from "./TimesheetUpdateModal";
import GoSubmit from "./GoSubmit";
import Tempo from "../Tempo";

import {
    Button,
    Divider, 
    Form,
    Input,
    InputNumber,
    Pagination,
    Radio,
    Switch,
    Table,
} from "antd";
import { getData } from "../../store/dummy";
import CalendarDay from "../Calendar/CalendarDay";
import CalendarMonth from "../Calendar/CalendarMonth";
import InputMonth from "../Temp/InputMonth";
import dayjs from "dayjs";
import { getMonth } from "../../utils/util";

const now = dayjs().format('YYYY-MM-DD');

export const SelectColumnFilter = ({
    column: { filterValue, setFilter, preFilteredRows, id, render },
}) => {
    const options = React.useMemo(() => {
        const options = new Set();
        preFilteredRows.forEach((row) => {
            options.add(row.values[id]);
        });
        return [...options.values()];
    }, [id, preFilteredRows]);

    // Render a multi-select box
    return (
        <label className="flex items-baseline">
            <label className="bg-blue-500 text-white font-bold py-2 px-4 border-b-4 border-blue-700 rounded-l-xl">
                <span className=""> {render("Header")} </span>
            </label>
            {/* <span className="text-gray-700">{render("Header")}: </span> */}
            <select
                className="fill-white dark:bg-stone-800 hover:bg-white-400 font-bold py-2 px-4 border-b-4 dark:border-stone-900 border-gray-200 rounded-r-xl shadow-inner hover:bg-gray-100 w-32"
                name={id}
                id={id}
                value={filterValue}
                onChange={(e) => {
                    setFilter(e.target.value || undefined);
                }}
            >
                <option value="">All</option>
                {options.map((option, i) => (
                    <option key={i} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </label>
    );
};

export const AvatarCell = ({ value, column, row }) => {
    return (
        <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10">
                <img
                    className="h-10 w-10 rounded-full"
                    src={row.original[column.imgAccessor]}
                    alt=""
                />
            </div>
            <div className="ml-4">
                <div className="text-md font-large">{value}</div>
                <div className="text-sm  text-blue-500">
                    {row.original[column.emailAccessor]}
                </div>
            </div>
        </div>
    );
};

export const ActionButton = () => {
    return (
        <>
            <a x-data="{ tooltip: 'Delete' }" href="#">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6" x-tooltip="tooltip">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
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

const TableTimesheet = ({ columns, data }) => {

    //zustand
    const showEventModal = useStore((state) => state.showEventModal);
    const setShowEventModal = useStore((state) => state.setShowEventModal);
    const showProjectModal = useStore((state) => state.showProjectModal);
    const setShowProjectModal = useStore((state) => state.setShowProjectModal);
    const getTimesheet = useStore((state) => state.getTimesheet);
    const submitTimesheet = useStore((state) => state.submitTimesheet);
    const approveTimesheet = useStore((state) => state.approveTimesheet);
    const rejectTimesheet = useStore((state) => state.rejectTimesheet);
    // const tsStatus = useStore((state) => state.tsStatus);
    // const setTsStatus = useStore((state) => state.setTsStatus);
    // const tsApvStatus = useStore((state) => state.tsApvStatus);
    const tsRejStatus = useStore((state) => state.tsRejStatus);

    const getProject = useStore((state) => state.getProject);
    const getProjectByUser = useStore((state) => state.getProjectByUser);
    const delProject = useStore((state) => state.delProject);
    const createAWeek = useStore((state) => state.createAWeek);
    const flagDelete = useStore((state) => state.flagDelete);
    const currTimesheet = useStore((state) => state.currTimesheet);
    const updTSModal = useStore((state) => state.updTSModal);
    const setUpdTSModal = useStore((state) => state.setUpdTSModal);

    const [tsStatus, setTsStatus] = useState(false);
    const [tsSbmStatus, setTsSbmStatus] = useState(false);
    const [tsApvStatus, setTsApvStatus] = useState(false);
    
    const [dataSource, setDataSource] = useState([]);
    const [weekDur, setWeekDur] = useState([]);
    const [dayDur, setDayDur] = useState([]);
    const [flagDate, setFlagDate] = useState(false);
    const [isiDate, setIsiDate] = useState('');
    const [employWeekDur, setEmployWeekDur] = useState('');
    const [weekHour, setWeekHour] = useState(0);
    const [isiEmployee, setIsiEmployee] = useState('');
    const [weekDurEmploy, setWeekDurEmploy] = useState("");
    const [dataPJ, setDataPJ] = useState([]);
    const [editingRow, setEditingRow] = useState(null);
    const [getActivites, setGetActivities] = useState(null);
    const [selectionType, setSelectionType] = useState('checkbox');
    const [statTimes, setStatTimes] = useState(false);
    const [resVal, setResVal] = useState({});
    const [recordTs, setRecordTs] = useState([]);


    const [form] = Form.useForm();

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,

        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,

        state, // new
        preGlobalFilteredRows, // new
        setGlobalFilter, // new
    } = useTable(
        {
            columns,
            data,
        },
        useFilters, // new
        useGlobalFilter,
        useSortBy, //new
        usePagination //new
    );

    const GlobalFilter = ({
        preGlobalFilteredRows,
        globalFilter,
        setGlobalFilter,
    }) => {
        const count = preGlobalFilteredRows.length;
        const [value, setValue] = React.useState(globalFilter);
        const onChange = useAsyncDebounce((value) => {
            setGlobalFilter(value || undefined);
        }, 1000);

        return (
            <label className="flex items-baseline">
                <label className="bg-blue-500 text-white font-bold py-2 px-4 border-b-4 border-blue-700 rounded-l-xl">
                    <span className="">Search</span>
                </label>
                <input
                    // readOnly
                    value={value || ""}
                    onChange={(e) => {
                        setValue(e.target.value);
                        onChange(e.target.value);
                    }}
                    className={
                        "fill-white dark:bg-stone-800 hover:bg-white-400 font-bold py-2 px-4 border-b-4 dark:border-stone-900 border-gray-200 rounded-r-xl shadow-inner hover:bg-gray-100 "
                    }
                    placeholder={`${count} records`}
                />
            </label>
        );
    };

    const titleHeader = (val) => {
        // {
        //     "2023-04-14": 2,
        // },
        for (let i = 0; i < activities.length; i++) {
            // console.log("currTimesheet title", currTimesheet[i].activities.activity_work_date)
            const temp = Object.keys(activities[val]);
            return <span>{temp}</span>;
        }
    };

    const hourFormat = (val) => {
        return val > 1 ? `${val} hours` : `${val} hour`;
    };

    const accessToken = localStorage.getItem("accessToken");
    const userData = JSON.parse(localStorage.getItem("account"));

    const runTimesheet = async (token, inputs) => {
        let res = await getTimesheet(token, isiDate);
        if(res.success){
            // console.log("res.result", isiDate, res.result)
            const data = [];
            for (let j = 0; j < res.result.timesheet.length; j++) {
                let temp = res.result.timesheet[j];
                data.push({
                     key: `${j}`,
                     name: `${temp.project_title}`,
                     project_id: `${temp.project_id}`,
                     timesheet_id: `${temp.timesheet_id}`,
                     timesheet_status: `${temp.timesheet_status}`,
                     timesheet_work_date: `${temp.timesheet_work_date}`,
                     timesheet_duration: `${temp.timesheet_duration}`,
                     timesheet_description: `${temp.timesheet_description}`,
                     tag_id: `${temp.tag_id}`,
                     tag_name: `${temp.tag_name}`,
                     fk_department_id: `${temp.fk_department_id}`,
                     employee_id: `${temp.employee_id}`,
                     employee_nik: `${temp.employee_nik}`,
                     employee_fullname: `${temp.employee_fullname}`,
                });
                data.sort(function(a,b){ return b.key - a.key; });
            }
            setDataSource(data);

            for (let k = 0; k < res.result.total_duration_per_date.length; k++) {
                let valt = res.result.total_duration_per_date
                if (toString(isiDate) == toString(valt[k].timesheet_work_date)) {
                    setDayDur(res.result.total_duration_per_date)
                } else {
                    setDayDur([])
                }
            }
            
            setWeekDur(res.result.total_duration_per_week)
            let tempWd = 0
            for (let i = 0; i < res.result.total_duration_per_week.length; i++) {
                tempWd += Number(res.result.total_duration_per_week[i].total_duration)
            }
            setWeekHour(tempWd)
         }
    }

    const runProject = async () => {

        let resP = await getProject(accessToken);
        if(resP.data.success){
            //  console.log("currTimesheet --", currTimesheet);
             const dataPJ = [];
             let p = resP.data.result
             for (let k = 0; k < p.length; k++) {
                dataPJ.push({
                    key: k,
                    project_id: p[k].project_id,
                    project_title: p[k].title,
                    project_description: p[k].description,
                })
             }
             setDataPJ(dataPJ);

         }
    }

    function myFunction(accessToken, record) {
        
        if (confirm("Are you sure?") == true) {
            delProject(accessToken, record);
        }
    }
 

    const runEdit =(_, record) => {
        //   {
        //     "timesheet_id": 20,
        //     "project_id": 10,
        //     "tag_id": 1,
        //     "duration": 5,
        //     "work_date": "2023-06-14",
        //     "description": "coba update - assist cabang"
        // }
        setResVal(record)
        setUpdTSModal(true);
    }

    const runDelete =(token, record)=> {
        console.log("record dari delete", record)
    }


    const columnsTable = [
        {
            title: "Project Name",
            dataIndex: "name",
            sorter: (a, b) => (a.name > b.name ? -1 : 1),
            key: "name",
            render: (text, record) => {
                return <p>{text}</p>;
            },
        },
        {
            title: `Status`,
            dataIndex: "timesheet_status",
            key: "timesheet_status",
            render: (text, record) => {
                // 0:drafted, 1:submitted, 2:approved, 3:rejected,
                if (text == 0) {
                    return <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-lg dark:bg-blue-900 dark:text-blue-300">drafted</span>
                } else if (text == 1) {
                    return <span className="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-lg dark:bg-yellow-900 dark:text-yellow-300">submitted</span>
                } else if (text == 2){
                    return <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-lg dark:bg-green-900 dark:text-green-300">approved</span>
                } else if (text == 3) {
                    return <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-lg dark:bg-red-900 dark:text-red-300">rejected</span>
                } else { return null}
            },
        },
        {
            title: `Employee`,
            dataIndex: "employee_fullname",
            key: "employee_fullname",
            render: (text, record) => {
                return <p>{text}</p>;
            }
        },
        {
            title: `Date`,
            dataIndex: "timesheet_work_date",
            sorter: (a, b) => a.timesheet_work_date - b.timesheet_work_date,
            key: "timesheet_work_date",
            render: (text, record) => {
                return <p>{text}</p>;
            },
        },
        {
            title: "Activity",
            dataIndex: "tag_name",
            key: "tag_name",
            render: (text, record) => {
                    return <p>{text}</p>;
            },
        },
        {
            title: `Description`,
        
            dataIndex: "timesheet_description",
            key: "timesheet_description",
            render: (text, record) => {
                return <p>{text}</p>;
            },
        },
        {
            title: `Duration`,
            dataIndex: "timesheet_duration",
            name: "timesheet_duration",
            sorter: (a, b) => (a.timesheet_duration) - (b.timesheet_duration),
            key: "timesheet_duration",
            render: (text, record) => {
                return text > 1 
                ? <p>{text} hours</p> 
                : <p>{text} hour</p>
            },
        },
        {
            title: "Action",
            key: "operation",
            fixed: "right",
            render: (_, record) => {
                if (record.timesheet_status == 0) { setStatTimes(true)
                } else if (record.timesheet_status == 1) {setStatTimes(true)
                } else if (record.timesheet_status == 2) {setStatTimes(true)
                } else if (record.timesheet_status == 3) setStatTimes(true) 
                return (
                    <div className="flex flex-wrap">
                        <div className=' mr-5'>
                            <div className='w-6 relative before:z-10 before:absolute before:left-1/2 before:-top-3 before:w-max before:max-w-xs before:-translate-x-1/2 before:-translate-y-full before:rounded-lg before:bg-gray-700 before:px-2 before:py-1.5 before:text-white before:invisible before:content-[attr(data-tip)] after:z-10 after:absolute after:left-1/2 after:-top-3 after:h-0 after:w-0 after:-translate-x-1/2 after:border-8 after:border-t-gray-700 after:border-l-transparent after:border-b-transparent after:border-r-transparent after:invisible hover:before:visible hover:after:visible'
                                data-tip='Edit'>
                                <button 
                                type="secondary"
                                onClick={() => {
                                    runEdit(_, record)
                                }}
                                className='m-1 p-2 border-b-4 rounded-lg  border-b-blue-600 font-bold bg-blue-500 text-stone-100  hover:border-blue-900 hover:bg-blue-600'>
                                    <svg className="w-5 h-5 text-white" fill="currentColor" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="M24,8H0v-1C0,4.243,2.243,2,5,2h1V1c0-.552,.447-1,1-1s1,.448,1,1v1h8V1c0-.552,.447-1,1-1s1,.448,1,1v1h1c2.757,0,5,2.243,5,5v1Zm-14,14.545c0-.892,.187-1.753,.535-2.545H6c-.553,0-1-.448-1-1s.447-1,1-1c0,0,4.022,0,5.92,.001l2.001-2.001H6c-.553,0-1-.448-1-1s.447-1,1-1H15.922l2.741-2.741c.812-.812,1.891-1.259,3.039-1.259H0v9c0,2.757,2.243,5,5,5h5v-1.455Zm10.077-9.872c.897-.897,2.353-.897,3.25,0,.897,.897,.897,2.353,0,3.25l-6.807,6.807c-.813,.813-1.915,1.27-3.065,1.27h-1.455v-1.455c0-1.15,.457-2.252,1.27-3.065l6.807-6.807Z"/></svg>

                                </button>
                            </div>
                        </div>
                        <div className='mr-5'>
                            <div 
                                className='w-6 relative before:z-10 before:absolute before:left-1/2 before:-top-3 before:w-max before:max-w-xs before:-translate-x-1/2 before:-translate-y-full before:rounded-lg before:bg-gray-700 before:px-2 before:py-1.5 before:text-white before:invisible before:content-[attr(data-tip)] after:z-10 after:absolute after:left-1/2 after:-top-3 after:h-0 after:w-0 after:-translate-x-1/2 after:border-8 after:border-t-gray-700 after:border-l-transparent after:border-b-transparent after:border-r-transparent after:invisible hover:before:visible hover:after:visible'
                                data-tip='Delete'
                            >
                                <button 
                                type="secondary"
                                onClick={() => {
                                    runDelete(_, record)
                                }}
                                className='m-1 p-2 border-b-4 rounded-lg border-b-stone-600 font-bold bg-stone-400 text-stone-100  hover:border-stone-900 hover:bg-stone-500'>
                                <svg className="w-5 h-5 text-white" fill="currentColor" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512">
                                    <path d="M0,10v9c0,2.757,2.243,5,5,5h14c2.757,0,5-2.243,5-5V10H0Zm15,8h-6c-.552,0-1-.448-1-1s.448-1,1-1h6c.552,0,1,.448,1,1s-.448,1-1,1ZM0,8v-1C0,4.243,2.243,2,5,2h1V1c0-.552,.448-1,1-1s1,.448,1,1v1h8V1c0-.552,.448-1,1-1s1,.448,1,1v1h1c2.757,0,5,2.243,5,5v1H0Z"/>
                                </svg>
                                </button>
                            </div>
                        </div>
                       
                    </div>
                );
            },
        },
    ];

  
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          setRecordTs(selectedRows)
          
        },
        getCheckboxProps: (record) => ({
          disabled: record.name === 'Disabled User',
          // Column configuration not to be checked
          name: record.name,
        }),
    };


    const onFinish = (values) => {
        const updatedDataSource = [...dataSource];
        updatedDataSource.splice(editingRow, 1, { ...values, key: editingRow });
        setDataSource(updatedDataSource);
        setEditingRow(null);
    };

    const formik = useFormik({
        initialValues: {
            // project_id: null,
            // tag_id: "1",
        },
        onSubmit: (values, actions) => {
            // alert(JSON.stringify(values));
            runTimesheet(accessToken, values)
            setIsiDate(values.date)
        },
        // handleOnChange: (value, event) => {
        //     console.log("handleOnChange", value, event)     
        // }
    });

    const onFilter= (token, values) => {
        console.log("onchenge onfilter", values)
        for (let i = 0; i < weekDur.length; i++) {
            if (values == weekDur[i].employee_id) {
                setEmployWeekDur(values.date)
            } else {
                setEmployWeekDur("")
            }
            
        }
    }

    const totalWeekHours = () => {
        let temp = 0
        for (let i = 0; i < weekDur.length; i++) {
            temp += Number(weekDur[i].total_duration)
        }
        setWeekHour(temp)
    }
    
    const onFiltered = (token, values) => {
        console.log("onchenge onfiltered", values)
        setIsiDate(values.date)
    }

    const getWeekDuration = (values) => {
        return "99"
    }

    const onFilteredEmploy = (token, values) => {
        if (weekDur == [] || !values) {
            setWeekDurEmploy("0")
        } else if (values){
            for (let i = 0; i < weekDur.length; i++) {
                if (Number(values) == Number(weekDur[i].fk_employee_id)) {
                    setWeekDurEmploy(weekDur[i].total_duration)
                } else {
                    setWeekDurEmploy(weekDur[0].total_duration)
                }
            }
        } 
    }

    useEffect(() => {
        runProject();
        runTimesheet(accessToken)
        console.log("tsApvStatus tstable harus false", tsApvStatus)
    }, [
        showEventModal, 
        showProjectModal, 
        flagDelete,
        flagDate,
        isiDate,
        weekDurEmploy,
        weekHour,
        updTSModal,
        tsStatus,
        tsApvStatus,
        tsRejStatus,
    ]);

    return (
        <>           
            {updTSModal && <TimesheetUpdateModal resVal={resVal} />}

            <div className="grid md:grid-cols-3 gap-8">
                <div className="col-start-1 overflow-y-scroll max-h-[300px] bg-stone-100  dark:bg-stone-800 dark:border-b-stone-600 border-b-gray-400 border-b-4 rounded-xl border-stone-200 dark:border-stone-700 p-4 md:p-8">
                    <a
                        href="#"
                        className=" text-stone-900 text-3xl font-extrabold inline-flex items-center px-2.5 py-0.5 rounded-md dark:bg-stone-700 dark:text-green-400 mb-2"
                    >
                        <svg className="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="m19.001,17H5v-2h14v2Zm0-15h-1v-1c0-.552-.448-1-1-1s-1,.448-1,1v1h-8v-1c0-.552-.448-1-1-1s-1,.448-1,1v1h-1C2.243,2,0,4.243,0,7v1h24v-1c0-2.757-2.243-5-5-5ZM0,10h24v9c0,2.757-2.243,5-5,5H5c-2.757,0-5-2.243-5-5v-9Zm3,7c0,1.103.897,2,2,2h14c1.103,0,2-.897,2-2v-2c0-1.103-.897-2-2-2H5c-1.103,0-2,.897-2,2v2Z"/></svg>
                        Weekly View
                    </a>
                    <p className="mb-4">
                        <a href="#" className="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md dark:bg-stone-700 dark:text-green-400 mb-2">
                            Total Duration per-Week
                        </a>
                    </p>
                    <div className=" text-gray-900 pl-2 dark:text-white">
                            <div className="flex items-baseline text-gray-900 dark:text-white">
                                <span className=" text-6xl font-extrabold tracking-tight">
                                {weekHour}
                                    </span>
                                <span className="ml-1 text-2xl font-extrabold text-stone-500 dark:text-stone-400">hours</span>
                            </div>
                            {
                                weekDur.map((option, i) => (
                                    <ul role="list" className="space-y-5 my-7">
                                        <li key={option.id} className="flex space-x-3">
                                            <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-blue-600 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                            <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400"> {option.employee_fullname}: {option.total_duration} hours</span>
                                        </li>
                                    </ul> 
                                    // <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
                                    //     <li className="pb-3 sm:pb-4">
                                    //         <div className="flex items-start space-x-4">
                                    //             <div className="flex-shrink-0">
                                    //                 {/* <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Neil image"> */}
                                    //                 <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    //                     {option.employee_fullname}
                                    //                 </p>
                                    //             </div>
                                    //             <div className="flex-1 min-w-0">
                                    //                 {/* <p className="text-sm text-gray-500 truncate dark:text-gray-400"> </p> */}
                                    //             </div>
                                    //             <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                    //                 {option.total_duration}h
                                    //             </div>
                                    //         </div>
                                    //     </li>
                                    // </ul>
                                ))
                            }
                    </div>
                    {/* <h2 className="text-stone-900 dark:text-white text-7xl font-extrabold mb-2">
                        26
                    </h2> 
                    <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                    <a href="#" className="text-green-600 dark:text-green-500 hover:underline font-medium text-lg inline-flex items-center" >
                        Read more
                        <svg aria-hidden="true"className="w-4 h-4 ml-2" fill="none" stroke="currentColor" strokeWidth="2"viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" ><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    </a>
                    */}
                </div>  
                <div className="overflow-y-scroll max-h-[300px] bg-stone-100 dark:bg-stone-800 dark:border-b-stone-600 border-b-gray-400 border-b-4 rounded-xl border-stone-200 dark:border-stone-700 md:p-8">
                    <a href="#" className=" text-stone-900 text-3xl font-extrabold inline-flex items-center px-2.5 py-0.5 rounded-md dark:bg-stone-700 dark:text-green-400 mb-2">
                    <svg className="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="m0,19c0,2.757,2.243,5,5,5h14c2.757,0,5-2.243,5-5v-9H0v9Zm3-4c0-1.103.897-2,2-2h2c1.103,0,2,.897,2,2v2c0,1.103-.897,2-2,2h-2c-1.103,0-2-.897-2-2v-2Zm4.001,2h-2.001v-2h2v2ZM24,7v1H0v-1C0,4.243,2.243,2,5,2h1v-1c0-.552.448-1,1-1s1,.448,1,1v1h8v-1c0-.552.448-1,1-1s1,.448,1,1v1h1c2.757,0,5,2.243,5,5Z"/></svg>
                        Daily View
                    </a>
                    <p className="mb-4">
                        <a href="#" className="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md dark:bg-stone-700 dark:text-green-400 mb-2">
                            Total Duration per-Day
                        </a>
                    </p>
                    <div className="p-2">
                        {   dayDur != []
                        ? (
                            dayDur.map((option, i) => (
                                <ol className="relative ml-6 mr-2 mt-4 border-l border-gray-200 dark:border-gray-700">                  
                                    <li className="mb-4 ml-6">            
                                        <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                                            <svg aria-hidden="true" className="w-3 h-3 text-blue-800 dark:text-blue-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
                                        </span>
                                        <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">{dayjs(option.timesheet_work_date).format( "DD MMM, YY")}<span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ml-3">Latest</span></h3>
                                        <div className="flex items-start space-x-4">
                                            <div className="flex-shrink-0">
                                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                    {option.employee_fullname}
                                                </p>
                                            </div>
                                            <div className="flex-1 min-w-0"></div>
                                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                {option.total_duration}h
                                            </div>
                                        </div>
                                        <time className="flex items-center  mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Released on January 13th, 2022</time>
                                    </li>
                                </ol>
                            ))
                        )
                        : (
                            dayDur.map((option, i) => (
                                <ol className="relative ml-6 mr-2 mt-4 border-l border-gray-200 dark:border-gray-700">                  
                                    <li className="mb-4 ml-6">            
                                        <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                                            <svg aria-hidden="true" className="w-3 h-3 text-blue-800 dark:text-blue-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
                                        </span>
                                        <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">DD MMM, YY<span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ml-3">Latest</span></h3>
                                        <div className="flex items-start space-x-4">
                                            <div className="flex-shrink-0">
                                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                    No employee submit a timesheet
                                                </p>
                                            </div>
                                            <div className="flex-1 min-w-0"></div>
                                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                0h
                                            </div>
                                        </div>
                                        <time className="flex items-center  mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Released on January 13th, 2022</time>
                                    </li>
                                </ol>
                            ))
                        )
                        }
                    </div>
                </div>
                <div className="overflow-y-scroll max-h-[300px] bg-stone-100  dark:bg-stone-800 dark:border-b-stone-600 border-b-gray-400 border-b-4 rounded-xl border-stone-200 dark:border-stone-700 p-4 md:p-8">
                    <h2 className="text-stone-900 dark:text-white text-3xl font-extrabold mb-2">
                        Collect Your Daily Activities
                    </h2>
                    <a href="#" className="bg-purple-100 text-purple-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md dark:bg-stone-700 dark:text-purple-400 mb-2">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path clipRule="evenodd" fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"></path>
                        </svg>
                        Code
                    </a>
                    <p className="text-lg font-normal text-stone-500 dark:text-stone-400 mb-4">
                        Lorem Ipsum Dolor si Amet dan si Asep are becoming the basis for a variety of
                        tools that even influence both web designers and
                        developers.
                    </p>
                    <a
                        href="#"
                        className="text-green-600 dark:text-green-500 hover:underline font-medium text-lg inline-flex items-center"
                    >
                        Read more
                        <svg
                            aria-hidden="true"
                            className="w-4 h-4 ml-2"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            // aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                            ></path>
                        </svg>
                    </a>
                </div>
            </div>

            <div className="w-full mb-8">
                <div className="grid grid-cols-3">
                    <div className="col-start-1 flex">
                        <button
                            onClick={() => {
                                setShowEventModal(true);
                                // getProjectByUser(accessToken);
                                // setShowProjectModal(true);
                                // getTimesheet('contoh isian values');
                                // createAWeek();
                                getProject(accessToken)
                            }}
                            // className="flex items-baseline py-2 px-4   cursor-pointer bg-green-500 hover:bg-green-400 text-white font-bold border-b-4 border-green-700 hover:border-green-500 rounded-xl hover:shadow-inner transition duration-200 ease-in-out  transform hover:-translate-x hover:scale-105"
                            className="p-3 cursor-pointer bg-green-500 hover:bg-green-400 text-white font-bold border-b-4 border-green-700 hover:border-green-500 rounded-xl hover:shadow-inner transition duration-200 ease-in-out  transform hover:-translate-x hover:scale-105"
                        >
                            Add Timesheet
                        </button>
                        
                    </div>
                    <div className="col-span-1 ">
                        <form onSubmit={formik.handleSubmit} className=" rounded-2xl">
                        {/* <form form={form} className=" rounded-2xl"> */}

                            <label className="pb-[17px] fill-white font-bold text-white bg-blue-500 dark:bg-blue-800 hover:bg-white-400  py-3 px-4 border-b-4 dark:border-blue-900 border-blue-700 rounded-l-xl shadow-inner hover:bg-blue-400 hover:border-blue-500 ">
                                Date
                            </label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                defaultValue={now}
                                onChange={formik.handleChange}
                                value={formik.values.date}
                                className={"pt-[16px] fill-white dark:bg-stone-800 hover:bg-white-400 mr-4 py-2 px-4 border-b-4 dark:border-stone-900 border-gray-200 rounded-r-xl shadow-inner hover:bg-gray-100"}
                            />

                            {/* <label className="pb-[17px] fill-white font-bold text-white bg-blue-500 dark:bg-blue-800 hover:bg-white-400  py-3 px-4 border-b-4 dark:border-blue-900 border-blue-700 rounded-l-xl shadow-inner hover:bg-blue-400 hover:border-blue-500 ">
                                Employee
                            </label>
                            <select
                                className={"pb-[14px] pt-[10px] fill-white dark:bg-stone-800 hover:bg-white-400  mr-4 py-2 px-4 border-b-4 dark:border-stone-900 border-gray-200 rounded-r-xl shadow-inner hover:bg-gray-100"}
                                onChange={formik.handleChange}
                                id="employee_id"
                                name="employee_id"
                                value={formik.values.employee_id}
                            >
                                <option >Select employee</option>
                                {
                                    weekDur.map((option, i) => (
                                        <option key={i} value={option.fk_employee_id}>
                                            {option.fk_employee_id} - {option.employee_fullname}
                                        </option>
                                    ))
                                }
                            </select> */}

                            <button type="submit" className=" font-bold bg-green-500 hover:bg-green-600  px-6 pt-[11px] pb-[14px] rounded-xl text-white border-b-4 border-b-green-700" >
                                Go
                            </button>

                        </form>
                    </div>
                    <div className="col-span-1 flex justify-end ">
                        <GoSubmit token={accessToken} record={recordTs} tsStatus={tsStatus} setTsStatus={setTsStatus} runTimesheet={runTimesheet(accessToken)}  />
                    </div>
                </div>
            </div>

           
            <div className="mb-4 z-10 bg-stone-100 border-b-4 border-stone-400 rounded-2xl">
                <Form form={form} onFinish={onFinish} className="p-2 rounded-2xl">
                    
                    {/* <Radio.Group
                        onChange={({ target: { value } }) => {
                        setSelectionType(value);
                        }}
                        value={selectionType}
                    >
                        <Radio value="checkbox">Checkbox</Radio>
                        <Radio value="radio">radio</Radio>
                    </Radio.Group> */}

                    <Table
                        rowSelection={ 
                            {
                                type: selectionType,
                                columnWidth: 0,
                                fixed: true,
                                ...rowSelection,
                            }
                        }
                        columns={columnsTable}
                        dataSource={dataSource}
                        scroll={{ x: true }}
                        pagination={{
                            pageSize: 7,
                            total: dataSource.length,
                            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                        }}
                    />
                </Form>
            </div>
        </>
    );
};

export default TableTimesheet;
