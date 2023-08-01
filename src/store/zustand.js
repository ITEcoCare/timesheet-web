import dayjs from "dayjs";
import { create } from "zustand";
import { getMonth } from "../utils/util";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import {
    FaTimes,
    FaTrash,
    FaGripHorizontal,
    FaRegClock,
    FaTag,
    FaPen,
    FaRegFlag,
    FaSeedling,
    FaCheck,
    FaCheckCircle,
  } from "react-icons/fa";

import { useReducer } from "react";
import axios from "axios";
const url2 = import.meta.env.VITE_API_URL; // const url2 = 'http://mstation.tukangbersih.com/index.php/api/auth/login'

const accessToken = localStorage.getItem("accessToken");

const isi_imgUrl =
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60";
const isi_user = {
    name: "Super Admin",
    age: 29,
    email: "eco@ecocare.id",
    title: "Regional Paradigm Technician",
    department: "Optimization",
    status: "Active",
    role: "Admin",
    imgUrl: isi_imgUrl,
};

const savedEventsReducer = (state, { type, payload }) => {
    switch (type) {
        case "push":
            return [...state, payload];
        case "update":
            return state.map(() => (evt.id === payload.id ? payload : evt));
        case "delete":
            return [...state, payload];
        default:
            throw new Error();
    }
};

const toastContent = {
    duration: 2000,
    position: "bottom-center",
    style: {
        color: "#000000",
        padding: "10px",
        marginRight: "22px",
        marginBottom: "40px",
        backgroundColor: "#f3f4f6",
        borderColor: "#9ca3af",
        borderRadius: "12px",
        borderBottomWidth: "4px",
        minWidth: "400px",
    },
};

export const useStore = create((set) => ({
    count: 0,
    countPlus: () => set((state) => ({ count: state.count + 1 })),
    countMinus: () => set((state) => ({ count: state.count - 1 })),
    countReset: () => set({ count: 0 }),

    flagDelete: false,
    flagSignOut: false,
    // setFlagDelete: () => set((state) => ({ flagDelete: true })),

    //user
    userInfo: {},

    //Login Signin
    initialState: accessToken
        ? { _isLoggedIn: true, accessToken, user: isi_user }
        : { _isLoggedIn: false, accessToken: null, user: null },
    post: (values) => {
        console.log("values==> ", values);
        axios
            .post(`${url2}auth/signin`, {
                email: values.username, // "root@ecocare.id"
                password: values.password, //"Rahasia*1!"
            })
            .then(function (res) {
                let rd = res.data.result
                localStorage.setItem( "account", JSON.stringify(rd.account));
                console.log("isi rd ==>", rd);
                
                if (res.data.success && values.username) {
                    set({
                        initialState: {
                            _isLoggedIn: true,
                            user: localStorage.setItem( "user", rd.account.user_id),
                            accessToken: localStorage.setItem("accessToken", rd.meta.access_token ),
                        },
                        userInfo: {
                            company_id: 2, //hard code
                            module_access: rd.account.module_access,
                            user_email: rd.account.user_email,
                            user_id: rd.account.user_id,
                            user_last_login_at: rd.account.user_last_login_at ,
                            user_role_description: rd.account.user_role_description , 
                            user_role_display_name: rd.account.user_role_display_name ,
                            user_role_id: rd.account.user_role_id ,
                            user_role_name: rd.account.user_role_name,
                            employee_avatar: rd.account.employee_avatar,
                            employee_id: rd.account.employee_id,
                            employee_nik: rd.account.employee_nik,
                            employee_fullname: rd.account.employee_fullname || 'Root',
                            employee_gender: rd.account.employee_gender,
                            employee_company_code: rd.account.employee_company_code,
                            employee_company_name: rd.account.employee_company_name,
                            employee_branch_id: rd.account.employee_branch_id,
                            employee_branch: rd.account.employee_branch || 'HO',
                            employee_branch_name: rd.account.employee_branch_name,
                            employee_department_code: rd.account.employee_department_code,
                            employee_job_title_name: rd.account.employee_job_title_name || 'Developer',
                            access_token: rd.meta.access_token,
                            employee_job_type_code: rd.account.employee_job_type_code || '-', 
                            employee_job_type_name: rd.account.employee_job_type_name || '-', 
                            employee_join_date: rd.account.employee_join_date || '-',
                        },
                    });
                    toast(`Selamat! Anda berhasil login ✨`, {
                      type: "success",
                      theme: localStorage.getItem('theme') == 'light' ? 'light' : 'dark',
                      closeButton: false,
                      position: 'bottom-center',
                      hideProgressBar: false,
                      className: `rounded-xl drop-shadow-2xl bg-opacity-25`,
                      style: {
                        width: "100%",
                        'borderRadius':'15px',
                        'marginBottom': '40px',
                      },
                    })
                } else {
                    toast.error( "Pastikan semua informasi terisi",
                        toastContent
                    );
                }
            })
            .catch((error) => {
                console.log("errorr ==>>", error);
                toast.error("Mohon isi informasi login dengan benar",
                    toastContent
                );
            });
    },
    userUpdate: async(token, values) => {

        // console.log("values useupdt >>", values)
        try {

            const rc = await axios.post(`${url2}user/update`,
                {
                    id: values.id,
                    email: values.email,
                    password: values.password
                }, 
                {
                    headers: { Authorization: `bearer ${token}`},
                }
            )
            toast(`Sukses update user 👍`, {
                type: "success",
                theme: localStorage.getItem('theme') == 'light' ? 'light' : 'dark',
                position: 'bottom-center',
                // className: `rounded-xl drop-shadow-2xl bg-opacity-25`,
                // closeButton: false,
                // hideProgressBar: false,
                // style: {
                //   width: "100%",
                //   'borderRadius':'15px',
                //   'marginBottom': '40px',
                // },
            })
            return rc
        } catch (error) {
            console.log(error)
            toast(`Unauthorized User`, {
                type: "error",
                theme: localStorage.getItem('theme') == 'light' ? 'light' : 'dark',
                position: 'bottom-center',
                // closeButton: false,
                // hideProgressBar: false,
                // className: `rounded-xl drop-shadow-2xl bg-opacity-25`,
                // style: {
                //   width: "100%",
                //   'borderRadius':'15px',
                //   'marginBottom': '40px',
                // },
            })
        }

    },
    logout: async (token) => {
        set({flagSignOut: true})
        if (localStorage.getItem("accessToken") == null ){
            localStorage.clear();
            set({flagSignOut: true})
            toast.error("User timeout!", toastContent);
            setTimeout(function(){
                window.location.href = "/signin";
            }, 3000);
        } else {
            console.log("masuk bawah")
            try {
                const rs = await axios.post(`${url2}auth/signout`, {}, {
                    headers: { Authorization: `bearer ${token}`},
                })
                localStorage.clear();
                set({flagSignOut: true})
                toast("👋🏻 Logging out... ", {
                    autoClose: 2000,
                    type: "info",
                    theme: localStorage.getItem('theme') == 'light' ? 'dark' : 'light',
                    closeButton: false,
                    position: 'bottom-center',
                    hideProgressBar: false,
                    className: `rounded-xl drop-shadow-2xl bg-opacity-25`,
                    style: {
                      width: "100%",
                      'borderRadius':'15px',
                      'marginBottom': '40px',
                    },
                })
                setTimeout(function(){
                    window.location.href = "/signin";
                }, 3000);
                // return Promise.resolve(rs)
            } catch (error) {
                console.log("masuk error logout", error);
                localStorage.clear();
                setTimeout(function(){ window.location.href = "/signin"; }, 3000);

            }
        }
    },
    loggedIn: true,
    clickLogIn: () => set((state) => ({ loggedIn: true })),
    namaLogin: null,
    tema: 'light',
    setTema: (val) => { set((state) => ({ theme: val})) },

    currTimesheet: [],
    getTimesheet: async (token, inputs) => {

        console.log("inputssss", inputs)

        try {
            const result = await axios.post(`${url2}timesheet/my-timesheet`, 
            {
                date: inputs 
            },
            {
                headers: {Authorization: `bearer ${token}`},
            }
            );
            
            return Promise.resolve(result.data);
        } catch (error) {
            console.log(error);
        }
    },
    getMyApproval: async (token, inputs) => {
        try {
            const result = await axios.post(`${url2}timesheet/my-approval`, 
            {
                date: inputs 
            },
            {
                headers: {Authorization: `bearer ${token}`},
            }
            );
            return Promise.resolve(result.data);
        } catch (error) {
            console.log(error);
        }
    },
    createTimesheet: async (token, val) => {
        
        try {
            const rc = await axios.post(`${url2}timesheet/create`,
                {
                    project_id: val.project_id,
                    tag_id: Number(val.tag_id),
                    duration: Number(val.duration),
                    work_date: val.work_date,
                    description: val.description
                }, 
                {
                    headers: { Authorization: `bearer ${token}`},
                }
            )

            toast(`Sukses membuat timesheet! 👍`, {
                type: "success",
                theme: localStorage.getItem('theme') == 'light' ? 'light' : 'dark',
                closeButton: false,
                position: 'bottom-center',
                hideProgressBar: false,
                className: `rounded-xl drop-shadow-2xl bg-opacity-25`,
                style: {
                  width: "100%",
                  'borderRadius':'15px',
                  'marginBottom': '40px',
                },
            })

            return rc

        } catch (error) {
            console.log(error)
        }
    },
    submitTimesheet: async(token) => {
        console.log(token)
        try {
            const rc = await axios.post(`${url2}timesheet/submit`,
                { }, 
                {
                    headers: { Authorization: `bearer ${token}`},
                }
            )
            toast(`Timesheet submitted! 👍`, {
                icon: "🚀",
                type: "warning",
                theme: localStorage.getItem('theme') == 'light' ? 'light' : 'dark',
                closeButton: false,
                position: 'bottom-center',
                hideProgressBar: false,
                className: `rounded-xl drop-shadow-2xl bg-opacity-25`,
                style: {
                  width: "100%",
                  'borderRadius':'15px',
                  'marginBottom': '40px',
                },
            })
            set({ setTsStatus: true })

            return rc

        } catch (error) {
            console.log(error)
        }
    },
    submitSlcTimesheet: async(token, val, bool) => {
        let temp = []
        for (let j = 0; j < val.length; j++) temp.push(val[j].timesheet_id)
        
        try {
            const rc = await axios.post(`${url2}timesheet/save`,
                {
                    action: "submit",
                    timesheet_id: temp
                }, 
                {
                    headers: { Authorization: `bearer ${token}`},
                }
            )

            // set({ setTsStatus: false })
            toast(`Timesheet submitted! 👍`, {
                icon: "🚀",
                autoClose: 1500,
                type: "warning",
                theme: localStorage.getItem('theme') == 'light' ? 'light' : 'dark',
                closeButton: false,
                position: 'bottom-center',
                hideProgressBar: false,
                className: `rounded-xl drop-shadow-2xl bg-opacity-25`,
                style: {
                  width: "100%",
                  'borderRadius':'15px',
                  'marginBottom': '40px',
                },
            })
            // setTimeout(function(){ window.location.href = "/timesheet"; }, 2000);

            return rc

        } catch (error) {
            console.log(error)
        }
    }, 
    updateTimesheet: async (token, val)=> {
        try {
            const rc = await axios.post(`${url2}timesheet/update`,
                {
                    timesheet_id: val.timesheet_id,
                    project_id: val.project_id,
                    tag_id: val.tag_id,
                    duration: val.duration,
                    work_date: val.work_date,
                    description: val.description,
                },
                {
                    headers: { Authorization: `bearer ${token}`},
                }
            )
            
            toast(`Timesheet berhasil ter-update.`, {
                autoClose: 1500,
                type: "success",
                theme: localStorage.getItem('theme') == 'light' ? 'light' : 'dark',
                closeButton: false,
                position: 'bottom-center',
                hideProgressBar: false,
                className: `rounded-xl drop-shadow-2xl bg-opacity-25`,
                style: {
                    width: "100%",
                    'borderRadius':'15px',
                    'marginBottom': '40px',
                },
            })
            
            return rc.data;
        } catch (error) {
            if (val.timesheet_status != 0 ) {
                toast(`Anda hanya dapat merubah isi timesheet saat masih berstatus Draft.`, {
                    type: "error",
                    theme: localStorage.getItem('theme') == 'light' ? 'light' : 'dark',
                    closeButton: false,
                    position: 'bottom-center',
                    hideProgressBar: false,
                    className: `rounded-xl drop-shadow-2xl bg-opacity-25`,
                    style: {
                      width: "100%",
                      'borderRadius':'15px',
                      'marginBottom': '40px',
                    },
                })
                console.log(error)
            }

        }
    },
    deleteTimesheet: async (token, val)=> {
        try {
            const rc = await axios.post(`${url2}timesheet/delete`,
                {
                    timesheet_id: val.timesheet_id,
                    project_id: val.project_id,
                    tag_id: val.tag_id,
                    duration: val.duration,
                    work_date: val.work_date,
                    description: val.description,
                },
                {
                    headers: { Authorization: `bearer ${token}`},
                }
            )
            
            toast(`Timesheet berhasil ter-update.`, {
                autoClose: 1500,
                type: "success",
                theme: localStorage.getItem('theme') == 'light' ? 'light' : 'dark',
                closeButton: false,
                position: 'bottom-center',
                hideProgressBar: false,
                className: `rounded-xl drop-shadow-2xl bg-opacity-25`,
                style: {
                    width: "100%",
                    'borderRadius':'15px',
                    'marginBottom': '40px',
                },
            })
            
            return rc.data;
        } catch (error) {
            if (val.timesheet_status != 0 ) {
                toast(`Anda hanya dapat merubah isi timesheet saat masih berstatus Draft.`, {
                    type: "error",
                    theme: localStorage.getItem('theme') == 'light' ? 'light' : 'dark',
                    closeButton: false,
                    position: 'bottom-center',
                    hideProgressBar: false,
                    className: `rounded-xl drop-shadow-2xl bg-opacity-25`,
                    style: {
                      width: "100%",
                      'borderRadius':'15px',
                      'marginBottom': '40px',
                    },
                })
                console.log(error)
            }

        }
    },
    createAWeek: (values) => {
        console.log("masuk create a week");
    },
    approveTimesheet: async (token, val) => {
        // console.log("masuk approved",  val[0].employee_id,  val[0].timesheet_work_date)
        try {
            const rc = await axios.post(`${url2}timesheet/approve`,
                {
                    employee_id: val[0].employee_id,
                    work_date: val[0].timesheet_work_date
                }, 
                {
                    headers: { Authorization: `bearer ${token}`},
                }
            )
            // console.log("hasil apv ts", rc)
            set({ setTsRejStatus: false })
            toast(`${rc.data.message} 👍`, {
                type: "success",
                theme: localStorage.getItem('theme') == 'light' ? 'light' : 'dark',
                closeButton: false,
                position: 'bottom-center',
                hideProgressBar: false,
                className: `rounded-xl drop-shadow-2xl bg-opacity-25`,
                style: {
                  width: "100%",
                  'borderRadius':'15px',
                  'marginBottom': '40px',
                },
            })
            return rc

        } catch (error) {
            if (val.timesheet_status == 1) {
                toast(`Anda tidak memiliki wewenang terhadap timesheet ini!`, {
                    type: "error",
                    theme: localStorage.getItem('theme') == 'light' ? 'light' : 'dark',
                    closeButton: false,
                    position: 'bottom-center',
                    hideProgressBar: false,
                    className: `rounded-xl drop-shadow-2xl bg-opacity-25`,
                    style: {
                      width: "100%",
                      'borderRadius':'15px',
                      'marginBottom': '40px',
                    },
                })
                console.log(error)
            } else if (val.timesheet_status == 0){
                toast(`timesheet ini belum dapat di approve...`, {
                    type: "info",
                    theme: localStorage.getItem('theme') == 'light' ? 'light' : 'dark',
                    closeButton: false,
                    position: 'bottom-center',
                    hideProgressBar: false,
                    className: `rounded-xl drop-shadow-2xl bg-opacity-25`,
                    style: {
                      width: "100%",
                      'borderRadius':'15px',
                      'marginBottom': '40px',
                    },
                })
                console.log(error)

            } else {
                toast(`timesheet ini sudah pernah di approve.`, {
                    type: "warning",
                    theme: localStorage.getItem('theme') == 'light' ? 'light' : 'dark',
                    closeButton: false,
                    position: 'bottom-center',
                    hideProgressBar: false,
                    className: `rounded-xl drop-shadow-2xl bg-opacity-25`,
                    style: {
                      width: "100%",
                      'borderRadius':'15px',
                      'marginBottom': '40px',
                    },
                })
                console.log(error)

            }
        }
    },
    approveSlcTimesheet: async (token, val) => {
        let temp = []
        for (let j = 0; j < val.length; j++) temp.push(val[j].timesheet_id)
        console.log("masuk Slc approved",  temp)
        // set({ setTsApvStatus: false })
        
        try {
            const rc = await axios.post(`${url2}timesheet/save`,
                {
                    action: "approve",
                    timesheet_id: temp
                }, 
                {
                    headers: { Authorization: `bearer ${token}`},
                }
            )
            // set({ setTsApvStatus: false })
            toast(`${rc.data.message} 👍`, {
                type: "success",
                autoClose: 1500,
                theme: localStorage.getItem('theme') == 'light' ? 'light' : 'dark',
                closeButton: false,
                position: 'bottom-center',
                hideProgressBar: false,
                className: `rounded-xl drop-shadow-2xl bg-opacity-25`,
                style: {
                  width: "100%",
                  'borderRadius':'15px',
                  'marginBottom': '40px',
                },
            })
            // setTimeout(function(){ window.location.href = "/timesheet"; }, 2000);
            return rc

        } catch (error) {
            if (val.timesheet_status == 1) {
                toast(`Anda tidak memiliki wewenang terhadap timesheet ini!`, {
                    type: "error",
                    theme: localStorage.getItem('theme') == 'light' ? 'light' : 'dark',
                    closeButton: false,
                    position: 'bottom-center',
                    hideProgressBar: false,
                    className: `rounded-xl drop-shadow-2xl bg-opacity-25`,
                    style: {
                      width: "100%",
                      'borderRadius':'15px',
                      'marginBottom': '40px',
                    },
                })
                console.log(error)
            } else if (val.timesheet_status == 0){
                toast(`timesheet ini belum dapat di approve...`, {
                    type: "info",
                    theme: localStorage.getItem('theme') == 'light' ? 'light' : 'dark',
                    closeButton: false,
                    position: 'bottom-center',
                    hideProgressBar: false,
                    className: `rounded-xl drop-shadow-2xl bg-opacity-25`,
                    style: {
                      width: "100%",
                      'borderRadius':'15px',
                      'marginBottom': '40px',
                    },
                })
                console.log(error)

            } else {
                toast(`timesheet ini sudah pernah di approve.`, {
                    type: "warning",
                    theme: localStorage.getItem('theme') == 'light' ? 'light' : 'dark',
                    closeButton: false,
                    position: 'bottom-center',
                    hideProgressBar: false,
                    className: `rounded-xl drop-shadow-2xl bg-opacity-25`,
                    style: {
                      width: "100%",
                      'borderRadius':'15px',
                      'marginBottom': '40px',
                    },
                })
                console.log(error)

            }
        }
    },
    rejectTimesheet: async (token, val) => {
        console.log("masuk rejected", val[0].employee_id)
        try {
            const rc = await axios.post(`${url2}timesheet/reject`,
                {
                    employee_id:  val[0].employee_id,
                    work_date:  val[0].timesheet_work_date
                }, 
                {
                    headers: { Authorization: `bearer ${token}`},
                }
            )
            set({ setTsRejStatus: true })
            toast(`${rc.data.message}... 👍`, {
                type: "warning",
                theme: localStorage.getItem('theme') == 'light' ? 'light' : 'dark',
                closeButton: false,
                position: 'bottom-center',
                hideProgressBar: false,
                className: `rounded-xl drop-shadow-2xl bg-opacity-25`,
                style: {
                  width: "100%",
                  'borderRadius':'15px',
                  'marginBottom': '40px',
                },
            })
            return rc

        } catch (error) {
            if (val.timesheet_status == 1) {
                toast(`Anda tidak memiliki wewenang terhadap timesheet ini!`, {
                    type: "error",
                    theme: localStorage.getItem('theme') == 'light' ? 'light' : 'dark',
                    closeButton: false,
                    position: 'bottom-center',
                    hideProgressBar: false,
                    className: `rounded-xl drop-shadow-2xl bg-opacity-25`,
                    style: {
                      width: "100%",
                      'borderRadius':'15px',
                      'marginBottom': '40px',
                    },
                })
                console.log(error)
            } else if (val.timesheet_status == 0){
                toast(`timesheet ini belum dapat di reject...`, {
                    type: "info",
                    theme: localStorage.getItem('theme') == 'light' ? 'light' : 'dark',
                    closeButton: false,
                    position: 'bottom-center',
                    hideProgressBar: false,
                    className: `rounded-xl drop-shadow-2xl bg-opacity-25`,
                    style: {
                      width: "100%",
                      'borderRadius':'15px',
                      'marginBottom': '40px',
                    },
                })
                console.log(error)

            } else if (val.timesheet_status == 3){
                toast(`timesheet ini sudah pernah di reject.`, {
                    type: "warning",
                    theme: localStorage.getItem('theme') == 'light' ? 'light' : 'dark',
                    closeButton: false,
                    position: 'bottom-center',
                    hideProgressBar: false,
                    className: `rounded-xl drop-shadow-2xl bg-opacity-25`,
                    style: {
                      width: "100%",
                      'borderRadius':'15px',
                      'marginBottom': '40px',
                    },
                })
                console.log(error)
            } else {
                toast(`timesheet ini sudah di approve.`, {
                    type: "warning",
                    theme: localStorage.getItem('theme') == 'light' ? 'light' : 'dark',
                    closeButton: false,
                    position: 'bottom-center',
                    hideProgressBar: false,
                    className: `rounded-xl drop-shadow-2xl bg-opacity-25`,
                    style: {
                      width: "100%",
                      'borderRadius':'15px',
                      'marginBottom': '40px',
                    },
                })
                console.log(error)
            }
        }
    },
    rejectSlcTimesheet: async (token, val) => {
        let temp = []
        for (let j = 0; j < val.length; j++) temp.push(val[j].timesheet_id)
        console.log("masuk Slc reject",  temp)
        try {
            const rc = await axios.post(`${url2}timesheet/save`,
            {
                action: "reject",
                timesheet_id: temp
            },  
                {
                    headers: { Authorization: `bearer ${token}`},
                }
            )
            set({ setTsRejStatus: false })
            toast(`${rc.data.message}... 👍`, {
                type: "warning",
                theme: localStorage.getItem('theme') == 'light' ? 'light' : 'dark',
                closeButton: false,
                position: 'bottom-center',
                hideProgressBar: false,
                className: `rounded-xl drop-shadow-2xl bg-opacity-25`,
                style: {
                  width: "100%",
                  'borderRadius':'15px',
                  'marginBottom': '40px',
                },
            })
            return rc

        } catch (error) {
            if (val.timesheet_status == 1) {
                toast(`Anda tidak memiliki wewenang terhadap timesheet ini!`, {
                    type: "error",
                    theme: localStorage.getItem('theme') == 'light' ? 'light' : 'dark',
                    closeButton: false,
                    position: 'bottom-center',
                    hideProgressBar: false,
                    className: `rounded-xl drop-shadow-2xl bg-opacity-25`,
                    style: {
                      width: "100%",
                      'borderRadius':'15px',
                      'marginBottom': '40px',
                    },
                })
                console.log(error)
            } else if (val.timesheet_status == 0){
                toast(`timesheet ini belum dapat di reject...`, {
                    type: "info",
                    theme: localStorage.getItem('theme') == 'light' ? 'light' : 'dark',
                    closeButton: false,
                    position: 'bottom-center',
                    hideProgressBar: false,
                    className: `rounded-xl drop-shadow-2xl bg-opacity-25`,
                    style: {
                      width: "100%",
                      'borderRadius':'15px',
                      'marginBottom': '40px',
                    },
                })
                console.log(error)

            } else if (val.timesheet_status == 3){
                toast(`timesheet ini sudah pernah di reject.`, {
                    type: "warning",
                    theme: localStorage.getItem('theme') == 'light' ? 'light' : 'dark',
                    closeButton: false,
                    position: 'bottom-center',
                    hideProgressBar: false,
                    className: `rounded-xl drop-shadow-2xl bg-opacity-25`,
                    style: {
                      width: "100%",
                      'borderRadius':'15px',
                      'marginBottom': '40px',
                    },
                })
                console.log(error)
            } else {
                toast(`timesheet ini sudah di approve.`, {
                    type: "warning",
                    theme: localStorage.getItem('theme') == 'light' ? 'light' : 'dark',
                    closeButton: false,
                    position: 'bottom-center',
                    hideProgressBar: false,
                    className: `rounded-xl drop-shadow-2xl bg-opacity-25`,
                    style: {
                      width: "100%",
                      'borderRadius':'15px',
                      'marginBottom': '40px',
                    },
                })
                console.log(error)
            }
        }
    },
    
    
    getProject: async (token)=> {
        try {
            const resPro = await axios.get(`${url2}project/assign/read`, { 
                // const resPro = await axios.get(`${url2}project/read`, { 
                headers: { Authorization: `bearer ${token}`},
            })
            // console.log("isi get project", resPro)
            return Promise.resolve(resPro)
        } catch (error) {
            console.log(error);
        }
    },
    getProjectAllUser: async (token)=> {
        try {
            const rez = await axios.get(`${url2}project/read`, { 
                headers: { Authorization: `bearer ${token}`},
            })
            return rez

        } catch (error) {
            console.log(error);
        }
    },
    getProjectByUser: async (token)=> {
        try {
            const res = await axios.get(`${url2}project/assign/read`, { 
                headers: { Authorization: `bearer ${token}`},
            })
            // console.log("res", res)
            return res.data
        } catch (error) {
            console.log(error);
        }
    },
    assignProject: async (token, val) => { 
        console.log("val assign >>", val)
        let ambilAcc = JSON.parse(localStorage.getItem("account"))    
        try {
            const rc = await axios.post(`${url2}project/assign/create`,
                {
                    project_id: val.result.project_id,
                    department_id: [
                        ambilAcc.employee_department_id
                    ]
                },
                {
                    headers: { Authorization: `bearer ${token}`},
                }
            )
            console.log("hasil", rc)

        } catch (error) {
            console.log(error)
        }
    },
    createProject: async (token, val)=> {
        try {
            var nowDate = dayjs().format('YYYY-MM-DD');
            var endDate = dayjs().add(1, 'year').format('YYYY-MM-DD');
            const rc = await axios.post(`${url2}project/create`,
                {
                    company_id: 2, //hardcode
                    title: val.title,
                    description: val.description,
                    start_date: val.start_date,
                    end_date: val.end_date
                }, 
                {
                    headers: { Authorization: `bearer ${token}`},
                }
            )
            
            toast(`Project baru telah dibuat 👍`, {
                type: "success",
                theme: localStorage.getItem('theme') == 'light' ? 'light' : 'dark',
                closeButton: false,
                position: 'bottom-center',
                hideProgressBar: false,
                className: `rounded-xl drop-shadow-2xl bg-opacity-25`,
                style: {
                  width: "100%",
                  'borderRadius':'15px',
                  'marginBottom': '40px',
                },
              })
            return rc.data;
        } catch (error) {
            console.log(error);
        }
    },

    updateProject: async (token, val)=> {
        console.log("dari ztd >> ", val)
       
        try {
            const rc = await axios.post(`${url2}project/update`,
                {
                    company_id: 2, //hardcode
                    id: val.id,
                    title: val.title,
                    description: val.description,
                    start_date: val.start_date,
                    end_date: val.end_date,
                },
                {
                    headers: { Authorization: `bearer ${token}`},
                }
            )

            
            toast(`Project selesai ter-update.`, {
                type: "success",
                theme: localStorage.getItem('theme') == 'light' ? 'light' : 'dark',
                closeButton: false,
                position: 'bottom-center',
                hideProgressBar: false,
                className: `rounded-xl drop-shadow-2xl bg-opacity-25`,
                style: {
                    width: "100%",
                    'borderRadius':'15px',
                    'marginBottom': '40px',
                },
            })
            return rc.data;
        } catch (error) {
            console.log(error);

        }
    },

    delProject: async (token, val) => {
        // set({ flagDelete: false })
        try {
            let ambilAcc = JSON.parse(localStorage.getItem("account"))
            const res = await axios.post(`${url2}project/delete`,
                {
                    company_id: Number(ambilAcc.employee_company_id) ,
                    id: Number(val.project_id), 
                }, 
                { 
                    headers: { Authorization: `bearer ${token}`},
                }  
            );
            // set({ flagDelete: true })
            console.log("res", res)
            // return Promise.resolve(res)
            
        } catch (error) {
            console.log(error)
        }
    },

    getTags: async (token)=> {
        try {
            const res = await axios.get(`${url2}project/tag/read`, { 
                headers: { Authorization: `bearer ${token}`},
            })
            // console.log("isi get tags", res)
            return Promise.resolve(res)
        } catch (error) {
            console.log(error);
        }
    },
    createTag: async (token, val)=> {
        try {
            const rc = await axios.post(`${url2}project/tag/create`,
                {
                    company_id: val.company_id,
                    project_id: val.project_id,
                    name: val.name,
                }, 
                {
                    headers: { Authorization: `bearer ${token}`},
                }
            )
            
            toast(`Activity baru telah dibuat 👍`, {
                type: "success",
                theme: localStorage.getItem('theme') == 'light' ? 'light' : 'dark',
                closeButton: false,
                position: 'bottom-center',
                hideProgressBar: false,
                className: `rounded-xl drop-shadow-2xl bg-opacity-25`,
                style: {
                  width: "100%",
                  'borderRadius':'15px',
                  'marginBottom': '40px',
                },
              })
            return rc.data;
        } catch (error) {
            console.log(error);
        }
    },
   
    // Calendar
    monthIndex: dayjs().month(),
    setMonthIndex: (index) => set({ monthIndex: index }),

    weekIndex: 0,
    setWeekIndex: (index) => set({ weekIndex: index }),

    handlePrevMonth: () =>
        set((state) => ({ monthIndex: state.monthIndex - 1 })),
    handleNextMonth: () =>
        set((state) => ({ monthIndex: state.monthIndex + 1 })),
    handleReset: () =>
        set((state) => ({
            monthIndex:
                state.monthIndex === dayjs().month()
                    ? state.monthIndex + Math.random()
                    : dayjs().month(),
        })),

    currenMonth: getMonth(),
    setCurrenMonth: () => set((state) => ({ currenMonth: state.currenMonth })),

    currentMonth: getMonth(),
    setCurrentMonth: () =>
        set((state) => ({ currentMonth: state.currentMonth })),
    currentMonthIdx: dayjs().month(),
    setCurrentMonthIdx: () =>
        set((state) => ({ currentMonthIdx: state.currentMonthIdx })),

    
    smallCalendarMonth: 0,
    setSmallCalendarMonth: (index) => {},
    daySelected: null,
    setDaySelected: (day) => set({ daySelected: day }),

    dayEvents: [{}, {}],

    showEventModal: false,
    setShowEventModal: (val) => set({ showEventModal: val }),
    updTSModal: false,
    setUpdTSModal: (val) => { set({ updTSModal: val }) },
    tsStatus: false,
    setTsStatus: (val) => set({ tsStatus: val }),
    tsApvStatus: false,
    setTsApvStatus: (val) => set({ tsApvStatus: val }),
    tsRejStatus: false,
    setTsRejStatus: (val) => set({ tsRejStatus: val }),
    showProfileModal: false,
    setShowProfileModal: (val) => set({ showProfileModal: val }),

    showProjectModal: false,
    setShowProjectModal: (val) => { set({ showProjectModal: val }) },
    updModal: false,
    setUpdModal: (val) => { set({ updModal: val }) },
    showTagModal: false,
    setShowTagModal: (val) => { set({ showTagModal: val }) },
    showModAccess: false,
    setShowModAccess: (val) => { set({ showModAccess: val })},

    savedEvents: null,
    dispatchCalEvent: null,

    filteredEvents: [],
    selectedEvent: null,
    setSelectedEvent: () => {},
    postData : async (token, params = null) => {
        console.log("params", token, params)
        try {

            const res = await axios.post(`${url2}project/tag/fetch-all`, params, { 
                headers: { Authorization: `bearer ${token}`},
            }            )
            // console.log("isi get tags", res)
            return Promise.resolve(res.data)
        } catch (error) {
            console.log(error)
        }
    }
}));
