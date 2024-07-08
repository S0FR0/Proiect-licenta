import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

const Reset = () => {
  const [formData, setFormData] = useState({
    email: "",
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
      validationErrors.uname = "Username not entered";
    }
    if (formData.email === "" || formData.email === null) {
      isvalid = false;
      validationErrors.password = "Email not entered";
    }
    if (formData.password.length < 8) {
      isvalid = false;
      validationErrors.password = "Password at least 8 char";
    }

    axios
      .get("http://localhost:8000/users/")
      .then((result) => {
        result.data.map((user) => {
          if (user.uname === formData.uname && user.email === formData.email) {
            const updatePassword = formData.password;

            axios
              .patch(`http://localhost:8000/users/${user.id}`, {
                password: updatePassword,
              })
              .then((data) => {
                console.log(data);
                navigate("/");
              });
            if (
              user.email !== formData.email ||
              formData.uname !== user.uname
            ) {
              isvalid = false;
              validationErrors.email = "Data inc";
            }
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
          <h3 className="d-flex justify-content-center">Reset password</h3>

          {valid ? (
            <></>
          ) : (
            <span className="text-danger">
              {errors.uname} {errors.email} {errors.password}
            </span>
          )}

          <div className="mb-2">
            <label>Username</label>
            <input
              name="uname"
              onChange={(e) =>
                setFormData({ ...formData, uname: e.target.value })
              }
              type="text"
              placeholder="Enter Username"
              className="form-control"
            />
          </div>

          <div className="mb-2">
            <label>Email</label>
            <input
              name="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              type="email"
              placeholder="Enter Email"
              className="form-control"
            />
          </div>

          <div className="mb-2">
            <label>New Password</label>
            <input
              name="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              type="password"
              placeholder="Enter New Password"
              className="form-control"
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Reset password
            </button>
          </div>
          <p className="text-end mt-2">
            Remembered the password?{" "}
            <Link to="/" className="ms-2">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Reset;
