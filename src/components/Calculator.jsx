import React, { useReducer } from "react";
import Form from "./Form";
import Calculated from "./Calculated";

export const ACTIONS = {
  AMOUNT: "amount",
  INTEREST_RATE: "interest-rate",
  YEARS: "years",
  DOWN_PAYMENT: "down-payment",
  MONTHLY_PAYMENT: "monthly-payment",
  TOTAL_LOAN: "total-loan",
  TOTAL_INTEREST: "total-interest",
  LOAN_AMOUNT: "loan-amount",
};

const initialState = {
  amount: "",
  interestRate: "",
  years: 1,
  downPayment: "",
  monthlyPayment: null,
  totalLoan: null,
  totalInterest: null,
  loanAmount: null,
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.AMOUNT: {
      return { ...state, amount: action.payload };
    }
    case ACTIONS.INTEREST_RATE: {
      return { ...state, interestRate: action.payload };
    }
    case ACTIONS.YEARS: {
      return { ...state, years: action.payload };
    }
    case ACTIONS.DOWN_PAYMENT: {
      return { ...state, downPayment: action.payload };
    }
    case ACTIONS.MONTHLY_PAYMENT: {
      return { ...state, monthlyPayment: formatter(action.payload) };
    }
    case ACTIONS.TOTAL_LOAN: {
      return { ...state, totalLoan: formatter(action.payload) };
    }
    case ACTIONS.TOTAL_INTEREST: {
      return { ...state, totalInterest: formatter(action.payload) };
    }
    case ACTIONS.LOAN_AMOUNT: {
      return { ...state, loanAmount: formatter(action.payload) };
    }
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

// adds space between every 3 digit in calculated result
function formatter(strOfNum) {
  return strOfNum.split(/(?=(?:\d{3})+$)/).join(" ");
}

export default function Calculator() {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state.amount);

  function handleDispatch(type, payload) {
    return dispatch({
      type: type,
      payload: payload,
    });
  }

  function handleSubmit() {
    if (!state.amount || !state.interestRate || !state.years) {
      alert("Please fill all the fields !!!");
      // resetting all values if there is an empty field
      handleDispatch(ACTIONS.MONTHLY_PAYMENT, "");
      handleDispatch(ACTIONS.TOTAL_LOAN, "");
      handleDispatch(ACTIONS.TOTAL_INTEREST, "");
      handleDispatch(ACTIONS.LOAN_AMOUNT, "");
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
    handleDispatch(ACTIONS.MONTHLY_PAYMENT, monthPay);

    const totalPay = (monthPay * months).toFixed();
    handleDispatch(ACTIONS.TOTAL_LOAN, totalPay);

    const totalInterest = (totalPay - loanAmount).toFixed();
    handleDispatch(ACTIONS.TOTAL_INTEREST, totalInterest);

    handleDispatch(ACTIONS.LOAN_AMOUNT, loanAmount.toFixed());
  }

  return (
    <main className="main">
      <h1>Ипотечный калькулятор</h1>
      <Form
        handleDispatch={handleDispatch}
        state={state}
        handleSubmit={handleSubmit}
      />
      <Calculated state={state} />
    </main>
  );
}
