import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const isi = "2023-07-25"

const myEventsList = [
  { 
    start: new Date(), 
    end: new Date(), 
    title: "special event",
    style: {
        color: "background-color: black"
    } 
},
{ 
    start: new Date(isi), 
    end: new Date(), 
    title: "Task 2" 
},

];
export default function BigCalendar() {

  return (
    <div className="App font-bold ">
      <Calendar
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 700 }}
      />
    </div>
  );
}