"use client";
import React from 'react'; 
import './progress.css'; 
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { HomePageResources } from "@/components/resource";

export default function () {
    
    const { data: session, status } = useSession();
    
    if (status === "loading") return null;
    
    if (status === "authenticated") {
        
        return (
            <div className="container max-w-6xl pt-16 space-y-4">
                <p className="text-3xl md:text-4xl font-bold">Track your progress</p>

                <section class = "progress-board">
                    <div class = "metric">
                        <Link href = './records.js'><h1 class= "metrics">Personal Records</h1> </Link>
                    </div>
                    <div class ="metric">
                        <Link href = './records.js'><h1 class= "metrics">Caloric Intake</h1> </Link>
                    </div>
                    <div class ="metric">
                        <Link href = './records.js'><h1 class= "metrics">Body Metrics</h1> </Link>
                    </div>
                </section>
            </div>
        );
    }
    
}