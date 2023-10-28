"use client";
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
                <p className="text-3xl md:text-4xl font-bold">Workout</p>
            </div>
        );
    }
    
}