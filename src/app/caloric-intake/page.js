"use client";
import React, { useState } from 'react';

function CaloricIntakeTracker() {
  const [food, setFood] = useState('');
  const [calories, setCalories] = useState(0);
  const [foodList, setFoodList] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);
  const [currentDay, setCurrentDay] = useState('');

  const getCurrentDay = () => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDate = new Date();
    const dayIndex = currentDate.getDay();
    setCurrentDay(daysOfWeek[dayIndex]);
  };

  const addFood = () => {
    if (food && calories > 0) {
      const newItem = { food, calories };
      setFoodList([...foodList, newItem]);
      setTotalCalories(totalCalories + calories);
      setFood('');
      setCalories(0);
      getCurrentDay();
    }
  };

  return (
    <div>
      <h1>Caloric Intake Tracker</h1>
      <div>
        <label>Enter food item:</label>
        <input
          type="text"
          value={food}
          onChange={(e) => setFood(e.target.value)}
        />
      </div>
      <div>
        <label>Enter calories:</label>
        <input
          type="number"
          value={calories}
          onChange={(e) => setCalories(parseInt(e.target.value) || 0)}
        />
      </div>
      <button onClick={addFood}>Add Food</button>
      <div>
        <h2>Food List for {currentDay}</h2>
        <ul>
          {foodList.map((item, index) => (
            <li key={index}>
              {item.food}: {item.calories} calories
            </li>
          ))}
        </ul>
        <p>Total Calories: {totalCalories}</p>
      </div>
    </div>
  );
}

export default CaloricIntakeTracker;


