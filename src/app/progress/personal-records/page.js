"use client";
import "@/app/style/personal-records.css";
import { GiStrong } from "@react-icons/all-files/gi/GiStrong";
import { GiLeg } from "@react-icons/all-files/gi/GiLeg";
import { GiBodyBalance } from "@react-icons/all-files/gi/GiBodyBalance";
import { TfiStatsUp } from "react-icons/tfi";
import React, { memo, useMemo, useState } from "react";
import { WorkoutPopup } from "@/app/progress/personal-records/update-record-popover";
import { GiRun } from "react-icons/gi";
import { ResourceWithContent } from "@/components/resource-with-content";
import { SimpleGrid } from "@/components/simple-grid";
import { Separator } from "@/components/ui/separator";
import { ListItem } from "@/components/list-item";
import { PageSection } from "@/components/page-section";
import { useWorkoutItemsByCategory } from "@/lib/queries";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { FiPlus } from "@react-icons/all-files/fi/FiPlus";

export function CurrentStats() {
    
    const currStats = [
        {
            id: "1",
            workout_item: {
                name: "Burpees",
                target: "...",
            },
        },
    ];
    
    return (
        <div>
            {currStats && currStats.map((item, id) => (
                <ListItem key={id}>
                    <div className="a-workout">
                        <p>{item.workout_item.name}</p>
                        <p className="a-workout-target">{item.workout_item.target}</p>
                    </div>
                    {/* <FiPlus className="icon"/>  instead of plus button, this will hold the numerical values for user's current stats */}
                </ListItem>
            ))
            }
        </div>
    );
    
}


export default function Page() {
    const [isPopupVisible, setPopupVisibility] = useState(false);
    
    const togglePopup = () => {
        setPopupVisibility(!isPopupVisible);
    };
    
    return (
        <PageSection title="Check and Update your Personal Records">
            <div className="space-y-4">
                <Separator/>
                <ResourceWithContent
                    name={"Current Statistics"}
                    icon={TfiStatsUp}
                >
                    <CurrentStats/>
                </ResourceWithContent>
                
                <div className="update-workout-dashboard__section">
                    <p className="text-2xl font-bold">What Records did we Break Today?</p>
                    <SimpleGrid
                        onClick={togglePopup}>
                        {isPopupVisible && (
                            <WorkoutPopup
                                workoutName="UpperBody"
                                onClose={togglePopup}
                                onValueSubmit={(workoutName, value) => {
                                    // should update database when new value is submitted
                                    console.log(`Workout: ${workoutName}, Value: ${value}`);
                                }}
                            />
                        )}
                    </SimpleGrid>
                    <WorkoutTypeLists/>
                </div>
            </div>
        </PageSection>
    );
    
}


function WorkoutTypeLists() {
    
    const workoutTypes = useMemo(() => [
        {
            name: "Upper Body",
            list: <WorkoutTypeList category="upper-body"/>,
            icon: GiStrong,
        },
        {
            name: "Lower Body",
            list: <WorkoutTypeList category="lower-body"/>,
            icon: GiLeg,
        },
        {
            name: "Full Body",
            list: <WorkoutTypeList category="full-body"/>,
            icon: GiBodyBalance,
        },
        {
            name: "Cardio",
            list: <WorkoutTypeList category="cardio"/>,
            icon: GiRun,
        },
    ], []);
    
    return (
        <SimpleGrid>
            {workoutTypes.map((workoutType) => (
                <ResourceWithContent
                    key={workoutType.name}
                    name={workoutType.name}
                    icon={workoutType.icon}
                >
                    {workoutType.list}
                </ResourceWithContent>
            ))}
        </SimpleGrid>
    );
    
}

const WorkoutTypeList = memo(({ category }) => {
    
    // Get Workout items for the specific category
    const { data: workoutItems } = useWorkoutItemsByCategory(category);
    
    return (
        <div className="space-y-2">
            {workoutItems?.map((item) => (
                <ListItem
                    key={item.id}
                    rightSection={<Menubar>
                        <MenubarMenu>
                            <MenubarTrigger><FiPlus className="text-xl"/></MenubarTrigger>
                            <MenubarContent>
                                <MenubarItem
                                    className="cursor-pointer"
                                >
                                    Add record
                                </MenubarItem>
                            </MenubarContent>
                        </MenubarMenu>
                    </Menubar>}
                >
                    <div className="">
                        <p className="text-lg font-semibold">{item.name}</p>
                        <p className="text-muted-foreground">{item.target}</p>
                    </div>
                </ListItem>
            ))}
        </div>
    );
    
});