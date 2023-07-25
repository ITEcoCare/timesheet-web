import "regenerator-runtime/runtime";
import React, { useEffect, useState } from "react";
import ProjectEventModal from "./TimesheetEventModalcopy";
import UpdateProjectModal from "./UpdateProjectModal";
import { PlusCircleTwoTone, MinusCircleTwoTone } from "@ant-design/icons";
import Tag from "./Tag";
import {
    FaBeer,
    FaAngleRight,
} from "react-icons/fa";
import { useStore } from "../../store/zustand";
import {
    Table,
    Form,
} from "antd";
import dayjs from "dayjs";

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

function Project({ columns, data }) {

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
    const updateProject = useStore((state) => state.updateProject);
    const delProject = useStore((state) => state.delProject);
    const createAWeek = useStore((state) => state.createAWeek);
    const flagDelete = useStore((state) => state.flagDelete);
    const currTimesheet = useStore((state) => state.currTimesheet);
    
    
    const [dataSource, setDataSource] = useState([]);
    const [dataPJ, setDataPJ] = useState([]);
    const [editingRow, setEditingRow] = useState(null);
    const [getActivites, setGetActivities] = useState(null);
    const [resVal, setResVal] = useState({});


    const [form] = Form.useForm();
    
    const accessToken = localStorage.getItem("accessToken");

    const runProject = async () => {

        let resP = await getProject(accessToken);
        if(resP.data.success){
            const dataPJ = [];
            let p = resP.data.result
             for (let k = 0; k < p.length; k++) {
                dataPJ.push({
                    key: k,
                    project_id: p[k].project_id,
                    project_title: p[k].title,
                    project_description: p[k].description,
                    start_date: p[k].start_date,
                    end_date: p[k].end_date,
                    created_by_id: p[k].created_by_id,
                    created_by_name: p[k].created_by_name,
                    department: p[k].department,
                    tags: JSON.stringify(p[k].tags),
                })
             }
             setDataPJ(dataPJ);
         }
    }

    const showUpdModal = async (token, record) => {
        // updateProject(null, null, record)
        setResVal(record)
        setUpdModal(true);
    }

    useEffect(() => {
        runProject();
    }, [
        showProjectModal, 
        flagDelete,
        updModal,
        showTagModal,
    ]);

    const columnsProject = [
       
        {
            title: "Project ID",
            key: "project_id",
            fixed: "left",
            dataIndex: "project_id",
            // width: 30,
            sorter: (a, b) => a.project_id - b.project_id,
            render: (text, record) => {
                return <p>ID - {text}</p>;
            },
        }, 
        Table.EXPAND_COLUMN,
        {
            title: "Project Title",
            dataIndex: "project_title",
            key: "project_title",
            // width: 100,
            sorter: (a, b) => a.project_title - b.project_title,
            // fixed: "left",
            render: (text, record) => {
                return <p>{text}</p>;
            },
        },
        // Table.SELECTION_COLUMN,
        {
            title: "Created By",
            key: "created_by_name",
            dataIndex: "created_by_name",
            sorter: (a, b) => a.created_by_name - b.created_by_name,
            render: (text, record) => {
                
                return <p>{text}</p>;
                
            },
        }, 
        {
            title: "Department",
            key: "department",
            dataIndex: "department",
            render: (text, record) => {
                let obj = {}
                for (let i = 0; i < text.length; i++) { obj = text[i] }
                return <p>{obj.department_code}</p>;
            },
        }, 
        {
            title: "Description",
            dataIndex: "project_description",
            key: "project_description",
            render: (text, record) => {
                return <p>{text}</p>;
            },
        }, 
        {
            title: "Start Date",
            dataIndex: "start_date",
            key: "start_date",
            render: (text, record) => {
                    return <span>{text ? text : "null"}</span>;
            },
        }, 
        {
            title: "End Date",
            dataIndex: "end_date",
            key: "end_date",              
            render: (text, record) => {
                    return <span>{text ? text : "null"}</span>;
            },
        }, 
        {
            title: "Action",
            key: "operation",
            fixed: "right",
            render: (_, record) => {
                
                return (
                    <div className="flex flex-wrap" >
                        <div className=' mr-5'>
                            <div className='w-6 relative before:z-10 before:absolute before:left-1/2 before:-top-3 before:w-max before:max-w-xs before:-translate-x-1/2 before:-translate-y-full before:rounded-lg before:bg-gray-700 before:px-2 before:py-1.5 before:text-white before:invisible before:content-[attr(data-tip)] after:z-10 after:absolute after:left-1/2 after:-top-3 after:h-0 after:w-0 after:-translate-x-1/2 after:border-8 after:border-t-gray-700 after:border-l-transparent after:border-b-transparent after:border-r-transparent after:invisible hover:before:visible hover:after:visible'
                                data-tip='Edit'>
                                <button 
                                type="secondary"
                                onClick={() => {
                                    showUpdModal(accessToken, record);
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
                                        if (confirm("Are you sure?") == true) {
                                            delProject(accessToken, record);
                                        }
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
    ]

    // const onFinish = (values) => {
    //     const updatedDataSource = [...dataSource];
    //     updatedDataSource.splice(editingRow, 1, { ...values, key: editingRow });
    //     setDataSource(updatedDataSource);
    //     setEditingRow(null);
    // };

    return (
        <div className="flex flex-col p-10 mx-10 mt-20 mb-10 h-[88vh] justify-items-center bg-gradient-to-t from-green-400 to-transparent dark:from-green-900 rounded-3xl overflow-x-auto drop-shadow-2xl">
           
            <span className="text-3xl font-extrabold flex mb-4 border-b-1 py-2 border-stone-200">Your Project</span>

            <div className="mb-4 grid grid-cols-3">
                <div className="col-start-1">
                    <button
                        onClick={() => {
                            getProject(accessToken)
                            setShowProjectModal(true);
                        }}
                        className="flex items-baseline py-2 px-4   cursor-pointer bg-green-500 hover:bg-green-400 text-white font-bold border-b-4 border-green-700 hover:border-green-500 rounded-xl hover:shadow-inner transition duration-200 ease-in-out  transform hover:-translate-x hover:scale-105"
                    >
                        Add Project
                    </button>
                </div>
            </div>
            <div className="mb-4 z-0 bg-stone-100 border-b-4 border-stone-400 rounded-2xl">
                <Form form={form} className="p-2 rounded-2xl">
                    <Table
                        bordered
                        columns={columnsProject}
                        dataSource={dataPJ}
                        pagination={{
                            pageSize: 5,
                            total: dataPJ.length,
                            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                        }}
                        size={"middle"}
                        expandable={{
                            expandedRowRender: (record) => (

                                <ul style={{ margin: 5}}>
                                { 
                                    JSON.parse(record.tags) !== null ? (
                                        JSON.parse(record.tags).map((val, i) => (
                                            <li key={i} value={val}> {val.tag_name} </li>
                                        ))
                                    ) : ( <div> None </div> )
                                }
                                </ul>
                            ),
                            columnTitle: "act.",
                            columnWidth: 50,
                            showExpandColumn: false,
                            expandIcon: ({ expanded, onExpand, record }) =>
                                expanded ? (
                                <MinusCircleTwoTone onClick={e => onExpand(record, e)} />
                                ) : (
                                <PlusCircleTwoTone onClick={e => onExpand(record, e)} />
                                )
                            }}
                    />
                </Form>
            </div>
            
            {updModal && <UpdateProjectModal resVal={resVal} />}
            <Tag />
        </div>
    );
}

export default Project