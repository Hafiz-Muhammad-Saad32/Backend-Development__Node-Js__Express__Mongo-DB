import mongoose from 'mongoose';
import { UserTypes } from '../Types/userType';

const userSchema = new mongoose.Schema<UserTypes>(
    {
        Name: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true },
        password: {type: String, required: true, unique: true, minlength: 8},
        age: {type: Number, required: true, max: 60},
        role: { type: String, default: "user" },
        skills: [String],
        experience: { type: Number, min: 0 }
    }, {
       timestamps: true 
    }
)

export default mongoose.model<UserTypes>("User",userSchema);