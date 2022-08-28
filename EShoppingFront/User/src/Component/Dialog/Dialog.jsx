import React from 'react';
import './Dialog.css';

// unified Dialo allover the app for error and user messages
export default function Dialog(props) {
    /* props are:
    *  title, message, showOk + buttonOK + okName, showCancel +buttonCancel + cancelName
    */

    return (
        <div className="transparentBlock">
            <div className={"dialog"}>
                <div className={props.Error ? "error" : ""}>
                    <div className={"title"}>
                        {props.Title}
                    </div>
                </div>
                <div className="Message">
                    {props.Message}
                </div>
                {props.showOk && <input type="submit" className="ok" value={props.okName ? props.okName : "OK"} onClick={props.buttonOK}></input>}
                {props.showCancel && <input type="submit" className="cancel" value={props.cancelName ? props.cancelName : "Abbrechen"} onClick={props.buttonCancel}></input>}
            </div>
        </div>
    );

}


