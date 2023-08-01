import React, {useState, useEffect} from 'react'
import { Table, Form, Collapse} from "antd";

function ModuleCollapse() {
    const myUser = JSON.parse(localStorage.getItem("account"));

    const [items, setItems] = useState(null)    

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const getUserInfo =(ui) => {    
        if (ui) {
    
            let arrObj = []
            let obj = {}
            for (let i = 0; i < ui.module_access.length; i++) {
                obj = {
                    key: i,
                    label: <div className='text-white font-bold '>
                        {capitalizeFirstLetter(ui.module_access[i].module_app_name)}
                    </div>,
                    children: <div className="flex flex-wrap">
                        {
                            ui.module_access[i].permission.map((key, j)=> (
                                <div className=" m-0.5 w-fit bg-green-100 text-green-800 text-xs border-green-600 border-1 font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                                {key}</div>
                            ))
                        }
                    </div>
                }
                arrObj.push(obj)
                setItems(arrObj)
            }
            
        } else {
            alert("userINfo tidak dtiermukan")
        }

    }

    useEffect(()=>{
        if (myUser.user_id) { 
            // alert("User ID detected")
            getUserInfo(myUser)
        } else { alert("No User ID detected") }
    }, [])
    
    return (
        <Collapse items={items} className="bg-green-500 border-2 rounded-2xl border-green-600"/>
  )
}

export default ModuleCollapse