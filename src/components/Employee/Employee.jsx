import React from "react";
import EmployeeTable, { SelectColumnFilter, AvatarCell } from "./EmployeeTable";
import EmployeeEventModal from "../Employee/EmployeeEventModal";
import Header from "../Header";

// import { getData } from "../../../store/dummy";
import { getData } from "../../store/dummy";
// import { useStore } from "../../store/zustand";
import { useStore } from "../../store/zustand";
import { ordersData, contextMenuItems, ordersGrid } from "../../data/dummy";
// import { scheduleData } from "../data/dummy"

const Employee = () => {

  //zustand
  const showEventModal = useStore((state) => state.showEventModal);
  const setShowEventModal = useStore((state) => state.setShowEventModal);

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
    <div className="flex flex-col p-10 mx-10 mt-20 mb-10 h-[88vh] justify-items-center bg-white dark:bg-stone-700 rounded-3xl overflow-x-auto drop-shadow-2xl">
      {/* <Header /> */}
      <span className="font-bold text-3xl flex mb-4 text-green-500">Employee!</span>
      <EmployeeTable columns={columns} data={data} />
      {showEventModal && <EmployeeEventModal />}
    </div>
  );
};
export default Employee;
