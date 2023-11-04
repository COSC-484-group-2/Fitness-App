"use client";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FiPlus } from "@react-icons/all-files/fi/FiPlus";
import { GiStrong } from "@react-icons/all-files/gi/GiStrong";
import { ResourceWithContent } from "@/components/resource-with-content";
import { useRouter } from "next/navigation";
import { BiPlus } from "react-icons/bi";
import { Separator } from "@/components/ui/separator";
import { useWorkoutsByCategory } from "@/lib/queries";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { GiBodyBalance, GiLeg, GiRun } from "react-icons/gi";

export default function Page() {
    const { data: session, status } = useSession();
    const router = useRouter();
    
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
    
    if (status === "loading") return null;
    
    if (status === "unauthenticated") {
        router.push("/login");
    }
    
    return (
        <div className="container max-w-6xl pt-16 space-y-4">
            <div className="flex justify-between w-full">
                <p className="text-3xl md:text-4xl font-bold">My Workouts</p>
                <Link href="/workout/create">
                    <Button size="lg">
                        Create Workout
                        <BiPlus className="ml-2 text-xl"/>
                    </Button>
                </Link>
            </div>
            
            <Separator/>
            
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
        
        </div>
    );
    
}


function WorkoutList({ category }) {
    
    const { data } = useWorkoutsByCategory(category);
    
    return (
        <div className="space-y-2">
            {data?.map((item) => (
                <WorkoutListItem key={item.id} {...item} />
            ))}
        </div>
    );
    
}

function WorkoutListItem(workout) {
    
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
                        <MenubarItem>
                            Workout 1
                        </MenubarItem>
                        <MenubarItem>
                            Workout 2
                        </MenubarItem>
                        <MenubarItem>
                            Workout 3
                        </MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>
        </div>
    );
    
}