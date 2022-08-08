import express, { Request, Response } from "express";
import { login } from "../models/auth";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/login", async (req: Request, res: Response) => {
  const username: string = req.body.username;
  const password: string = req.body.password;

  if (!(username || password) || !(username && password)) {
    return res.status(400).json({
      code: 400,
      message: "Username atau Password tidak boleh kosong!",
    });
  }

  const data = await login(username);
  if (!data) {
    return res.status(401).json({
      code: 401,
      message: "Login gagal!",
    });
  } else {
    bcrypt
      .compare(password, data.password)
      .then((result: boolean) => {
        if (result) {
          // jwt
          const token = jwt.sign(
            {
              username: data.username,
              role: data.role,
            },
            process.env.JWT_TOKEN_KEY as string,
            {
              expiresIn: "2h",
            }
          );

          return res.status(200).json({
            code: 200,
            message: "Login berhasil!",
            data: {
              token: token,
            },
          });
        } else {
          return res.status(401).json({
            code: 401,
            message: "Login gagal!",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

export default router;
