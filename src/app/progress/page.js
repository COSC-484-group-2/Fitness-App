"use client";
import React from "react";
import "./progress.css";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { FiBarChart } from "@react-icons/all-files/fi/FiBarChart";
import { FiDribbble } from "@react-icons/all-files/fi/FiDribbble";
import {Resource} from '@/components/resource';
import { ImUnlocked } from 'react-icons/im';
import { GiWeightScale } from 'react-icons/gi';
import { GiNotebook } from 'react-icons/gi';







export default function () {
    
    const { data: session, status } = useSession();

    
    const resources = [
        {
            href: "/progress/personal-records",
            name: "Personal Records",
            description:"Keep track of all your PRs",
            icon: ImUnlocked,
        },
        {
            href: "/caloric-intake",
            name: "Caloric Intake",
            description:"Track what you eat and your calories",
            icon: GiNotebook,
        },

        {
            href: "/body-metrics",
            name: "Body Metrics",
            description:
                "Update and keep track of your height, weight, BMI, and more",
            icon: GiWeightScale,
        },
    ];
    
    if (status === "loading") return null;
    
    if (status === "authenticated") {
        
        return (
            <div className="container max-w-6xl pt-16 space-y-4">
                <p className="text-3xl md:text-4xl font-bold">Track your progress</p>

                <div className="not-prose mt-4 grid grid-cols-1 gap-4 border-t border-zinc-900/5 pt-10 dark:border-white/5 sm:grid-cols-2 xl:grid-cols-2">
                    {resources.map((resource) => (
                        <Resource key={resource.href} resource={resource}/>
                    ))}
                </div>
                
                {/* <section className="progress-board">
                    <div className="metric">
                        <Link href="/personal-records"><h1 className="metrics">Personal Records</h1></Link>
                    </div>
                    <div className="metric">
                        <Link href="/caloric-intake"><h1 className="metrics">Caloric Intake</h1></Link>
                    </div>
                    <div className="metric">
                        <Link href="/body-metrics"><h1 className="metrics">Body Metrics</h1></Link>
                    </div>
                </section> */}
            </div>
        );
    }
}
