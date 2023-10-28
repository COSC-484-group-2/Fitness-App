"use client";
import { SessionProvider, useSession } from "next-auth/react";
import { Provider as JotaiProvider } from "jotai";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Spinner } from "@/components/spinner";
import { MainNav } from "@/components/main-nav";

export function ClientProviders({ children }) {
    return (
        <SessionProvider>
            <JotaiProvider>
                <NextThemesProvider defaultTheme="dark" forcedTheme="dark" attribute="class" disableTransitionOnChange>
                    <Wrapper>
                        {children}
                    </Wrapper>
                </NextThemesProvider>
            </JotaiProvider>
        </SessionProvider>
    );
}

export function Wrapper({ children }) {
    
    const { status } = useSession();
    
    return <>
        {status === "loading" ?
            <>
                <div className="fixed w-full h-full flex justify-center items-center backdrop-blur-xl">
                    <Spinner/>
                </div>
            </>
            :
            <>
                <MainNav/>
                <main className="pt-16">
                    {children}
                </main>
            </>
        }
    </>;
}