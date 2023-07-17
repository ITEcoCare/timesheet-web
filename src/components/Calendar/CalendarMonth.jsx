import React from "react";
import CalendarDay from "./CalendarDay";
import dayjs from "dayjs";

// zustand
// import { useStore } from "../../store/zustand";

const CalendarMonth = ({ month }) => {
    // console.log('ini month di ==>', month)

    return (
        <div className=" grid grid-cols-7 w-full ">
        {/* <div className="grid grid-cols-7"> */}
            {/* <div >Hello</div> */}
            {month.map((row, i) => (
                <React.Fragment key={i} >
                    {row.map((day, idx) => (
                        
                            <React.Fragment key={idx} >
                            {row && <CalendarDay day={day} key={idx} rowIdx={i}  />}
                            {/* {console.log("day", day)}
                            {console.log("idx", idx)}
                            {console.log("i", i)} */}
                            </React.Fragment>
                        
                    ))}
                </React.Fragment>
            ))}
        </div>
    );
};

export default CalendarMonth;
