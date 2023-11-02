"use client";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HomePageResources } from "@/components/resource";

export default function () {
    
    const { data: session, status } = useSession();
    const firstName = session?.user?.name?.split(" ")?.[0];
    
    if (status === "loading") return null;
    
    if (status === "unauthenticated") {
        
        return (
            <div className="container max-w-6xl pt-16 space-y-4">
                <p className="text-5xl md:text-8xl font-bold">Welcome to <span
                    className="text-primary animate-mask-flare-loop underline-effect relative">MyFIT</span></p>
                <p className="text-xl md:text-3xl text-muted-foreground">Your personal fitness tracker.</p>
                <Link href="/login" className="inline-block">
                    <Button size="lg" className="text-xl bg-white text-black hover:text-white">Get
                        started {`->`}</Button>
                </Link>
            </div>
        );
    } else {
        return (
            <div className="container max-w-6xl pt-16 space-y-4">
                <p className="text-3xl md:text-4xl font-bold">Welcome back, <span
                    className="text-primary">{firstName}</span></p>
                <HomePageResources/>
            </div>
        );
    }
}