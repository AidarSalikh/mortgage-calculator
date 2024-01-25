import { useState } from "react";

export default function DropDown({ dispatch }) {
  const [state, setState] = useState("");
  const options = [
    { id: 1, value: "1 год" },
    { id: 2, value: "2 года" },
    { id: 3, value: "3 года" },
    { id: 4, value: "4 года" },
    { id: 5, value: "5 лет" },
    { id: 10, value: "10 лет" },
    { id: 15, value: "15 лет" },
    { id: 20, value: "20 лет" },
  ];
  return (
    <div className="dropdownContainer">
      <p>Срок</p>
      <div className="selectYear">
        <select
          onChange={(e) => {
            dispatch({ type: "YEARS", payload: e.target.value });
          }}
        >
          {options.map((option) => {
            return (
              <option key={option.id} value={option.id}>
                {option.value}
              </option>
            );
          })}
        </select>
        <span className="customArrow"></span>
      </div>
    </div>
  );
}
