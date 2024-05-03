import "./Box.css";
// import React, { useState } from 'react';

export default function Box({ onFiltersChange, filter_name, data }) {
  function handleSelectChange(e) {
    onFiltersChange({ [filter_name]: e.target.value });
  }
  const set = new Set();
  data.sort((a, b) => {
    // Treat null values as the smallest
    if (a === null) return -1;
    if (b === null) return 1;

    // Sort numbers numerically
    return a - b;
  });

  const filter_arr = data.map((item) => {
    if (item == null) {
      return null;
    }
    if (!set.has(item)) {
      set.add(item);
      return (
        <option value={item} key={item}>
          {item}
        </option>
      );
    }
    return null;
  });

  return (
    <>
      <div className="dropdown-container">
        <select className="box dropdown" onChange={handleSelectChange}>
          <option value="" selected>
            {filter_name}
          </option>
          {filter_arr}
        </select>
      </div>
    </>
  );
}
