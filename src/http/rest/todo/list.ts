import express, { Request, Response } from "express";

const router = express.Router();

router.get("/todo", (req: Request, res: Response) => {
  res.json({
    code: 200,
    message: "Success!",
    body: {
      todos: [
        {
          id: 1,
          task: "Clean Room",
        },
        {
          id: 2,
          task: "Wash Dishes",
        },
      ],
    },
  });
});

export default router;
