import { Request, Response, NextFunction } from 'express';

export function loggerMiddleware(req: Request, res: Response, next: NextFunction){

    console.log(`${req.method} method  called on  http://localhost:3000${req.url} at time ${new Date().toISOString()} `);
    next();
}