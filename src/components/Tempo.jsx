import React, { useState, useEffect } from "react";
import { Button, Switch, Table, Form, Input,InputNumber, Pagination } from "antd";
import { getData } from "../store/dummy";
import CalendarDay from "./Calendar/CalendarDay";
import CalendarMonth from "./Calendar/CalendarMonth";
import InputMonth from "./Temp/InputMonth";
import dayjs from "dayjs";
import { getMonth } from "../utils/util";
import { useStore } from "../store/zustand";


const Tempo = () => {
    const [dataSource, setDataSource] = useState([]);
    const [editingRow, setEditingRow] = useState(null);
    const [getActivites, setGetActivities] = useState(null);
    const [form] = Form.useForm()
    const getTimesheet = useStore((state)=> state.getTimesheet);
    const currTimesheet = useStore((state)=> state.currTimesheet);

    const breakCurrTimesheet = (val) => {
        console.log("breakCurrTimesheet", currTimesheet)
        // for (let i = 0; i < currTimesheet.length; i++) {
        //     for (let j = 0; j < currTimesheet.length; j++) {
        //         const element = array[j];
                
        //     }
            
        // }
    }
   

    let activities = [
        {
            "2023-04-10": 4
        },
        {
            "2023-04-11": 0
        },
        {
            "2023-04-12": 13
        },
        {
            "2023-04-13": 1
        },
        {
            "2023-04-14": 2
        }
    ]

    const titleHeader = (val) => {
        for (let i = 0; i < activities.length; i++) {
            // console.log("currTimesheet title", currTimesheet[i].activities.activity_work_date)
            const temp = Object.keys(activities[val])
            return <span>{temp}</span> 
        }
    }

    const hourFormat =(val) => { return val > 1 ? `${val} hours` : `${val} hour` }

    useEffect(() => {
        getTimesheet(localStorage.getItem("accessToken"))
        const data = [];
        for (let j = 0; j < currTimesheet.length; j++) {
            console.log("currTimesheet  --", currTimesheet)
            let temp = currTimesheet[j].activities
            data.push({
                key: `${j}`,
                name: `${currTimesheet[j].project_title}`,
                taskTitle: `taskTitle ${j}`,
                day1: hourFormat(temp[0].activity_duration),
                day2: hourFormat(temp[1].activity_duration),
                day3: hourFormat(temp[2].activity_duration),
                day4: hourFormat(temp[3].activity_duration),
                day5: hourFormat(temp[4].activity_duration),
            })
        }
        setDataSource(data);
    }, []);


    const columns = [
        {
            title: "Project Name",
            dataIndex: "name",
            key: "name",
            fixed: "left",
            render: (text, record) => {
                if (editingRow === record.key ) {
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
            title: "Task Title",
            dataIndex: "taskTitle",
            key: "taskTitle",
            fixed: "left",
            render: (text, record) => {
                if (editingRow === record.key ) {
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
                            <Input className={ " placeholder:text-stone-400 dark:text-stone-50 fill-white dark:bg-stone-800 hover:bg-white-400 border-b-4 dark:border-stone-900 border-gray-200 rounded-xl shadow-inner hover:bg-gray-100 "}/>
                        </Form.Item>
                    );
                } else {
                    return <p>{text}</p>;
                }
            },
        },
        {
            title: `Day 1 - ${dayjs(`${titleHeader(0).props.children}`).format("MMM D, YY")}`,
            dataIndex: "day1",
            key: "day1",
            render: (text, record) => {
                return <p>{text}</p>;
            } 
        }, 
        {
            title: `Day 2 - ${dayjs(`${titleHeader(1).props.children}`).format("MMM D, YY")}`,
            // title: titleHeader(1),
            dataIndex: "day2",
            key: "day1",
            render: (text, record) => {
                return <p>{text}</p>;
            } 
        }, 
        {
            title: `Day 3 - ${dayjs(`${titleHeader(2).props.children}`).format("MMM D, YY")}`,
            dataIndex: "day3",
            key: "day1",
            render: (text, record) => {
                return <p>{text}</p>;
            } 
        }, 
        {
            title: `Day 4 - ${dayjs(`${titleHeader(3).props.children}`).format("MMM D, YY")}`,
            dataIndex: "day4",
            key: "day1",
            render: (text, record) => {
                return <p>{text}</p>;
            } 
        },
        {
            title: `Day 4 - ${dayjs(`${titleHeader(4).props.children}`).format("MMM D, YY")}`,
            dataIndex: "day5",
            key: "day1",
            render: (text, record) => {
                return <p>{text}</p>;
            } 
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
                                  hour: record.hour
                                })
                            }}
                        >
                            Edit
                        </Button>
                        <Button type="link" htmlType="submit">Upd / Del</Button>
                    </>
                );
            },
        },
    ];

    const onFinish=(values)=> {
        const updatedDataSource = [...dataSource];
        updatedDataSource.splice(editingRow, 1, { ...values, key: editingRow });
        setDataSource(updatedDataSource);
        setEditingRow(null);
    }

    return (
        <div className="flex flex-col p-10 mx-10 mt-20 mb-10 h-[88vh] justify-items-center dark:bg-stone-700 rounded-3xl overflow-x-auto drop-shadow-2xl bg-white">
            
            
<nav class="bg-white border-gray-200 dark:bg-gray-900">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="https://flowbite.com/" class="flex items-center">
        <img src="https://flowbite.com/docs/images/logo.svg" class="h-8 mr-3" alt="Flowbite Logo" />
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
    </a>
    <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
      <span class="sr-only">Open main menu</span>
      <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
    </button>
    <div class="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li>
          <a href="#" class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Home</a>
        </li>
        <li>
          <a href="#" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">About</a>
        </li>
        <li>
          <a href="#" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Services</a>
        </li>
        <li>
          <a href="#" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Pricing</a>
        </li>
        <li>
          <a href="#" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Contact</a>
        </li>
      </ul>
    </div>
  </div>
</nav>

            
            
            <Form form={form} onFinish={onFinish}>
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    scroll={{ x: 1500 }}
                />
                <Pagination
                // total={85}
                showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                defaultPageSize={20}
                defaultCurrent={1}
                />
            </Form>
        </div>
    );
};

export default Tempo;
