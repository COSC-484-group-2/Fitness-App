"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";

export default function BodyMeasurementsForm() {
    const { data: session, status } = useSession();

    const [bodyMeasurements, setBodyMeasurements] = useState({
        name: "",
        date: "",
        weight: { pounds: 0, ounces: 0 },
        height: { feet: 0, inches: 0 },
        waistCircumference: 0,
        hipCircumference: 0,
    });
    
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        const updatedBodyMeasurements = { ...bodyMeasurements };

        if (name.includes("weight") || name.includes("height")) {
            // Handle nested properties for weight and height
            const [group, subProperty] = name.split(".");
            updatedBodyMeasurements[group][subProperty] = parseFloat(value);
        } else {
            updatedBodyMeasurements[name] = value;
        }

        setBodyMeasurements(updatedBodyMeasurements);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // You can submit the form data or perform any necessary action here
    };

    if (status === "loading") return null;

    return (
        <div>
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

                <label>
                    Waist Circumference (inches):
                    <input
                        type="number"
                        name="waistCircumference"
                        value={bodyMeasurements.waistCircumference}
                        onChange={handleInputChange}
                    />
                </label>

                <label>
                    Hip Circumference (inches):
                    <input
                        type="number"
                        name="hipCircumference"
                        value={bodyMeasurements.hipCircumference}
                        onChange={handleInputChange}
                    />
                </label>

                <button type="submit" className="capture-button">
                    Capture Body Measurements
                </button>
            </form>

            {/* Display the measurements on the page */}
            <div>
                <h2>Body Measurements:</h2>
                <ul>
                    <li><strong>Name:</strong> {bodyMeasurements.name}</li>
                    <li><strong>Date:</strong> {bodyMeasurements.date}</li>
                    <li><strong>Weight:</strong> {bodyMeasurements.weight.pounds} lbs {bodyMeasurements.weight.ounces} oz</li>
                    <li><strong>Height:</strong> {bodyMeasurements.height.feet}' {bodyMeasurements.height.inches}"</li>
                    <li><strong>Waist Circumference (inches):</strong> {bodyMeasurements.waistCircumference}</li>
                    <li><strong>Hip Circumference (inches):</strong> {bodyMeasurements.hipCircumference}</li>
                </ul>
            </div>
        </div>
    );
}
