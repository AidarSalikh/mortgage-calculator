import { useEffect, useRef, useState } from "react";

export default function Range({
  min,
  max,
  value,
  step,
  dispatch,
  dType,
  label,
}) {
  const [sliderRange, setSliderRange] = useState(value);
  //   const [inputValue, setInputValue] = useState(value);
  const sliderRef = useRef(null);

  function handleSliderInput() {
    const range = max - min;
    const distance = sliderRef.current.value - min;
    const percentage = (distance / range) * 100;

    setSliderRange(percentage);
    // setInputValue(sliderRef.current.value);
    dispatch({ type: `${dType}`, payload: sliderRef.current.value });
  }

  function handleNumberInput(e) {
    const newValue = parseInt(e.target.value);

    if (newValue < min) {
      dispatch({ type: `${dType}`, payload: min });
      setSliderRange(0);
    } else if (newValue > max) {
      dispatch({ type: `${dType}`, payload: max });
      setSliderRange(100);
    } else {
      dispatch({ type: `${dType}`, payload: newValue });

      const range = max - min;
      const distance = newValue - min;
      const percentage = (distance / range) * 100;
      setSliderRange(percentage);
    }
  }

  useEffect(() => {
    handleSliderInput();
  }, [sliderRef]);

  return (
    <div className="range-slider">
      {/* <div className="slider-values"> */}
      <label htmlFor={label} className="label">
        {label}
      </label>
      <input
        id={label}
        className="number-input"
        type="number"
        value={value}
        onInput={handleNumberInput}
        min={min}
        max={max}
        step={step}
      />
      {/* </div> */}
      <div className="slider-container">
        {/* <span className="slider-values min">{min}</span> */}

        <input
          className="slider"
          type="range"
          value={value}
          // try on change ???
          onInput={handleSliderInput}
          min={min}
          max={max}
          step={step}
          ref={sliderRef}
        />
        {/* <span className="slider-values max">{max}</span> */}

        <div
          className="slider-thumb"
          style={{ left: `calc(${sliderRange}% - 0.5em)` }}
        ></div>
        <div className="progress" style={{ width: `${sliderRange}%` }}></div>
      </div>
      {/* 4:26 slider thumb */}
    </div>
  );
}
