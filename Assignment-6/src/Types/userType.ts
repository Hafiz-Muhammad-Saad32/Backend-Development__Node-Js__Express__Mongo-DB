import { Document } from "mongoose";

export interface UserTypes extends Document {
    name: string,
    email: string,
    password: any,
    age: Number,
    role: string,
    skills: string[],
    experience: number,
    deletedAt: {}
};