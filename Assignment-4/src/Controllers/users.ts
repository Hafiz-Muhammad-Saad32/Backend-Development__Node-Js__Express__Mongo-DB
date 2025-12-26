import { Request, Response } from 'express';
import userModel from '../Models/userModel';
import { AnyARecord } from 'node:dns';

interface reqBody {
    Name: string;
    email: string;
    password: any;
    age: number;
    role: string;
    skills: string[];
    experience: number;
}

interface payload {
    Name?: string;
    email?: string;
    password?: any;
    age?: number;
    role?: string;
    skills?: string[];
    experience?: number;
}


export const createUser = async (req: Request<{}, {}, reqBody>, res: Response) => {
    try {
        const { Name, email, password, age, role, skills, experience } = req.body;

        if (!Name || !email || !password || !age || !role || !skills || !experience) {
            return res.status(400).json({
                success: false,
                message: "all fields are required"
            })
        }

        const isExist = await userModel.findOne({ email });
        if (isExist) {
            return res.status(400).json({
                success: false,
                message: "user already exist"
            })
        }

        const user = new userModel(req.body);
        const newUser = await user.save();

        res.status(201).json({
            success: true,
            message: "user created successfully",
            data: newUser
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "internal server error" + err
        })
    }
}

export const getAllUsers = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const users = await userModel.find();
        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                message: "no users found"
            })
        }

        res.status(200).json({
            success: true,
            message: "users fetched successfully",
            data: users
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "internal server error" + err
        })
    }
}

export const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await userModel.findById({ _id: id });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "user fetched successfully",
            data: user
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "internal server error" + err
        })
    }
}

// Update User by ID for patch request
export const updateUserById = async (req: Request<{ id: string }, {}, any>, res: Response) => {
    try {
        const isUserExist = await userModel.findOne({ _id: req.params.id });
        if (!isUserExist) {
            return res.status(404).json({
                success: false,
                message: "user not found"
            })
        }

        const payload: any = req.body;

        const updatedUser = await userModel.findByIdAndUpdate({ _id: req.params.id }, payload, {
        new:true, runValidators: true});

       res.status(200).json({
        success: true,
        message: "user updated successfully",
        data: updatedUser
       }) 

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "internal server error" + err
        })
    }
}

export const deleteUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const isUserExist = await userModel.findById({ _id: id });

        if (!isUserExist) {
            return res.status(404).json({
                success: false,
                message: "user not found"
            })
        }

        const deletedUser = await userModel.findByIdAndDelete({ _id: id });

        res.status(200).json({
            success: true,
            message: "user deleted successfully",
            data: deletedUser
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "internal server error" + err
        })
    }
}