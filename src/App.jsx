import { useState, useEffect } from "react";
import "./App.css";
import {
  Route,
  Routes,
  useRoutes,
  Outlet,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Home from "./components/Home";
import Intro from "./components/Intro";
import ProfileModal from "./components/User/ProfileModal";
import Project from "./components/Project&Tag/Project";
import Timesheet from "./components/Timesheet/Timesheet";
import MyApproval from "./components/MyApproval/Timesheet";
import Calendar from "./components/Calendar/Calendar";
import Navbar from "./components/Navbar";
import Joget from "./components/Joget";
import Footer from "./components/Footer";
import Employee from "./components/Employee/Employee";
import Tempo from "./components/Tempo";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import toast, { Toaster } from "react-hot-toast";

// zustand
import { useStore } from "./store/zustand";
import SignIn from "./components/SignIn";

function App() {
  // const [count, setCount] = useState(0)

  const [theme, setTheme] = useState(null);

  const count = useStore((state) => state.count);
  const countPlus = useStore((state) => state.countPlus);
  const countMinus = useStore((state) => state.countMinus);
  const countReset = useStore((state) => state.countReset);
  const initialState = useStore((state) => state.initialState);


  const RequiredAuth = ({
    isLoggedIn,
    children,
  }) => {
    const accessToken = localStorage.getItem("accessToken");
    
    if (!isLoggedIn ) {
      // isLoggedIn = true;
      <Navigate to="/signin" />;
    // } else if (window.location.pathname == '/') {
    } 

    // if (accessToken == null || accessToken == undefined) {
    //   window.location.reload("/signin");
    // }

    return children  
  };

  const routes = useRoutes([
   
    {
      path: "/",
      element: <Home />,
      children: [
        {
          index: true,
          element: (
            <RequiredAuth >
              <Intro /> 
            </RequiredAuth>
          ),
        },
        {
          path: "/signin",
          element: <SignIn />,
        },
        {
          path: "/project",
          element: (
            <RequiredAuth isLoggedIn={false}>
              <Project />
            </RequiredAuth>
          ),
        },
        {
          path: "/timesheet",
          element: (
            <RequiredAuth isLoggedIn={false}>
              <Timesheet />
            </RequiredAuth>
          ),
        },
        {
          path: "/my-approval",
          element: (
            <RequiredAuth isLoggedIn={false}>
              <MyApproval />
            </RequiredAuth>
          ),
        },
        {
          path: "/employee",
          element: (
            <RequiredAuth isLoggedIn={false}>
              <Employee />
            </RequiredAuth>
          ),
          component: <Employee />
        },
        {
          path: "/calendar",
          element: (
            <RequiredAuth isLoggedIn={false}>
              <Calendar />
            </RequiredAuth>
          ),
        },
        {
          path: "/joget",
          element: (
            <RequiredAuth isLoggedIn={false}>
              <Joget />
            </RequiredAuth>
          ),
        },
        {
          path: "/tempo",
          element: (
            <RequiredAuth isLoggedIn={false}>
              <Tempo />
            </RequiredAuth>
          ),
          component: <Tempo />
        },
      ],
    },
  ]);

  return (
    <>
      {/* <div><Toaster /></div> */}
      <div className="w-full flex flex-col bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-300 min-h-screen font-inter">
        <div className="w-full mb-auto flex flex-col">
          {routes}
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
