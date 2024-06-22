import { Form, Modal, Button } from "react-bootstrap";
import {  useState, useEffect } from "react";
import axios from "axios";

export default function AddExpenseModal({
  show,
  handleClose,
}) {

  const reload=()=>{
    window.location.reload();
  }

  const userId = localStorage.getItem("userId");

  const [ formData, setFormData ] = useState({
    description: "",
    userId: `${userId}`,
    budgetId: ``,
    amount: ""
  })

  function handleSubmit(e) {
    e.preventDefault();
    axios.post("http://localhost:8000/expenses", formData)   
    handleClose();
  }

  const [ data, setData] = useState([])

  useEffect(() => {
  axios.get(`http://localhost:8000/cards`)
       .then((result) => {
        setData(result.data)
      })
           .catch((err) => console.log(err));
    }, [])

    let vari = (data.filter((card) => card.userId === userId))

    function handleSubmit(e) {
      e.preventDefault();
      axios.post("http://localhost:8000/expenses", formData)   
      handleClose();
    }

  return (
    <Modal show={show} onHide={handleClose} onExit={reload}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
            type="text"
            required
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="amount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              required
              min={0}
              step={1}
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="budgetId">
            <Form.Label>Budget</Form.Label>
            <Form.Select
            onChange={(e) =>
              setFormData({ ...formData, budgetId: e.target.value })
            } placeholder="Choose" defaultValue={null}
            >
              <option>Choose</option>
              {vari.map((budget) => (
                <option key={budget.id} value={budget.id} >
                  {budget.name}
                </option>
              ))}
            </Form.Select>
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
