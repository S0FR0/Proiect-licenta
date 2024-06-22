import { Form, Modal, Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

export default function AddBudgetModal({ show, handleClose }) {
  
  const reload=()=>{window.location.reload();}


  const userId = localStorage.getItem("userId");

  const [ fetchData, setFetchData ] = useState({
    userId:`${userId}`,
    name:"",
    budget:"",
    sum:0
  })

  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState(true);

  const createCard = (e) => {
    e.preventDefault();
    let isvalid = true;
    let validationErrors = {};
    if (fetchData.name === "" || fetchData.name === null) {
      isvalid = false;
      validationErrors.fname = "Name is required";
    }
    if (fetchData.budget === 0) {
      isvalid = false;
      validationErrors.lname = "Max spending is required";
    }
    setErrors(validationErrors);
    setValid(isvalid);

    if (Object.keys(validationErrors).length === 0) {
      axios
        .post(`http://localhost:8000/cards`, fetchData)
        handleClose()
        .catch((err) => console.log(err));
    }
  }


  return (
    <Modal show={show} onHide={handleClose} onExit={reload}>
      <Form onSubmit={createCard}>
        <Modal.Header closeButton>
          <Modal.Title>New Budget</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
            type="text"
            required
            onChange={(e) =>
              setFetchData({ ...fetchData, name: e.target.value })
            } />
          </Form.Group>
          <Form.Group className="mb-3" controlId="max">
            <Form.Label>Maximum Spending</Form.Label>
            <Form.Control
              type="number"
              required
              min={0}
              step={0.01}
              onChange={(e) =>
                setFetchData({ ...fetchData, budget: e.target.value })
              }
            />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">
              Add
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
}
