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
import Tempo from "../Tempo";

import {
    Button,
    Switch,
    Table,
    Form,
    Input,
    InputNumber,
    Pagination,
} from "antd";
import { getData } from "../../store/dummy";
import CalendarDay from "../Calendar/CalendarDay";
import CalendarMonth from "../Calendar/CalendarMonth";
import InputMonth from "../Temp/InputMonth";
import dayjs from "dayjs";
import { getMonth } from "../../utils/util";

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
                className="
        fill-white dark:bg-stone-800 hover:bg-white-400 font-bold py-2 px-4 border-b-4 dark:border-stone-900 border-gray-200 rounded-r-xl shadow-inner hover:bg-gray-100 w-32"
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

const TableTimesheet = ({ columns, data }) => {
    //zustand
    const showEventModal = useStore((state) => state.showEventModal);
    const setShowEventModal = useStore((state) => state.setShowEventModal);
    const showProjectModal = useStore((state) => state.showProjectModal);
    const setShowProjectModal = useStore((state) => state.setShowProjectModal);
    const getTimesheet = useStore((state) => state.getTimesheet);
    const submitTimesheet = useStore((state) => state.submitTimesheet);
    const getProject = useStore((state) => state.getProject);
    const getProjectByUser = useStore((state) => state.getProjectByUser);
    const delProject = useStore((state) => state.delProject);
    const createAWeek = useStore((state) => state.createAWeek);
    const flagDelete = useStore((state) => state.flagDelete);
    
    
    const [dataSource, setDataSource] = useState([]);
    // const [flagDelete, setFlagDelete] = useState(false);
    const [dataPJ, setDataPJ] = useState([]);
    const [editingRow, setEditingRow] = useState(null);
    const [getActivites, setGetActivities] = useState(null);
    const [form] = Form.useForm();
    const currTimesheet = useStore((state) => state.currTimesheet);

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

    const runTimesheet = async () => {

        let res = await getTimesheet(accessToken);
        if(res.success){
            console.log("ini isinya", res.result)
             const data = [];
            //  for (let j = 0; j < res.result.length; j++) {
            //      let temp = res.result[j].activities;
            //      data.push({
            //          key: `${j}`,
            //          name: `${res.result[j].project_title}`,
            //          timesheet_id: `${res.result[j].timesheet_id}`,
            //          timesheet_status: `${res.result[j].timesheet_status}`,
            //          employee_id: `${res.result[j].employee_id}`,
            //          approve_id: `${res.result[j].approve_id}`,
            //          status: `${res.result[j].status}`,
            //          taskTitle: `taskTitle ${j}`,
            //          day1: hourFormat(temp[0].activity_duration),
            //          day2: hourFormat(temp[1].activity_duration),
            //          day3: hourFormat(temp[2].activity_duration),
            //          day4: hourFormat(temp[3].activity_duration),
            //          day5: hourFormat(temp[4].activity_duration),
            //      });
            //  }
            //  setDataSource(data);
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

    useEffect(() => {
        runProject();
        runTimesheet();
    }, [
        showEventModal, 
        showProjectModal, 
        flagDelete
    ]);

    function myFunction(accessToken, record) {
        
        if (confirm("Are you sure?") == true) {
            delProject(accessToken, record);
        }
    }

    const runSubmit =(_, record) => {
        // alert('here..')
        let val = {
            "timesheet_id": 1,
            "employee_id": 2,
            "activity_id" : 1,
            "activity_name" : 1,
            "activities": [
                {
                    "work_date": "2023-04-14",
                    "duration": 5,
                    "notes": "Lima Jam diskusi Invoice"
                }
            ]
        }
        submitTimesheet(accessToken, record)
    }

    const columnsTable = [
        {
            title: "Project Name",
            dataIndex: "name",
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.name - b.name,
            key: "name",
            fixed: "left",
            render: (text, record) => {
                if (editingRow === record.key) {
                    return {
                        props: {
                            style: { background: parseInt(text) > 50 ? "red" : "green" }
                        },
                        children: 
                        <div>
                            <Form.Item
                                name="name" //crucial for value
                                className="m-0"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter the project name.",
                                    },
                                ]}
                            >
                                <Input
                                    className={
                                        " placeholder:text-stone-400 dark:text-stone-50 fill-white dark:bg-stone-800 hover:bg-white-400 font-bold border-b-4 dark:border-stone-900 border-gray-200 rounded-xl shadow-inner hover:bg-gray-100 "
                                    }
                                />
                            </Form.Item>
                        </div>
                        
                    };
                } else {
                    return <p>{text}</p>;
                }
            },
        },
        {
            title: "Task Title",
            dataIndex: "taskTitle",
            key: "taskTitle",
            fixed: "left",
            render: (text, record) => {
                if (editingRow === record.key) {
                    return (
                        <Form.Item
                            name="taskTitle" //crucial for value
                            className="m-0"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter the task title.",
                                },
                            ]}
                        >
                            <Input
                                className={
                                    " placeholder:text-stone-400 dark:text-stone-50 fill-white dark:bg-stone-800 hover:bg-white-400 border-b-4 dark:border-stone-900 border-gray-200 rounded-xl shadow-inner hover:bg-gray-100 "
                                }
                            />
                        </Form.Item>
                    );
                } else {
                    return <p>{text}</p>;
                }
            },
        },
        {
            title: `Day 1`,
            // ${dayjs(`${titleHeader(0).props.children}`).format(
            //     "MMM D, YY"
            // )}
            
            dataIndex: "day1",
            key: "day1",
            render: (text, record) => {
                return <p>{text}</p>;
            },
        },
        {
            title: `Day 2`,
            dataIndex: "day2",
            key: "day1",
            render: (text, record) => {
                return <p>{text}</p>;
            },
        },
        {
            title: `Day 3`,
            dataIndex: "day3",
            key: "day1",
            render: (text, record) => {
                return <p>{text}</p>;
            },
        },
        {
            title: `Day 4`,
            dataIndex: "day4",
            key: "day1",
            render: (text, record) => {
                return <p>{text}</p>;
            },
        },
        {
            title: `Day 5`,
            dataIndex: "day5",
            key: "day1",
            render: (text, record) => {
                return <p>{text}</p>;
            },
        },
        {
            title: "Action",
            key: "operation",
            fixed: "right",
            render: (_, record) => {
                return (
                    <>
                        <Button
                            type="secondary"
                            onClick={() => {
                                setEditingRow(record.key);
                                form.setFieldsValue({
                                    name: record.name,
                                    taskTitle: record.taskTitle,
                                    hour: record.hour,
                                });
                            }}
                        >
                            Edt
                        </Button>
                        <Button
                            type="secondary"
                            onClick={() => {

                            }}
                        >
                            Del
                        </Button>
                        <Button
                            type="secondary"
                            onClick={() => {
                                // form.setFieldsValue({
                                //     timesheet_id: 1,
                                //     employee_id: 2,
                                //     activity_id : 1,
                                //     activity_name : 1,
                                //     activities: [
                                //         {
                                //             "work_date": "2023-04-14",
                                //             "duration": 5,
                                //             "notes": "Lima Jam diskusi Invoice"
                                //         }
                                //     ]
                                // });
                                runSubmit(_, record)
                            }}
                        >
                            Sub
                        </Button>
                        {/* <Button type="link" htmlType="submit">
                            Upd / Del
                        </Button> */}
                    </>
                );
            },
        },
    ];

    const columnsProject = [
        {
            title: "Project ID",
            key: "project_id",
            width: 100,
            fixed: "left",
            dataIndex: "project_id",
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.project_id - b.project_id,
            render: (text, record) => {
                if (editingRow === record.key) {
                    return (
                        <Form.Item
                            name="name" //crucial for value
                            className="m-0"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter the project name.",
                                },
                            ]}
                        >
                            <Input className={ " placeholder:text-stone-400 dark:text-stone-50 fill-white dark:bg-stone-800 hover:bg-white-400 font-bold border-b-4 dark:border-stone-900 border-gray-200 rounded-xl shadow-inner hover:bg-gray-100 "}/>
                        </Form.Item>
                    );
                } else {
                    return <p>{text}</p>;
                }
            },
        }, 
        {
            title: "Project Title",
            dataIndex: "project_title",
            key: "project_title",
            // fixed: "left",
            width: 250,
            render: (text, record) => {
                if (editingRow === record.key) {
                    return (
                        <Form.Item
                            name="name" //crucial for value
                            className="m-0"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter the project name.",
                                },
                            ]}
                        >
                            <Input
                                className={
                                    " placeholder:text-stone-400 dark:text-stone-50 fill-white dark:bg-stone-800 hover:bg-white-400 font-bold border-b-4 dark:border-stone-900 border-gray-200 rounded-xl shadow-inner hover:bg-gray-100 "
                                }
                            />
                        </Form.Item>
                    );
                } else {
                    return <p>{text}</p>;
                }
            },
        },
        {
            title: "Description",
            dataIndex: "project_description",
            key: "project_description",
            // fixed: "left",                
            width: 400,
            render: (text, record) => {
                if (editingRow === record.key) {
                    return (
                        <Form.Item
                            name="name" //crucial for value
                            className="m-0"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter the project name.",
                                },
                            ]}
                        >
                            <Input className={ " placeholder:text-stone-400 dark:text-stone-50 fill-white dark:bg-stone-800 hover:bg-white-400 font-bold border-b-4 dark:border-stone-900 border-gray-200 rounded-xl shadow-inner hover:bg-gray-100 "}/>
                        </Form.Item>
                    );
                } else {
                    return <p>{text}</p>;
                }
            },
        }, 
        {
            title: "Action",
            key: "operation",
            fixed: "right",
            width: 80,
            render: (_, record) => {
                
                return (
                    <div >
                        <Button
                            type="secondary"
                            onClick={() => {
                                setEditingRow(record.key);
                                form.setFieldsValue({
                                    name: record.name,
                                    taskTitle: record.taskTitle,
                                    hour: record.hour,
                                });
                            }}
                        >
                            Edit
                        </Button>
                        <Button type="link" htmlType="submit" onClick={ ()=> { 
                                // myFunction(accessToken, record)
                                if (confirm("Are you sure?") == true) {
                                    delProject(accessToken, record);
                                }
                            }}>
                            <span className="cursor-pointer text-gray-400">
                                <FaTrash color="red" />
                            </span>
                        </Button>
                    </div>
                );
            },
        },
    ]

    const onFinish = (values) => {
        const updatedDataSource = [...dataSource];
        updatedDataSource.splice(editingRow, 1, { ...values, key: editingRow });
        setDataSource(updatedDataSource);
        setEditingRow(null);
    };

    const onFinish2 = (values) => {
        const updatedDataSource = [...dataSource];
        updatedDataSource.splice(editingRow, 1, { ...values, key: editingRow });
        setDataSource(updatedDataSource);
        setEditingRow(null);
    };

    return (
        <>
            {/* <div className="mb-4 grid grid-cols-3">
                <div className="col-span-2 sm:col-span-1 ">
                    <button
                        onClick={() => {
                            setShowProjectModal(true);
                            getProject(accessToken)
                        }}
                        className="flex items-baseline py-2 px-4   cursor-pointer bg-green-500 hover:bg-green-400 text-white font-bold border-b-4 border-green-700 hover:border-green-500 rounded-xl hover:shadow-inner transition duration-200 ease-in-out  transform hover:-translate-x hover:scale-105"
                    >
                        Add Project
                    </button>
                </div>
            </div>
            <div className="mb-4 z-10 bg-stone-100 border-b-4 border-stone-400 rounded-2xl">
                <Form form={form} onFinish={onFinish2} className="p-2 rounded-2xl">
                    <Table
                        bordered
                        columns={columnsProject}
                        dataSource={dataPJ}
                        scroll={{ x: 1500 }}
                        pagination={{
                            pageSize: 5,
                            total: dataPJ.length,
                            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                        }}
                    />
                
                </Form>
            </div> */}
            
            <div className="mb-4 grid grid-cols-3">
                <div className="col-span-2 sm:col-span-1 ">
                    <button
                        onClick={() => {
                            setShowEventModal(true);
                            // getProjectByUser(accessToken);
                            // setShowProjectModal(true);
                            // getTimesheet('contoh isian values');
                            // createAWeek();
                            getProject(accessToken)
                        }}
                        className="flex items-baseline py-2 px-4   cursor-pointer bg-green-500 hover:bg-green-400 text-white font-bold border-b-4 border-green-700 hover:border-green-500 rounded-xl hover:shadow-inner transition duration-200 ease-in-out  transform hover:-translate-x hover:scale-105"
                    >
                        Add Timesheet
                    </button>
                </div>
            </div>
            <div className="mb-4 z-10 bg-stone-100 border-b-4 border-stone-400 rounded-2xl">
                <Form form={form} onFinish={onFinish} className="p-2 rounded-2xl">
                    <Table
                        columns={columnsTable}
                        dataSource={dataSource}
                        scroll={{ x: 1500 }}
                        pagination={{
                            pageSize: 5,
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
