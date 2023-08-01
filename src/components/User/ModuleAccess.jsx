import React, { useState } from "react";
import { useStore } from "../../store/zustand";
import {
    FaTag,
    FaPen,
    FaTrash,
    FaCheck,
    FaTimes,
    FaGripHorizontal,
} from "react-icons/fa";

import {
    AppstoreOutlined,
    MailOutlined,
    SettingOutlined,
} from "@ant-design/icons";
import { Menu, Switch } from "antd";
function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const items = [
    getItem("Navigation One", "sub1", <MailOutlined />, [
        getItem("Option 1", "1"),
        getItem("Option 2", "2"),
        getItem("Option 3", "3"),
        getItem("Option 4", "4"),
    ]),
    getItem("Navigation Two", "sub2", <AppstoreOutlined />, [
        getItem("Option 5", "5"),
        getItem("Option 6", "6"),
        getItem("Submenu", "sub3", null, [
            getItem("Option 7", "7"),
            getItem("Option 8", "8"),
        ]),
    ]),
    getItem("Navigation Three", "sub4", <SettingOutlined />, [
        getItem("Option 9", "9"),
        getItem("Option 10", "10"),
        getItem("Option 11", "11"),
        getItem("Option 12", "12"),
    ]),
];

export default function ModuleAccess() {
    const setShowModAccess = useStore((state) => state.setShowModAccess);
    const [theme, setTheme] = useState("dark");
    const [current, setCurrent] = useState("1");
    const changeTheme = (value) => {
        setTheme(value ? "dark" : "light");
    };
    const onClick = (e) => {
        console.log("click ", e);
        setCurrent(e.key);
    };

    return (
        <div className=" md:flex-row  flex flex-col fixed min-h-screen w-full z-20 bg-stone-800 bg-opacity-90 left-0 top-0 justify-center items-center">
            <div className=" bg-gray-100 w-[100vh] lg:w-[80vh] md:w-[60vh] sm:w-[40vh] rounded-xl">
                <header className="flex flex-÷wrap lg:flex-wrap-reverse md:flex-wrap sm:flex-wrap z-30 py-2 px-4 text-center  bg-gray-200 rounded-t-xl justify-between items-center">
                    <div className=" bg-blue-400 w-full flex justify-end p-2">
                        <div className="flex justify-start">
                            <Switch
                            className="bg-gray-400"
                                checked={theme === "dark"}
                                onChange={changeTheme}
                                checkedChildren="Dark"
                                unCheckedChildren="Light"
                            />
                        </div>
                        <div>middle</div>
                        <button
                            className="flex justify-end align-middle text-white font-bold w-10 rounded-xl"
                            onClick={() => setShowModAccess(false)}
                        >
                            <span className=" cursor-pointer text-gray-400">
                                <FaTimes />
                            </span>
                        </button>
                    </div>
                </header>

                <div className="w-full h-[600px] overflow-y-auto shadow dark:bg-stone-800 rounded-b-xl">
                   
                    <Menu
                        theme={theme}
                        onClick={onClick}
                        style={{
                            width: 256,
                        }}
                        defaultOpenKeys={["sub1"]}
                        selectedKeys={[current]}
                        mode="inline"
                        items={items}
                    />
                </div>
            </div>
        </div>
    );
}
