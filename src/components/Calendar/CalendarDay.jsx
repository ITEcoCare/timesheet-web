import dayjs from "dayjs";
import React, { useContext, useState, useEffect } from "react";

// zustand
import { useStore } from "../../store/zustand";

const CalendarDay = ({ day, rowIdx }) => {

  // const [dayEvents, setDayEvents] = useState([]);
  const setDaySelected = useStore((state)=> (state.setDaySelected))
  const setShowEventModal = useStore((state)=> (state.setShowEventModal))
  

  // useEffect(() => {
  //   const events = filteredEvents.filter(
  //     (evt) =>
  //       dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
  //   );
  //   setDayEvents(events);
  // }, [filteredEvents, day]);

  const getCurrentDayClass = () => {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-green-500 text-white rounded-xl"
      : "";
  };

  return (
    <div className="flex flex-col m-1 text-md bg-gray-100 rounded-xl dark:bg-stone-800 border-b-4 dark:border-stone-900 border-gray-200 rounded-r-xl hover:bg-blue-100 hover:border-blue-200  dark:hover:bg-stone-600 dark:hover:border-stone-800">
      <header className="flex flex-col items-center  bg-blue-500 rounded-t-xl border-b-blue-500 ">
        {rowIdx === 0 && (
          <div className=" text-white mt-1 font-bold ">
            {day.format("ddd").toUpperCase()}
          </div>
        )}
      </header>
      <header className="flex flex-col ">
        <div
          className={` font-bold m-1 px-2 py-1 text-left ${getCurrentDayClass()}`}
        >
          {day.format("DD-MM-YY") === dayjs().format("DD-MM-YY") ? (
            <div className="grid grid-cols-3 ">
              <div className="text-md col-span-2 sm:col-span-1">{/* {day.format("DD")} */}</div>
              <div className="items-center justify-center hidden col-span-1 space-x-2 sm:flex">TODAY</div>
              <div className="flex justify-end col-span-1"></div>
            </div>
          ) : (
            <div>{day.format("DD")}</div>
          )}
        </div>
      </header>

      {/* Tasks */}
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
            // key={idx}
            // onClick={() => setSelectedEvent(evt)}
            // className={`bg-${evt.label}-200 p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate`}
            className={`bg-orange-300 mx-1 p-1 text-black text-xs font-bold rounded-lg mb-1 truncate`}
          >
            {"idx"}
            {/* {evt.title} */}
          </div>
            
          <div className={`bg-purple-300 mx-1 p-1 text-black text-xs font-bold rounded-lg mb-1 truncate`}>{"idx"}</div>
          <div className={`bg-red-300 mx-1 p-1 text-black text-xs font-bold rounded-lg mb-1 truncate`}>{"idx"}</div>
          <div className={`bg-green-300 mx-1 p-1 text-black text-xs font-bold rounded-lg mb-1 truncate`}>{"idx"}</div>
          <div className={`bg-gray-300 mx-1 p-1 text-black text-xs font-bold rounded-lg mb-1 truncate`}>{"idx"}</div>
        {/*  ))} */}
      </div>
      </div>
      {/* tasks /  */}
    </div>
  );
};

export default CalendarDay;
