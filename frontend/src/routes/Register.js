import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; //without reloading the entire page

function Register() {
    const [fullName, setFullName] = useState(""); //name in the database
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); //can create protected routes that require authentication
  
 
  
  
    async function save(event) {
      event.preventDefault();
      const jwttoken = sessionStorage.getItem('jwttoken'); // Retrieve the JWT token from session storage
  
      try {
        await axios.post("https://localhost:7160/api/Account/register", {
        fullName: fullName, 
        email: email, //Name in the database
        password: password,
        }, {
          headers: {
            'Authorization': 'Bearer ' + jwttoken,
          }
        });
        alert("User Registration Successfully");
        // setstudentId(""); Baka need ng ID kapag nagkaerror
        setFullName("");
        setEmail("");
        setPassword("");
        navigate("/"); // Redirect to login page
     
      } catch (err) {
        alert(err);
      }
    }

    
    return (
        <div>
          <h1>User Details</h1>
          <div className="container mt-4">
            <form>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="fullName"
                  value={fullName}
                  onChange={(event) => {
                    setFullName(event.target.value);
                  }}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
              </div>
              <div>
                <button className="btn btn-primary mt-4" onClick={save}>
                  Register
                </button>
              </div>
            </form>
          </div>
          <br />
    
    
        </div>
      );
}

export default Register;