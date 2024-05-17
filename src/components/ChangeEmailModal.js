import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function ChangeEmailModal() {
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState(true);

  const [formData, setFormData] = useState({
    email:""
})

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const userId = localStorage.getItem("userId");

  const handleSubmit = (e) => {
    e.preventDefault()
    let isvalid = true;
    let validationErrors = {};
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
        isvalid = false;
        validationErrors.email = "Email is not valid";
  }
  setErrors(validationErrors);
    setValid(isvalid);
    if (Object.keys(validationErrors).length === 0) {
  axios
    .patch("http://localhost:8000/users/" + userId, {
        email:`${formData.email}`
    
    })
    handleClose()
    .catch((err) => console.log(err));
    }
}
  return (
    <>
      <Button variant="primary" className="btn btn-primary my-3" onClick={handleShow}>
        Change
      </Button>

      <Modal
      show={show}
      onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      >
        <Modal.Body>
        <Modal.Title className='mb-4'>Change email</Modal.Title>
          <Form onSubmit={handleSubmit}>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
                onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
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

export default ChangeEmailModal;