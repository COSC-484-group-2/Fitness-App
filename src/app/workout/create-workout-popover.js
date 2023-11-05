import { PopoverContent } from "@/components/ui/popover";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreateUserWorkout } from "@/lib/queries";
import { useEffect } from "react";
import { useSession } from "next-auth/react";


const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
});

export function CreateWorkoutPopover() {
    
    const { data: session } = useSession();
    
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });
    
    const { mutate: createWorkout, isPending, isSuccess } = useCreateUserWorkout();
    
    useEffect(() => {
        if (isSuccess) {
            form.reset();
        }
    }, [isSuccess]);
    
    function onSubmit(values) {
        if (session?.user?.email) {
            createWorkout({
                user_id: session?.user?.email,
                name: values.name,
            });
        }
    }
    
    return (
        <>
            <PopoverContent className="w-96">
                
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="My workout" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        The name of your workout.
                                    </FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Create</Button>
                    </form>
                </Form>
            
            </PopoverContent>
        </>
    );
    
}