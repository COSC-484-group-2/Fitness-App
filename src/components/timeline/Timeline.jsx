import { Children, forwardRef } from "react";
import mapCloneElement from "./mapCloneElement";
import { cn } from "@/lib/utils";

const Timeline = forwardRef((props, ref) => {
    const { children, className } = props;
    
    const count = Children.count(children);
    
    const items = mapCloneElement(
        children,
        (item, index) => ({
            isLast: index === count - 1,
            ...item.props,
        }),
    );
    
    return (
        <ul ref={ref} className={cn("timeline", className)}>
            {items}
        </ul>
    );
});

Timeline.displayName = "Timeline";

export default Timeline;