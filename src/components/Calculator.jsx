import React, { useReducer } from "react";
import Form from "./Form";

const initialState = {
  amount: "",
  interestRate: "",
  years: "",
  downPayment: "",
  monthlyPayment: null,
  totalLoan: null,
  totalInterest: null,
  loanAmount: null,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "AMOUNT": {
      return { ...state, amount: action.payload };
    }
    case "INTEREST_RATE": {
      return { ...state, interestRate: action.payload };
    }
    case "YEARS": {
      return { ...state, years: action.payload };
    }
    case "DOWN_PAYMENT": {
      return { ...state, downPayment: action.payload };
    }
    case "MONTHLY_PAYMENT": {
      return { ...state, monthlyPayment: formatter(action.payload) };
    }
    case "TOTAL_LOAN": {
      return { ...state, totalLoan: formatter(action.payload) };
    }
    case "TOTAL_INTEREST": {
      return { ...state, totalInterest: formatter(action.payload) };
    }
    case "LOAN_AMOUNT": {
      return {
        ...state,
        loanAmount: formatter(action.payload),
      };
    }
    // consider deleting error case
    case "ERROR":
      return { ...state, error: "Please fill in all fields" };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

// adds space between every 3 digit
function formatter(strOfNum) {
  return strOfNum.split(/(?=(?:\d{3})+$)/).join(" ");
}

export default function Calculator() {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state);

  function handleSubmit() {
    if (!state.amount || !state.interestRate || !state.years) {
      dispatch({
        type: "ERROR",
      });
      alert("Please fill all the fields !!!");
      dispatch({
        type: "MONTHLY_PAYMENT",
        payload: "",
      });

      return;
    }

    const loanAmount =
      parseFloat(state.amount) -
      (state.downPayment ? parseFloat(state.downPayment) : 0);

    const interest = parseFloat(state.interestRate) / 100 / 12;
    const months = parseFloat(state.years) * 12;

    const numerator = loanAmount * interest * Math.pow(1 + interest, months);
    const denominator = Math.pow(1 + interest, months) - 1;

    const monthPay = (numerator / denominator).toFixed();
    dispatch({
      type: "MONTHLY_PAYMENT",
      payload: monthPay,
    });

    const totalPay = (monthPay * months).toFixed();

    dispatch({
      type: "TOTAL_LOAN",
      payload: totalPay,
    });

    const totalInterest = (totalPay - loanAmount).toFixed();
    dispatch({
      type: "TOTAL_INTEREST",
      payload: totalInterest,
    });

    dispatch({
      type: "LOAN_AMOUNT",
      payload: loanAmount.toFixed(),
    });
  }

  return (
    <main className="main">
      <h1>Ипотечный Калькулятор</h1>
      <Form dispatch={dispatch} state={state} handleSubmit={handleSubmit} />
      <p>
        <span>Общая сумма:</span>{" "}
        <span className="result">{state.totalLoan} &#8381;</span>
      </p>
      <p>
        <span>Ежемесячный платёж:</span>{" "}
        <span className="result">{state.monthlyPayment} &#8381;</span>
      </p>
      <p>
        <span>Переплата по кредиту: </span>{" "}
        <span className="result">{state.totalInterest} &#8381;</span>
      </p>
      <p>
        <span>Сумма кредита: </span>{" "}
        <span className="result">{state.loanAmount} &#8381;</span>
      </p>
    </main>
  );
}
