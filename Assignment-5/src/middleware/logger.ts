import { Request, Response, NextFunction } from "express";

const loggger = (res: Response, req:Request, next:NextFunction) => {
    console.log(`${req.method} called on ${req.url} at time ${new Date().toISOString()}`)
}
 
export default loggger;
