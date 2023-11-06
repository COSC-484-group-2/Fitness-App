import { cn } from "@/lib/utils";
import Link from "next/link";
import { useCallback } from "react";

// ListItem can be used to display elements of a list
export function ListItem({ children, rightSection, href }) {
    
    const Content = useCallback(() => (
        <div className={cn(
            "relative rounded-2xl px-4 py-3 w-full bg-background border",
            {
                "flex justify-between items-center": !!rightSection,
            },
        )}>
            <div>{children}</div>
            {rightSection}
        </div>
    ), [children, rightSection]);
    
    if (!!href) {
        return <Link href={href}><Content/></Link>;
    }
    
    return <Content/>;
    
}