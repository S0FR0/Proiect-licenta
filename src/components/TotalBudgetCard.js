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

  data.map((card) => {
    if(card.userId === userId)
    total += parseFloat(card.budget)
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
    if(expense.userId === userId)
    totalExpenses += parseFloat(expense.amount)
  })

  
  return <BudgetCard amount={totalExpenses} name="Total" gray max={total} hideButtons />;
}
