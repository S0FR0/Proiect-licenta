import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

const Settings = () => {
    
    return(
        <div className="container my-5">
            <h1>
                <span>
                    <button className ="btn btn-primary">
                        {" "}
                        <span>&lt;</span> Back{" "}
                    </button>{" "}
                    Settings
                </span>
            </h1>
        </div>
    )
}

export default Settings