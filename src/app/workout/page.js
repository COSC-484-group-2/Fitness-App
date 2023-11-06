"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import "../style/workout.css";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { HomePageResources } from "@/components/resource";
import { Resource } from "@/components/resource";
import { FiBarChart } from "@react-icons/all-files/fi/FiBarChart";
import { FiPlus } from "@react-icons/all-files/fi/FiPlus";
import { GiStrong } from "@react-icons/all-files/gi/GiStrong";
import { GiLeg } from "@react-icons/all-files/gi/GiLeg";
import { GiBodyBalance } from "@react-icons/all-files/gi/GiBodyBalance";
import { BiRun } from "@react-icons/all-files/bi/BiRun";

function WorkoutTypeIcon({ icon: Icon }) {
    return (
        <div className="circle">
            <Icon className="icon"/>
        </div>
    );
}

function WorkoutTypePattern({ mouseX, mouseY, ...gridProps }) {
    let maskImage = useMotionTemplate`radial-gradient(180px at ${mouseX}px ${mouseY}px, white, transparent)`;
    let style = { maskImage, WebkitMaskImage: maskImage };
    
    return (
        <div className="pointer-events-none">
            <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#ea580c] to-[#ea580c] opacity-0 transition duration-300 group-hover:opacity-100 dark:group-hover:opacity-10 dark:from-[#ea580c] dark:to-[#e3956d]"
                style={style}
            />
        </div>
    );
}

export function WorkoutTypes({ workoutType }) {
    let mouseX = useMotionValue(0);
    let mouseY = useMotionValue(0);
    
    function onMouseMove({ currentTarget, clientX, clientY }) {
        let { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }
    
    return (
        <div
            key={workoutType.name}
            onMouseMove={onMouseMove}
            className="group"
        >
            <WorkoutTypePattern {...workoutType.pattern} mouseX={mouseX} mouseY={mouseY}/>
        <div className="sub-section"/>
            <div className="sub-section-content">
                <WorkoutTypeIcon icon={workoutType.icon}/>
                <h3 className="workout-type-name">
                        {workoutType.name}
                </h3>
                <p className="workout-type-list">
                    {workoutType.list}
                </p>
            </div>
        </div>
    );
}

export function UpperBody() {

    const [upperBodyWorkouts, setUpperBodyWorkouts] = useState(null);

    useEffect(() => {
        async function getUpperBodyWorkouts() {
            const response = await fetch('http://localhost:4000/Upper-Body');
            const data = await response.json();
            setUpperBodyWorkouts(data);
        }
    
        getUpperBodyWorkouts()
    }, [])
    
    return (
        <div>
            {upperBodyWorkouts && upperBodyWorkouts.map((item, id) => (
                <div key={id} className="workout-type-list-item">
                    <div className="a-workout">
                        <p>{item.name}</p>
                        <p className="a-workout-target">{item.target}</p>
                    </div> <FiPlus className="icon"/>
                </div>
                ))
            }
        </div>
    );
    
}

export function LowerBody() {

    const [lowerBodyWorkouts, setLowerBodyWorkouts] = useState(null);

    useEffect(() => {
        async function getLowerBodyWorkouts() {
            const response = await fetch('http://localhost:4000/Lower-Body');
            const data = await response.json();
            setLowerBodyWorkouts(data);
        }
    
        getLowerBodyWorkouts()
    }, [])
    
    return (
        <div>
            {lowerBodyWorkouts && lowerBodyWorkouts.map((item, id) => (
                <div key={id} className="workout-type-list-item">
                    <div className="a-workout">
                        <p>{item.name}</p>
                        <p className="a-workout-target">{item.target}</p>
                    </div> <FiPlus className="icon"/>
                </div>
                ))
            }
        </div>
    );
    
}

export function FullBody() {

    const [fullBodyWorkouts, setFullBodyWorkouts] = useState(null);

    useEffect(() => {
        async function getFullBodyWorkouts() {
            const response = await fetch('http://localhost:4000/Full-Body');
            const data = await response.json();
            setFullBodyWorkouts(data);
        }
    
        getFullBodyWorkouts()
    }, [])
    
    return (
        <div>
            {fullBodyWorkouts && fullBodyWorkouts.map((item, id) => (
                <div key={id} className="workout-type-list-item">
                    <div className="a-workout">
                        <p>{item.name}</p>
                        <p className="a-workout-target">{item.target}</p>
                    </div> <FiPlus className="icon"/>
                </div>
                ))
            }
        </div>
    );
    
}

export function Cardio() {

    const [cardioWorkouts, setCardioWorkouts] = useState(null);

    useEffect(() => {
        async function getCardioWorkouts() {
            const response = await fetch('http://localhost:4000/Cardio');
            const data = await response.json();
            setCardioWorkouts(data);
        }
    
        getCardioWorkouts()
    }, [])
    
    return (
        <div>
            {cardioWorkouts && cardioWorkouts.map((item, id) => (
                <div key={id} className="workout-type-list-item">
                    <div className="a-workout">
                        <p>{item.name}</p>
                        <p className="a-workout-target">{item.target}</p>
                    </div> <FiPlus className="icon"/>
                </div>
                ))
            }
        </div>
    );
    
}

export default function () {

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
    
    const { data: session, status } = useSession();
    
    if (status === "loading") return null;
    
    if (status === "authenticated") {
        
        return (
            <div className="container max-w-6xl pt-16 space-y-4">
                <p className="text-3xl md:text-4xl font-bold">Workout</p>
                <div className="workout-dashboard">
                    <div className="workout-dashboard__section">
                        <div className="workout-dashboard__section__header">
                            <p className="text-2xl font-bold">My Workouts</p>
                            <Link href="/workout/create">
                                    <Button>
                                        Create Workout
                                    </Button>
                            </Link>
                        </div>
                    </div>
                    <div className="workout-dashboard__section">
                        <div className="workout-dashboard__section__header">
                            <p className="text-2xl font-bold">Explore Workouts</p>
                            <div
                                className="not-prose mt-4 grid grid-cols-1 gap-4 border-t border-zinc-900/5 pt-10 dark:border-white/5 sm:grid-cols-2 xl:grid-cols-2">
                                {workoutTypes.map((workoutType) => (
                                    <WorkoutTypes key={workoutType.name} workoutType={workoutType}/>
                                ))}
                            </div>
            
                        </div>
                    </div>

                </div>
            </div>
        );
    }
    
}