import jwt from "jsonwebtoken";
import { Request, Response } from "express";

const verifyToken = (req: Request, res: Response, next: any) => {
  const token = req.headers["x-access-token"];
  
  if (!token) {
    return res.status(403).json({
      code: 403,
      message: "Token tidak boleh kosong!",
    });
  }

  try {
    jwt.verify(token as string, process.env.JWT_TOKEN_KEY as string);
  } catch (err) {
    return res.status(401).json({
      code: 400,
      message: "Token tidak valid!",
    });
  }

  return next();
};

export default verifyToken;
