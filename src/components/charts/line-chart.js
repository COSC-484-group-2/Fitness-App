"use client";
import React, { useState } from "react";
import { ColorPalette, defineStyleAnatomy } from "./core";
import { cva } from "class-variance-authority";
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart as ReChartsLineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { constructCategoryColors, defaultValueFormatter, getYAxisDomain } from "./utils";
import { ChartTooltip } from "./chart-tooltip";
import { ChartLegend } from "./chart-legend";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------------------------------
 * Anatomy
 * -----------------------------------------------------------------------------------------------*/

export const LineChartAnatomy = defineStyleAnatomy({
    root: cva(["UI-LineChart__root"]),
});

export const LineChart = React.forwardRef((props, ref) => {
    const {
        rootClassName,
        className,
        curveType = "linear",
        connectNulls = false,
        /**/
        data = [],
        categories = [],
        index,
        colors = ColorPalette,
        valueFormatter = defaultValueFormatter,
        startEndOnly = false,
        showXAxis = true,
        showYAxis = true,
        yAxisWidth = 56,
        showAnimation = true,
        showTooltip = true,
        showLegend = true,
        showGridLines = true,
        showGradient = true,
        autoMinValue = false,
        minValue,
        maxValue,
        allowDecimals = true,
        noDataText,
        ...rest
    } = props;
    
    const [legendHeight, setLegendHeight] = useState(60);
    
    const categoryColors = constructCategoryColors(categories, colors);
    const yAxisDomain = getYAxisDomain(autoMinValue, minValue, maxValue);
    
    return (
        <div
            className={cn(LineChartAnatomy.root(), rootClassName, className)}
            {...rest}
            ref={ref}
        >
            <ResponsiveContainer width={"100%"} height={"100%"}>
                {data?.length ? (
                    <ReChartsLineChart data={data}>
                        {showGridLines ? (
                            <CartesianGrid
                                strokeDasharray="3 3"
                                horizontal={true}
                                vertical={false}
                            />
                        ) : null}
                        <XAxis
                            hide={!showXAxis}
                            dataKey={index}
                            tick={{ transform: "translate(0, 8)" }}
                            ticks={
                                startEndOnly
                                    ? [data[0][index], data[data.length - 1][index]]
                                    : undefined
                            }
                            style={{
                                fontSize: ".75rem",
                                fontFamily: "Inter; Helvetica",
                                color: "red",
                            }}
                            interval="preserveStartEnd"
                            axisLine={false}
                            tickLine={false}
                            padding={{ left: 10, right: 10 }}
                            minTickGap={5}
                        />
                        <YAxis
                            width={yAxisWidth}
                            hide={!showYAxis}
                            axisLine={false}
                            tickLine={false}
                            type="number"
                            domain={yAxisDomain}
                            tick={{ transform: "translate(-3, 0)" }}
                            style={{
                                fontSize: ".8rem",
                                fontFamily: "Inter; Helvetica",
                            }}
                            tickFormatter={valueFormatter}
                            allowDecimals={allowDecimals}
                        />
                        {showTooltip ? (
                            <Tooltip
                                wrapperStyle={{ outline: "none" }}
                                isAnimationActive={false}
                                cursor={{ stroke: "#ddd", strokeWidth: 2 }}
                                position={{ y: 0 }}
                                content={({ active, payload, label }) => (
                                    <ChartTooltip
                                        active={active}
                                        payload={payload}
                                        label={label}
                                        valueFormatter={valueFormatter}
                                        categoryColors={categoryColors}
                                    />
                                )}
                            />
                        ) : null}
                        
                        {categories.map(category => (
                            <Line
                                key={category}
                                name={category}
                                type={curveType}
                                dataKey={category}
                                stroke={`var(--${categoryColors.get(category)})`}
                                strokeWidth={2}
                                dot={false}
                                isAnimationActive={showAnimation}
                                connectNulls={connectNulls}
                            />
                        ))}
                        
                        {showLegend ? (
                            <Legend
                                verticalAlign="bottom"
                                height={legendHeight}
                                content={({ payload }) =>
                                    ChartLegend({ payload }, categoryColors, setLegendHeight)
                                }
                            />
                        ) : null}
                    </ReChartsLineChart>
                ) : (
                    <div>...</div>
                )}
            </ResponsiveContainer>
        </div>
    );
});

LineChart.displayName = "LineChart";