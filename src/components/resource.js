import Link from "next/link";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

export function ResourceIcon({ icon: Icon }) {
    return (
        <div
            className={cn(
                "flex h-12 w-12 items-center justify-center rounded-full bg-slate-900/5 ring-1 ring-slate-900/25 backdrop-blur-[2px]",
                "transition duration-300 group-hover:ring-slate-900/25 dark:ring-white/15 dark:group-hover:ring-primary group-hover:text-primary",
            )}>
            <Icon
                className={cn(
                    "h-8 w-8 fill-slate-700/10 stroke-slate-700 transition-colors duration-300 group-hover:stroke-slate-900 group-hover:fill-primary",
                    "dark:fill-white/50 dark:stroke-slate-400 dark:group-hover:fill-primary-300/10 dark:group-hover:stroke-primary",
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
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#ffede3] to-[#ffede3] opacity-0 transition duration-300 group-hover:opacity-100 dark:group-hover:opacity-10 dark:from-[#ea580c] dark:to-[#e3956d]"
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
                className="group relative flex rounded-lg bg-slate-50 transition-shadow hover:shadow-md hover:shadow-slate-900/5 dark:bg-card dark:hover:shadow-black/5"
            >
                <ResourcePattern {...resource.pattern} mouseX={mouseX} mouseY={mouseY}/>
                <div
                    className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-300 group-hover:ring-slate-900/10 dark:ring-white/10 dark:group-hover:ring-white/20"/>
                <div className="relative rounded-2xl px-4 pt-4 pb-4">
                    <ResourceIcon icon={resource.icon}/>
                    <h3 className="mt-4 text-xl md:text-3xl font-semibold leading-7 text-slate-900 dark:text-white">
                        <span className="absolute inset-0 rounded-2xl"/>
                        {resource.name}
                    </h3>
                    <p className="mt-1 text-md md:text-xl text-slate-600 dark:text-muted-foreground">
                        {resource.description}
                    </p>
                </div>
            </div>
        </Link>
    );
}