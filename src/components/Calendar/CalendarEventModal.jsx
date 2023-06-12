import React from "react";
import { useState } from "react";
import {
  FaTimes,
  FaTrash,
  FaGripHorizontal,
  FaRegClock,
  FaTag,
  FaPen,
  FaRegFlag,
  FaSeedling,
  FaCheck,
  FaCheckCircle,
} from "react-icons/fa";
import { useStore } from "../../store/zustand";
import dayjs from "dayjs";

const labelsClasses = ["green", "blue", "red", "yellow", "purple"];

const CalendarEventModal = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [selectedLabel, setSelectedLabel] = useState(labelsClasses[0]);

  //zustand
  const showEventModal = useStore((state) => state.showEventModal);
  const setShowEventModal = useStore((state) => state.setShowEventModal);
  const daySelected = useStore((state) => state.daySelected);

  return (
    <>
      <div className="h-screen w-full z-10 bg-stone-800 bg-opacity-90 fixed left-0 top-0 flex justify-center items-center">
        <form className="bg-white rounded-xl shadow-2xl w-2/4 ">
          <header className="bg-gray-200 rounded-t-xl px-4 py-2 flex justify-between items-center">
            <span className="cursor-pointer text-gray-400">
              <FaGripHorizontal />
            </span>
            {/* {selectedEvent && ( */}
            <button
              className="mr-2"
              onClick={() => {
                setShowEventModal(false);
                // dispatchCalEvent({ type: "delete", payload: selectedEvent });
              }}
            >
              <span className="text-red-800 cursor-pointer">
                <FaTrash />
              </span>
            </button>
            {/* )} */}
            <button onClick={() => setShowEventModal(false)}>
              <span className="cursor-pointer text-gray-400">
                <FaTimes />
              </span>
            </button>
          </header>
          <div className="p-3">
            <div className="grid grid-cols-1/5 items-end gap-y-7">
              <span className="text-gray-400">
                <FaSeedling />
              </span>
              <input
                type="text"
                name="title"
                placeholder="Add title"
                value={title}
                required
                className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                onChange={(e) => setTitle(e.target.value)}
              />
              <span className="text-gray-400">
                <FaRegClock />
              </span>
              <div className=" ml-3 text-left">
                {daySelected === null
                  ? dayjs().format("dddd, MMMM DD")
                  : daySelected.format("dddd, MMMM D")}
              </div>
              <span className=" text-gray-400">
                <FaPen />
              </span>
              <input
                type="text"
                name="description"
                placeholder="Add a description"
                value={desc}
                required
                className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                onChange={(e) => setDesc(e.target.value)}
              />
              <span className=" text-gray-400">
                <FaTag />
              </span>
              <div className="flex gap-x-2">
                {labelsClasses.map((lblClass, i) => (
                  <span
                    key={i}
                    onClick={() => setSelectedLabel(lblClass)}
                    className={`bg-${lblClass}-400 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                  >
                    {selectedLabel === lblClass && (
                      <span className="text-white text-md">
                        <FaCheck />
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <footer className="flex justify-end border-t p-3 mt-5">
            <button
              type="submit"
              // onClick={handleSubmit}
              className=" font-bold bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-xl text-white border-b-4 border-b-blue-700"
            >
              Save
            </button>
          </footer>
        </form>
      </div>
    </>
  );
};

export default CalendarEventModal;
