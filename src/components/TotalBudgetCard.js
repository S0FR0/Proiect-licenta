import { useEffect, useState } from "react";
import BudgetCard from "./BudgetCard";
import axios from "axios";

export default function TotalBudgetCard() {
  
  let totalExpenses = 0

  let total = 0

  const [ data, setData] = useState([])
  
  useEffect(() => {
    axios.get("http://localhost:8000/cards")
         .then((result) => {
          setData(result.data)
    })
         .catch((err) => console.log(err));
  }, [])

  data.map((expense) => {
    total += parseFloat(expense.budget)
  })

  const [ expenses, setExpenses] = useState([])
  
  useEffect(() => {
    axios.get("http://localhost:8000/expenses")
         .then((result) => {
          setExpenses(result.data)
    })
         .catch((err) => console.log(err));
  }, [])

  expenses.map((expense) => {
    totalExpenses += parseFloat(expense.amount)
  })

  return <BudgetCard amount={totalExpenses} name="Total" gray max={total} hideButtons />;
}
