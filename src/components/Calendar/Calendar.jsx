import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { getMonth } from "../../utils/util";
import CalendarHeader from "../Calendar/CalendarHeader.jsx";
import CalendarSidebar from "../Calendar/CalendarSidebar";
import CalendarMonth from "../Calendar/CalendarMonth";
import CalendarEventModal from "../Calendar/CalendarEventModal";

// zustand
import { useStore } from "../../store/zustand";

const Calendar = () => {
    const isStaff = true;

    const [currenMonth, setCurrentMonth] = useState(getMonth());
    // console.log("currenMonth", currenMonth)
    //zustand
    const monthIndex = useStore((state) => state.monthIndex);
    const showEventModal = useStore((state) => state.showEventModal);
    // const { monthIndex, showEventModal } = useContext(GlobalContext);

    useEffect(() => {
        // if (monthIndex == dayjs().month()){
        //     setCurrentMonth(getMonth(dayjs().month()));
        // }
        setCurrentMonth(getMonth(monthIndex));
    }, [monthIndex]);

    return (
        <React.Fragment>
            {/* <div>Sign In Page</div> */}

            <div className=" flex flex-col p-10 mx-10 mt-20 mb-10 h-[88vh] justify-items-center bg-white dark:bg-stone-700 rounded-3xl overflow-x-auto drop-shadow-2xl">
                {showEventModal && <CalendarEventModal />}
                <div className=" flex flex-col justify-items-center">
                    <CalendarHeader />
                    <div className="flex flex-grow">
                        <CalendarSidebar />
                        <CalendarMonth month={currenMonth} />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
export default Calendar;
