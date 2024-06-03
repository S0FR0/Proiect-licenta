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
  
  useEffect(() => {
    axios.get("http://localhost:8000/cards")
         .then((result) => {
          setData(result.data)
    })
         .catch((err) => console.log(err));
  }, [])

  const [ expenses, setExpenses] = useState([])
  
  useEffect(() => {
    axios.get("http://localhost:8000/expenses")
         .then((result) => {
          setExpenses(result.data)
    })
         .catch((err) => console.log(err));
  }, [])

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
          {data.map((budget) => {
            let sum = 0
            if (budget.userId == userId)
            {expenses.map((expenses) => {
              if (expenses.userId == userId && expenses.budgetcard == budget.name)
                sum = sum + parseFloat(expenses.amount)

            })}
            return (
              <BudgetCard
                key={budget.id}
                name={budget.name}
                amount={sum}
                max={budget.budget}
                onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                onViewExpensesClick={() =>
                  setViewExpensesModalBudgetId(budget.id)
                }
              />
            );
          })}
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
