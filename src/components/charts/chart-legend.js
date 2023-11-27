"use client";
import { useEffect, useRef, useState } from "react";
import { Legend } from "./legend";

/* -------------------------------------------------------------------------------------------------
 * ChartLegend
 * -----------------------------------------------------------------------------------------------*/

export const ChartLegend = ({ payload }, categoryColors, setLegendHeight) => {
    const legendRef = useRef(null);
    
    const [windowSize, setWindowSize] = useState(undefined);
    
    useEffect(() => {
        const handleResize = () => {
            setWindowSize(window.innerWidth);
            const calculateHeight = height =>
                height
                    ? Number(height) + 20 // 20px extra padding
                    : 60; // default height
            setLegendHeight(calculateHeight(legendRef.current?.clientHeight));
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        
        return () => window.removeEventListener("resize", handleResize);
    }, [windowSize]);
    
    return (
        <div
            ref={legendRef}
            className="flex w-full items-center justify-center mt-4"
        >
            <Legend
                categories={payload.map(entry => entry.value)}
                colors={payload.map(entry => categoryColors.get(entry.value))}
            />
        </div>
    );
};

ChartLegend.displayName = "ChartLegend";