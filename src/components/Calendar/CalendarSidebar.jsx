import React from 'react'
import CreateEventButton from './CreateEventButton'
import CalendarSmall from './CalendarSmall'
import CalendarLabels from './CalendarLabels'

const CalendarSidebar = () => {
  return (
    <aside className="p-1 flex flex-col text-md bg-white rounded-xl dark:bg-stone-700 w-80">
    {/* // <aside className="grid grid-cols-1 "> */}

     
      <CreateEventButton />
      <CalendarSmall />
      <CalendarLabels />
      
    </aside>
  )
}

export default CalendarSidebar