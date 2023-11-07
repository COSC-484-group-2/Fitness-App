import Link from "next/link";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

export function ResourceIcon({ icon: Icon }) {
    return (
        <div
            className={cn(
                "flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900/5 ring-1 ring-zinc-900/25 backdrop-blur-[2px]",
                "transition duration-300 group-hover:ring-zinc-900/25 dark:ring-white/15 dark:group-hover:ring-primary group-hover:text-primary",
            )}>
            <Icon
                className={cn(
                    "h-8 w-8 fill-zinc-700/10 stroke-zinc-700 transition-colors duration-300 group-hover:stroke-zinc-900 group-hover:fill-primary",
                    "dark:fill-white/50 dark:stroke-zinc-400 dark:group-hover:fill-primary-300/10 dark:group-hover:stroke-primary",
                )}/>
        </div>
    );
}

export function ResourcePattern({ mouseX, mouseY, ...gridProps }) {
    let maskImage = useMotionTemplate`radial-gradient(180px at ${mouseX}px ${mouseY}px, white, transparent)`;
    let style = { maskImage, WebkitMaskImage: maskImage };
    
    return (
        <div className="pointer-events-none">
            <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#ea580c] to-[#ea580c] opacity-0 transition duration-300 group-hover:opacity-100 dark:group-hover:opacity-10 dark:from-[#ea580c] dark:to-[#e3956d]"
                style={style}
            />
        </div>
    );
}

export function Resource({ resource }) {
    let mouseX = useMotionValue(0);
    let mouseY = useMotionValue(0);
    
    function onMouseMove({ currentTarget, clientX, clientY }) {
        let { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }
    
    return (
        <Link href={resource.href}>
            <div
                key={resource.href}
                onMouseMove={onMouseMove}
                className="group relative flex rounded-lg bg-zinc-50 transition-shadow hover:shadow-md hover:shadow-zinc-900/5 dark:bg-card dark:hover:shadow-black/5"
            >
                <ResourcePattern {...resource.pattern} mouseX={mouseX} mouseY={mouseY}/>
                <div
                    className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-zinc-900/7.5 group-hover:ring-zinc-900/10 dark:ring-white/10 dark:group-hover:ring-white/20"/>
                <div className="relative rounded-2xl px-4 pt-4 pb-4">
                    <ResourceIcon icon={resource.icon}/>
                    <h3 className="mt-4 text-xl md:text-3xl font-semibold leading-7 text-zinc-900 dark:text-white">
                        <span className="absolute inset-0 rounded-2xl"/>
                        {resource.name}
                    </h3>
                    <p className="mt-1 text-md md:text-xl text-zinc-600 dark:text-muted-foreground">
                        {resource.description}
                    </p>
                </div>
            </div>
        </Link>
    );
}