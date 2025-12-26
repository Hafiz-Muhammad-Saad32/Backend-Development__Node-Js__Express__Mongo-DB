import { Document } from "mongoose";

export interface UserTypes extends Document {
    Name: string,
    email: string,
    password: any,
    age: Number,
    role: string,
    skills: string[],
    experience: number
};