import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const DB_URI = "https://dkbimousmdwpkcdjaqoq.hasura.us-east-1.nhost.run/api/rest/";

function dbEndpoint(endpoint) {
    return DB_URI + endpoint;
}

export function getCategoryName(cat) {
    switch (cat) {
        case "upper-body":
            return "Upper Body";
        case "lower-body":
            return "Lower Body";
        case "cardio":
            return "Cardio";
    }
}

export function useWorkoutItemsByCategory(category) {
    return useQuery({
        queryKey: ["get-workout-items-by-category", category],
        queryFn: async () => {
            const res = await axios.get(dbEndpoint(`workout_item/${category}`));
            return res.data?.workout_items;
        },
    });
}

export function useUserWorkouts(email) {
    return useQuery({
        queryKey: ["get-user-workouts", email],
        queryFn: async () => {
            const res = await axios.get(dbEndpoint(`user_workouts/${encodeURI(email)}`));
            return res.data?.user_workouts;
        },
        enabled: !!email,
    });
}

export function useCreateUserWorkout() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["create-user-workout"],
        mutationFn: async (variables) => {
            const res = await axios.post(dbEndpoint(`user_workouts`), {
                object: {
                    ...variables,
                },
            });
            return res?.data;
        },
        onSuccess: async () => {
            toast.success("Workout created");
            await queryClient.refetchQueries({ queryKey: ["get-user-workouts"] });
        },
    });
}

export function useInsertWorkoutItemIntoUserWorkout() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["create-insert-workout-item"],
        mutationFn: async (variables) => {
            const res = await axios.post(dbEndpoint(`user_workout_items`), {
                object: {
                    ...variables,
                },
            });
            return res?.data;
        },
        onSuccess: async () => {
            toast.success("Workout item added");
            await queryClient.refetchQueries({ queryKey: ["get-user-workouts"] });
        },
    });
}