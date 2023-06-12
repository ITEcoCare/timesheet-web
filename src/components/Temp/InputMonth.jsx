import React, { useState } from "react";
import { getMonth } from "../../utils/util";

const InputMonth = ({columnsHeader}) => {
    const [currenMonth, setCurrentMonth] = useState(getMonth());

    // for (let i = 0; i < currenMonth.length; i++) {
    //     const cell = []
    //     for(let j=0; j<columnsHeader.length; j++){
    //         if (columnsHeader[j].key-1 === i) {
    //             // console.log("columnsHeader[j].key >>", columnsHeader[j].key, "i >>", i, "isi", currenMonth[i][j]  )
    //             cell.push(currenMonth[i][j])
    //         }
    //         console.log(cell)
    //     }
    // }
   

    
    return (
        <>
            {currenMonth.map((week, i) => (
                <React.Fragment key={i}>
                    {/* <div>{JSON.stringify(week)} </div> */}
                        <input
                            // readOnly
                            // value={value || ""}
                            // onChange={(e) => {
                            //     setValue(e.target.value);
                            //     onChange(e.target.value);
                            // }}
                            className={
                                "fill-white dark:bg-stone-800 hover:bg-white-400 font-bold py-2 px-4 border-b-4 dark:border-stone-900 border-gray-200 rounded-xl shadow-inner hover:bg-gray-100 "
                            }
                            // placeholder={`${count} records`}
                        />
                    {/* {week.map((day, idx)=> (
                        // <React.Fragment key={idx}>
                        //     {day.map((hour)=> (
                                
                        //     ))}

                        // </React.Fragment >
                    ))} */}
                </React.Fragment>
            ))}
        </>
    );
};

export default InputMonth;
