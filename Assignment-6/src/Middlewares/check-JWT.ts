import { NextFunction, Request, Response } from "express";
import { jwtCompare } from "../helpers/jwt";

export function checkJWT(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            res.status(404).json({
                success: false,
                message: "Token not found"

            })
        }
        const decoded = jwtCompare(token!);
        console.log(decoded);
        (req as any).user = decoded;
        next()
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error : " + error
        })
    }
}