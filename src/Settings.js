import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import DeleteModal from "./components/DeleteModal";
import axios from "axios";
import ChangeModal from "./components/ChangeEmailModal";
import ChangePasswordModal from "./components/ChangePasswordModal";
import ChangeUsernameModal from "./components/ChangeUsernameModal";

const Settings = () => {
  const [deleteModalShow, setDeleteModalShow] = React.useState(false);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  function handleSettings() {
    navigate("/mainpage");
  }

  const [fetchData, setFetchData] = useState({
    id: "",
    fname: "",
    lname: "",
    uname: "",
    email: "",
    password: "",
  });

  function logData() {
    axios
      .get(`http://localhost:8000/users/${userId}`, fetchData)
      .then((result) => {
        setFetchData({
          ...fetchData,
          uname: result.data.uname,
          fname: result.data.fname,
          lname: result.data.lname,
          email: result.data.email,
          password: result.data.password,
          id: result.data.id,
        });
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
      });
  }
  useEffect(() => {
    logData();
  }, [fetchData]);

  return (
    <div className="container my-5">
      <h1>
        <span>
          <button className="btn btn-primary" onClick={handleSettings}>
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
              <p>{fetchData.uname}</p>
            </div>
            <ChangeUsernameModal />
          </li>
          <li className="list-group-item d-flex">
            <div className="me-auto">
              <h6>Email</h6>
              <p>{fetchData.email}</p>
            </div>
            <ChangeModal />
          </li>
          <li className="list-group-item d-flex">
            <div className="me-auto">
              <h6>Password</h6>
              <p>{fetchData.password}</p>
            </div>
            <ChangePasswordModal />
          </li>
          <li className="list-group-item d-flex">
            <div className="me-auto">
              <h6>First name</h6>
              <p>{fetchData.fname}</p>
            </div>
          </li>
          <li className="list-group-item d-flex">
            <div className="me-auto">
              <h6>Last name</h6>
              <p>{fetchData.lname}</p>
            </div>
          </li>
          <li className="list-group-item d-flex">
            <div className="me-auto">
              <h6>Delete user</h6>
              <p>This will delete all data coresponding to youre account</p>
            </div>
            <button
              className="btn btn-danger my-2"
              onClick={() => setDeleteModalShow(true)}
            >
              Delete
            </button>
          </li>
        </ul>

        <DeleteModal
          show={deleteModalShow}
          onHide={() => setDeleteModalShow(false)}
        />
      </div>
    </div>
  );
};

export default Settings;
