import React, { useState } from 'react';
import './MultiDropDown.css';

// unified MultiDropDown Component
export default function MultiDropDown(props) {

    const [selected, setSelected] = useState(props.selected);

    const onSelect = (e) => {
        let updatedArray;
        if (selected.includes(e.target.value)) {
            updatedArray = selected.filter(item => item !== e.target.value);
        }
        else {
            updatedArray = [...selected, e.target.value];
        }
        setSelected(updatedArray)
        props.onChange(updatedArray);

    }

    const size = props.options.length > 4 ? 4 : props.options.length;

    const required = (props.required && selected.length === 0) ? " required" : ""

    return (
        <div className={"multiDropDown"}>
            <input className="hiddenInput" id="refocus">
            </input>
            <select id={props.id} size={size} multiple="multiple">
                {props.options.map((opt, index) => {
                    return (<option className={selected.includes(opt.Key) ? "selected" : "unSelected " + required}
                        onClick={(e) => { document.getElementById("refocus").focus(); onSelect(e); }}
                        value={opt.Key} key={index} disabled={opt.disabled} defaultValue={true}>
                        {opt.Value} </option>);
                })}
            </select>
        </div >
    );
}