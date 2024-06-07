import axios from "axios";
import React, { useEffect, useState } from "react"
import Chart from "react-apexcharts"
import { useNavigate } from "react-router-dom";



function Piechart()
{   
    const userId = localStorage.getItem("userId");

    const navigate = useNavigate()

    function handleChart() {
        navigate("/mainpage")
    }

    let values = []

    const [labels, setLabels] = useState([]);
  
    useEffect(() => {
        axios.get("http://localhost:8000/cards")
             .then((result) => {
                const newLabels = result.data
                .filter(item => item.userId === userId)
                .map(item => item.name);
                setLabels(newLabels);
             })
             .catch((err) => console.log(err));
    }, []);
  
    useEffect(() => {
    }, [labels]);

    const [expense, setExpense] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/expenses")
             .then((result) => {
                setExpense(result.data);
             })
             .catch((err) => console.log(err));
    }, []);

    labels.forEach((label) => {
        let sum = 0
        expense.map((exp) => {
            if(exp.userId === userId && exp.budgetcard === label)
                sum += parseFloat(exp.amount)
        })
        values.push(sum)
    })

    console.log(values)

    return(
        <React.Fragment>
            <div className="container my-5 vh-100 vw-100">
            <h1>
                <span>
                    <button className ="btn btn-primary" onClick={handleChart}>
                        {" "}
                        <span>&lt;</span> Back{" "}
                    </button>{" "}
                    Chart
                </span>
            </h1>
            <div className="d-flex justify-content-center align-items-center">
                <Chart
                type="pie"
                width={600}
                height={600}

                series={values}

                options={ {
                    labels: labels
                
                }
                }
                >

                </Chart>
            </div>
            </div>
        </React.Fragment>
    )
}

export default Piechart;