import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    uname: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let isvalid = true;
    let validationErrors = {};
    if (formData.uname === "" || formData.uname === null) {
      isvalid = false;
      validationErrors.uname = "User name is required";
    }
    if (formData.password === "" || formData.password === null) {
      isvalid = false;
      validationErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      isvalid = false;
      validationErrors.password = "Password at least 8 char";
    }

    axios
      .get("http://localhost:8000/users")
      .then((result) => {
        result.data.map((user) => {
          if (user.uname === formData.uname) {
            if (user.password === formData.password) {
              localStorage.setItem("userName", formData.uname);
              localStorage.setItem("userId", user.id);
              navigate("/mainpage");
            } else {
              isvalid = false;
              validationErrors.log = "Wrong password ";
            }
          } else if (formData.uname !== "") {
            isvalid = false;
            if (!validationErrors.log)
            validationErrors.log = "Wrong username";
          }
        });
        setErrors(validationErrors);
        setValid(isvalid);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="login template d-flex  justify-content-center align-items-center vh-100 ">
      <div className="form_container p-5 rounded bg-white">
        <form onSubmit={handleSubmit}>
          <h2 className="d-flex justify-content-center mb-5">Budget App</h2>
          <h3 className="d-flex justify-content-center">Sign In</h3>

          {valid ? (
            <></>
          ) : (
            <span className="text-danger">
              {errors.log}
            </span>
          )}

          <div className="mb-2">
            <label>User Name</label>
            <input
              name="uname"
              onChange={(e) =>
                setFormData({ ...formData, uname: e.target.value })
              }
              type="text"
              placeholder="Enter User Name"
              className="form-control"
            />
          </div>

          <div className="mb-2">
            <label>Password</label>
            <input
              name="password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              type="password"
              placeholder="Enter Password"
              className="form-control"
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Sign In
            </button>
          </div>
          <p className="text-end mt-2">
            Forgot <Link to="/reset">Password?</Link>
            <Link to="/signup" className="ms-2">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
