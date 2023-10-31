"use client";
import React from 'react'; 
import './progress.css'; 
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HomePageResources } from "@/components/resource";

export default function () {
    
    const { data: session, status } = useSession();
    
    if (status === "loading") return null;
    
    if (status === "authenticated") {
        
        return (
            <div className="container max-w-6xl pt-16 space-y-4">
                <p className="text-3xl md:text-4xl font-bold">Track your progress</p>

                <div class = "progress-board">
                    <div>
                        <h1 class= "metrics">Personal Records</h1>
                        <h1 class= "metrics">Caloric Intake</h1>
                        <h1 class ="metrics">Body Metrics</h1>
                    </div>
                </div>
            </div>
        );
    }
    
}