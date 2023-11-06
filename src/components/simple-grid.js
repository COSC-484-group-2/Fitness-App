import { cn } from "@/lib/utils";

export function SimpleGrid({ children, className, ...rest }) {
    return (
        <div
            className={cn(
                "not-prose mt-4 grid grid-cols-1 gap-4 border-t border-zinc-900/5 pt-8 dark:border-white/5 sm:grid-cols-2 xl:grid-cols-2",
                className,
            )}
            {...rest}
        >
            {children}
        </div>
    );
}