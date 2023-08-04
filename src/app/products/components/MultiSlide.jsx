import React, { useCallback, useEffect, useState, useRef } from "react";
import styles from "./styles.module.css";
import useCustomRouter from "@/hooks/useCustomRouter";

const MultiSlide = ({ min, max, onChange }) => {
  const { query } = useCustomRouter();
  const [minVal, setMinVal] = useState(query.minPrice || min);
  const [maxVal, setMaxVal] = useState(query.maxPrice || max);

  const minValRef = useRef(query.minPrice || min);
  const maxValRef = useRef(query.maxPrice || max);

  const range = useRef(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      const percent = maxPercent - minPercent;
      range.current.style.width = `${percent > 100 ? 100 : percent}%`;
    }
  }, [maxVal, getPercent]);

  // Get min and max values when their state changes
  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange]);

  return (
    <div className="h-fit flex items-center justify-center mt-5">
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        onChange={(event) => {
          const value = Math.min(Number(event.target.value), maxVal - 1);
          setMinVal(value);
          minValRef.current = value;
        }}
        className={`${styles.thumb} ${styles.thumbLeft} bg-neutral-800 dark:bg-neutral-200`}
        style={{ zIndex: minVal > max - 100 && "5" }}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        onChange={(event) => {
          const value = Math.max(Number(event.target.value), minVal + 1);
          setMaxVal(value);
          maxValRef.current = value;
        }}
        className={`${styles.thumb} ${styles.thumbRight} bg-neutral-800 dark:bg-neutral-200`}
      />
      <div className={`${styles.slider} w-56`}>
        <div
          className={`${styles.sliderTrack} bg-neutral-500 dark:bg-neutral-400`}
        />
        <div ref={range} className={`${styles.sliderRange} bg-blue-500`} />
        <div
          className={`${styles.sliderLeftValue} text-neutral-800 dark:text-neutral-200`}
        >
          {minVal}
        </div>
        <div
          className={`${styles.sliderRightValue} text-neutral-800 dark:text-neutral-200`}
        >
          {maxVal}
        </div>
      </div>
    </div>
  );
};

export default MultiSlide;
