import { useEffect, useRef, useState } from "react";

export default function Range({
  min,
  max,
  value,
  step,
  dType,
  label,
  symbol,
  handleDispatch,
}) {
  const [sliderRange, setSliderRange] = useState(value);
  const sliderRef = useRef(null);

  function handleSliderInput() {
    const range = max - min;
    const distance = sliderRef.current.value - min;
    const percentage = (distance / range) * 100;

    setSliderRange(percentage);

    let newValue = parseInt(sliderRef.current.value);
    handleDispatch(dType, newValue);
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
      handleDispatch(dType, min);
      setSliderRange(0);
    } else if (newValue > max) {
      handleDispatch(dType, max);
      setSliderRange(100);
    } else {
      handleDispatch(dType, newValue);

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
          required
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
