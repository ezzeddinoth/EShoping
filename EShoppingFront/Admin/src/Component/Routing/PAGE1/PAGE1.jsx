import React from 'react';
import './PAGE1.css';
import { useHistory } from "react-router";


export default function PAGE1(props) {

    const history = useHistory();

    const next = () => {
        history.push('/PAGE2');
    }

    return (
        <div>
            <div className="partNumberScanKTE">
                PAGE1
                <button position="next" color="blue" size="halfLine" value="PAGE2"
                    onClick={next}></button>
                 {/*<InputSubmit position="schrott" color="blue" size="halfLine" value="schrott"
                    onClick={schrott}></InputSubmit>*/}
            </div>

        </div>
    );
}