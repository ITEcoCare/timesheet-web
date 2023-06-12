import React from "react";
import { useStore } from "../../store/zustand";

import axios from "axios";
// const baseURL = "https://jsonplaceholder.typicode.com/posts/1";
const baseURL = import.meta.env.VITE_API_URL

const CreateEmployeeButton = () => {
  const url1 = `${baseURL}/v1/login`
  const url2 = 'http://mstation.tukangbersih.com/index.php/api/auth/login'

  const testAxios =()=> {
    axios.post(url2, {
      "id_privileges": "10",
      "email": "root@gmail.com",
      "password": "merdeka07",
      "app_id": "1555309664580",
      "api_secret": "4d672ce3-e422-4d8a-86ff-fabb1808a689"
    })
    .then(function (response) {
      console.log('response =>>', response);
      
    })
    .catch(function (error) {
      console.log(error);
    });
  
  }


  const setShowEventModal = useStore((state)=> state.setShowEventModal)
  return (
    <button onClick={() => {setShowEventModal(true); testAxios();}} className="cursor-pointer bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded-xl hover:shadow-inner transition duration-200 ease-in-out  transform hover:-translate-x hover:scale-105">
      Create</button>
  );
};

export default CreateEmployeeButton;
