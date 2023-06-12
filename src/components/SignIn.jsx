import React from "react";
import { useStore } from "../store/zustand";
import { Form, Formik, useFormik } from "formik";
// import toast, { Toaster } from "react-hot-toast";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import login1 from "../assets/login1.jpg";

const toastContent = {
  duration: 4000,
  position: "bottom-center",
  style: {
    color: '#000000',
    padding: "10px",
    marginRight: "22px",
    marginBottom: "40px",
    backgroundColor: '#f3f4f6',
    borderColor: '#9ca3af',
    borderRadius: "12px",
    borderBottomWidth: "4px",
    minWidth: "400px",
  }
}

const SignIn = () => {
  
  const initialState = useStore((state) => state.initialState);
  const post = useStore((state) => state.post);
  const loggedIn = useStore((state) => state.loggedIn);
  const clickLogIn = useStore((state) => state.clickLogIn);
  const namaLogin = useStore((state) => state.clickLogIn);
  const userInfo = useStore((state) => state.userInfo);
  const flagSignOut = useStore((state) => state.flagSignOut);
  
  const { berhasilLogin, setBerhasilLogin } = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    console.log("flagSignOut >>>", flagSignOut)
      if (flagSignOut) {
          toast("👋🏻 Berhasil logout!", {
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
      }
  }, [])

  const formik = useFormik({
    initialValues: {
      username: "alfian@ecocare.id",
      password: "password",
    },
    onSubmit: (values, actions) => {
      post(values);
    },
    
  });

  if (initialState._isLoggedIn) {
    return <Navigate to="/" />;
  }

  // function loginMechs(e) {
  //   e.preventDefault();
  //   const formLogin = document.getElementById("formLogin");
  //   const formData = new FormData(formLogin);
  //   const inpEmail = formData.get("email");
  //   const inpPassword = formData.get("password");

  //   console.log(">>> password", password);

  //   if (
  //     formData.get("username") == "admin" &&
  //     formData.get("password") == "admin"
  //   ) {
  //     var username = formData.get("username");
  //     setNamaLogin(username); // isi uname utk context
  //     setEmail(inpEmail);
  //     setPassword(inpPassword);

  //     console.log(">>> passw >>>", password);

  //     localStorage.setItem("loginUser", username); //isi uname utk localstg
  //     alert("berhasil login");
  //   } else {
  //     alert("usename atau password salah");
  //   }
  // }


  

  return (
    <>
      <div className="flex flex-col justify-items-center mx-10 mt-20 mb-10 h-[88vh] md:flex-row items-center bg-white dark:bg-stone-700 rounded-3xl overflow-x-auto drop-shadow-2xl bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')] dark:bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg')]">

        {/* picture  */}

        <div className="hidden md:block lg:block w-full md:w-1/2 xl:w-1/2">
          <img
            src={login1}
            alt=""
            className="w-full h-[88vh] object-cover rounded-l-3xl"
          />
          <div className="bg-gradient-to-t from-green-200 to-transparent dark:from-green-900 w-[50%] h-full absolute top-0 right-0 z-0"></div>
        </div>

        <div className=" text-stone-900 dark:text-stone-300 bg-none md:items-center w-1/2 lg:items-center xl:items-center md:justify-center lg:justify-center xl:justify-center flex items-center justify-center">
          <div className="relative flex flex-col sm:justify-center items-center ">
            <div className="relative sm:max-w-sm w-full ">
              <div className="relative w-full rounded-2xl px-6 py-4 bg-gray-100 border-b-4 border-b-gray-400 drop-shadow-sm">
                <label className="block mt-3 text-sm text-gray-700 text-center font-semibold">
                  Login
                </label>
                {/* // <Formik
                  // initialValues={{
                  //     username: 'eco@ecocare.id',
                  //     password: 'password',
                  // }}
                  // validationSchema={Yup.object({
                  //     username: Yup.string()
                  //         .required('Username is a required field'),
                  //     password: Yup.string()
                  //         .required('Password is a required field')
                  //         .min(8, 'Should more than 8 characters')
                  //         .matches(/^\S*$/, 'Should not contain spaces'),
                  // })}
                  // onSubmit={onSubmit}
                // > */}
                <form id="formLogin" onSubmit={formik.handleSubmit}>
                  {/* <form id="formLogin" method="post" onSubmit={onSubmit}> */}
                  <div className="mt-7 ">
                    <input
                      className="mt-1 block w-full h-11 border-none rounded-xl shadow-lg bg-white-100 dark:bg-stone-700 hover:bg-blue-100 focus:border-indigo-500 focus:ring-indigo-500"
                      label="Email / Username"
                      // id="username"
                      name="username"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.username}
                    />
                  </div>

                  <div className="mt-7">
                    <input
                      className="p-2 mt-1 block w-full border-none rounded-xl bg-white-100 dark:bg-stone-700 h-11 shadow-lg hover:bg-blue-100  focus:bg-blue-100 focus:ring-0"
                      label="Password"
                      name="password"
                      type="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    />
                  </div>

                  <div className="mt-7 flex">
                    <label className="inline-flex items-center w-full cursor-pointer">
                      <input
                        id="remember_me"
                        type="checkbox"
                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        name="remember"
                      />
                      <span className="ml-2 text-xs text-gray-500">
                        Remember me
                      </span>
                    </label>

                    <div className="w-full text-right">
                      <a
                        className="underline text-xs text-gray-600 hover:text-gray-500"
                        href="#"
                      >
                        Forgot Password?
                      </a>
                    </div>
                  </div>

                  <div className="mt-7">
                    <button
                      className="w-full p-2  rounded-xl text-white font-bold bg-green-500 hover:bg-green-400 border-b-4 border-green-700 hover:border-green-500 "
                      type="submit"
                    >
                      Login
                    </button>
                  </div>

                  <div className="flex mt-7 items-center text-center">
                    <hr className="border-gray-300 border-1 w-full rounded-md" />
                    <label className="block font-medium text-sm text-gray-600 w-full">
                      Or
                    </label>
                    <hr className="border-gray-300 border-1 w-full rounded-md" />
                  </div>

                  <div className="flex mt-7 justify-center w-full">
                    <button className="mx-2 m-2 py-2 px-4 rounded-xl text-white font-bold bg-green-500 hover:bg-green-400 border-b-4 border-green-700 hover:border-green-500 ">
                      Facebook
                    </button>
                    <button className="mx-2 m-2 py-2 px-4 rounded-xl text-white font-bold bg-green-500 hover:bg-green-400 border-b-4 border-green-700 hover:border-green-500 ">
                      Google
                    </button>
                  </div>

                  <div className="mt-7">
                    <div className="flex justify-center items-center">
                      <label className="mr-2 text-xs text-gray-600">
                        Did not have account?
                      </label>
                      <a
                        href="#"
                        className="text-xs text-blue-500 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
                      >
                        Sign Up
                      </a>
                    </div>
                  </div>
                </form>

                {/* </Formik> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
