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

/**
 * @example JSON Object:
 * [
 *     { "name": "Bench Press", "category": "upper-body", "target": "Chest" },
 *     { "name": "Bench Press", "category": "upper-body", "target": "Chest" },
 *     ...
 * ]
 */
export function useWorkoutItemsByCategory(category) {
    return useQuery({
        queryKey: ["get-workout-items-by-category", category],
        queryFn: async () => {
            const res = await axios.get(dbEndpoint(`workout_item/${category}`));
            return res.data?.workout_items;
        },
    });
}

/**
 * @example JSON Object:
 * {
 *   "id": "",
 *   "name": "My Workout",
 *   "user_id": "user@gmail.com",
 *   "user_workout_items": [
 *     { "workout_item": { "name": "Bench Press", "category": "upper-body", "target": "Chest" } },
 *     { "workout_item": { "name": "Bench Press", "category": "upper-body", "target": "Chest" } },
 *     ...
 *   ]
 *  }
 */
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

export function useUserPersonalRecords(email) {
    return useQuery({
        queryKey: ["get-user-records", email],
        queryFn: async () => {
            const res = await axios.get(dbEndpoint(`records/${encodeURI(email)}`));
            return res.data?.records;
        },
        enabled: !!email,
    });
}

/* -------------------------------------------------------------------------------------------------
 * Mutations
 * -----------------------------------------------------------------------------------------------*/

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

export function useDeleteUserWorkout() {
    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationKey: ["delete-user-workout"],
        mutationFn: async (variables) => {
            const res = await axios.delete(dbEndpoint(`user_workouts/${variables.id}`));
            return res?.data;
        },
        onSuccess: async () => {
            toast.success("Workout deleted");
            await queryClient.refetchQueries({ queryKey: ["get-user-workouts"] });
        },
    });
    
    return {
        deleteUserWorkout: (id) => mutate({ id }),
        isPending,
    };
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

export function useUpsertPersonalRecord() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["upsert-personal-record"],
        mutationFn: async (variables) => {
            const res = await axios.post(dbEndpoint(`records`), {
                object: {
                    ...variables,
                },
            });
            return res?.data;
        },
        onSuccess: async () => {
            toast.success("Record saved");
            await queryClient.refetchQueries({ queryKey: ["get-user-records"] });
        },
    });
}

export function useDeletePersonalRecord() {
    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationKey: ["delete-personal-record"],
        mutationFn: async (variables) => {
            const res = await axios.delete(dbEndpoint(`records/${variables.userId}/${variables.workoutItemId}`));
            return res?.data;
        },
        onSuccess: async () => {
            toast.success("Record deleted");
            await queryClient.refetchQueries({ queryKey: ["get-user-records"] });
        },
    });
    
    return {
        deletePersonalRecord: (userId, workoutItemId) => mutate({ userId, workoutItemId }),
        isPending,
    };
}