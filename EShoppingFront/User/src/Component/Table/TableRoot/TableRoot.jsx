import React, { useMemo, useState } from "react";
import { useTable, useGlobalFilter, usePagination, useSortBy } from "react-table";
import TableForm from "../TableForm/TableForm";
import {
    IoAddCircleOutline,
    RiDeleteBin5Line,
    AiFillCopy,
    MdEdit,
    MdNavigateNext,
    MdNavigateBefore,
    MdLastPage,
    MdFirstPage,
    TiArrowSortedDown,
    TiArrowSortedUp
} from "react-icons/all";

import { GlobalFilter } from "../GlobalFilter/GlobalFilter";

export default function TableRoot(props) {
    let data = useMemo(() => props.data, [props])
    const columns = useMemo(() => props.columns.map((dataset) => {
        let response;
        if (dataset.ColumnType === "photo") {
            response = {
                ...dataset,
                Header: dataset.Header,
                accessor: dataset.Accessor,
                disableGlobalFilter: false,
                Cell: ({ value }) => { let res = value || value === false ? "photo" : ""; return <div>{res}</div> }
            }
        }
        else {
            response = {
                ...dataset,
                Header: dataset.Header,
                accessor: dataset.Accessor,
                disableGlobalFilter: false,
                Cell: ({ value }) => { let res = value || value === false ? value.toString() : ""; return <div>{res}</div> }
            }
        }
        return response;
    }), [props])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        pageCount,
        pageSize,
        setPageSize,
        state,
        setGlobalFilter,
        gotoPage,
        nextPage,
        previousPage,
        prepareRow
    } = useTable({ columns, data, initialState: { ...props.tableState, hiddenColumns: [] } }, useGlobalFilter, useSortBy, usePagination)

    const { globalFilter } = state;

    const [action, setAction] = useState();
    const [selectedRow, setSelectedRow] = useState();

    const saveTableState = () => {
        props.setTableState(state);
    }

    const deleteData = (row) => {
        saveTableState();
        props.deleteRow(row.values);
    }

    const updateData = (dataset) => {
        saveTableState();
        props.updateRow(dataset);
    }

    const createData = (dataset) => {
        saveTableState();
        props.createRow(dataset);

    }

    const addRow = (row) => {
        setAction("Add")
        let emptyRow = {};

        columns.forEach((column) => {
            emptyRow = { ...emptyRow, [column.Accessor]: null }
        })
        setSelectedRow(emptyRow);
    }

    const copyRow = (row) => {
        setSelectedRow(row.values)
        setAction("Kopieren");
    }

    const editRow = (row) => {
        setSelectedRow(row.values);
        setAction("Edit")
    }

    const setPage = (value) => {
        let t = parseInt(value)
        setPageSize(t)
    }

    const setFilter = (value) => {
        setGlobalFilter(value)
    }

    const renderSortSymbol = (column) => {
        return (column.isSortedDesc ? <TiArrowSortedDown className="sortArrow"></TiArrowSortedDown>
            : <TiArrowSortedUp className="sortArrow"></TiArrowSortedUp>)
    }

    const resetRow = () => {
        setSelectedRow()
    }

    const renderTableForm = () => {
        return (selectedRow && <TableForm ShowPictures={props.ShowPictures} Pictures={selectedRow.Pictures} Title={action === "Edit" ? "Edit" : "Add"} action={action} setSelectedRow={resetRow}
            selectedRow={selectedRow} columns={columns} createRow={createData} updateRow={updateData}></TableForm>
        )
    }

    return (
        <div>
            <div className="tableContainer">
                <GlobalFilter filter={globalFilter} setFilter={setFilter}></GlobalFilter>
                <div className="overflowField">
                    <table {...getTableProps()}>
                        <thead>
                            {
                                headerGroups.map(headerGroup => (
                                    <tr {...headerGroup.getFooterGroupProps()}>
                                        {props.editableRows && <th >
                                            <IoAddCircleOutline className="icon" onClick={() => addRow(page)}></IoAddCircleOutline>
                                        </th>}
                                        {
                                            headerGroup.headers.map(column => {
                                                return (
                                                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                                        {column.render('Header')}
                                                        <span>
                                                            {column.isSorted && renderSortSymbol(column)}
                                                        </span>
                                                    </th>)
                                            })
                                        }
                                    </tr>
                                ))
                            }
                        </thead>
                        <tbody {...getTableBodyProps()} >
                            {
                                page.map(row => {
                                    prepareRow(row)
                                    return (
                                        <tr {...row.getRowProps()} >
                                            {props.editableRows && <td >
                                                <MdEdit className="icon" onClick={() => editRow(row)}></MdEdit>
                                                <AiFillCopy className="icon" onClick={() => copyRow(row)}></AiFillCopy>
                                                <RiDeleteBin5Line className="icon" onClick={() => deleteData(row)}></RiDeleteBin5Line>
                                            </td>}
                                            {
                                                row.cells.map(cell => {
                                                    return <td className="cell" {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                                })
                                            }
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    <div className="footer">
                        <MdFirstPage className="icon" onClick={() => gotoPage(0)}></MdFirstPage>
                        <MdNavigateBefore className="icon" onClick={() => previousPage()}></MdNavigateBefore>
                        {(state.pageIndex - 1) > 0 && <div className="" onClick={() => { gotoPage(state.pageIndex - 2) }}>{state.pageIndex - 1}</div>}

                        {(state.pageIndex) > 0 && <div className="" onClick={() => { gotoPage(state.pageIndex - 1) }}>{state.pageIndex}</div>}
                        {<div className="pageIndex" onClick={() => { gotoPage(state.pageIndex) }}>{state.pageIndex + 1}</div>}
                        {(state.pageIndex + 1) < pageCount && <div className="" onClick={() => { gotoPage(state.pageIndex + 1) }}>{state.pageIndex + 2}</div>}
                        {(state.pageIndex + 2) < pageCount && <div className="" onClick={() => { gotoPage(state.pageIndex + 2) }}>{state.pageIndex + 3}</div>}
                        <MdNavigateNext className="icon" onClick={() => nextPage()}></MdNavigateNext>
                        <MdLastPage className="icon" onClick={() => gotoPage(pageCount - 1)}></MdLastPage>
                        <div></div>
                        <div>Row_Pro_Page:  </div>
                        <select onChange={(e) => setPage(e.target.value)} value={pageSize}>
                            <option value={10} key={10} > 10 </option>
                            <option value={25} key={25} > 25 </option>
                            <option value={50} key={50} > 50 </option>
                            <option value={100} key={1} > 100 </option>
                        </select>
                        <div></div>
                        <div>Rows:  </div>
                        <div>{data.length}</div>
                    </div>
                </div>
                {renderTableForm()}
            </div>
        </div>
    )
}