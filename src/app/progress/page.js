"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { Resource } from "@/components/resource";
import { ImUnlocked } from "react-icons/im";
import { GiNotebook, GiWeightScale } from "react-icons/gi";
import { SimpleGrid } from "@/components/simple-grid";


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
                
                <SimpleGrid>
                    {resources.map((resource) => (
                        <Resource key={resource.href} resource={resource}/>
                    ))}
                </SimpleGrid>
            </div>
        );
    }
}