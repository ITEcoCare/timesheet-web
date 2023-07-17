import "regenerator-runtime/runtime";
import React from "react";
import {
    useTable,
    useGlobalFilter,
    useAsyncDebounce,
    useFilters,
    useSortBy,
    usePagination,
} from "react-table";
import {
    FaBeer,
    FaAngleRight,
    FaAngleLeft,
    FaAngleDoubleLeft,
    FaAngleDoubleRight,
} from "react-icons/fa";
import { useStore } from "../../store/zustand";
import TimesheetEventModal from "../Timesheet/TimesheetEventModal";

export const SelectColumnFilter = ({
    column: { filterValue, setFilter, preFilteredRows, id, render },
}) => {
    const options = React.useMemo(() => {
        const options = new Set();
        preFilteredRows.forEach((row) => {
            options.add(row.values[id]);
        });
        return [...options.values()];
    }, [id, preFilteredRows]);

    // Render a multi-select box
    return (
        <label className="flex items-baseline">
            <label className="bg-blue-500 text-white font-bold py-2 px-4 border-b-4 border-blue-700 rounded-l-xl">
                <span className=""> {render("Header")} </span>
            </label>
            {/* <span className="text-gray-700">{render("Header")}: </span> */}
            <select
                className="
                fill-white dark:bg-stone-800 hover:bg-white-400 font-bold py-2 px-4 border-b-4 dark:border-stone-900 border-gray-200 rounded-r-xl shadow-inner hover:bg-gray-100 w-32"
                name={id}
                id={id}
                value={filterValue}
                onChange={(e) => {
                    setFilter(e.target.value || undefined);
                }}
            >
                <option value="">All</option>
                {options.map((option, i) => (
                    <option key={i} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </label>
    );
};

export const AvatarCell = ({ value, column, row }) => {
    return (
        <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10">
                <img
                    className="h-10 w-10 rounded-full"
                    src={row.original[column.imgAccessor]}
                    alt=""
                />
            </div>
            <div className="ml-4">
                <div className="text-md font-large">{value}</div>
                <div className="text-sm  text-blue-500">
                    {row.original[column.emailAccessor]}
                </div>
            </div>
        </div>
    );
};

export const ActionButton = () => {
    return (
        <>
            <a x-data="{ tooltip: 'Delete' }" href="#">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6"
                    x-tooltip="tooltip"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                </svg>
            </a>
            <a x-data="{ tooltip: 'Edite' }" href="#">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6"
                    x-tooltip="tooltip"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                    />
                </svg>
            </a>
        </>
    );
};

const EmployeeTable = ({ columns, data }) => {
    //zustand
    const showEventModal = useStore((state) => state.showEventModal );
    const setShowEventModal = useStore((state) => state.setShowEventModal);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,

        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,

        state, // new
        preGlobalFilteredRows, // new
        setGlobalFilter, // new
    } = useTable(
        {
            columns,
            data,
        },
        useFilters, // new
        useGlobalFilter,
        useSortBy, //new
        usePagination //new
    );

    const GlobalFilter = ({ preGlobalFilteredRows, globalFilter, setGlobalFilter }) => {
        const count = preGlobalFilteredRows.length;
        const [value, setValue] = React.useState(globalFilter);
        
        const onChange = useAsyncDebounce((value) => {
            setGlobalFilter(value || undefined);
        }, 1000);

        return (
            <label className="flex items-baseline">
                <label className="bg-blue-500 text-white font-bold py-2 px-4 border-b-4 border-blue-700 rounded-l-xl">
                    <span className="">Search</span>
                </label>
                <input
                    // readOnly
                    value={value || ""}
                    onChange={(e) => {
                        setValue(e.target.value);
                        onChange(e.target.value);
                    }}
                    className={
                        "fill-white dark:bg-stone-800 hover:bg-white-400 font-bold py-2 px-4 border-b-4 dark:border-stone-900 border-gray-200 rounded-r-xl shadow-inner hover:bg-gray-100 "
                    }
                    placeholder={`${count} records`}
                />
            </label>
        );
    };

    return (
        <>
            <div className="mb-4 grid grid-cols-3">
                <div className=" col-start-1 sm:col-start-1 ">
                    <button
                        onClick={() => { setShowEventModal(true) }}
                        className="flex items-baseline py-2 px-4   cursor-pointer bg-green-500 hover:bg-green-400 text-white font-bold border-b-4 border-green-700 hover:border-green-500 rounded-xl hover:shadow-inner transition duration-200 ease-in-out  transform hover:-translate-x hover:scale-105"
                    >Create</button>
                   
                </div>
                <div className="items-center justify-center hidden col-span-1 space-x-2 sm:flex">
                    <GlobalFilter className=""
                        preGlobalFilteredRows={preGlobalFilteredRows}
                        globalFilter={state.globalFilter}
                        setGlobalFilter={setGlobalFilter}
                    />
                    {headerGroups.map((headerGroup) =>
                        headerGroup.headers.map((column) =>
                            column.Filter ? (
                                <div key={column.id}>
                                    {/* <label htmlFor={column.id}>{column.render("Header")}: </label> */}
                                    {column.render("Filter")}
                                </div>
                            ) : null
                        )
                    )}
                </div>
                <div className="flex justify-end col-span-1">
                                
                    <div className="flex items-baseline">
                        <button
                            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded-l-xl hover:shadow-inner "
                            onClick={() => gotoPage(0)}
                            disabled={!canPreviousPage}
                        >
                            <FaAngleDoubleLeft
                                className="w-6 h-6"
                                color="white"
                            />
                        </button>
                        <button
                            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 hover:shadow-inner "
                            onClick={() => previousPage()}
                            disabled={!canPreviousPage}
                        >
                            <FaAngleLeft className="w-6 h-6" color="white" />
                        </button>
                        <button
                            className="fill-white text-white bg-blue-500 hover:bg-blue-400 font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 hover:shadow-inner "
                            onClick={() => nextPage()}
                            disabled={!canNextPage}
                        >
                            <FaAngleRight className="w-6 h-6" color="white" />
                        </button>
                        <button
                            className="fill-white text-white bg-blue-500 hover:bg-blue-400 font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded-r-xl hover:shadow-inner "
                            onClick={() => gotoPage(pageCount - 1)}
                            disabled={!canNextPage}
                        >
                            <FaAngleDoubleRight
                                className="w-6 h-6"
                                color="white"
                            />
                        </button>
                    </div>
                </div>
            </div>

            <div className=" flex flex-col">
                <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className=" border-b-4 dark:border-stone-900 shadow border-gray-200 overflow-hidden sm:rounded-lg">
                            <table
                                {...getTableProps()}
                                border="1"
                                className="min-w-full border-collapse bg-white dark:bg-stone-800 text-left"
                            >
                                <thead>
                                    {headerGroups.map((headerGroup) => (
                                        <tr
                                            {...headerGroup.getHeaderGroupProps()}
                                        >
                                            {headerGroup.headers.map(
                                                (column) => (
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-white bg-green-500 dark:bg-blue-500 font-bold uppercase tracking-wider"
                                                        {...column.getHeaderProps(
                                                            column.getSortByToggleProps()
                                                        )}
                                                    >
                                                        {column.render(
                                                            "Header"
                                                        )}
                                                        <span>
                                                            {column.isSorted
                                                                ? column.isSortedDesc
                                                                    ? " ▼"
                                                                    : " ▲"
                                                                : ""}
                                                        </span>
                                                    </th>
                                                )
                                            )}
                                        </tr>
                                    ))}
                                </thead>
                                <tbody
                                    {...getTableBodyProps()}
                                    className=" divide-y divide-gray-100 dark:divide-stone-500"
                                >
                                    {page.map((row, i) => {
                                        prepareRow(row);
                                        return (
                                            <tr
                                                className="hover:bg-gray-100 dark:hover:bg-stone-900"
                                                {...row.getRowProps()}
                                            >
                                                {row.cells.map((cell) => {
                                                    return (
                                                        <td
                                                            {...cell.getCellProps()}
                                                            className="px-6 py-4 whitespace-nowrap"
                                                            role="cell"
                                                        >
                                                            {cell.render(
                                                                "Cell"
                                                            )}
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-4 grid grid-cols-3">
                <div className="col-span-1 sm:col-span-1"></div>

                <div className="items-center justify-center hidden col-span-1 space-x-2 sm:flex"></div>

                <label className="flex items-baseline justify-end col-span-3">
                    <label className="bg-blue-500 text-white font-bold py-2 px-4 border-b-4 border-blue-700 rounded-l-xl">
                        <span className="">
                            {" "}
                            Page {state.pageIndex + 1} of {pageOptions.length}
                        </span>
                    </label>
                    {/* <span className="text-gray-700">{render("Header")}: </span> */}
                    <select
                        className="
              fill-white dark:bg-stone-800 hover:bg-white-400 font-bold py-2 px-4 border-b-4 dark:border-stone-900 border-gray-200 rounded-r-xl shadow-inner hover:bg-gray-100 w-32"
                        value={state.pageSize}
                        onChange={(e) => {
                            setPageSize(Number(e.target.value));
                        }}
                    >
                        {[5, 10, 20].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
            {/* <div>
        <pre>
          <code>{JSON.stringify(state, null, 2)}</code>
        </pre>
      </div> */}
        </>
    );
};

export default EmployeeTable;
