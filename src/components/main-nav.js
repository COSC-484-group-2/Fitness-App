"use client";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { UserNav } from "@/components/user-nav";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

export function MainNav({ className, ...props }) {
    
    const { data: session, status } = useSession();
    const pathname = usePathname();
    
    return (
        <div className="fixed top-0 w-full flex h-16 items-center px-4 border-b border-b-accent backdrop-blur-xl z-10">
            <Link className="text-3xl font-bold hover:animate-mask-flare-loop" href="/">
                MyFIT
            </Link>
            <div className="ml-auto flex items-center space-x-4">
                <nav
                    className={cn("flex items-center space-x-4 lg:space-x-6 mr-6", className)}
                    {...props}
                >
                    <NavLink href="/" selected={pathname === "/"}>Home</NavLink>
                    {status === "authenticated" && <>
                        <NavLink href="/progress" selected={pathname.includes("/progress")}>
                            Progress
                        </NavLink>
                        <NavLink href="/workout" selected={pathname.includes("/workout")}>
                            Workout
                        </NavLink>
                        <NavLink href="/about-us" selected={pathname.includes("/about-us")}>
                            About Us
                        </NavLink>
                    </>}
                    {status === "unauthenticated" && <NavLink href="/login" selected={pathname.includes("/login")}>
                        Login
                    </NavLink>}
                </nav>
                <UserNav/>
            </div>
        </div>
    );
}

function NavLink({ selected, href, children }) {
    return <Link
        href={href}
        className={cn(
            "text-lg font-medium transition-colors hover:text-primary",
            {
                "text-muted-foreground": !selected,
            },
        )}
    >
        {children}
    </Link>;
}