import express, { Request, Response } from "express";
import { login } from "../models/auth";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/login", async (req: Request, res: Response) => {
  let username: string = req.body.username;
  let password: string = req.body.password;

  const data = await login(username);
  if (!data) {
    res.json({
      code: 401,
      message: "Login gagal!",
    });
  } else {
    bcrypt
      .compare(password, data.password)
      .then((result: boolean) => {
        if (result) {
          res.json({
            code: 200,
            message: "Login berhasil!",
            data: {
              user: {
                username: data.username,
                role: data.role,
              },
            },
          });
        } else {
          res.json({
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
