import z from "zod";

export const Pokemon = z.object({
    name: z.string().min(1, "Name is required").max(255),
    types: z.string().min(1, "Types is required"),
    image: z.string().min(2, "Image is required"),
})