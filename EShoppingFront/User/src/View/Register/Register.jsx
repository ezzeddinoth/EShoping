import React from 'react';
import { useHistory } from 'react-router';
import AuthService from '../../Service/AuthService'
import './Register.css';
import APICall from '../../Component/APICall/APICall';
import { useState } from 'react';
import { useEffect } from 'react';
import Dialog from '../../Component/Dialog/Dialog';



export default function Register(props) {
    const history = useHistory();
    const [API, setAPI] = useState();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [misMatch, setMisMatch] = useState('');

    //Password and confirm password does not match

    useEffect(() => {
        if (AuthService.isLoggedIn()) {
            history.push('/home');
        }
    }, [history])

    const submitLogin = async () => {
        if (password !== confirmPassword) {
            setMisMatch(true);
        }
        else {
            const cred = {
                username,
                password
            }
            setAPI({
                res: await AuthService.register(cred),
                onSucceed: (res) => {
                    history.push('/login');
                }
            });
        }
    }

    return (
        <div className='login'>
            <div className='loginform'>
                <div>
                    <label> Username </label>
                    <input className='input' type='text' placeholder='username' value={username}
                        onChange={(e) => setUsername(e.target.value)}></input>
                </div>
                <div>
                    <label> Password </label>
                    <input className='input' type='text' placeholder='password' value={password}
                        onChange={(e) => setPassword(e.target.value)}></input>
                </div>
                <div>
                    <label> Confirm Password </label>
                    <input className='input' type='text' placeholder='password' value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}></input>
                </div>
                <div>
                    <input type='submit' value={"register"} onClick={submitLogin}></input>
                </div>
            </div>
            {API && <APICall API={API} setAPI={setAPI}></APICall>}
            {misMatch && <Dialog Error={true} Message={"Password and confirm password does not match"}
                showOk={true} buttonOK={() => { setMisMatch(null) }}></Dialog>}
        </div>
    );
}
