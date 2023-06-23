import React, {useEffect} from "react";
import { useStore } from "../../store/zustand";
import { Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";

function GoSubmit( token, runsbm, setstat) {

    const submitTimesheet = useStore((state) => state.submitTimesheet);
    const tsStatus = useStore((state) => state.tsStatus);
    const setTsStatus = useStore((state) => state.setTsStatus);

    const runSubmit =() => {
        console.log("masuk GoSubmit")
        submitTimesheet(token)
        setTsStatus(true);
    }
    
    const items = [
        {
            label: (
                <div 
                onClick={() => {
                    runSubmit()
                    setTsStatus(true)
                }}
                className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white  dark:bg-stone-700">
                    <div>Submit All</div>
                </div>
            ),
            key: "0",
        },
        {
            label: (
                <div 
                className=" px-4 py-3 text-sm font-medium text-gray-400 dark:text-white  dark:bg-stone-700">
                    <div>Selected Only</div>
                </div>
            ),
            key: "1",
            disabled: true,
        },
    ];

    useEffect(() => {
  
    }, [
        tsStatus
    ]);

    return (
        <Dropdown
            className="ml-4 cursor-pointer bg-yellow-400 hover:bg-yellow-300 text-white font-bold border-b-4 border-yellow-700 hover:border-yellow-400 rounded-xl hover:shadow-inner transition duration-200 ease-in-out  transform hover:-translate-x hover:scale-105"
            menu={{ items }}
            trigger={["click"]}
            onClick={(e) => e.preventDefault()}
        >
            <Space>
                <label
                    className="ml-5 cursor-pointer focus:ring-4 focus:outline-nonetext-center inline-flex items-center py-2"
                >
                    <svg
                        className="w-5 h-5 mr-2 -ml-1 text-white"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        id="Layer_1"
                        data-name="Layer 1"
                        viewBox="0 0 24 24"
                        width="512"
                        height="512"
                    >
                        <path d="m0,19c0,2.757,2.243,5,5,5h14c2.757,0,5-2.243,5-5v-9H0v9Zm8.293-3.521l1.613-1.613c.577-.577,1.336-.866,2.094-.866s1.517.289,2.094.866l1.613,1.613c.391.391.391,1.023,0,1.414s-1.023.391-1.414,0l-1.293-1.293v4.398c0,.553-.447,1-1,1s-1-.447-1-1v-4.398l-1.293,1.293c-.391.391-1.023.391-1.414,0s-.391-1.023,0-1.414Zm15.707-8.479v1H0v-1C0,4.243,2.243,2,5,2h1v-1c0-.552.448-1,1-1s1,.448,1,1v1h8v-1c0-.552.448-1,1-1s1,.448,1,1v1h1c2.757,0,5,2.243,5,5Z" />
                    </svg>
                    Submit!!
                </label>
                <DownOutlined className="mr-4 pb-1 font-bold" />
            </Space>
        </Dropdown>
    );
}

export default GoSubmit;
