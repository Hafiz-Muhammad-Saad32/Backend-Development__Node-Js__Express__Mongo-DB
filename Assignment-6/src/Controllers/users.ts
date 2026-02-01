import { Request, Response } from 'express';
import userModel from '../Models/userModel';
import { userSchema, userParam, loginSchema } from '../schemas/userSchema';
import { hashing, comparePassword } from "../helpers/bcrypt";
import { generateJWT } from '../helpers/jwt';

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { success, error, data } = userSchema.safeParse(req.body)

        if (!success) {
            return res.status(400).send({
                success: false,
                error: error.issues[0].message,
            })
        }

        const isExist = await userModel.findOne({ email: data.email });
        if (isExist) {
            return res.status(400).json({
                success: false,
                message: "user already exist"
            })
        }

        const hashedPassword = await hashing(data.password);

        const user = new userModel({
            name: data.name,
            email: data.email,
            password: hashedPassword,
            age: data.age,
            role: data.role,
            experience: data.experience,
            skills: data.skills,
        });

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

export const login = async (req: Request, res: Response) => {
    try {
        const { success, data, error } = loginSchema.safeParse(req.body);

        if (!success) {
            return res.status(400).json({
                success: false,
                message: error.issues[0].message
            })
        }

        const isFound = await userModel.findOne({ email: data.email })
        if (!isFound) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        const isCorrect = await comparePassword(data.password, isFound.password);

        if (!isCorrect) {
            return res.status(400).json({
                success: false,
                message: "Password is miss matched"
            })
        }

        const payload = {
            name: isFound.name,
            email: isFound.email,
            role: isFound.role
        }

        const accessToken = generateJWT(payload);

        res.status(200).json({
            success: true,
            message: "User login successfully!",
            accessToken
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
        const users = await userModel.find({
            deletedAt: null,
        });;

        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No user found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            data: users
        })

    } catch (err:any) {
        res.status(500).json({
            success: false,
            message: "internal server error" + err.message
        })
    }
}

export const getUserById = async (req: Request, res: Response) => {
    const { success, data, error } = userParam.safeParse(req.params);

    if (!success) (
        res.status(404).json({
            success: false,
            message: error.issues[0].message,
        })
    )

    try {

        const user = await userModel.findById({
            _id: data?.id,
            deletedAt: null,
        })

        if (!user) {
            return res.status(404).json({
                message: "user not found",
            });
        }

        if (user?.deletedAt != null) {
            return res.status(404).json({
                message: "user has deleted",
            });
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
export const updateUserById = async (req: Request, res: Response) => {
    const param = userParam.safeParse(req.params);
    const id = param.data?.id;
    const { success, data, error } = userSchema.partial().safeParse(req.body);

    if (!success) {
        return res.status(400).send({
            success: false,
            message: error.issues[0].message,
        });
    }

    try {
        const user = await userModel.findByIdAndUpdate(
            id, data,
            {
                new: true,
                runValidators: true
            })

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user not found",
            });
        }

        if(user?.deletedAt != null){
            return res.status(404).json({
                message: "user has deleted",
            });
        }

        return res.status(200).json({
            success: true,
            message: "user updated successfully",
            data: user,
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "internal server error" + err
        })
    }
}

export const deleteUserById = async (req: Request, res: Response) => {
    
    const id = userParam.safeParse(req.params)

    if (!id.success) {
        return res.status(400).json({
            errors: id.error.issues[0].message,
        });
    }

    try {

        const user = await userModel.findByIdAndUpdate(
            id.data.id,
            { deletedAt: new Date() },
            { new: true }
        )

        if (!user) {
            return res.status(404).json({
                message: "user not found",
            });
        }

        return res.json({
            success: true,
            message: "user deleted softly",
            data: user
        });
        

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "internal server error" + err
        })
    }
}