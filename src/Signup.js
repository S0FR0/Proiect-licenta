import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    uname: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState(true);
  const navigate = useNavigate();

  const handlesubmit = (e) => {
    e.preventDefault();
    let isvalid = true;
    let validationErrors = {};
    if (formData.fname === "" || formData.fname === null) {
      isvalid = false;
      validationErrors.fname = "First name is required";
    }
    if (formData.lname === "" || formData.lname === null) {
      isvalid = false;
      validationErrors.lname = "Last name is required";
    }
    if (formData.uname === "" || formData.uname === null) {
      isvalid = false;
      validationErrors.uname = "User name is required";
    }
    if (formData.email === "" || formData.email === null) {
      isvalid = false;
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      isvalid = false;
      validationErrors.email = "Email is not valid";
    }
    if (formData.password === "" || formData.password === null) {
      isvalid = false;
      validationErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      isvalid = false;
      validationErrors.password = "Password at least 8 char";
    }
    if (formData.cpassword !== formData.password) {
      isvalid = false;
      validationErrors.cpassword = "Password is required";
    }
    setErrors(validationErrors);
    setValid(isvalid);

    if (Object.keys(validationErrors).length === 0) {
      axios
        .post("http://localhost:8000/users", formData)
        .then((result) => {
          alert("Registered Succesfully");
          navigate("/");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="signup template d-flex justify-content-center align-items-center vh-100">
      <div className="form_container p-5 rounded bg-white">
        <form onSubmit={handlesubmit}>
          <h2 className="d-flex justify-content-center mb-5">Budget App</h2>
          <h3 className="d-flex justify-content-center">Sign Up</h3>

          {valid ? (
            <></>
          ) : (
            <span className="text-danger">
              {errors.fname} {errors.lname} {errors.uname} {errors.email}{" "}
              {errors.password} {errors.cpassword}
            </span>
          )}

          <div className="mb-2">
            <label>First Name</label>
            <input
              name="fname"
              onChange={(e) =>
                setFormData({ ...formData, fname: e.target.value })
              }
              type="text"
              placeholder="Enter First Name"
              className="form-control"
            />
          </div>

          <div className="mb-2">
            <label>Last Name</label>
            <input
              name="lname"
              onChange={(e) =>
                setFormData({ ...formData, lname: e.target.value })
              }
              type="text"
              placeholder="Enter Last Name"
              className="form-control"
            />
          </div>

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
            <label>Email</label>
            <input
              name="email"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              type="email"
              placeholder="Enter Email"
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

          <div className="mb-2">
            <label>Reenter Password</label>
            <input
              name="cassword"
              onChange={(e) =>
                setFormData({ ...formData, cpassword: e.target.value })
              }
              type="password"
              placeholder="Reenter Password"
              className="form-control"
            />
          </div>

          <div className="d-grid">
            <button className="btn btn-primary">Sign Up</button>
          </div>
          <p className="text-end mt-2">
            Already Registerd?{" "}
            <Link to="/" className="ms-2">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
