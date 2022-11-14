import 'regenerator-runtime/runtime'; //hmmmmm
import React from "react";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
} from "react-table";
// A great library for fuzzy filtering/sorting items
import matchSorter from "match-sorter";
import Popsearch from "../components/Popsearch";
import DropdownFilter from "../components/DropdownFilter";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";
import { format, formatDistance, formatRelative, subDays } from "date-fns";

const dropDowns = ["Status", "Date"];
const statusStyles = {
  Open: {
    color: "text-green-600",
    icon: <PlayCircleIcon className="h-5 w-5" />,
  },
  Pending: {
    color: "text-orange-600",
    icon: <ExclamationCircleIcon className="h-5 w-5" />,
  },
  Closed: {
    color: "text-gray-600",
    icon: <CheckCircleIcon className="h-5 w-5" />,
  },
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// Always return 1 row
// style the status
// Define a default UI for filtering
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <div className="py-5">
      <input
        type="text"
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder="Search all..."
        className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
    </div>
  );
}

// Define a default UI for filtering
// Learn how to get attributes from table
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter, id, Header },
}) {
  const count = preFilteredRows.length;
  return (
    <Popsearch
      label={Header}
      handleChange={(e) => {
        setFilter(e.target.value || undefined);
        // Set undefined to remove the filter entirely
      }}
    />
  );
}

function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id, Header },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  // Render a multi-select box
  return (
    <>
      <DropdownFilter data={options} handleChange={setFilter} />
    </>
  );
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val) => !val;

// Our table component
function Table({ columns, data }) {

  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes,
    },
    useFilters, // useFilters!
    useGlobalFilter // useGlobalFilter!
  );

  // We don't want to render all of the rows for this example, so cap
  // it for this use case
  // TR and TH has some labelling style?
  const firstPageRows = rows.slice(0, 20);

  return (
    <>
      <div className="mt-8 flex flex-col px-4 sm:px-6 lg:px-8">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Transactions</h1>
          <p className="mt-2 text-sm text-gray-700">
            A table of placeholder with order statuses
          </p>
        </div>
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
        />

        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table
                {...getTableProps()}
                className="text-sm min-w-full divide-y divide-gray-300"
              >
                <thead className="bg-gray-50">
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th
                          {...column.getHeaderProps()}
                          className="px-3 py-1 text-left text-sm font-medium text-gray-900"
                        >
                          <div>
                            {dropDowns.includes(column.render("Header"))
                              ? column.render("Filter")
                              : column.render("Header")}
                          </div>

                          {/* Render the columns filter UI */}
                          <div className="hidden">
                            {column.canFilter ? column.render("Filter") : null}
                          </div>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody
                  className="divide-y divide-gray-200 bg-white"
                  {...getTableBodyProps()}
                >
                  {firstPageRows.length > 0 ? (
                    firstPageRows.map((row, i) => {
                      prepareRow(row);
                      return (
                        <tr
                          className="hover:bg-gray-100"
                          {...row.getRowProps()}
                        >
                          {row.cells.map((cell) => {
                            return (
                              <td
                                className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                                {...cell.getCellProps()}
                              >
                                {cell.render("Cell")}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })
                  ) : (
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      No results found
                    </td>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="py-5">
          Showing {rows.length < 20 ? rows.length : 20} out of {rows.length}{" "}
          rows
        </div>
      </div>
    </>
  );
}

// Define a custom filter filter function!
function filterGreaterThan(rows, id, filterValue) {
  return rows.filter((row) => {
    const rowValue = row.values[id];
    return rowValue >= filterValue;
  });
}

// This is an autoRemove method on the filter function that
// when given the new filter value and returns true, the filter
// will be automatically removed. Normally this is just an undefined
// check, but here, we want to remove the filter if it's not a number

// Removed headers, by removing nested structure, this is recommend even for V8 TS
filterGreaterThan.autoRemove = (val) => typeof val !== "number";

function App({ data }) {
  const columns = React.useMemo(
    () => [
      {
        Header: "Order Number",
        accessor: "order",
        Cell: (props) => {
          return (
            <span
              className={
                "inline-flex items-center px-2.5 py-0.5 rounded-full text-gray-800 font-medium capitalize"
              }
            >
              PO{props.value}
            </span>
          );
        },
      },
      {
        Header: "From",
        accessor: "fromCity",
      },
      {
        Header: "To",
        accessor: "toCity",
      },
      {
        Header: "Date",
        accessor: "date",
        Cell: (props) => {
          return (
            <span>
              {formatDistance(new Date(props.value), new Date(), {
                addSuffix: true,
              })}
            </span>
          );
        },
      },
      {
        Header: "Status",
        accessor: "status",
        Filter: SelectColumnFilter,
        filter: "includes",
        Cell: (props) => {
          return (
            <span
              className={classNames(
                statusStyles[props.value].color,
                "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize"
              )}
            >
              {statusStyles[props.value].icon}&nbsp;{props.value}
            </span>
          );
        },
      },
    ],
    []
  );

  return <Table columns={columns} data={data} />;
}

export default App;
