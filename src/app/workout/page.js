"use client";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { FiPlus } from "@react-icons/all-files/fi/FiPlus";
import { GiStrong } from "@react-icons/all-files/gi/GiStrong";
import { ResourceWithContent } from "@/components/resource-with-content";
import { useRouter } from "next/navigation";
import { BiPlus } from "react-icons/bi";
import { Separator } from "@/components/ui/separator";
import { useInsertWorkoutItem, useUserWorkouts, useWorkoutsByCategory } from "@/lib/queries";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { GiBodyBalance, GiLeg, GiRun } from "react-icons/gi";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { CreateWorkoutPopover } from "@/app/workout/create-workout-popover";
import { atom, useAtom, useSetAtom } from "jotai";
import { memo, useEffect, useMemo } from "react";

// Holds the user's workouts after they are fetched
const userWorkoutsAtom = atom([]);

export default function Page() {
    const { data: session, status } = useSession();
    const router = useRouter();
    
    // Fetch the user's workouts
    const { data, isLoading } = useUserWorkouts(session?.user?.email);
    
    // Store user workouts so other components can access it
    const setUserWorkouts = useSetAtom(userWorkoutsAtom);
    useEffect(() => {
        if (!!data) {
            setUserWorkouts(data);
        }
    }, [data]);
    
    if (status === "loading") return null;
    
    if (status === "unauthenticated") {
        router.push("/login");
    }
    
    return (
        <div className="container max-w-6xl pt-16 space-y-4">
            <div className="flex justify-between w-full">
                <p className="text-3xl md:text-4xl font-bold">My Workouts</p>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button size="lg">
                            Create Workout
                            <BiPlus className="ml-2 text-xl"/>
                        </Button>
                    </PopoverTrigger>
                    <CreateWorkoutPopover/>
                </Popover>
            </div>
            
            {isLoading ? "Loading..." : <>
                {data?.length && data.length > 0 ? <>
                    <h4>Your workouts:</h4>
                    <div className="space-y-2">
                        {data?.map(uw => (
                            <div key={uw.id}
                                 className="relative rounded-2xl px-4 pt-4 pb-4 w-full bg-background border">
                                <p className="text-xl font-bold">{uw.name}</p>
                                <p>{uw.workout_items.map(workout_item => workout_item.workout.name).join(", ")}</p>
                            </div>
                        ))}
                    </div>
                </> : <div>
                    You do not have any workouts.
                </div>}
            </>}
            
            <Separator/>
            
            <ExploreWorkouts/>
        
        </div>
    );
    
}


function ExploreWorkouts() {
    
    const workoutTypes = useMemo(() => [
        {
            name: "Upper Body",
            list: <WorkoutList category="upper-body"/>,
            icon: GiStrong,
        },
        {
            name: "Lower Body",
            list: <WorkoutList category="lower-body"/>,
            icon: GiLeg,
        },
        {
            name: "Full Body",
            list: <WorkoutList category="full-body"/>,
            icon: GiBodyBalance,
        },
        {
            name: "Cardio",
            list: <WorkoutList category="cardio"/>,
            icon: GiRun,
        },
    ], []);
    
    return (
        <>
            <p className="text-2xl font-bold">Explore Workouts</p>
            <div
                className="not-prose mt-4 grid grid-cols-1 gap-4 border-t border-zinc-900/5 pt-10 dark:border-white/5 sm:grid-cols-2 xl:grid-cols-2">
                {workoutTypes.map((workoutType) => (
                    <ResourceWithContent
                        key={workoutType.name}
                        name={workoutType.name}
                        icon={workoutType.icon}
                    >
                        {workoutType.list}
                    </ResourceWithContent>
                ))}
            </div>
        </>
    );
    
}


export const WorkoutList = memo(({ category }) => {
    
    const { data } = useWorkoutsByCategory(category);
    
    return (
        <div className="space-y-2">
            {data?.map((item) => (
                <WorkoutListItem key={item.id} {...item} />
            ))}
        </div>
    );
    
});

function WorkoutListItem(workout) {
    
    // Fetched user workouts
    const [userWorkouts] = useAtom(userWorkoutsAtom);
    
    const { mutate } = useInsertWorkoutItem();
    
    function insertWorkoutItem(userWorkoutId) {
        mutate({
            workout_id: workout.id,
            user_workout_id: userWorkoutId,
        });
    }
    
    return (
        <div key={workout.id}
             className="flex rounded-md border px-4 py-3 w-full justify-between bg-background items-center">
            <div className="">
                <p className="text-lg font-semibold">{workout.name}</p>
                <p className="text-muted-foreground">{workout.target}</p>
            </div>
            <Menubar>
                <MenubarMenu>
                    <MenubarTrigger><FiPlus className="text-xl"/></MenubarTrigger>
                    <MenubarContent>
                        {userWorkouts.length === 0 && <p className="p-2">No workouts</p>}
                        {userWorkouts?.map(uw => {
                            return (
                                <MenubarItem
                                    className="cursor-pointer"
                                    key={uw.id}
                                    onClick={() => insertWorkoutItem(uw.id)}
                                >
                                    {uw.name}
                                </MenubarItem>
                            );
                        })}
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>
        </div>
    );
    
}