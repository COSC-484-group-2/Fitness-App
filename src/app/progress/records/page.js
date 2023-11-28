"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { PageSection } from "@/components/page-section";



// Import statements...

export default function BodyMeasurementsForm() {
    const { data: session, status } = useSession();

    const [bodyMeasurements, setBodyMeasurements] = useState({
        name: "",
        date: "",
        weight: { pounds: 0, ounces: 0 },
        height: { feet: 0, inches: 0 },
    });

    const [bmi, setBMI] = useState(null);
    const [bmiCategory, setBMICategory] = useState(null);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        const updatedBodyMeasurements = { ...bodyMeasurements };

        if (name.includes("weight") || name.includes("height")) {
            const [group, subProperty] = name.split(".");
            updatedBodyMeasurements[group][subProperty] = parseFloat(value);
        } else {
            updatedBodyMeasurements[name] = value;
        }

        setBodyMeasurements(updatedBodyMeasurements);
    };

    const calculateBMI = () => {
        const { weight, height } = bodyMeasurements;
        const weightInKg = (weight.pounds * 0.453592) + (weight.ounces * 0.0283495);
        const heightInM = (height.feet * 0.3048) + (height.inches * 0.0254);
        const bmiValue = weightInKg / Math.pow(heightInM, 2);
        setBMI(bmiValue.toFixed(2));

        // Determine BMI category
        if (bmiValue < 18.5) {
            setBMICategory("Underweight");
        } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
            setBMICategory("Normal weight");
        } else if (bmiValue >= 25 && bmiValue <= 29.9) {
            setBMICategory("Overweight");
        } else {
            setBMICategory("Obesity");
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        calculateBMI();
    };

    if (status === "loading") return null;

    return (
        <PageSection title="Body measurements">
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={bodyMeasurements.name}
                        onChange={handleInputChange}
                    />
                </label>

                <label>
                    Date:
                    <input
                        type="text"
                        name="date"
                        value={bodyMeasurements.date}
                        onChange={handleInputChange}
                    />
                </label>

                <label>
                    Weight (lbs):
                    <input
                        type="number"
                        name="weight.pounds"
                        value={bodyMeasurements.weight.pounds}
                        onChange={handleInputChange}
                    />
                </label>

                <label>
                    Weight (oz):
                    <input
                        type="number"
                        name="weight.ounces"
                        value={bodyMeasurements.weight.ounces}
                        onChange={handleInputChange}
                    />
                </label>

                <label>
                    Height (feet):
                    <input
                        type="number"
                        name="height.feet"
                        value={bodyMeasurements.height.feet}
                        onChange={handleInputChange}
                    />
                </label>

                <label>
                    Height (inches):
                    <input
                        type="number"
                        name="height.inches"
                        value={bodyMeasurements.height.inches}
                        onChange={handleInputChange}
                    />
                </label>

                <button type="submit" className="capture-button">
                   <h2>Captured Body Measurements:</h2> 
                </button>
            </form>

            {bmi && (
                <div>
                    <h2>BMI:</h2>
                    <p>{bmi}</p>
                </div>
            )}

            {bmiCategory && (
                <div>
                    <h2>BMI Category:</h2>
                    <p>{bmiCategory}</p>
                </div>
            )}

            <div>
                <h2>Body Measurements:</h2>
                <ul>
                    <li><strong>Name:</strong> {bodyMeasurements.name}</li>
                    <li><strong>Date:</strong> {bodyMeasurements.date}</li>
                    <li><strong>Weight:</strong> {bodyMeasurements.weight.pounds} lbs {bodyMeasurements.weight.ounces} oz</li>
                    <li><strong>Height:</strong> {bodyMeasurements.height.feet}' {bodyMeasurements.height.inches}"</li>
                </ul>
            </div>
        </PageSection>
    );
}
