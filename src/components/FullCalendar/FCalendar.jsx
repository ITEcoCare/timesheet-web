import React from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import { Calendar } from "@fullcalendar/core";
// import listPlugin from '@fullcalendar/list';

function FCalendar() {
    // let calendar = new Calendar(calendarEl, {
    //   plugins: [ dayGridPlugin, timeGridPlugin, listPlugin ],
    //   initialView: 'dayGridMonth',
    //   headerToolbar: {
    //     left: 'prev,next today',
    //     center: 'title',
    //     right: 'dayGridMonth,timeGridWeek,listWeek'
    //   }
    // });

    return (
        <div className=" mt-20 bg-stone-100">
            Calendah bfbo
            <Fullcalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView={"dayGridMonth"}
                headerToolbar={{
                    start: "today prev,next", // will normally be on the left.
                    center: "title",
                    end: "dayGridMonth,timeGridWeek,timeGridDay", // will normally be on the right.
                }}
                height={"90vh"}
                // contentHeight={650}PPPPp
                aspectRatio={10}
            />
        </div>
    );
}

export default FCalendar;
