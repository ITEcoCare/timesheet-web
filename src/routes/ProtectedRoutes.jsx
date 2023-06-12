import React from 'react'
import { Outlet } from 'react-router-dom'
import { useStore } from "../store/zustand"

import Intro from '../components/Intro'
import SignIn from '../components/SignIn'

const useAuth = () => {
  // const user = useStore(state => state.loggedIn) // loggedIn: false
  const user = {loggedIn: false} // loggedIn: false
  return user
}

const ProtectedRoutes = () => {
  const isAuth = useAuth()
  console.log('INI YAK >>>', isAuth)
  return isAuth ? <Outlet /> : <SignIn />;
}

export default ProtectedRoutes