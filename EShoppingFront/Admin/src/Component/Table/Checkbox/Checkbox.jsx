import React, { useState } from 'react';
import './Checkbox.css';

// Checkbox Component
export default function Checkbox(props) {

    const [selected, setSelected] = useState(props.selected || false)

    const onSelect = () => {
        if (!props.disableChange) {
            props.onChange(props.id, !selected)
            setSelected(!selected)
        }
    }


    return (
        <div className="checkbox">
            <div className={selected ? "checkboxContainerGreen" : "checkboxContainer"} onClick={onSelect}>
                <input className="checkbox" id={props.id} type="checkbox" checked={selected} value={selected} onChange={onSelect}
                    disabled={props.disabled} ></input>
                <label htmlFor="checkboxOneInput"></label>
            </div>
        </div>
    );
}