import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function ChangeUsernameModal() {
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState(true);

  const [formData, setFormData] = useState({
    uname: "",
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
    if (formData.uname === "" || formData.uname === null) {
      isvalid = false;
      validationErrors.uname = "User name is required";
    }
    setErrors(validationErrors);
    setValid(isvalid);
    if (Object.keys(validationErrors).length === 0) {
      axios.patch("http://localhost:8000/users/" + userId, {
        uname: `${formData.uname}`,
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
          <Modal.Title className="mb-4">Change username</Modal.Title>
          {valid ? <></> : <span className="text-danger">{errors.uname}</span>}
          <Form onSubmit={handleSubmit}>
            <Form.Control
              type="text"
              placeholder="Username123"
              autoFocus
              onChange={(e) =>
                setFormData({ ...formData, uname: e.target.value })
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

export default ChangeUsernameModal;
