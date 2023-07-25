import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";

import {
    AppstoreOutlined,
    MailOutlined,
    SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
const itemsOld = [
    {
        label: "Navigation One",
        key: "mail",
        icon: <MailOutlined />,
    },
    {
        label: "Navigation Two",
        key: "app",
        icon: <AppstoreOutlined />,
        // disabled: true,
    },
    {
        label: "Navigation Three - Submenu",
        key: "SubMenu",
        icon: <SettingOutlined />,
        children: [
            {
                type: "group",
                label: "Item 1",
                children: [
                    {
                        label: "Option 1",
                        key: "setting:1",
                    },
                    {
                        label: "Option 2",
                        key: "setting:2",
                    },
                ],
            },
            {
                type: "group",
                label: "Item 2",
                children: [
                    {
                        label: "Option 3",
                        key: "setting:3",
                    },
                    {
                        label: "Option 4",
                        key: "setting:4",
                    },
                ],
            },
        ],
    },
    {
        label: <div>Navigation Four - Link</div>,
        key: "alipay",
    },
];



const CollapseNav = () => {
    
    const [current, setCurrent] = useState("mail");
    const onClick = (e) => {
        console.log("click ", e);
        setCurrent(e.key);
    };
    
    const navParent = "m-2";
    const navChild =
        "m-2 xl:w-1/6 md:w-2/6 sm:w-3/6 bg-blue-500 hover:bg-blue-400 text-white font-bold py-3 px-4 border-2 border-b-4 border-blue-700 hover:border-blue-500 rounded-xl hover:shadow-inner transition duration-200 ease-in-out  transform hover:-translate-x hover:scale-105";
    const navChildSignin =
        "m-2 xl:w-1/6 md:w-2/6 sm:w-3/6 text-white font-bold py-3 px-4 border-b-4 bg-green-500 hover:bg-green-400 border-2 border-green-700 hover:border-green-500 rounded-xl hover:shadow-inner transition duration-200 ease-in-out  transform hover:-translate-x hover:scale-105";
    

    const items = [
        {
            label: (
                <Link className={navChild} to={"/"}>
                    Home
                </Link>
            ),
            key: "home",
        },
        {
            label: (
                <Link className={navChildSignin} to={"/signin"}>
                                Sign In
                            </Link>
            ),
            key: "signin",
        },
        {
            label: (
                <Link className={navChild} to={"/project"}>
                                    Project
                                </Link>
            ),
            key: "project",
        },
        {
            label: (
                <Link className={navChild} to={"/timesheet"}>
                Timesheet
            </Link>
            ),
            key: "timesheet",
        },
    ];

   
        return (
        <div style={{ display: "flex" }}>
            {/* <div style={sharedStyle} /> */}
            <Menu
                style={{ flex: "auto", minWidth: 0 }}
                mode="horizontal"
                items={items}
                onClick={onClick}
                selectedKeys={[current]}
            />
            {/* <div style={sharedStyle} /> */}
        </div>
    );
};
export default CollapseNav;
