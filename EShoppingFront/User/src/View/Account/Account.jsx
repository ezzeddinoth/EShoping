import React from 'react';
import './Account.css';
/*
import { useHistory } from 'react-router';
import AuthService from '../../Service/AuthService'
import APICall from '../../Component/APICall/APICall';
import { useState } from 'react';
import { useEffect } from 'react';
*/

export default function Account(props) {
    /*   const history = useHistory();
       const [API, setAPI] = useState();
       const [username, setUsername] = useState('');
       const [password, setPassword] = useState('');
       const [firstName, setFirstName] = useState('');
       const [lastName, setLastName] = useState('');
       const [newPassword, setNewPassword] = useState('');
       const [confirmPassword, setConfirmPassword] = useState('');
   
       useEffect(() => {
           if (!AuthService.isLoggedIn()) {
               history.push('login')
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
                   history.push('/home');
               }
           });
       }
   
       const logout = async () => {
           AuthService.logout();
           history.goBack();
       }
   
   
       const myOredrs = async () => {
           history.push("orders")
       }
   
       return (
           <div className='my-account'>
               <div>
                   <input className='logout' type='submit' value={"logout"} onClick={logout}></input>
                   <input className='orders' type='submit' value={"My Orders"} onClick={myOredrs}></input>
               </div>
               <div className='accountform'>
                   <div>
                       <label> Username </label>
                       <input className='input' type='text' placeholder='username' value={username}
                           onChange={(e) => setUsername(e.target.value)}></input>
                   </div>
                   <div>
                       <label> First Name </label>
                       <input className='input' type='text' placeholder='First Name' value={firstName}
                           onChange={(e) => setFirstName(e.target.value)}></input>
                   </div>
                   <div>
                       <label> Last Name </label>
                       <input className='input' type='text' placeholder='Last Name' value={lastName}
                           onChange={(e) => setLastName(e.target.value)}></input>
                   </div>
                   <div>
                       <label> Old Password </label>
                       <input className='input' type='Password' placeholder='Password' value={password}
                           onChange={(e) => setPassword(e.target.value)}></input>
                   </div>
                   <div>
                       <label> New Password </label>
                       <input className='input' type='Password' placeholder='Password' value={newPassword}
                           onChange={(e) => setNewPassword(e.target.value)}></input>
                   </div>
                   <div>
                       <label> Confirm Password </label>
                       <input className='input' type='Password' placeholder='Password' value={confirmPassword}
                           onChange={(e) => setConfirmPassword(e.target.value)}></input>
                   </div>
                   <div>
                       <input className='update' type='submit' value={"Update"} onClick={submitLogin}></input>
                   </div>
   
               </div>
               {API && <APICall API={API} setAPI={setAPI}></APICall>}
           </div>
       );*/
    return <div></div>
}
