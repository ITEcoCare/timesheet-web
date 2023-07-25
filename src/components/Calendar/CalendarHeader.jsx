import React from "react";
import dayjs from "dayjs";
import logo from "../../assets/calendarlogo.png"
import arrowRight from "../../assets/arrow-right.png";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { GrFormNext } from "react-icons/gr";

// zustand
import { useStore } from "../../store/zustand";

const CalendarHeader = () => {

  const monthIndex = useStore((state) => state.monthIndex);
  const setMonthIndex = useStore((state) => state.setMonthIndex);
  // const currentMonthIdx = useStore((state) => state.currentMonthIdx);
  // const setCurrentMonthIdx = useStore((state) => state.setCurrentMonthIdx);
  // const handlePrevMonth = useStore((state) => state.handlePrevMonth);
  // const handleNextMonth = useStore((state) => state.handleNextMonth);
  // const handleReset = useStore((state) => state.handleReset);

  const handlePrevMonth =()=> {
    setMonthIndex(monthIndex - 1);
  }
  const handleNextMonth =()=> {
    setMonthIndex(monthIndex + 1);
  }
  const handleReset =()=> {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );
  }

  const handlePrevWeek =()=> {
    setMonthIndex(monthIndex - 1);
  }
  const handleNextWeek =()=> {
    setMonthIndex(monthIndex + 1);
  }

  return (
    <header className="px-2 py-2 flex items-center font-extrabold mb-4 border-b-1 border-stone-200">
      <img src={logo} alt="calendar" className="mr-2 w-8 h-8" />
      <div className="mr-10 text-3xl font-extrabold">Calendar</div>
      <button
        onClick={handleReset}
        className=" bg-yellow-500 hover:bg-yellow-400 text-white text-sm font-bold py-2 px-4 border-b-4 border-yellow-700 hover:border-yellow-500 rounded-xl hover:shadow-inner "
      >
        <span>Today</span>
      </button>
      <button
        onClick={handlePrevMonth}
        className="ml-4 bg-blue-500 hover:bg-blue-400 text-white text-sm font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded-l-xl hover:shadow-inner "
      >
        <FaAngleLeft className="w-5 h-5" color="white" />
      </button>
      <button
        onClick={handleNextMonth}
        className="fill-white text-white bg-blue-500 hover:bg-blue-400 text-sm font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded-r-xl hover:shadow-inner "
      >
        <FaAngleRight className="w-5 h-5" color="white" />
      </button>
      <h2 className="ml-4 text-3xl font-bold text-stone-500 dark:text-stone-300">
        {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
      </h2>


      {/* <button
        // onClick={handlePrevWeek}
        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded-l-xl hover:shadow-inner "
      >
        <FaAngleLeft className="w-6 h-6" color="white" />
      </button>
      <button
        // onClick={handleNextWeek}
        className="fill-white text-white bg-blue-500 hover:bg-blue-400 font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded-r-xl hover:shadow-inner "
      >
        <FaAngleRight className="w-6 h-6" color="white" />
      </button>
      <h2 className="ml-4 text-3xl font-bold text-stone-500 dark:text-stone-300">
        {dayjs(new Date(dayjs().year(), monthIndex)).format("MM MMMM")}
      </h2> */}
    </header>
  );
};

export default CalendarHeader;
