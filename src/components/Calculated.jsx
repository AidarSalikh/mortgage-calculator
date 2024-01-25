export default function Calculated({ state }) {
  return (
    <section className="resultInfo">
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
    </section>
  );
}
