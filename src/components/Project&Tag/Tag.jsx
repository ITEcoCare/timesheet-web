import "regenerator-runtime/runtime";
import React, { useEffect, useState } from "react";
import ProjectEventModal from "./TimesheetEventModalcopy";
import {
    FaAngleRight,
    FaAngleLeft,
    FaAngleDoubleLeft,
    FaAngleDoubleRight,
    FaTag,
    FaPen,
    FaTrash,
    FaCheck,
    FaTimes,
} from "react-icons/fa";
import { useStore } from "../../store/zustand";

import {
    Button,
    Switch,
    Table,
    Form,
    Input,
    InputNumber,
    Pagination,
} from "antd";

function Tag({ columns, data }) {

    //zustand
    const showEventModal = useStore((state) => state.showEventModal);
    const setShowEventModal = useStore((state) => state.setShowEventModal);
    const showProjectModal = useStore((state) => state.showProjectModal);
    const setShowProjectModal = useStore((state) => state.setShowProjectModal);
    const getProject = useStore((state) => state.getProject); 
    const getProjectAllUser = useStore((state) => state.getProjectAllUser); 
    const getTags = useStore((state) => state.getTags);
    const getTagsDetail = useStore((state) => state.getTagsDetail);
    const delTags = useStore((state) => state.delTags);
    const flagDelete = useStore((state) => state.flagDelete);
    
    //useStates
    const [dataSource, setDataSource] = useState([]);
    const [dataPJ, setDataPJ] = useState([]);
    const [editingRow, setEditingRow] = useState(null);
    const [getActivites, setGetActivities] = useState(null);
    const [form] = Form.useForm();
    const currTimesheet = useStore((state) => state.currTimesheet);

    const hourFormat = (val) => {
        return val > 1 ? `${val} hours` : `${val} hour`;
    };
    
    const accessToken = localStorage.getItem("accessToken");

    const runTags = async () => {

        let resP = await getTags(accessToken);
        let getP = await getProjectAllUser(accessToken);
        
        let objProject = {};
        if(resP.data.success || getP.data.success){
            
            let isi = getP.data.result.data
            for (let l = 0; l < isi.length; l++) {
                objProject = {
                    project_id: isi[l].project_id,
                    project_title: isi[l].project_title,
                }
            }
            
            const dataPJ = [];
            let p = resP.data.result.data
            for (let k = 0; k < p.length; k++) {
                dataPJ.push({
                    key: k,
                    tag_id: p[k].tag_id,
                    tag_name: p[k].tag_name,
                    tag_slug: p[k].tag_slug,
                    fk_project_id: objProject.project_id == p[k].fk_project_id 
                        ? objProject.project_title 
                        : "nulll",
                    fk_company_id: p[k].fk_company_id,
                    created_at: p[k].created_at,
                })
            }
            setDataPJ(dataPJ);
        }

    }

    useEffect(() => {
        runTags();
    }, [
        // showProjectModal, 
        flagDelete
    ]);


    const columnsTags = [
        {
            title: "Activity ID",
            key: "tag_id",
            fixed: "left",
            dataIndex: "tag_id",
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.tag_id - b.tag_id,
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
            title: "Activity name",
            dataIndex: "tag_name",
            key: "tag_name",
            // fixed: "left",
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
            title: "Project Related",
            dataIndex: "fk_project_id",
            key: "fk_project_id",
            // fixed: "left",
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
                    <div className="flex flex-wrap" >
                        <div className=' mr-5'>
                            <div className='w-6 relative before:z-10 before:absolute before:left-1/2 before:-top-3 before:w-max before:max-w-xs before:-translate-x-1/2 before:-translate-y-full before:rounded-lg before:bg-gray-700 before:px-2 before:py-1.5 before:text-white before:invisible before:content-[attr(data-tip)] after:z-10 after:absolute after:left-1/2 after:-top-3 after:h-0 after:w-0 after:-translate-x-1/2 after:border-8 after:border-t-gray-700 after:border-l-transparent after:border-b-transparent after:border-r-transparent after:invisible hover:before:visible hover:after:visible'
                                data-tip='Edit'>
                                <button 
                                type="secondary"
                                onClick={() => {
                                    console.log("mau update")
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
                                        console.log("mau delete")
                                        // if (confirm("Are you sure?") == true) {
                                        //     delProject(accessToken, record);
                                        // }
                                    }}
                                    className='m-1 p-2 border-b-4 rounded-lg border-b-stone-600 font-bold bg-stone-400 text-stone-100  hover:border-stone-900 hover:bg-stone-500'>
                                    <svg className="w-5 h-5 text-white" fill="currentColor" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512">
                                    <path d="M0,10v9c0,2.757,2.243,5,5,5h14c2.757,0,5-2.243,5-5V10H0Zm15,8h-6c-.552,0-1-.448-1-1s.448-1,1-1h6c.552,0,1,.448,1,1s-.448,1-1,1ZM0,8v-1C0,4.243,2.243,2,5,2h1V1c0-.552,.448-1,1-1s1,.448,1,1v1h8V1c0-.552,.448-1,1-1s1,.448,1,1v1h1c2.757,0,5,2.243,5,5v1H0Z"/>
                                </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                )
            },
        },
    ]

    const onFinish2 = (values) => {
        const updatedDataSource = [...dataSource];
        updatedDataSource.splice(editingRow, 1, { ...values, key: editingRow });
        setDataSource(updatedDataSource);
        setEditingRow(null);
    };

    return (
        <div className="mb-4 z-0 bg-stone-100 border-b-4 border-stone-400 rounded-2xl">
            <Form form={form} onFinish={onFinish2} className="p-2 rounded-2xl">
                <Table
                    bordered
                    columns={columnsTags}
                    dataSource={dataPJ}
                    // scroll={{ x: 1500 }}
                    pagination={{
                        pageSize: 5,
                        total: dataPJ.length,
                        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                    }}
                />
            
            </Form>
        </div>
    );
}

export default Tag