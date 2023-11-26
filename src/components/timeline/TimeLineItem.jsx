import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const TimeLineItem = forwardRef(
    (props, ref) => {
        const { children, className, isLast, media } = props;
        
        return (
            <li
                ref={ref}
                className={cn(
                    "timeline-item relative",
                    isLast ? "timeline-item-last" : "",
                    className,
                )}
            >
                <div className="timeline-item-wrapper">
                    <div className="timeline-item-media">
                        <div className="timeline-item-media-content">
                            {media || (
                                <div className="timeline-item-media-default"/>
                            )}
                        </div>
                        {!isLast && <div className="timeline-connect"/>}
                    </div>
                    <div
                        className={cn(
                            "timeline-item-content",
                            isLast && "timeline-item-content-last",
                        )}
                    >
                        {children}
                    </div>
                </div>
            </li>
        );
    },
);

TimeLineItem.displayName = "TimeLineItem";

export default TimeLineItem;