import React from 'react';
import './PAGE2.css';
import { useHistory } from "react-router";

export default function PAGE2(props) {
    const history = useHistory();

    const back = () => {
        history.goBack()
    }

    const next = () => {
        history.push('/PAGE3');
    }

    return (
        <div className="PAGE2">
            PAGE2
            <button position="back" color="blue" size="halfLine" value="PAGE1"
                onClick={back}></button>
            <button position="next" color="blue" size="halfLine" value="PAGE3"
                onClick={next}></button>
        </div>


    );

}