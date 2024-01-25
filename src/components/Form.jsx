import DropDown from "./DropDown";
import Range from "./Range";

export default function Form({ state, dispatch, handleSubmit }) {
  return (
    <>
      <Range
        min={0}
        dispatch={dispatch}
        max={10000000}
        value={state.amount}
        step={1}
        dType="AMOUNT"
        label="Стоимость недвижимости"
        symbol="&#8381;"
      />
      <Range
        min={0}
        dispatch={dispatch}
        max={100}
        value={state.interestRate}
        step={1}
        dType="INTEREST_RATE"
        label="Ставка"
        symbol="&#37;"
      />

      <Range
        min={0}
        dispatch={dispatch}
        max={10000000}
        value={state.downPayment}
        step={1}
        dType="DOWN_PAYMENT"
        label="Первоначальный взнос"
        symbol="&#8381;"
      />
      <DropDown dispatch={dispatch} />

      <button onClick={handleSubmit} className="calculateBtn">
        Рассчитать
      </button>
    </>
  );
}
