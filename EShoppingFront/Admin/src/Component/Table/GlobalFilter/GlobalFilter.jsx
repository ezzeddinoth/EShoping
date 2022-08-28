import React from 'react';
import { FcSearch } from "react-icons/all";
import "./GlobalFilter.css"

export const GlobalFilter = ({ filter, setFilter }) => {

    return (
        <span className="globalFilter">
            <div className="top-header ">
                <div className="search">
                    {<FcSearch className="searchIcon"></FcSearch>}
                    <input value={filter || ''} onChange={e => setFilter(e.target.value)} />
                </div>
            </div>
        </span>
    )
}