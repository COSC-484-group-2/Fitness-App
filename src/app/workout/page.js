"use client";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { FiPlus } from "@react-icons/all-files/fi/FiPlus";
import { GiStrong } from "@react-icons/all-files/gi/GiStrong";
import { ResourceWithContent } from "@/components/resource-with-content";
import { useRouter } from "next/navigation";
import { BiPlus } from "react-icons/bi";
import { Separator } from "@/components/ui/separator";
import { useInsertWorkoutItemIntoUserWorkout, useUserWorkouts, useWorkoutItemsByCategory } from "@/lib/queries";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { GiBodyBalance, GiLeg, GiRun } from "react-icons/gi";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { CreateWorkoutPopover } from "@/app/workout/create-workout-popover";
import { atom, useAtom, useSetAtom } from "jotai";
import { memo, useEffect, useMemo } from "react";
import { Spinner } from "@/components/spinner";
import { ListItem } from "@/components/list-item";
import { SimpleGrid } from "@/components/simple-grid";
import { PageSection } from "@/components/page-section";
import { WorkoutTimer } from "@/app/workout/timer";

// Holds the user's workouts after they are fetched
const userWorkoutsAtom = atom([]);

export default function Page() {
    const { data: session, status } = useSession();
    const router = useRouter();
    
    // Fetch the user's workouts
    const { data: userWorkouts, isLoading } = useUserWorkouts(session?.user?.email);
    
    // Store user workouts so other components can access it
    const setUserWorkoutsAtom = useSetAtom(userWorkoutsAtom);
    useEffect(() => {
        if (!!userWorkouts) {
            setUserWorkoutsAtom(userWorkouts);
        }
    }, [userWorkouts]);
    
    if (status === "loading") return null;
    
    if (status === "unauthenticated") {
        router.push("/login");
        return null;
    }
    
    return (
        <div className="space-y-8">
            <PageSection
                title="My Workouts"
                action={
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button size="lg">
                                Create Workout
                                <BiPlus className="ml-2 text-xl"/>
                            </Button>
                        </PopoverTrigger>
                        <CreateWorkoutPopover/>
                    </Popover>
                }
            >
                <ResourceWithContent
                    contentClassName="max-h-[30rem]"
                >
                    {/*Loading*/}
                    {isLoading && <Spinner className="h-4 w-4 animate-spin"/>}
                    
                    {/*List of workouts*/}
                    {(!isLoading && !!userWorkouts?.length) &&
                        <div className="space-y-2">
                            {userWorkouts?.map(uw => (
                                <ListItem
                                    key={uw.id}
                                    action={
                                        <>
                                            {uw.user_workout_items.length > 0 && <WorkoutTimer
                                                workoutItems={uw.user_workout_items.map(userWorkoutItem => userWorkoutItem.workout_item.name)}/>}
                                        </>
                                    }
                                >
                                    <p className="text-xl font-bold text-orange-600 dark:text-orange-200">{uw.name}</p>
                                    <ul
                                        className="list-disc list-inside"
                                    >{uw.user_workout_items.map(userWorkoutItem =>
                                        <li key={userWorkoutItem.id}>{userWorkoutItem.workout_item.name}</li>)}
                                    </ul>
                                </ListItem>
                            ))}
                        </div>}
                    
                    {/*Empty*/}
                    {(!isLoading && !!userWorkouts && userWorkouts.length === 0) && <div>
                        You do not have any workouts.
                    </div>}
                </ResourceWithContent>
            </PageSection>
            
            <Separator/>
            
            <PageSection
                title="Explore Workouts"
                subtitle="You can add multiple workout items"
            >
                <WorkoutTypeLists/>
            </PageSection>
        
        </div>
    );
    
}


export function WorkoutTypeLists() {
    
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
    
    // Fetched user workouts
    const [userWorkouts] = useAtom(userWorkoutsAtom);
    
    // Get Workout items for the specific category
    const { data: workoutItems } = useWorkoutItemsByCategory(category);
    
    const { mutate } = useInsertWorkoutItemIntoUserWorkout();
    
    // Insert workout item into the selected user workout routine
    function insertUserWorkoutItem(workoutItemId, userWorkoutId) {
        mutate({
            workout_item_id: workoutItemId,
            user_workout_id: userWorkoutId,
        });
    }
    
    return (
        <div className="space-y-2">
            {workoutItems?.map((item) => (
                <ListItem
                    key={item.id}
                    action={<Menubar>
                        <MenubarMenu>
                            <MenubarTrigger><FiPlus className="text-xl"/></MenubarTrigger>
                            <MenubarContent>
                                {userWorkouts.length === 0 && <p className="p-2">No workouts</p>}
                                {userWorkouts?.map(uw => {
                                    return (
                                        <MenubarItem
                                            className="cursor-pointer"
                                            key={uw.id}
                                            onClick={() => insertUserWorkoutItem(item.id, uw.id)}
                                        >
                                            {uw.name}
                                        </MenubarItem>
                                    );
                                })}
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