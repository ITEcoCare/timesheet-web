import React, { useEffect } from 'react'
import { Route, Routes, useRoutes, Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import { ToastContainer, toast } from 'react-toastify';
import { useStore } from '../store/zustand';
import { Link, Navigate } from 'react-router-dom';
import TimesheetEventModal from "./Timesheet/TimesheetEventModal";
import Tempo from "./Timesheet/tempo";
import ProfileModal from './User/ProfileModal';
import CreateTag from './Project&Tag/CreateTag';
import ProjectEventModal from "./Project&Tag/TimesheetEventModalcopy";



const Home = () => {

  const initialState = useStore((state) => state.initialState);
  const showEventModal = useStore((state) => state.showEventModal);
  const showProfileModal = useStore((state) => state.showProfileModal);
  
  const showTagModal = useStore((state) => state.showTagModal);
  const setShowTagModal = useStore((state) => state.setShowTagModal);
  const showProjectModal = useStore((state) => state.showProjectModal);
  const setShowProjectModal = useStore((state) => state.setShowProjectModal);
  
  useEffect(() => {
    if (!initialState._isLoggedIn) {
      <Navigate to="/siginin" />;
      // return (!initialState._isLoggedIn) ? <Navigate to="/signin" /> : <Navigate to="/calendar" />
    }
  }, [ 
    showTagModal, 
    showProfileModal, 
    showEventModal,
    showProjectModal,
  ])

  const contextClass = {
    success: "bg-blue-600",
    error: "bg-red-600",
    info: "bg-gray-600",
    warning: "bg-orange-400",
    default: "bg-indigo-600",
    dark: "bg-white-600 font-gray-300",
  };

  return (
    <main className=''>
      <div className='flex justify-center'>
        <Navbar />
        <ToastContainer />
        {showEventModal && <TimesheetEventModal />}
        {showProfileModal && <ProfileModal />}
        {showTagModal && <CreateTag />}
        {showProjectModal && <ProjectEventModal />}


      </div>

      <Outlet />
    </main>
  )
}

export default Home