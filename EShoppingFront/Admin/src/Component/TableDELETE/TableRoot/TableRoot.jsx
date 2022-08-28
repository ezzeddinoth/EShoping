import React, { useMemo } from "react";
import { useTable, useGlobalFilter, usePagination, useSortBy } from "react-table";
import './TableRoot.css';
import {
    TiArrowSortedDown,
    TiArrowSortedUp
} from "react-icons/all";
import { GlobalFilter } from "../GlobalFilter/GlobalFilter";

export default function TableRoot(props) {

    let data = useMemo(() => props.data, [props])

    const columns = useMemo(() => props.columns.map((dataset) => {
        return {
            ...dataset,
            Header: dataset.Header,
            accessor: dataset.Accessor,
            disableGlobalFilter: false,
        }
    }), [props])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        //pageCount,
        //pageSize,
        //setPageSize,
        state,
        setGlobalFilter,
        //gotoPage,
        //nextPage,
        //previousPage,
        prepareRow
    } = useTable({ columns, data, initialState: { ...props.tableState, hiddenColumns: ["DataChanges", "ID"] } }, useGlobalFilter, useSortBy, usePagination)

    const renderSortSymbol = (column) => {
        return (column.isSortedDesc ? <TiArrowSortedDown className="sortArrow"></TiArrowSortedDown>
            : <TiArrowSortedUp className="sortArrow"></TiArrowSortedUp>)
    }

    const { globalFilter } = state;

    return (
        <div>
            <div className="tableContainer">
                <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}></GlobalFilter>
                <div className="overflowField">
                    <table {...getTableProps()}>
                        <thead>
                            {
                                headerGroups.map(headerGroup => (
                                    <tr {...headerGroup.getFooterGroupProps()}>
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
                  
                </div>
            </div>
        </div>
    )
}