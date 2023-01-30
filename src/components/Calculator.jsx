import React, { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { InputLabel } from "@mui/material";
import Button from '@mui/material/Button';

function EmiCalculator() {
  const [principalAmount, setPrincipalAmount] = useState(0);
  const [rateOfInterest, setRateOfInterest] = useState(0);
  const [duration, setDuration] = useState(0);
  const [emi, setEmi] = useState([]);
  const [calculationHistory, setCalculationHistory] = useState([]);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("calculationHistory")) || [];
    setCalculationHistory(history);
  }, []);

  const handlePrincipalAmountChange = (e) => {
    setPrincipalAmount(e.target.value);
  };

  const handleRateOfInterestChange = (e) => {
    setRateOfInterest(e.target.value);
  };

  const handleDurationChange = (e) => {
    setDuration(e.target.value);
  };

  const calculateEmi = () => {
    const r = rateOfInterest / (12 * 100);
    const n = duration;
    const monthlyEmi =
      (principalAmount * r * (1 + r) ** n) / ((1 + r) ** n - 1);
    const emiArray = [];
    for (let i = 1; i <= duration; i++) {
      emiArray.push({
        id: i,
        month: i,
        emi: monthlyEmi,
      });
    }
    setEmi(emiArray);

    const calculation = {
      principalAmount,
      rateOfInterest,
      duration,
      emi: emiArray,
    };

    setCalculationHistory([...calculationHistory, calculation]);
    localStorage.setItem(
      "calculationHistory",
      JSON.stringify([...calculationHistory, calculation])
    );
  };

  return (
    <div className="main-container">
    <h1>Emi Calculator</h1>
      <form>
      <div className="sub-container">
        <div className="box1"> 
                  <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                  <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"
            onChange={handlePrincipalAmountChange}
            value={principalAmount}
             autoFocus
          />
        </div>
        <div className="box1">
          <InputLabel htmlFor="">Interest:</InputLabel>
          <TextField id="outlined-basic"
           label="Interest" 
           variant="outlined"
            value={rateOfInterest}
            onChange={handleRateOfInterestChange}
            />
            </div>
        <div className="box1">
          <InputLabel htmlFor="outlined-adornment-months">Duration (in months):</InputLabel>
          <TextField id="outlined-basic"
           label="Tenure" 
           variant="outlined"
           type="number"
           value={duration}
           onChange={handleDurationChange}
            />
        </div>
        <Button
                type="submit"
                // color="secondary"
                color="success"
                variant="contained"
                onClick={calculateEmi}
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
       </div>
      </form>
      {emi.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Month</th>
             <th>EMI</th>
            </tr>
          </thead>
          <tbody>
            {emi.map((month) => (
              <tr key={month.id}>
                <td>{month.id}</td>
                <td>{month.month}</td>
                <td>{month.emi.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <h2>Calculation History</h2>
      <ul>
        {calculationHistory.map((calculation, index) => (
          <li key={index}>
            <button
              type="button"
              onClick={() => setEmi(calculation.emi)}
            >
              Calculation {index + 1}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EmiCalculator;

