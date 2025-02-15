import {useEffect, useState} from "react";
import {Button, TextField} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../store/store.ts";

import {useNavigate} from "react-router";
import {UserAdmin} from "../model/UserAdmin.ts";
import {loginUser, registerUser} from "../slice/user-slice.ts";


export function Login() {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const isAuthenticated = useSelector((state) => state.userReducer.isAuthenticated);

    const [register_username, setRegisterUsername] = useState('');
    const [register_password, setRegisterPassword] = useState('');
    const [register_role, setRegisterRole] = useState('');

    const [login_username, setLoginUsername] = useState('');
    const [login_password, setLoginPassword] = useState('');

    function handleRegister(){
        const user: UserAdmin = {email: register_username,password : register_password,role: register_role}
        dispatch(registerUser(user));
    }

    function handleLogin(){
        const user : any = {email:login_username, password: login_password};
            dispatch(loginUser(user));

    }

    useEffect(() => {
        if(isAuthenticated){
            navigate('/home');
        }
    }, [isAuthenticated]);
    return (
        <>
            <div>
                <h2>Register</h2><br/>
                <TextField type="text" placeholder='email' onChange={(e)=>setRegisterUsername(e.target.value)}/><br/>
                <TextField type="password" placeholder='password' onChange={(e) =>setRegisterPassword(e.target.value)}/><br/>
                <TextField type="text" placeholder='role' onChange={(e) =>setRegisterRole(e.target.value)}/><br/>
                <Button onClick={handleRegister}>Register</Button>
            </div>

            <div>
                <h2>Login</h2><br/>
                <TextField type="email" placeholder='email' onChange={(e) =>setLoginUsername(e.target.value)}/><br/>
                <TextField type="password" placeholder='password' onChange={(e)=>setLoginPassword(e.target.value)}/><br/>
                <Button onClick={handleLogin}>Login</Button>
            </div>
            {login_username+ ' '+ login_password} <br/>
            {register_username + ' '+ register_password}
        </>
    );
}