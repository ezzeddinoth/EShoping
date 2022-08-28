import React, { useEffect, useState } from 'react';
import DropDown from '../DropDown/DropDown';
import Checkbox from '../Checkbox/Checkbox';
import MultiDropDown from '../MultiDropDown/MultiDropDown';
import './TableForm.css';
import Photo from '../Photo/Photo';

// PobUp to edit Table Row or add new one
export default function TableForm(props) {

    const [disableSave, setDisableSave] = useState(false);

    const findValue = (accessor) => {
        return Object.entries(props.selectedRow).find(column => column[0] === accessor)[1]
    }

    const [columns, setColumns] = useState(props.columns.map((column) => {
        return { ...column, name: column.Header, value: findValue(column.Accessor), show: true }
    }));

    useEffect(() => {
        setDisableSave(false);
        const checkColumnEdited = (column) => {
            if (column.value === null || column.value === "" || column.value.length === 0 || column.value === 0) {
                setDisableSave(true);
            }
        }
        columns.forEach((column) => {
            if (column.Required === true) {
                return checkColumnEdited(column);
            }
        })
    }, [columns])


    //change column value
    const changeValue = (id, value) => {
        let c = columns.map((column) => {
            if (column.Header === id) {
                return { ...column, value: value };
            }
            else {
                return column;
            }
        });
        setColumns(c);
    }

    //close TableForm
    const onCancel = () => {
        props.setSelectedRow(null);
    }

    const onSave = () => {
        let columnsObject = {};
        columns.forEach((column) => {
            columnsObject = { ...columnsObject, [column.Accessor]: column.value }
        })
        props.action === "Edit" ?
            props.updateRow(columnsObject)
            : props.createRow(columnsObject);
        props.setSelectedRow(null);
    }

    const appendLeadingZeroes = (n) => {
        if (n <= 9) {
            return "0" + n;
        }
        return n
    }

    const renderColumnType = (column) => {
        let columnType;
        switch (column.ColumnType) {
            case "MultiDropdown":
                columnType = <MultiDropDown id={column.Header} default={"Auswählen"} onChange={(selectedValue) => changeValue(column.Header, selectedValue)} selected={column.value}
                    options={column.Dropdownoptions} action={props.action} disabled={(props.action === "Edit" && column.Editable === false)} required={column.Required}></MultiDropDown>;
                break;
            case "Dropdown":
                columnType = <DropDown id={column.Header} default={"Auswählen"} onChange={(e) => changeValue(e.target.id, e.target.value)} selected={column.value}
                    options={column.Dropdownoptions} action={props.action} disabled={(props.action === "Edit" && column.Editable === false)} required={column.Required}></DropDown>;
                break;
            case "Checkbox":
                columnType = <div style={{ margin: "2%" }}><Checkbox id={column.Header} disableChange={false} onChange={changeValue} selected={column.value}
                    disabled={(props.action === "Edit" && column.Editable === false)} required={column.Required}></Checkbox></div>
                break;
            case "DateTime":
                const date = new Date(column.value || null)
                columnType = <input id={column.Header} value={column.value && (appendLeadingZeroes(date.getDate()) + "."
                    + (appendLeadingZeroes(date.getMonth() + 1)) + "."
                    + (date.getFullYear()) + " "
                    + appendLeadingZeroes(date.getHours()) + ":"
                    + appendLeadingZeroes(date.getMinutes()) + ":"
                    + appendLeadingZeroes(date.getSeconds()))} onChange={(e) => changeValue(e.target.id, e.target.value)}
                    disabled={(props.action === "Edit" && column.Editable === false)} required={!column.value && column.Required}></input>
                break;
            case "TextField_Integer":
            case "TextField_Float":
                columnType = <input type="number" id={column.Header} value={column.value || ""} onChange={(e) => changeValue(e.target.id, e.target.value)}
                    disabled={(props.action === "Edit" && column.Editable === false)} required={!column.value && column.Required}></input>
                break;

            case "photo":
                columnType = <Photo id={column.Header} value={column.value} onChange={changeValue}></Photo>
                break;
            default:
                columnType = <input id={column.Header} value={column.value || ""} onChange={(e) => changeValue(e.target.id, e.target.value)}
                    disabled={(props.action === "Edit" && column.Editable === false)} required={!column.value && column.Required}></input>
        }
        return columnType;
    }

    return (
        <div className="transparentBlock" >
            <div className="tableForm " id="TableForm">
                <div className="head"><div className="titleText">{props.Title}</div></div>
                <div className="content">
                    <div className="values">
                        {columns.filter(column => column.show === true).map((column, index) => {
                            return <div key={index} className="co">
                                <label className="label"> {column.Header}</label>
                                <br></br>
                                {renderColumnType(column)}
                            </div>

                        })}
                    </div>
                    <input type="submit" className="save" value="save" onClick={onSave} disabled={disableSave}></input>
                    <input type="submit" className="cancel" value="cancel" onClick={onCancel}></input>
                </div>
            </div>
        </div >
    );
}


