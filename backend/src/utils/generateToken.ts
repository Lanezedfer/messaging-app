import { Response } from "express";
import jwt from "jsonwebtoken";

const generateToken = (userId: string, res: Response) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true, // Prevent (XSS) Cross Site Scripting
    sameSite: "strict", // Prevent (CSRF) Cross-Site Request Forgery
    secure: process.env.NODE_DEV !== "development",
  });

  return token;
};

export default generateToken;
