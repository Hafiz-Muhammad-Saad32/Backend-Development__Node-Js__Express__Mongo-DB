import jwt from "jsonwebtoken";

export function generateJWT(payload: any) {
    const secret = process.env.JWT_SECRET || "123";
    return jwt.sign(payload, secret, { expiresIn: '1h' });
}

export function jwtCompare(token: string) {
    const secret = process.env.JWT_SECRET || "123";
    return jwt.verify(token, secret);
}