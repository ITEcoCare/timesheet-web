import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { getMonth } from "../../utils/util";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
// zustand
import { useStore } from "../../store/zustand";

const CalendarSmall = () => {
    const [currentMonthIdx, setCurrentMonthIdx] = useState(dayjs().month());
    const [currentMonth, setCurrentMonth] = useState(getMonth());
    useEffect(() => {
        setCurrentMonth(getMonth(currentMonthIdx));
    }, [currentMonthIdx]);

    //zustand
    const monthIndex = useStore((state) => state.monthIndex);
    const setSmallCalendarMonth = useStore(
        (state) => state.setSmallCalendarMonth
    );
    const setDaySelected = useStore((state) => state.setDaySelected);
    const daySelected = useStore((state) => state.daySelected);

    useEffect(() => {
        setCurrentMonthIdx(monthIndex);
    }, [monthIndex]);

    const handlePrevMonth = () => {
        setCurrentMonthIdx(currentMonthIdx - 1);
    };
    const handleNextMonth = () => {
        setCurrentMonthIdx(currentMonthIdx + 1);
    };
    const getDayClass = (day) => {
        const format = "DD-MM-YY";
        const nowDay = dayjs().format(format);
        const currDay = day.format(format);
        const slcDay = daySelected && daySelected.format(format);

        if (nowDay === currDay) {
            return "bg-green-500 text-white font-extrabold";
        } else if (currDay === slcDay) {
            return "bg-green-300 text-green-700 font-extrabold";
        } else {
            return "";
        }
    };
    // console.log('daySelected 1', daySelected.format("dddd, MMMM DD"))
    const passSelected = (day) => {
        setDaySelected(day);
    };
    // console.log('daySelected 2', daySelected.format("dddd, MMMM DD"))

    // const [currentMonthIdx, setCurrentMonthIdx] = useState(dayjs().month());
    // // const [currentMonth, setCurrentMonth] = useState(getMonth());
    // const [currentMonth, setCurrentMonth] = useState(getMonth());

    // // const currentMonth = useStore((state) => state.currentMonth);
    // // const setCurrentMonth = useStore((state) => state.setCurrentMonth);

    // // const currentMonthIdx = useStore((state) => state.currentMonthIdx);
    // // const setCurrentMonthIdx = useStore((state) => state.setCurrentMonthIdx);

    // const monthIndexSmall = useStore((state) => state.monthIndexSmall);
    // const setMonthIndexSmall = useStore((state) => state.setMonthIndexSmall);
    // const setSmallCalendarMonth = useStore((state) => state.setSmallCalendarMonth);
    // const daySelected = useStore((state) => state.daySelected);
    // const setDaySelected = useStore((state) => state.setDaySelected);

    // useEffect(() => {
    //   console.log('currentMonthSmall==>', currentMonth)
    //   setCurrentMonth(getMonth(currentMonthIdx));
    // }, [currentMonthIdx]);
    // //   useEffect(() => {
    // //     // console.log("currentMonth[0]", currentMonth[0]);
    // //     setCurrentMonth(currentMonth);
    // //   }, [currentMonth]);
    // // // }, [currentMonth]);

    // //   useEffect(() => {
    // //     setCurrentMonthIdx(getMonth(monthIndexSmall));
    // //   }, [monthIndexSmall]);

    // const handlePrevMonthSmall = useStore((state) => state.handlePrevMonthSmall);
    // const handleNextMonthSmall = useStore((state) => state.handleNextMonthSmall);

    // function getDayClass(day) {
    //   // console.log('Day kososng');
    //   const format = "DD-MM-YY";
    //   const nowDay = dayjs().format(format);
    //   const currDay = day.format(format);
    //   // const slcDay = daySelected.format(format);
    //   if (nowDay === currDay) {
    //     return "bg-blue-500 rounded-full text-white";
    //   // } else if (currDay === slcDay) {
    //   //   return "bg-blue-100 rounded-full text-blue-600 font-bold";
    //   } else {
    //     return "";
    //   }
    // }

    return (
        <div className="mt-4 ">
            <header className="flex justify-between ">
                <p className="pl-2 font-bold">
                    {dayjs(new Date(dayjs().year(), currentMonthIdx)).format(
                        "MMMM YYYY"
                    )}
                </p>
                <div>
                    <button onClick={handlePrevMonth}>
                        <FaAngleLeft className="mr-4  h-6" />
                    </button>
                    <button onClick={handleNextMonth}>
                        <FaAngleRight className="ml-4 mr-2 h-6" />
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-7 p-2 border-b-4 border-2 shadow-md border-gray-300 bg-gray-100 dark:border-stone-900 dark:bg-stone-800 rounded-xl">
                {currentMonth[0].map((day, i) =>
                    i == 0 ? (
                        <span key={i} className="text-sm font-bold py-1 col-start-1 text-center">
                            {day.format("dd").charAt(0)}
                        </span>
                    ) : (
                        <span key={i} className="text-sm font-bold py-1 col-span-1 text-center">
                            {day.format("dd").charAt(0)}
                        </span>
                    )
                )}
                {currentMonth.map((row, i) => (
                    <React.Fragment key={i}>
                        {row.map((day, idx) => (
                            <button
                                key={idx}
                                onClick={() => {
                                    setSmallCalendarMonth(currentMonthIdx);
                                    // setDaySelected(day);
                                    passSelected(day);
                                }}
                                className={`h-10 w-10 rounded-full hover:bg-gray-300 dark:hover:bg-stone-600 ${getDayClass(
                                    day
                                )}`}
                            >
                                <span className="text-sm">
                                    {day.format("D")}
                                </span>
                            </button>
                        ))}
                    </React.Fragment>
                ))}
            </div>
        </div>
        // <div className="flex flex-col drop-shadow-lg text-sm mt-2 p-2 bg-white rounded-xl dark:bg-stone-800">
        //   <header className="flex justify-between items-center">
        //     <h2 className="ml-1 text-xl font-bold">
        //       {dayjs(new Date(dayjs().year(), monthIndexSmall)).format("MMM YY")}
        //       {/* {dayjs(new Date(dayjs().year(), currentMonthIdx)).format("MMM YY")} */}
        //     </h2>
        //     <div>
        //       <button
        //         onClick={handlePrevMonthSmall}
        //         className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded-l-xl hover:shadow-inner "
        //       >
        //         <FaAngleLeft className="w-6 h-6" color="white" />
        //       </button>
        //       <button
        //         onClick={handleNextMonthSmall}
        //         className="fill-white text-white bg-blue-500 hover:bg-blue-400 font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded-r-xl hover:shadow-inner "
        //       >
        //         <FaAngleRight className="w-6 h-6" color="white" />
        //       </button>
        //     </div>
        //   </header>
        //   <div className="grid grid-cols-7 grid-rows-6">
        //     {  currentMonth[0].map((day, i) => (
        //       <span key={i} className="text-sm m-2 text-center font-bold">
        //         {day.format("dd").charAt(0)}
        //       </span>
        //     ))}
        //     {/* {currentMonth.map((row, i) => (
        //       <React.Fragment key={i}>
        //         {row.map((day, idx) => (
        //           <button
        //             key={idx}
        //             onClick={() => {
        //               setSmallCalendarMonth(monthIndexSmall);
        //               setDaySelected(day);
        //             }}
        //             className={`py-1 w-full ${getDayClass(day)}`}
        //           >
        //             <span className="text-sm">{day.format("D")}</span>

        //           </button>
        //         ))}
        //       </React.Fragment>
        //     ))} */}
        //   </div>
        // </div>
    );
};

export default CalendarSmall;
