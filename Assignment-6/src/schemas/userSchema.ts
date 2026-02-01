import z from "zod";

export const userSchema = z.object({
    name: z.string().min(3),
    email: z.email(),
    password: z.string().min(8).regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    "Password should contain 1 capital letter, 1 number and 1 special character"),
    age: z.number().min(13),
    role: z.string().default("user"),
    skills: z.array(z.string()),
    experience: z.number().min(0),
    })

export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(8).regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password should contain 1 capital letter, 1 number and 1 special character")
})

export const userParam = z.object({
    id: z.string()
})