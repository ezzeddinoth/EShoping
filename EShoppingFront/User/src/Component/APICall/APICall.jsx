import React, { useState, useEffect } from 'react';
import Dialog from '../Dialog/Dialog';

export default function APICall(props) {

    const [error, setError] = useState();

    useEffect(() => {
        if (props.API) {
            if (props.API.res.status === 200 || props.API.res.status === 201) {
                props.API.onSucceed(props.API.res);
                props.setAPI(null);
            }
            else {
                console.log(props.API)
                props.API.res ? handleWrongAPICall(props.API.res.data) : handleWrongAPICall();
            }
        }
    }, [props])

    const handleWrongAPICall = (showMessage) => {
        setError(showMessage ? showMessage : { data: "Technical error, please contact your technical support " });
    }

    const closeDialog = () => {
        setError(false);
        /*if (props.secured && !LoginService.getUsername()) {
            history.push('/login');
        }*/
        props.setAPI(null)
    }

    return (
        <div>
            {error && <Dialog Error={true} Title={error.title} Message={error.message}
                showOk={true} buttonOK={closeDialog}></Dialog>}
        </div>
    );
}
