import React from 'react';
import './PAGE3.css';
import { useHistory } from "react-router";


export default function PAGE3(props) {

    const history = useHistory();

    const back = () => {
        history.goBack()
    }

    return (
        <div>
            <div className="PAGE3">
                PAGE3
                <button position="back" color="blue" size="halfLine" value="PAGE2"
                    onClick={back}></button>
            </div>
        </div>
    );
}