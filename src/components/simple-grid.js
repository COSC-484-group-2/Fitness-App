export function SimpleGrid({ children, ...rest }) {
    return (
        <div
            className="not-prose mt-4 grid grid-cols-1 gap-4 border-t border-zinc-900/5 pt-10 dark:border-white/5 sm:grid-cols-2 xl:grid-cols-2"
            {...rest}
        >
            {children}
        </div>
    );
}