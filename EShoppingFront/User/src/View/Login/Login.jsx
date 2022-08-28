import React from 'react';
import { useHistory } from 'react-router';
import AuthService from '../../Service/AuthService'
import './Login.css';
import APICall from '../../Component/APICall/APICall';
import { useState } from 'react';
import { useEffect } from 'react';

export default function Login(props) {
    const history = useHistory();
    const [API, setAPI] = useState();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    useEffect(() => {
        if (AuthService.isLoggedIn()) {
            history.push('/home');
        }
    }, [history])

    const submitLogin = async () => {
        const cred = {
            username,
            password
        }
        setAPI({
            res: await AuthService.login(cred),
            onSucceed: (res) => {
                history.goBack();
            }
        });
    }

    const signup = async () => {
        history.push('/register');
    }

    return (
        <div className='login'>
            <div className='signup'>
                <input type='submit' value={"Sign up NOW!"} onClick={signup}></input>
            </div>
            <div className='loginform'>
                <div>
                    <label> Username </label>
                    <input className='input' type='text' placeholder='username' value={username}
                        onChange={(e) => setUsername(e.target.value)}></input>
                </div>
                <div>
                    <label> password </label>
                    <input className='input' type='text' placeholder='password' value={password}
                        onChange={(e) => setPassword(e.target.value)}></input>
                </div>
                <div>
                    <input type='submit' value={"login"} onClick={submitLogin}></input>
                </div>
            </div>
            {API && <APICall API={API} setAPI={setAPI}></APICall>}
        </div>
    );
}
