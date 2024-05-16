import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

const Settings = () => {
    
    const navigate = useNavigate()

    function handleSettings() {
        navigate("/mainpage")
      }

    const [formData, setFormData] = useState({
        fname: "",
        lname: "",
        uname: "",
        email: "",
        password: "",
    })

    axios.get("http://localhost:8000/users/")
         .then((result) => {
            result.data.map((user) => {
                if(user.uname === formData.uname &&
                   user.email === formData.email &&
                   user.fname === formData.fname &&
                   user.lname === formData.lname &&
                   user.password === formData.password)
                
                axios.get(`http://localhost:8000/users/${user.id}`)
                     .then((result) => {
                        result.data.map((atribute) => {
                            const userName = atribute.uname
                            const userfName = atribute.fname
                            const userlName = atribute.lname
                            const userEmail = atribute.email
                            const userPassword = atribute.password
                            console.log(userEmail, userName, userfName, userlName, userPassword)
                        })
                        
                     })

            })
         })
    return(
        <div className="container my-5">
            <h1>
                <span>
                    <button className ="btn btn-primary" onClick={handleSettings}>
                        {" "}
                        <span>&lt;</span> Back{" "}
                    </button>{" "}
                    Settings
                </span>
            </h1>
            <div>
                <ul className="list-group mt-4">
                    <li className="list-group-item d-flex">
                        <div className="me-auto">
                        <h6>Username</h6>
                        <p>admin</p>
                        </div>
                        <button className="btn btn-primary my-2">Change</button>
                    </li>
                    <li className="list-group-item d-flex">
                        <div className="me-auto">
                        <h6>Email</h6>
                        <p>admin@gmail.com</p>
                        </div>
                        <button className="btn btn-primary my-2">Change</button>
                    </li>
                    <li className="list-group-item d-flex">
                        <div className="me-auto">
                        <h6>Password</h6>
                        <p>admin</p>
                        </div>
                        <button className="btn btn-primary my-2">Change</button>
                    </li>
                    <li className="list-group-item d-flex">
                        <div className="me-auto">
                        <h6>First name</h6>
                        <p>admin</p>
                        </div>
                    </li>
                    <li className="list-group-item d-flex">
                        <div className="me-auto">
                        <h6>Last name</h6>
                        <p>admin</p>
                        </div>
                    </li>
                    <li className="list-group-item d-flex">
                        <div className="me-auto">
                        <h6>Delete user</h6>
                        <p>This will delete all data coresponding to youre account</p>
                        </div>
                        <button className="btn btn-danger my-2">Delete</button>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Settings