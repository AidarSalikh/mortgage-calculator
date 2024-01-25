import { useEffect, useRef, useState } from "react";

export default function Range({
  min,
  max,
  value,
  step,
  dispatch,
  dType,
  label,
  symbol,
}) {
  const [sliderRange, setSliderRange] = useState(value);
  const sliderRef = useRef(null);

  function handleSliderInput() {
    const range = max - min;
    const distance = sliderRef.current.value - min;
    const percentage = (distance / range) * 100;

    setSliderRange(percentage);

    dispatch({ type: `${dType}`, payload: sliderRef.current.value });
  }

  function handleNumberInput(e) {
    let newValue = null;
    if (!e.target.value) {
      newValue = 0;
    } else {
      newValue = parseInt(e.target.value);
    }
    // Check if value is bigger or less than min/max
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
      <label htmlFor={label} className="label">
        {label}
      </label>
      <div className="number-input-container">
        <input
          id={label}
          className="number-input"
          type="text"
          value={value}
          onChange={handleNumberInput}
          min={min}
          max={max}
          step={step}
        />
        <div className="symbol">
          <span>{symbol}</span>
        </div>
      </div>
      <div className="slider-container">
        <input
          className="slider"
          type="range"
          value={value}
          onChange={handleSliderInput}
          min={min}
          max={max}
          step={step}
          ref={sliderRef}
        />
        <div
          className="slider-thumb"
          style={{ left: `calc(${sliderRange}% - 0.5em)` }}
        ></div>
        <div className="progress" style={{ width: `${sliderRange}%` }}></div>
      </div>
    </div>
  );
}
