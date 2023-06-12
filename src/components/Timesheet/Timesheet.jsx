import React, {useEffect} from "react";
import { ordersData, contextMenuItems, ordersGrid } from "../../data/dummy";
import TimesheetTable, { SelectColumnFilter, AvatarCell } from "./TimesheetTable";
import Project from "../Project&Tag/Project";
import { getData } from "../../store/dummy";
import TimesheetEventModal from "./TimesheetEventModal";
import ProjectEventModal from "../Project&Tag/TimesheetEventModalcopy";

import { useStore } from "../../store/zustand";
// import { scheduleData } from "../data/dummy"

const Timesheet = () => {

  //zustand
  const showEventModal = useStore((state) => state.showEventModal);
  const showProjectModal = useStore((state) => state.showProjectModal);
  const setShowEventModal = useStore((state) => state.setShowEventModal);
  const getTimesheet = useStore((state)=> state.getTimesheet);

  // getTimesheet('isian');

  const editing = { allowDeleting: true, allowEditing: true };
  const isStaff = true;
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        Cell: AvatarCell,
        imgAccessor: "imgUrl",
        emailAccessor: "email",
      },
      {
        Header: "Age",
        accessor: "age",
      },
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Role",
        accessor: "role",
        Filter: SelectColumnFilter, // new
        filter: "includes", // new
      },
      {
        Header: "Action",
        accessor: "action"
      },
    ],
    []
  );

  const data = React.useMemo(() => getData(), []);

  return (
    <div className="flex flex-col p-10 mx-10 mt-20 mb-10 h-[88vh] justify-items-center bg-gradient-to-t from-green-400 to-transparent dark:from-green-900 rounded-3xl overflow-x-auto drop-shadow-2xl">
      <span className="font-bold text-3xl flex mb-4 text-green-500">Timesheet!</span>
      {/* <Tempo /> */}
      {/* <Project columns={columns} data={data} /> */}
      <TimesheetTable columns={columns} data={data} />
      {showEventModal && <TimesheetEventModal />}
      {/* {showProjectModal && <ProjectEventModal />} */}
      
    </div>
  );
};
export default Timesheet;
