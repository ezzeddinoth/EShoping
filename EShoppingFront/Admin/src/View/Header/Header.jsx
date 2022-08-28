import React from 'react';
import { useHistory } from 'react-router'
import './Header.css';

export default function Header(props) {

    const history = useHistory();

    const handleLogin = () => {
        history.push('/login');
    }

    const handleBack = () => {
        history.goBack();
    }

    return (
        <div className='header'>
            E-Shopping
            <div className='containerlogin'>
                {props.btn_login && <button className='btn_login' onClick={handleLogin}>login</button>}
            </div>
            <div className='containerBack'>
                {props.btn_back && <button className='btn_Back' onClick={handleBack}>back</button>}
            </div>
        </div>
    );
}