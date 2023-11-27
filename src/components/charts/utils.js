/* -------------------------------------------------------------------------------------------------
 * Chart Utils
 * -----------------------------------------------------------------------------------------------*/

/**
 * @internal
 */
export const constructCategoryColors = (categories, colors) => {
    const categoryColors = new Map();
    categories.forEach((category, idx) => {
        categoryColors.set(category, colors[idx] ?? "gray");
    });
    return categoryColors;
};

/**
 * @internal
 */
export const getYAxisDomain = (autoMinValue, minValue, maxValue) => {
    const minDomain = autoMinValue ? "auto" : minValue ?? 0;
    const maxDomain = maxValue ?? "auto";
    return [minDomain, maxDomain];
};

export const defaultValueFormatter = value => value.toString();

/* -------------------------------------------------------------------------------------------------
 * DonutChart Utils
 * -----------------------------------------------------------------------------------------------*/

export const parseChartData = (data, colors) =>
    data.map((dataPoint, idx) => {
        const baseColor = idx < colors.length ? colors[idx] : "brand";
        return {
            ...dataPoint,
            // explicitly adding color key if not present for tooltip coloring
            color: baseColor,
            fill: `var(--${baseColor})`, // Color
        };
    });

const sumNumericArray = arr =>
    arr.reduce((prefixSum, num) => prefixSum + num, 0);

const calculateDefaultLabel = (data, category) =>
    sumNumericArray(data.map(dataPoint => dataPoint[category]));

export const parseChartLabelInput = (
    labelInput,
    valueFormatter,
    data,
    category,
) =>
    labelInput
        ? labelInput
        : valueFormatter(calculateDefaultLabel(data, category));