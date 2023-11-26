"use client";
import React, { useState, useEffect } from "react";
import { PageSection } from "@/components/page-section";

function CaloricIntakeTracker() {
    const [food, setFood] = useState("");
    const [calories, setCalories] = useState(0);
    const [foodList, setFoodList] = useState({});
    const [totalCalories, setTotalCalories] = useState(0);

    useEffect(() => {
        const storedFoodList = JSON.parse(localStorage.getItem("foodList")) || {};
        setFoodList(storedFoodList);
    }, []);

    useEffect(() => {
        localStorage.setItem("foodList", JSON.stringify(foodList));
    }, [foodList]);

    const addFood = () => {
        if (food && calories > 0) {
            const currentDate = new Date().toLocaleDateString();
            const newItem = { food, calories };
            const updatedFoodList = { ...foodList };

            if (!updatedFoodList[currentDate]) {
                updatedFoodList[currentDate] = [newItem];
            } else {
                updatedFoodList[currentDate].push(newItem);
            }

            setFoodList(updatedFoodList);
            setTotalCalories(totalCalories + calories);
            setFood("");
            setCalories(0);
        }
    };

    return (
        <PageSection title="Caloric Intake Tracker">
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
                <h2>Food List</h2>
                {Object.keys(foodList).map((day) => (
                    <div key={day}>
                        <h3>{day}</h3>
                        <ul>
                            {foodList[day].map((item, index) => (
                                <li key={index}>
                                    {item.food}: {item.calories} calories
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
                <p>Total Calories: {totalCalories}</p>
            </div>
        </PageSection>
    );
}

export default CaloricIntakeTracker;
