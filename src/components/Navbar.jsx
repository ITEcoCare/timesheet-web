import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useStore } from "../store/zustand";
import ava from "../assets/cak_lontong02.jpeg";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import ProfileModal from "./User/ProfileModal";

const Navbar = () => {
    // state
    const [theme, setTheme] = useState(localStorage.getItem("theme"));
    
    //zustand 
    const setTema = useStore((state) => state.setTema);
    const initialState = useStore((state) => state.initialState);
    const userInfo = useStore((state) => state.userInfo);
    const logout = useStore((state) => state.logout);
    const showProfileModal = useStore((state) => state.showProfileModal);
    const setShowProfileModal = useStore((state) => state.setShowProfileModal);

    const accessToken = localStorage.getItem("accessToken");
    const myUser = JSON.parse(localStorage.getItem("account"));
    // const userData = JSON.parse(localStorage.getItem("account"));

    // console.log(userInfo);

    const handleThemeSwitch = () => {
        setTheme(theme === "dark" ? "light" : "dark");
        setTema(theme);
    };

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [theme]);

    // const islogout = () => logout();

    const sun = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="white"
            className="w-6 h-6"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
            />
        </svg>
    );

    const moon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="white"
            className="w-6 h-6"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
            />
        </svg>
    );

    const items = [
        {
            label: (
                <div 
                    className="px-4 py-3 text-base font-medium text-gray-900 dark:text-white  dark:bg-stone-700"
                    onClick={()=> { setShowProfileModal(true) }}
                >
                    Profile
                </div>
            ),
            key: "0",
        },
        {
            label: (
                <div 
                className="px-4 py-3 text-base font-medium text-gray-900 dark:text-white  dark:bg-stone-700"
                // onClick={()=> { setShowProfileModal(true) }}
            >
                Settings
            </div>
            ),
            key: "1",
        },
        {
            type: "divider",
        },
        {
            label: (
                <button
                    className=" w-full bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded-xl hover:shadow-inner transition duration-200 ease-in-out  transform hover:-translate-x hover:scale-105"
                    onClick={() => logout(accessToken)}
                >
                    Sign out
                </button>
            ),
            key: "3",
        },
    ];

    const navParent = "m-2"
    const navChild = "m-2 xl:w-1/6 md:w-2/6 sm:w-3/6 bg-blue-500 hover:bg-blue-400 text-white font-bold py-3 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded-xl hover:shadow-inner transition duration-200 ease-in-out  transform hover:-translate-x hover:scale-105"
    const navChildSignin = "m-2 xl:w-1/6 md:w-2/6 sm:w-3/6 text-white font-bold py-3 px-4 border-b-4 bg-green-500 hover:bg-green-400 border-green-700 hover:border-green-500 rounded-xl hover:shadow-inner transition duration-200 ease-in-out  transform hover:-translate-x hover:scale-105"

    return (
        <div className="flex flex-col mt-2 fixed z-20 md:flex-row items-center justify-center">
            <div className="flex flex-wrap mt-4 md:flex-row items-center justify-center ">
                <div>
                    <Link
                        className={navChild}
                        to={"/"}
                    >
                        Home
                    </Link>
                </div>
                {!initialState._isLoggedIn ? (
                    <div>
                        <Link
                            className={navChildSignin}
                            to={"/signin"}
                        >
                            Sign In
                        </Link>
                    </div>
                ) : (
                    <>
                        <div>
                            <Link
                                className={navChild}
                                to={"/project"}
                            >
                                Project
                            </Link>
                        </div>
                        <div>
                            <Link
                                className={navChild}
                                to={"/timesheet"}
                            >
                                Timesheet
                            </Link>
                        </div>
                        <div>
                            { myUser.employee_lead && <Link
                                className={navChild}
                                to={"/my-approval"}
                            >
                                My Approval
                            </Link> 
                            }
                        </div>
                        {/* <div>
                            <Link
                                className={navChild}
                                to={"/calendar"}
                            >
                                Calendar
                            </Link>
                        </div> */}
                        <div>
                            <Link
                                className={navChild}
                                to={"/employee"}
                            >
                                Employee
                            </Link>
                        </div>
                        {/* <div>
                            <Link
                                className={navChild}
                                to={"/tempo"}
                            >
                                Tempo
                            </Link>
                        </div> */}
                    </>
                )}
            </div>
            <div className="fixed rounded-lg p-2 z-20 flex items-center space-x-4 right-10 mt-4">
                <button
                    type="button"
                    onClick={handleThemeSwitch}
                    className="rounded-lg bg-gray-500 p-2 dark:bg-green-500"
                >
                    {theme === "dark" ? sun : moon}
                </button>
                {initialState._isLoggedIn && (
                    <Dropdown
                        className="cursor-pointer"
                        menu={{ items }}
                        trigger={["click"]}
                        onClick={(e) => e.preventDefault()}
                    >
                        <Space>
                            <img
                                id="avatarButton"
                                type="button"
                                data-dropdown-toggle="userDropdown"
                                data-dropdown-placement="bottom-start"
                                className="w-10 h-10 rounded-lg cursor-pointer"
                                src={ava}
                                alt="User dropdown"
                            />
                            <div className="text-base font-medium text-left dark:text-white">
                                <div>
                                    {
                                        myUser.employee_fullname
                                        ? myUser.employee_fullname
                                        : "Root"
                                    }
                                </div>
                                <div className="text-sm text-stone-500 dark:text-stone-200">
                                    {`${
                                        myUser.employee_branch
                                        ? myUser.employee_branch
                                        : "HO"
                                    } | ${
                                        myUser.employee_job_title_name 
                                        ? myUser.employee_job_title_name
                                        : 'Developer' }`
                                    }
                                </div>
                            </div>
                            <DownOutlined />
                        </Space>
                    </Dropdown>
                )}
            </div>
        </div>
    );
};

export default Navbar;
