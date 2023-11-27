import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { dbEndpoint } from "@/lib/queries";

export function useSetAccount(session, status) {
    
    const [triggered, setTriggered] = useState(false);
    
    const { mutate, status: _status } = useMutation({
        mutationKey: ["set-account", session?.user?.email],
        mutationFn: async (variables) => {
            const { data } = await axios.post(dbEndpoint(`accounts`), {
                object: {
                    ...variables,
                },
            });
            return data;
        },
    });
    
    useEffect(() => {
        if (status === "authenticated" && !!session?.user && !triggered && _status === "success") {
            setTriggered(true);
        }
    }, [_status]);
    
    useEffect(() => {
        if (!triggered && status === "authenticated" && !!session?.user) {
            mutate({
                name: session?.user?.name,
                picture: session?.user?.image,
                user_id: session?.user?.email,
            });
        }
    }, [session, status, triggered]);
    
    return null;
    
}