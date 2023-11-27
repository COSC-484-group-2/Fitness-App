"use client";
import { defineStyleAnatomy } from "./core";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------------------------------
 * Anatomy
 * -----------------------------------------------------------------------------------------------*/

export const ChartTooltipAnatomy = defineStyleAnatomy({
    frame: cva([
        "UI-ChartTooltip__frame",
        "border border bg-white dark:bg-background p-2 rounded-md",
    ]),
    header: cva(["UI-ChartTooltip__header", "mb-2 font-semibold"]),
    label: cva(["UI-ChartTooltip__label"]),
    content: cva(["UI-ChartTooltip__content", "space-y-1"]),
});

export const ChartTooltipRowAnatomy = defineStyleAnatomy({
    row: cva([
        "UI-ChartTooltip__row",
        "flex items-center justify-between space-x-8",
    ]),
    labelContainer: cva([
        "UI-ChartTooltip__labelContainer",
        "flex items-center space-x-2",
    ]),
    dot: cva([
        "UI-ChartTooltip__dot",
        "shrink-0",
        "h-3 w-3 bg-gray rounded-full shadow-sm",
    ]),
    value: cva([
        "UI-ChartTooltip__value",
        "font-semibold tabular-nums text-right whitespace-nowrap",
    ]),
    label: cva([
        "UI-ChartTooltip__label",
        "text-sm text-right whitespace-nowrap font-medium text-[--muted]",
    ]),
});

export const ChartTooltipFrame = ({ children, className }) => (
    <div className={cn(ChartTooltipAnatomy.frame(), className)}>{children}</div>
);

export const ChartTooltipRow = ({
                                    value,
                                    name,
                                    color,
                                    dotClassName,
                                    rowClassName,
                                    valueClassName,
                                    labelClassName,
                                    labelContainerClassName,
                                }) => (
    <div className={cn(ChartTooltipRowAnatomy.row(), rowClassName)}>
        <div
            className={cn(
                ChartTooltipRowAnatomy.labelContainer(),
                labelContainerClassName,
            )}
        >
            <span
                className={cn(ChartTooltipRowAnatomy.dot(), dotClassName)}
                style={{ backgroundColor: `var(--${color})` }}
            />
            <p className={cn(ChartTooltipRowAnatomy.label(), labelClassName)}>
                {name}
            </p>
        </div>
        <p className={cn(ChartTooltipRowAnatomy.value(), valueClassName)}>
            {value}
        </p>
    </div>
);

export const ChartTooltip = props => {
    const {
        active,
        payload,
        label,
        categoryColors,
        valueFormatter,
        headerClassName,
        contentClassName,
        frameClassName,
        labelClassName,
    } = props;
    if (active && payload) {
        return (
            <ChartTooltipFrame className={frameClassName}>
                <div className={cn(ChartTooltipAnatomy.header(), headerClassName)}>
                    <p className={cn(ChartTooltipAnatomy.label(), labelClassName)}>
                        {label}
                    </p>
                </div>
                
                <div className={cn(ChartTooltipAnatomy.content(), contentClassName)}>
                    {payload.map(({ value, name }, idx) => (
                        <ChartTooltipRow
                            key={`id-${idx}`}
                            value={valueFormatter(value)}
                            name={name}
                            color={categoryColors.get(name) ?? "brand"}
                        />
                    ))}
                </div>
            </ChartTooltipFrame>
        );
    }
    return null;
};