import dayjs from "dayjs";
import React, { useContext, useState, useEffect } from "react";

// zustand
import { useStore } from "../../store/zustand";

const accessToken = localStorage.getItem("accessToken");


const CalendarDay = ({ day, rowIdx }) => {
    const setDaySelected = useStore((state) => state.setDaySelected);
    const getTimesheet = useStore((state) => state.getTimesheet);
    const showEventModal = useStore((state) => state.showEventModal);
    const setShowEventModal = useStore((state) => state.setShowEventModal);
    const showProjectModal = useStore((state) => state.showProjectModal);
    const setShowProjectModal = useStore((state) => state.setShowProjectModal);

    const [dataSource, setDataSource] = useState([]);


    // const [dayEvents, setDayEvents] = useState([]);
    // useEffect(() => {
    //   const events = filteredEvents.filter(
    //     (evt) =>
    //       dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    //   );
    //   setDayEvents(events);
    // }, [filteredEvents, day]);

    const isiTask = () => {

        {/* "timesheet": [
            
                 {
                "timesheet_id": 95,
                "timesheet_status": 0,
                "timesheet_duration": 3,
                "timesheet_work_date": "2023-07-26",
                "timesheet_description": "penggunaan calendar library reactjs",
                "project_id": 18,
                "project_title": "Front End Discussion.",
                "employee_id": 3,
                "fk_department_id": 7,
                "employee_nik": "01/PKWTTIII/22023",
                "employee_fullname": "Raka Danesh Wara Wiri",
                "tag_id": 14,
                "tag_name": "Implementasi Third Party"
            },
        ], */}
        
        return (
            <div className=" h-[92px] overflow-x-auto overflow-visible">
                <div
                    className="flex-1 cursor-pointer"
                    onClick={() => {
                        setDaySelected(day);
                        setShowEventModal(true);
                    }}
                >
                    {/* {dayEvents.map((evt, idx) => ( */}
                    <div
                        className={`bg-green-200 mx-1 p-1 text-black text-xs font-bold rounded-lg mb-1 truncate`}
                    >
                        tsheet
                    </div>
                   
                </div>
            </div>
        );
    };

    const TodayHeader = () => {
        return (
            <header className="flex flex-col ">
                <div
                    className={` font-bold m-1 mb-3 px-2 py-1 text-left ${getCurrentDayClass()}`}
                >
                    {day.format("DD-MM-YY") === dayjs().format("DD-MM-YY") ? (
                        <div className="grid grid-cols-3 ">
                            <div className="items-center justify-center hidden col-span-1 space-x-2 sm:flex">
                                TODAY
                            </div>
                        </div>
                    ) : (
                        <div>{day.format("DD")}</div>
                    )}
                </div>
            </header>
        );
    };

    const DayHeader = () => {
        return (
            <header className="flex flex-col items-center bg-blue-500 rounded-t-lg border-b-blue-500 ">
                {rowIdx === 0 && (
                    <div className=" text-white mt-1 font-bold ">
                        {day.format("ddd").toUpperCase()}
                    </div>
                )}
            </header>
        );
    };

    const CalMain = () => {
        return (
            <div className="flex flex-col col-span-1 m-1 p-2 shadow-md text-md bg-gray-100 rounded-xl dark:bg-stone-800 border-b-4 border-2 dark:border-stone-900 border-gray-300 rounded-r-xl hover:bg-blue-100 hover:border-blue-200  dark:hover:bg-stone-600 dark:hover:border-stone-800">
                {TodayHeader()}
                {isiTask()}
            </div>
        );
    };

    const CalMainBawah = () => {
        return (
            <div className="flex flex-col col-span-1 m-1 shadow-md text-md bg-gray-100 rounded-xl dark:bg-stone-800 border-b-4 border-2 dark:border-stone-900 border-gray-300 rounded-r-xl hover:bg-blue-100 hover:border-blue-200  dark:hover:bg-stone-600 dark:hover:border-stone-800">
                {TodayHeader()}
                {isiTask()}
            </div>
        );
    };

    const CalNxtBawah = () => {
        return (
            <div className="flex flex-col col-span-1 m-1 shadow-md text-md bg-gray-300 rounded-xl dark:bg-stone-800 border-b-4 border-2 dark:border-stone-900 border-gray-400 rounded-r-xl hover:bg-blue-100 hover:border-blue-200  dark:hover:bg-stone-600 dark:hover:border-stone-800">
                {TodayHeader()}
                {isiTask()}
            </div>
        );
    };

    const CalMainAtas = () => {
        return (
            <div className="flex flex-col col-span-1 m-1 shadow-md text-md bg-gray-100 rounded-xl dark:bg-stone-800 border-b-4 border-2 dark:border-stone-900 border-gray-300 rounded-r-xl hover:bg-blue-100 hover:border-blue-200  dark:hover:bg-stone-600 dark:hover:border-stone-800">
                {DayHeader()}
                {TodayHeader()}
                {isiTask()}
            </div>
        );
    };

    const CalPrvAtas = () => {
        return (
            <div className="flex flex-col col-span-1 m-1 shadow-md text-md bg-gray-300 rounded-xl dark:bg-stone-800 border-b-4 border-2 dark:border-stone-900 border-gray-400 rounded-r-xl hover:bg-blue-100 hover:border-blue-200  dark:hover:bg-stone-600 dark:hover:border-stone-800">
                {DayHeader()}
                {TodayHeader()}
                {isiTask()}
            </div>
        );
    };

    const CalPrvAtas0 = () => {
        return (
            <div className="flex flex-col col-start-1 m-1 shadow-md text-md bg-gray-300 rounded-xl dark:bg-stone-800 border-b-4 border-2 dark:border-stone-900 border-gray-400  hover:bg-blue-100 hover:border-blue-200  dark:hover:bg-stone-600 dark:hover:border-stone-800">
                {DayHeader()}
                {TodayHeader()}
                {isiTask()}
            </div>
        );
    };

    const CalMainAtas0 = () => {
        return (
            <div className="flex flex-col col-start-1 m-1 shadow-md text-md bg-gray-100 rounded-xl dark:bg-stone-800 border-b-4 border-2 dark:border-stone-900 border-gray-00 rounded-r-xl hover:bg-blue-100 hover:border-blue-200  dark:hover:bg-stone-600 dark:hover:border-stone-800">
                {DayHeader()}
                {TodayHeader()}
                {isiTask()}
            </div>
        );
    };

    const getCurrentDayClass = () => {
        return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
            ? "bg-green-500 text-white rounded-xl"
            : "";
    };

    const runTimesheet = async (token, inputs) => {
        let res = await getTimesheet(token, day.format("DD-MM-YY"));
        console.log("res ?>>>", res)
        // if(res.success){
        //     const data = [];
        //     for (let j = 0; j < res.result.timesheet.length; j++) {
        //         let temp = res.result.timesheet[j];
        //         data.push({
        //              key: `${j}`,
        //              name: `${temp.project_title}`,
        //              project_id: `${temp.project_id}`,
        //              timesheet_id: `${temp.timesheet_id}`,
        //              timesheet_status: `${temp.timesheet_status}`,
        //              timesheet_work_date: `${temp.timesheet_work_date}`,
        //              timesheet_duration: `${temp.timesheet_duration}`,
        //              timesheet_description: `${temp.timesheet_description}`,
        //              tag_id: `${temp.tag_id}`,
        //              tag_name: `${temp.tag_name}`,
        //              fk_department_id: `${temp.fk_department_id}`,
        //              employee_id: `${temp.employee_id}`,
        //              employee_nik: `${temp.employee_nik}`,
        //              employee_fullname: `${temp.employee_fullname}`,
        //         });
        //         data.sort(function(a,b){ return b.key - a.key; });
        //     }
        //     setDataSource(data);
        //  }
        //  console.log("dataSource >>>", dataSource)
    }



    useEffect(() => {
        runTimesheet(accessToken)
        // runProject();

    }, [
        showEventModal, 
        showProjectModal, 
        
    ]);

    return rowIdx == 0
        ? day.$W == 0
            ? day.$D == 1
                ? CalMainAtas0()
                : CalPrvAtas0()
            : day.$D != 1 &&
              day.$D != 2 &&
              day.$D != 3 &&
              day.$D != 4 &&
              day.$D != 5 &&
              day.$D != 6 &&
              day.$D != 7
                  ? CalPrvAtas()
                  : CalMainAtas()
        : rowIdx == 4
        ? day.$D == 1 ||
          day.$D == 2 ||
          day.$D == 3 ||
          day.$D == 4 ||
          day.$D == 5 ||
          day.$D == 6 ||
          day.$D == 7
              ? CalNxtBawah()
              : CalMainBawah()
        : CalMain();
};

export default CalendarDay;
