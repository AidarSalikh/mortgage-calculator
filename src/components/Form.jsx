import Range from "./Range";

export default function Form({ state, dispatch, handleSubmit }) {
  return (
    <div>
      <Range
        min={0}
        dispatch={dispatch}
        max={10000000}
        value={state.amount}
        step={1}
        dType="AMOUNT"
        label="Стоимость недвижимости &#8381;"
      />
      <Range
        min={0}
        dispatch={dispatch}
        max={100}
        value={state.interestRate}
        step={1}
        dType="INTEREST_RATE"
        label="Ставка, %"
      />

      <Range
        min={0}
        dispatch={dispatch}
        max={30}
        value={state.years}
        step={1}
        dType="YEARS"
        label="Срок"
      />
      <Range
        min={0}
        dispatch={dispatch}
        max={10000000}
        value={state.downPayment}
        step={1}
        dType="DOWN_PAYMENT"
        label="Первоначальный взнос &#8381;"
      />

      {/* <label>
        Rate of Interest (%)
        <input
          type="number"
          value={state.amount}
          onChange={(e) =>
            dispatch({ type: "AMOUNT", payload: e.target.value })
          }
          placeholder="Сумма"
        />
      </label> */}
      {/* <label>
        <input
          type="number"
          value={state.interestRate}
          onChange={(e) =>
            dispatch({ type: "INTEREST_RATE", payload: e.target.value })
          }
          placeholder="Процентная ставка"
        />
      </label> */}
      {/* <label>
        <input
          type="number"
          value={state.years}
          onChange={(e) => dispatch({ type: "YEARS", payload: e.target.value })}
          placeholder="Срок кредита"
        />
      </label> */}
      {/* <label>
        <input
          type="number"
          value={state.downPayment}
          onChange={(e) =>
            dispatch({ type: "DOWN_PAYMENT", payload: e.target.value })
          }
          placeholder="Дострочное"
        />
      </label> */}

      <button onClick={handleSubmit} className="calculateBtn">Рассчитать</button>
    </div>
  );
}
