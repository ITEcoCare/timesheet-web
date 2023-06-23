import React, {useEffect} from "react";
import { useStore } from "../../store/zustand";
import { Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";

function GoReject({ token, record }) {

    const approveTimesheet = useStore((state) => state.approveTimesheet);
    const tsStatus = useStore((state) => state.tsStatus);
    const setTsStatus = useStore((state) => state.setTsStatus);

    const runApprove = () => {
        // console.log("masuk goApprove", token, record)
        approveTimesheet(token, record);
        setTsStatus(true);
    }
    
    const items = [
        {
            label: (
                <div 
                // onClick={() => {
                //     runRejected(token)
                //     setTsStatus(true)
                // }}
                className="px-4 py-3 text-sm font-medium text-gray-400 dark:text-white  dark:bg-stone-700">
                    <div>Approve All</div>
                </div>
            ),
            key: "0",
            disabled: true,
        },
        {
            label: (
                <div 
                // onClick={() => {
                //     runApprove(token)
                //     setTsStatus(true)
                // }}
                className=" px-4 py-3 text-sm font-medium text-gray-400 dark:text-white  dark:bg-stone-700">
                    <div>Selected Only</div>
                </div>
            ),
            key: "1",
            disabled: true,
        },
        {
            label: (
                <div 
                onClick={() => {
                    runApprove(token)
                    setTsStatus(true)
                }}
                className=" px-4 py-3 text-sm font-medium text-gray-900 dark:text-white  dark:bg-stone-700">
                    <div>One User Only</div>
                </div>
            ),
            key: "2",
        },
    ];

    useEffect(() => {
  
    }, [
        tsStatus
    ]);

    return (
        <Dropdown
            className="ml-4 cursor-pointer bg-green-500 hover:bg-green-400 text-white font-bold border-b-4 border-green-700 hover:border-green-500 rounded-xl hover:shadow-inner transition duration-200 ease-in-out  transform hover:-translate-x hover:scale-105"
            menu={{ items }}
            trigger={["click"]}
            onClick={(e) => e.preventDefault()}
        >
            <Space >
                <label
                    className="ml-5 cursor-pointer focus:ring-4 focus:outline-nonetext-center inline-flex items-center py-2"
                    onClick={() => {
                    }}
                    id="dropdownDefaultButton" 
                    data-dropdown-toggle="dropdown"
                >
                    <svg className="w-5 h-5 mr-2 -ml-1 text-white" fill="currentColor" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="M0,8v-1C0,4.243,2.243,2,5,2h1V1c0-.552,.447-1,1-1s1,.448,1,1v1h8V1c0-.552,.447-1,1-1s1,.448,1,1v1h1c2.757,0,5,2.243,5,5v1H0Zm24,2v9c0,2.757-2.243,5-5,5H5c-2.757,0-5-2.243-5-5V10H24Zm-6.168,3.152c-.384-.397-1.016-.409-1.414-.026l-4.754,4.582c-.376,.376-1.007,.404-1.439-.026l-2.278-2.117c-.403-.375-1.035-.354-1.413,.052-.376,.404-.353,1.037,.052,1.413l2.252,2.092c.566,.567,1.32,.879,2.121,.879s1.556-.312,2.108-.866l4.74-4.568c.397-.383,.409-1.017,.025-1.414Z"/></svg>
                    Approve
                </label>
                <DownOutlined className="mr-4 pb-1 font-bold"/>
            </Space>
        </Dropdown>
    );
}

export default GoReject;
