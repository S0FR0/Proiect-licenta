import React, { useEffect } from "react";
import { Button, NavDropdown, Navbar, Stack } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import AddBudgetModal from "./components/AddBudgetModal";
import AddExpenseModal from "./components/AddExpenseModal";
import ViewExpensesModal from "./components/ViewExpensesModal";
import BudgetCard from "./components/BudgetCard";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import TotalBudgetCard from "./components/TotalBudgetCard";
import { useState } from "react";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./contexts/BudgetsContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Mainpage() {
  const userName = localStorage.getItem("userName");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const cards = []
  const expense = []

  function handleLogout() {
    navigate("/");
    localStorage.clear();
  }

  function handleSettings() {
    navigate("/settings")
  }

  function handleChart() {
    navigate("/chart");
  }

  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState();
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();
  const { budgets, getBudgetExpenses } = useBudgets();

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  }

  const [ data, setData] = useState([])
  const [ expenses, setExpenses] = useState([])


  useEffect(() => {
    axios.get("http://localhost:8000/cards")
         .then((result) => {
          setData(result.data)
    })
         .catch((err) => console.log(err));
  }, [])

  
  useEffect(() => {
    axios.get("http://localhost:8000/expenses")
         .then((result) => {
          setExpenses(result.data)
    })
         .catch((err) => console.log(err));
  }, [])

  
  let vari = (data.filter((card) => card.userId === userId))
  let filteredExpenses = expenses.filter((exp) => {
    return vari.some((card) => exp.userId === userId && exp.budgetcard === card.name);
  });

  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto">Budgets</h1>
          <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>
            Add Budget
          </Button>
          <Button variant="outline-primary" onClick={openAddExpenseModal}>
            Add Expense
          </Button>

          <Navbar>
            <NavDropdown title={userName}>
              <NavDropdown.Item variant="outline-urgent" onClick={handleSettings}>
                Settings
              </NavDropdown.Item>
              <NavDropdown.Item variant="outline-urgent" onClick={handleChart}>
                Chart
              </NavDropdown.Item>
              <NavDropdown.Item variant="outline-urgent" onClick={handleLogout}>
                Log Out
              </NavDropdown.Item>
            </NavDropdown>
          </Navbar>
        </Stack>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1rem",
            alignItems: "flex-start",
          }}
        >   
          {vari.map((card) => {
            let sum = 0
            filteredExpenses.map((expense) => {
              if(card.name === expense.budgetcard)
              sum += parseFloat(expense.amount)
            })
                 return (
                  <BudgetCard
                    key={card.id}
                    name={card.name}
                    amount={sum}
                    max={card.budget}
                    onAddExpenseClick={() => openAddExpenseModal(card.id)}
                    onViewExpensesClick={() => setViewExpensesModalBudgetId(card.id)}
                  />);
                })
                }



          <UncategorizedBudgetCard
            onAddExpenseClick={openAddExpenseModal}
            onViewExpensesClick={() =>
              setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)
            }
          />
          <TotalBudgetCard />
        </div>
      </Container>
      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
      />
      <AddExpenseModal
        show={showAddExpenseModal}
        defaultBudgetId={addExpenseModalBudgetId}
        handleClose={() => setShowAddExpenseModal(false)}
      />
      <ViewExpensesModal
        budgetId={viewExpensesModalBudgetId}
        handleClose={() => setViewExpensesModalBudgetId()}
      />
    </>
  );
}
