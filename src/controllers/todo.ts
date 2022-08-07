import express, { Request, Response } from "express";
import {
  createTodo,
  deleteTodo,
  getTodo,
  getTodos,
  updateTodo,
} from "../models/todo";
const router = express.Router();

router.get("/todos", async (req: Request, res: Response) => {
  const data = await getTodos();

  res.json({
    code: 200,
    message: "Berhasil mendapatkan data todos!",
    body: {
      todos: data,
    },
  });
});

router.get("/todo/:id", async (req: Request, res: Response) => {
  let id: Number = parseInt(req.params.id);
  const data = await getTodo(id);
  res.json({
    code: 200,
    message: "Berhasilkan mendapatkan data todo!",
    body: {
      todo: data,
    },
  });
});

router.delete("/todo/:id", async (req: Request, res: Response) => {
  let id: Number = parseInt(req.params.id);
  await deleteTodo(id);
  res.json({
    code: 200,
    message: "Berhasil mengahpus data todo!",
  });
});

router.post("/todo", async (req: Request, res: Response) => {
  let task: String = req.body.task;
  let isDone: Boolean = req.body.is_done;
  let owner: Number = req.body.owner;

  const data = await createTodo(task, isDone, owner);
  res.json({
    code: 200,
    message: "Berhasilkan menambahkan data todo!",
    body: {
      todo: data,
    },
  });
});

router.put("/todo", async (req: Request, res: Response) => {
  let id: Number = req.body.id;
  let task: String = req.body.task;
  let isDone: Boolean = req.body.is_done;

  const data = await updateTodo(id, task, isDone);
  res.json({
    code: 200,
    message: "Berhasilkan mengubah data todo!",
    body: {
      todo: data,
    },
  });
});

export default router;
