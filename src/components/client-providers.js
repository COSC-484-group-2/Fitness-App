"use client";
import { SessionProvider, useSession } from "next-auth/react";
import { Provider as JotaiProvider } from "jotai";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Spinner } from "@/components/spinner";
import { MainNav } from "@/components/main-nav";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { useSetAccount } from "@/lib/account";

const queryClient = new QueryClient();

export function ClientProviders({ children }) {
    return (
        <SessionProvider>
            <JotaiProvider>
                <QueryClientProvider client={queryClient}>
                    <NextThemesProvider defaultTheme="dark" attribute="class"
                                        disableTransitionOnChange>
                        <Wrapper>
                            {children}
                        </Wrapper>
                        <Toaster/>
                    </NextThemesProvider>
                </QueryClientProvider>
            </JotaiProvider>
        </SessionProvider>
    );
}

export function Wrapper({ children }) {
    
    const { data: session, status } = useSession();
    useSetAccount(session, status);
    
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