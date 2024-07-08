import { Modal, Button, Stack } from "react-bootstrap";
import { currencyFormatter } from "../utils";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ViewExpensesModal({ budgetId, handleClose }) {
  const userId = localStorage.getItem("userId");

  const [card, setCard] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/cards")
      .then((result) => {
        setCard(result.data);
      })
      .catch((err) => console.log(err));
  }, []);

  let cardName = card.map((item) => {
    if (item.id === budgetId) return item.name;
  });

  async function deleteCard() {
    await axios.get(`http://localhost:8000/expenses/`).then((result) => {
      result.data.map((expense) => {
        if (expense.budgetId === budgetId && expense.userId === userId)
          axios.delete(`http://localhost:8000/expenses/${expense.id}`);
      });
    });

    axios.delete(`http://localhost:8000/cards/${budgetId}`);

    {
      window.location.reload();
    }
    handleClose();
  }

  function deleteExp(exp) {
    axios.delete(`http://localhost:8000/expenses/${exp.id}`);
    window.location.reload();
  }

  const [expense, setExpenses] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/expenses")
      .then((result) => {
        setExpenses(result.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Modal show={budgetId != null} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Stack direction="horizontal" gap="2">
            <div>Expenses - {cardName}</div>
            <Button
              onClick={() => {
                deleteCard();
              }}
              variant="outline-danger"
            >
              Delete
            </Button>
          </Stack>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack direction="vertical" gap="3">
          {expense
            .filter((exp) => exp.budgetId === budgetId)
            .map((exp) => (
              <Stack direction="horizontal" gap="2" key={exp.id}>
                <div className="me-auto fs-4">{exp.description}</div>
                <div className="fs-5">
                  {currencyFormatter.format(exp.amount)}
                </div>
                <Button
                  onClick={() => deleteExp(exp)}
                  size="sm"
                  variant="outline-danger"
                >
                  &times;
                </Button>
              </Stack>
            ))}
        </Stack>
      </Modal.Body>
    </Modal>
  );
}
