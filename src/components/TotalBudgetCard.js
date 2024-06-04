import { useEffect, useState } from "react";
import BudgetCard from "./BudgetCard";
import axios from "axios";

export default function TotalBudgetCard() {
  
  const userId = localStorage.getItem("userId");

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
    if(expense.userId === userId)
    total += parseFloat(expense.budget)
  })

  const [ expenses, setExpenses] = useState([])
  
  useEffect(() => {
    axios.get("http://localhost:8000/expenses")
         .then((result) => {
          if(result.data.userId === userId)
          setExpenses(result.data)
    })
         .catch((err) => console.log(err));
  }, [])

  expenses.map((expense) => {
    if(expense.userId === userId)
    totalExpenses += parseFloat(expense.amount)
  })

  return <BudgetCard amount={totalExpenses} name="Total" gray max={total} hideButtons />;
}
