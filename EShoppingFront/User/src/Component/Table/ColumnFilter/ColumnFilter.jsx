import React from 'react';
import "./ColumnFilter.css"

export const ColumnFilter = ({ column }) => {

    const { filterValue, setFilter } = column;

    return (
        <div className="columnFilter">
            <input value={filterValue || ''} onChange={e => setFilter(e.target.value)} />
        </div>
    )
}