import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

const Settings = () => {


    const userId = localStorage.getItem("userId");
    const navigate = useNavigate()

    function handleSettings() {
        navigate("/mainpage")
      }
    function logData(){
    axios.get(`http://localhost:8000/users/${userId}`)
         .then((result) => {
            const username = result.data.uname
            const firstname = result.data.fname
            const lastname = result.data.lname
            const iduser = result.data.id

            console.log(username, firstname, lastname, iduser)
            })}
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
                        <p>---</p>
                        </div>
                        <button className="btn btn-primary my-2" onClick={logData}>Change</button>
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