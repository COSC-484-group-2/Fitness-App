"use client";
import React, { startTransition, useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { GiMuscleUp } from "react-icons/gi";
import { FiPause, FiSkipForward } from "react-icons/fi";
import { BiTimer, BiUndo } from "react-icons/bi";
import { useReward } from "react-rewards";


export const WorkoutTimer = ({ workoutItems, defaultDuration = 1 }) => {
    const { reward: confettiReward, isAnimating: isConfettiAnimating } = useReward("confettiReward", "confetti", {
        lifetime: 400,
        decay: 0.9,
    });
    const [currentItemIndex, setCurrentItemIndex] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [durations, setDurations] = useState(
        Array(workoutItems.length).fill(defaultDuration),
    );
    const [key, setKey] = useState(0);
    
    useEffect(() => {
        let timer;
        
        if (isRunning) {
            timer = setInterval(() => {
                setCurrentItemIndex((prevIndex) =>
                    prevIndex === workoutItems.length - 1 ? 0 : prevIndex + 1,
                );
                setKey((prevKey) => prevKey + 1);
            }, durations[currentItemIndex] * 60 * 1000);
        }
        
        return () => clearInterval(timer);
    }, [isRunning, workoutItems, durations, currentItemIndex]);
    
    const handleStart = () => {
        setIsRunning(true);
    };
    
    const handlePause = () => {
        setIsRunning(false);
    };
    
    const handleSkip = () => {
        setCurrentItemIndex((prevIndex) => {
            if (prevIndex === workoutItems.length - 1) {
                handleStopping();
                return 0;
            } else {
                handleContinue();
                return prevIndex + 1;
            }
        });
        setKey((prevKey) => prevKey + 1);
        
    };
    
    const handleStopping = () => {
        startTransition(() => {
            setIsRunning(false);
            confettiReward();
        });
    };
    const handleContinue = () => {
        startTransition(() => {
            setIsRunning(true);
        });
    };
    
    const handleStop = () => {
        setIsRunning(false);
        setCurrentItemIndex(0);
        setKey((prevKey) => prevKey + 1);
    };
    
    const handleDurationChange = (index, value) => {
        setDurations((prevDurations) =>
            prevDurations.map((d, i) => (i === index ? Math.max(1, parseInt(value, 10)) : d)),
        );
    };
    
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <BiTimer className="text-lg mr-2"/> Start
                </Button>
            </DialogTrigger>
            <DialogContent>
                <div>
                    <div className="flex flex-col items-center justify-center gap-4">
                        <span id="confettiReward"/>
                        <p className="text-xl font-semibold">{workoutItems[currentItemIndex]}</p>
                        
                        <CountdownCircleTimer
                            key={key} // This key change will reset the countdown
                            isPlaying={isRunning}
                            duration={durations[currentItemIndex] * 60}
                            colors={["#F7B801", "#A30000"]}
                            colorsTime={[60, 0]}
                            onComplete={handleSkip}
                        >
                            {({ remainingTime }) => {
                                const minutes = Math.floor(remainingTime / 60);
                                const seconds = remainingTime % 60;
                                
                                return <p
                                    className="text-2xl font-bold"
                                >{minutes < 10 ? "0" + minutes : minutes}:{seconds < 10 ? "0" + seconds : seconds}</p>;
                            }}
                        </CountdownCircleTimer>
                        
                        <p>
                            Next: <span className="font-semibold">{workoutItems[currentItemIndex + 1] ?? "End"}</span>
                        </p>
                    </div>
                    
                    <div className="space-y-4 flex flex-col items-center mt-8">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline">
                                    <BiTimer className="text-lg mr-2"/> Edit durations
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {workoutItems.map((item, index) => (
                                        <li key={index}>
                                            <p className="mb-2 line-clamp-1">{item} (minutes):</p>
                                            <Input
                                                type="number"
                                                value={durations[index]}
                                                onChange={(e) => handleDurationChange(index, e.target.value)}
                                                disabled={isRunning}
                                            />
                                        </li>
                                    ))}
                                </ul>
                            </DialogContent>
                        </Dialog>
                        
                        <div className="flex gap-4">
                            <Button onClick={handleStart} disabled={isRunning}>
                                <GiMuscleUp className="text-lg mr-2"/> Start
                            </Button>
                            <Button onClick={handlePause} disabled={!isRunning} variant="outline">
                                <FiPause className="text-lg mr-2"/> Pause
                            </Button>
                            <Button onClick={handleSkip} disabled={!isRunning} variant="outline">
                                <FiSkipForward className="text-lg mr-2"/> Skip
                            </Button>
                            <Button onClick={handleStop} disabled={!isRunning} variant="ghost">
                                <BiUndo className="text-lg mr-2"/> Stop
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    
    );
};