'use client';
import React, { useState } from "react";
import "@/app/style/update-records.css";

export function WorkoutType({ workoutType, togglePopup, onClick }) {
  return (
      <div>
          <div className="workout-type" onClick={onClick}>
              <h3>{workoutType.name}</h3>
              <p>{workoutType.description}</p>
          </div>
      </div>
  );
}

export function WorkoutPopup({ workoutName, onClose, onValueSubmit }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = () => {
    onValueSubmit(workoutName, inputValue);
    onClose();
  };

  return (
    <div className="workout-popup">
      <h2>Enter new max for {workoutName}</h2>
      <input
        type="number"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
}