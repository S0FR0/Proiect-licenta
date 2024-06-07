import { Modal, Button, Stack } from "react-bootstrap";
import {
  UNCATEGORIZED_BUDGET_ID,
  useBudgets,
} from "../contexts/BudgetsContext";
import { currencyFormatter } from "../utils";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ViewExpensesModal({ budgetId, handleClose }) {
  const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } =
    useBudgets();

    const userId = localStorage.getItem("userId")
    let cardNamee

  const expenses = getBudgetExpenses(budgetId);
  const budget =
    UNCATEGORIZED_BUDGET_ID === budgetId
      ? { name: "Uncategorized", id: UNCATEGORIZED_BUDGET_ID }
      : budgets.find((b) => b.id === budgetId);

  const [card, setCard] = useState([]);
  
    useEffect(() => {
        axios.get("http://localhost:8000/cards")
             .then((result) => {
                  setCard(result.data)
             })
             .catch((err) => console.log(err));
    }, []);

    let cardName = card.map((item) => {
      if(item.id === budgetId)
        return item.name
    })

    function deleteCard() {
    axios.get(`http://localhost:8000/cards/`)
        .then((result) => {
          result.data.map((card) => {
            console.log(card.id)
            console.log(budgetId)
            if(card.id === budgetId && card.userId === userId){
              axios.delete(`http://localhost:8000/cards/${card.id}`)}
            
          })
        })
        axios.get(`http://localhost:8000/expenses/`)
        .then((result) => {
          result.data.map((expense) => {
            if(expense.budgetId === budgetId && expense.userId === userId)
              axios.delete(`http://localhost:8000/expenses/${expense.id}`)
          })
        })
        {window.location.reload();}
        handleClose();
      }

  return (
    <Modal show={budgetId != null} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Stack direction="horizontal" gap="2">
            <div>Expenses - {cardName}</div>
            {budgetId !== UNCATEGORIZED_BUDGET_ID && (
              <Button
                onClick={() => {
                  deleteCard();
                }}
                variant="outline-danger"
              >
                Delete
              </Button>
            )}
          </Stack>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack direction="vertical" gap="3">
          {expenses.map((expense) => (
            <Stack direction="horizontal" gap="2" key={expense.id}>
              <div className="me-auto fs-4">{expense.description}</div>
              <div className="fs-5">
                {currencyFormatter.format(expense.amount)}
              </div>
              <Button
                onClick={() => deleteExpense(expense)}
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
