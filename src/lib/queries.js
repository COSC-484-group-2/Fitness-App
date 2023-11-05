import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

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

export function useWorkouts() {
    return useQuery({
        queryKey: ["get-workouts"],
        queryFn: async () => {
            const res = await axios.get(dbEndpoint("workouts"));
            return res.data?.workouts;
        },
    });
}

export function useWorkoutsByCategory(category) {
    return useQuery({
        queryKey: ["get-workouts-by-category", category],
        queryFn: async () => {
            const res = await axios.get(dbEndpoint(`workout/${category}`));
            return res.data?.workouts;
        },
    });
}

export function useUserWorkouts(email) {
    return useQuery({
        queryKey: ["get-user-workouts", email],
        queryFn: async () => {
            const res = await axios.get(dbEndpoint(`user-workouts/${encodeURI(email)}`));
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
        onSuccess: () => {
            queryClient.refetchQueries([""]);
        },
    });
}