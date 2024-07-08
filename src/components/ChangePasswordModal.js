import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function ChangePasswordModal() {
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState(true);

  const [formData, setFormData] = useState({
    password: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const userId = localStorage.getItem("userId");

  const handleSubmit = (e) => {
    e.preventDefault();
    let isvalid = true;
    let validationErrors = {};
    setErrors(validationErrors);
    setValid(isvalid);
    if (formData.password === "" || formData.password === null) {
      isvalid = false;
      validationErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      isvalid = false;
      validationErrors.password = "Password at least 8 char";
    }
    setErrors(validationErrors);
    setValid(isvalid);
    if (Object.keys(validationErrors).length === 0) {
      axios.patch("http://localhost:8000/users/" + userId, {
        password: `${formData.password}`,
      });
      handleClose().catch((err) => console.log(err));
    }
  };
  return (
    <>
      <Button
        variant="primary"
        className="btn btn-primary my-3"
        onClick={handleShow}
      >
        Change
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <Modal.Title className="mb-4">Change password</Modal.Title>
          {valid ? (
            <></>
          ) : (
            <span className="text-danger">{errors.password}</span>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Control
              type="text"
              placeholder="Password123"
              autoFocus
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" variant="primary" onClick={handleSubmit}>
            Change
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ChangePasswordModal;
