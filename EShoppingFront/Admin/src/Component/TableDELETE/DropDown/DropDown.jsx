import React, { useState } from 'react';
import './DropDown.css';

// unified DropDown Component
export default function DropDown(props) {

    const [selected, setSelected] = useState(props.selected);

    const onSelect = (e) => {
        setSelected(e.target.value);
        props.onChange(e);
    }

    return (
        <div className={"dropDown " + props.class}>
            <select value={selected} id={props.id} onChange={(e) => { onSelect(e) }} disabled={props.disabled} className={(props.required && !selected) ? "required" : ""} >
                {props.default && <option className="default">{props.default}</option>}
                {props.options.map((opt, index) => {
                    return (<option value={opt.Key} key={index} disabled={opt.disabled}> {opt.Value} </option>);
                })}
            </select>
        </div >
    );
}