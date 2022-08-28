import React, { useMemo } from "react";
import { useTable, useGlobalFilter, usePagination, useSortBy } from "react-table";
import {
    TiArrowSortedDown,
    TiArrowSortedUp
} from "react-icons/all";
import './Table.css';
import { GlobalFilter } from "../GlobalFilter/GlobalFilter";
import { Table } from 'react-bootstrap';

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
        state,
        setGlobalFilter,
     
        prepareRow
    } = useTable({ columns, data, initialState: { hiddenColumns: [] } }, useGlobalFilter, useSortBy, usePagination)

    const { globalFilter } = state;

    const setFilter = (value) => {
        setGlobalFilter(value)
    }

    const renderSortSymbol = (column) => {
        return (column.isSortedDesc ? <TiArrowSortedDown className="sortArrow"></TiArrowSortedDown>
            : <TiArrowSortedUp className="sortArrow"></TiArrowSortedUp>)
    }

    return (
        <div>
            <div className="tableBorder">
                <GlobalFilter filter={globalFilter} setFilter={setFilter}></GlobalFilter>
                <div>
                    <Table {...getTableProps()} striped bordered hover variant="primary">
                        <thead>
                            {
                                headerGroups.map(headerGroup => (
                                    <tr {...headerGroup.getFooterGroupProps()}>
                                        {props.editableRows && <th >
                                           
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
                    </Table>
                </div>
            </div>
        </div>
    )
}