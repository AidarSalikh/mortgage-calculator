import DropDown from "./DropDown";
import Range from "./Range";
import { ACTIONS } from "./Calculator";

export default function Form({ state, handleSubmit, handleDispatch }) {
  return (
    <>
      <Range
        min={0}
        handleDispatch={handleDispatch}
        max={10000000}
        value={state.amount}
        step={1}
        dType={ACTIONS.AMOUNT}
        label="Стоимость недвижимости"
        symbol="&#8381;"
      />
      <Range
        min={0}
        handleDispatch={handleDispatch}
        max={100}
        value={state.interestRate}
        step={1}
        dType={ACTIONS.INTEREST_RATE}
        label="Ставка"
        symbol="&#37;"
      />

      <Range
        min={0}
        handleDispatch={handleDispatch}
        max={10000000}
        value={state.downPayment}
        step={1}
        dType={ACTIONS.DOWN_PAYMENT}
        label="Первоначальный взнос"
        symbol="&#8381;"
      />
      <DropDown handleDispatch={handleDispatch} />

      <button onClick={handleSubmit} className="calculateBtn">
        Рассчитать
      </button>
    </>
  );
}
