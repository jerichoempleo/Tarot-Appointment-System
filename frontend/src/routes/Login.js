import React from "react";

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; //For small, unobtrusive messages that appear on the screen to provide feedback to the user, such as success messages, error alerts, warnings, or informational messages.

const Login = () => {
    const [email, useremail] = useState(''); //Database 
    const [password, passwordupdate] = useState('');

    const usenavigate=useNavigate();

    useEffect(()=>{
sessionStorage.clear();
    },[]);
    
    const ProceedLoginusingAPI = (e) => {
        e.preventDefault();
        if (validate()) {
            let inputobj = {
                "email": email,
                "password": password
            };
            fetch("https://localhost:7160/api/Account/login", {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(inputobj)
            }).then((res) => {
                return res.json();
            }).then((resp) => {
                console.log(resp);
                if (resp && resp.token) {
                    sessionStorage.setItem('email', email);
                    sessionStorage.setItem('jwttoken', resp.token); //the .token is from the variable holder of the token named "token"
                    sessionStorage.setItem('roles', resp.roles); //"roles" got from the login method in AccountController 

                    usenavigate('/appointments'); //Redirect after logging in
                } else {
                    alert('Login failed, invalid credentials');
                }
            }).catch((err) => {
                alert('Login Failed due to: ' + err.message);
            });
        }
    }


    const validate = () => {
        let result = true;
        if (email === '' || email === null) {
            result = false;
            alert('Please Enter Email');
        }
        if (password === '' || password === null) {
            result = false;
            alert('Please Enter Password');
        }
        return result;
    }

    return (
        <div className="row">
            <div className="offset-lg-3 col-lg-6" style={{ marginTop: '100px' }}>
                <form onSubmit={ProceedLoginusingAPI} className="container">
                    <div className="card">
                        <div className="card-header">
                            <h2>User Login</h2>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <label>Email <span className="errmsg">*</span></label>
                                <input value={email} onChange={e => useremail(e.target.value)} className="form-control"></input>
                            </div>
                            <div className="form-group">
                                <label>Password <span className="errmsg">*</span></label>
                                <input type="password" value={password} onChange={e => passwordupdate(e.target.value)} className="form-control"></input>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">Login</button> |
                            <Link className="btn btn-success" to={'/register'}>New User</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;