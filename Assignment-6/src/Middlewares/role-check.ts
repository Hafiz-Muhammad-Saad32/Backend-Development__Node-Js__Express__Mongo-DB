import { Request, Response, NextFunction } from "express";

export const roleCheck = (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = (req as any).user;

      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      if (user.role == "user") {
        return res.status(403).json({ message: "Only admin can access this API" });
      }

      next();
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error : " + error
      })
    }
  };