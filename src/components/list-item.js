import { cn } from "@/lib/utils";
import Link from "next/link";
import { useCallback } from "react";

// ListItem can be used to display elements of a list
export function ListItem({ children, className, action, href, ...rest }) {
    
    const Content = useCallback(() => (
        <div className={cn(
            "relative rounded-2xl px-4 py-3 w-full bg-lightcard border",
            {
                "flex justify-between items-center": !!action,
            },
            className,
        )}
             {...rest}
        >
            <div>{children}</div>
            {action}
        </div>
    ), [children, className, action, rest]);
    
    if (!!href) {
        return <Link href={href}><Content/></Link>;
    }
    
    return <Content/>;
    
}