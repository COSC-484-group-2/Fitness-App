"use client";
import React from "react";
import "./progress.css";
import Link from "next/link";
import { useSession } from "next-auth/react";


export default function () {
    
    const { data: session, status } = useSession();
    
    if (status === "loading") return null;
    
    if (status === "authenticated") {
        
        return (
            <div className="container max-w-6xl pt-16 space-y-4">
                <p className="text-3xl md:text-4xl font-bold">Track your progress</p>
                
                <section className="progress-board">
                    <div className="metric">
                        <Link href="/personal-records"><h1 className="metrics">Personal Records</h1></Link>
                    </div>
                    <div className="metric">
                        <Link href="/caloric-intake"><h1 className="metrics">Caloric Intake</h1></Link>
                    </div>
                    <div className="metric">
                        <Link href="/body-metrics"><h1 className="metrics">Body Metrics</h1></Link>
                    </div>
                </section>
            </div>
        );
    }
    
}