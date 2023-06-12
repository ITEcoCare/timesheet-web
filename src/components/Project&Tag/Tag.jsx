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
        if(resP.data.success){
             const dataPJ = [];
             let p = resP.data.result.data
             console.log("p >>>", p)
             for (let k = 0; k < p.length; k++) {
                dataPJ.push({
                    key: k,
                    tag_id: p[k].tag_id,
                    tag_name: p[k].tag_name,
                    tag_slug: p[k].tag_slug,
                    fk_project_id: p[k].fk_project_id,
                    fk_company_id: p[k].fk_company_id,
                    created_at: p[k].created_at,
                })
             }
             setDataPJ(dataPJ);
         }
        console.log("hahahihi", dataPJ)

    }

    useEffect(() => {
        runTags();
        // runTimesheet();
        // console.log("hahahihi", dataPJ)
    }, [
        // showEventModal, 
        // showProjectModal, 
        flagDelete
    ]);


    const columnsTags = [
        {
            title: "Activity ID",
            key: "tag_id",
            width: 100,
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
            title: "Project Related",
            dataIndex: "fk_project_id",
            key: "fk_project_id",
            // fixed: "left",
            width: 250,
            render: (text, record) => {
                return <p>{text}</p>;
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
                                    delTags(accessToken, record);
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
                    scroll={{ x: 1500 }}
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