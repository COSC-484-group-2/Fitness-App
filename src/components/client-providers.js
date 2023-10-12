"use client"
import { SessionProvider } from "next-auth/react";
import { Provider as JotaiProvider } from "jotai";

export function ClientProviders({ children }) {
    return (
        <SessionProvider>
            <JotaiProvider>
                {children}
            </JotaiProvider>
        </SessionProvider>
    )
}
