"use client";
import "@/app/style/personal-records.css";
import {WorkoutTypes} from "@/app/workout/page"
import { UpperBody } from "@/app/workout/page";
import { LowerBody } from "@/app/workout/page";
import { FullBody } from "@/app/workout/page";
import { Cardio } from "@/app/workout/page";
import { GiStrong } from "@react-icons/all-files/gi/GiStrong";
import { GiLeg } from "@react-icons/all-files/gi/GiLeg";
import { GiBodyBalance } from "@react-icons/all-files/gi/GiBodyBalance";
import { BiRun } from "@react-icons/all-files/bi/BiRun";
import { TfiStatsUp } from 'react-icons/tfi';
import React, { useState, useEffect } from "react";
import {WorkoutPopup} from "@/app/progress/personal-records/update-records/page";
import { FiPlus } from 'react-icons/fi'; 
import { WorkoutType } from "@/app/progress/personal-records/update-records/page";

export function CurrentStats() {

    const [currStats, setCurrStats] = useState([]);

    useEffect(() => {
        async function getCurrStats() {
            const urls = [
                'http://localhost:4000/Upper-Body',
                'http://localhost:4000/Lower-Body',
                'http://localhost:4000/Full-Body',
                'http://localhost:4000/Cardio'
              ];
              const responses = await Promise.all(urls.map((url) => fetch(url)));
              const data = await Promise.all(responses.map((response) => response.json()));
              // combines data from multiple requests into a single array
              const combinedData = data.flat();
              setCurrStats(combinedData);
        }
    
        getCurrStats()
    }, [])
    
    return (
        <div>
            {currStats && currStats.map((item, id) => (
                <div key={id} className="workout-type-list-item">
                    <div className="a-workout">
                        <p>{item.name}</p>
                        <p className="a-workout-target">{item.target}</p>
                    </div> 
                   {/* <FiPlus className="icon"/>  instead of plus button, this will hold the numerical values for user's current stats */}
                </div>
                ))
            }
        </div>
    );
    
}



export default function () {
    const [isPopupVisible, setPopupVisibility] = useState(false);

    const togglePopup = () => {
      setPopupVisibility(!isPopupVisible);
    };
  

    const currentStats = [
        {
            name: "Current Statistics:",
            list: < CurrentStats />,
            icon: TfiStatsUp,
        }
    ];

    const workoutTypes = [
        {
            name: "Upper Body",
            list:
                <UpperBody />,
            icon: GiStrong,
        },
        {
            name: "Lower Body",
            list:
                <LowerBody />,
            icon: GiLeg,
        },
        {
            name: "Full Body",
            list:
                <FullBody />,
            icon: GiBodyBalance,
        },
        {
            name: "Cardio",
            list:
                <Cardio />,
            icon: BiRun,
        },
    ];

    
    
    return (
       
    <div className="container ">
             <p className="header">Check and Update your Personal Records</p>
            <div className="stats-and-input-wrapper">
                <div className= "current-stats">
                    <p className="cstatsheader font-bold text-2xl">Look at Your PRs!</p>
                    <div className="not-prose mt-4 grid grid-cols-1 gap-4 border-t border-zinc-900/5 pt-10 dark:border-white/5 sm:grid-cols-2 xl:grid-cols-2">
                        {currentStats.map((workoutType) => (
                            <WorkoutTypes key={workoutType.name} workoutType={workoutType}/>
                            ))}
                    </div>
                </div>
                 
                <div className="update-workout-dashboard__section">
                     <p className="text-2xl font-bold">What Records did we Break Today?</p>
                     <div className="not-prose mt-4 grid grid-cols-1 gap-4 border-t border-zinc-900/5 pt-10 dark:border-white/5 sm:grid-cols-2 xl:grid-cols-2"  onClick = {togglePopup}>
                        {isPopupVisible && (
                            <WorkoutPopup
                             workoutName="UpperBody"
                            onClose={togglePopup}
                            onValueSubmit={(workoutName, value) => {
                         // should update database when new value is submitted
                            console.log(`Workout: ${workoutName}, Value: ${value}`);
                        }} 
                        />
                         )} 
                        {workoutTypes.map((workoutType) => (
                            <WorkoutTypes key={workoutType.name} workoutType={workoutType}/>
                            ))}
                    </div>
                </div>
            </div>
     </div>
    );
    
}
