"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FcGoogle } from "@react-icons/all-files/fc/FcGoogle";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function () {
    
    const { status } = useSession();
    const router = useRouter();
    
    
    if (status === "loading") return null;
    if (status === "authenticated") {
        router.push("/");
        return null;
    }
    
    return (
        <div>
            <Card className="max-w-[40rem] mx-auto mt-16">
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>Login to MyFIT in one click using Google.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button
                        className="bg-white text-black hover:bg-white w-full text-lg font-semibold"
                        onClick={() => signIn("google", { redirect: "/" })}
                        size="lg"
                    >
                        <FcGoogle className="mr-4 text-xl"/>
                        Login with Google
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
    
}