import React from 'react';
import Header from '../Header/Header';
import { useHistory } from 'react-router';
import AuthService from '../../Service/AuthService'
import './Login.css';
import APICall from '../../Component/APICall/APICall';
import { useState } from 'react';
import { useEffect } from 'react';
import Cookie from 'universal-cookie';



export default function Login(props) {
    const history = useHistory();
    const [API, setAPI] = useState();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    useEffect(() => {
        const cookie = new Cookie();
        if (cookie.get('token')) {
            history.push('/main');
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
                history.push('/main');
            }
        });
    }

    return (
        <div className='login'>
            <Header></Header>
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
