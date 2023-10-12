"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function () {
    
    const { data: session } = useSession();
    
    return (
        <main className="main">
            <h1>Hello</h1>
            
            <pre>
                {JSON.stringify(session, null, 2)}
            </pre>
            
            {session && (
                <div>
                    <p>Signed in as {session.user && session.user.name}</p>
                    <Link href="/api/auth/signout">Sign out</Link>
                </div>
            )}
        </main>
    );
}
