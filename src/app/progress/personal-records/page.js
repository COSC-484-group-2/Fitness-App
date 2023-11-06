"use client";
import "@/app/style/personal-records.css";
import { GiStrong } from "@react-icons/all-files/gi/GiStrong";
import { GiLeg } from "@react-icons/all-files/gi/GiLeg";
import { GiBodyBalance } from "@react-icons/all-files/gi/GiBodyBalance";
import { TfiStatsUp } from "react-icons/tfi";
import React, { useMemo, useState } from "react";
import { WorkoutPopup } from "@/app/progress/personal-records/update-records/page";
import { WorkoutTypeList } from "@/app/workout/page";
import { GiRun } from "react-icons/gi";
import { ResourceWithContent } from "@/components/resource-with-content";
import { SimpleGrid } from "@/components/simple-grid";

export function CurrentStats() {
    
    // const [currStats, setCurrStats] = useState([]);
    // useEffect(() => {
    //     async function getCurrStats() {
    //         const urls = [
    //             "http://localhost:4000/Upper-Body",
    //             "http://localhost:4000/Lower-Body",
    //             "http://localhost:4000/Full-Body",
    //             "http://localhost:4000/Cardio",
    //         ];
    //         const responses = await Promise.all(urls.map((url) => fetch(url)));
    //         const data = await Promise.all(responses.map((response) => response.json()));
    //         // combines data from multiple requests into a single array
    //         const combinedData = data.flat();
    //         setCurrStats(combinedData);
    //     }
    //
    //     getCurrStats();
    // }, []);
    
    const currStats = [
        {
            id: "1",
            workout_item: {
                name: "Burpees",
                target: "...",
            },
        }
    ]
    
    return (
        <div>
            {currStats && currStats.map((item, id) => (
                <div key={id} className="workout-type-list-item">
                    <div className="a-workout">
                        <p>{item.workout_item.name}</p>
                        <p className="a-workout-target">{item.workout_item.target}</p>
                    </div>
                    {/* <FiPlus className="icon"/>  instead of plus button, this will hold the numerical values for user's current stats */}
                </div>
            ))
            }
        </div>
    );
    
}


export default function Page() {
    const [isPopupVisible, setPopupVisibility] = useState(false);
    
    const togglePopup = () => {
        setPopupVisibility(!isPopupVisible);
    };
    
    
    const currentStats = [
        {
            name: "Current Statistics:",
            list: < CurrentStats/>,
            icon: TfiStatsUp,
        },
    ];
    
    const workoutTypes = useMemo(() => [
        {
            name: "Upper Body",
            list: <WorkoutTypeList category="upper-body"/>,
            icon: GiStrong,
        },
        {
            name: "Lower Body",
            list: <WorkoutTypeList category="lower-body"/>,
            icon: GiLeg,
        },
        {
            name: "Full Body",
            list: <WorkoutTypeList category="full-body"/>,
            icon: GiBodyBalance,
        },
        {
            name: "Cardio",
            list: <WorkoutTypeList category="cardio"/>,
            icon: GiRun,
        },
    ], []);
    
    
    return (
        
        <div className="">
            <p className="header">Check and Update your Personal Records</p>
            <div className="stats-and-input-wrapper">
                <div className="current-stats">
                    <p className="cstatsheader font-bold text-2xl">Look at Your PRs!</p>
                    <div
                        className="">
                        {currentStats.map((workoutType) => (
                            <ResourceWithContent
                                key={workoutType.name}
                                name={workoutType.name}
                                icon={workoutType.icon}
                            >
                                {workoutType.list}
                            </ResourceWithContent>
                        ))}
                    </div>
                </div>
                
                <div className="update-workout-dashboard__section">
                    <p className="text-2xl font-bold">What Records did we Break Today?</p>
                    <SimpleGrid
                        onClick={togglePopup}>
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
                        {/*{workoutTypes.map((workoutType) => (*/}
                        {/*    <WorkoutTypes key={workoutType.name} workoutType={workoutType}/>*/}
                        {/*    ))}*/}
                    </SimpleGrid>
                </div>
            </div>
        </div>
    );
    
}