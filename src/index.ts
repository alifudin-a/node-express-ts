import express, { Express } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();
import { todo, auth } from "./routes/routes";
import verifyToken from "./middlewares/auth";

const app: Express = express();

app.use(bodyParser.json());
app.use("/api/v1/service", verifyToken, todo);
app.use("/api/v1/auth", auth);

app.listen(process.env.APP_PORT, () => {
  console.log("App started on port: " + process.env.APP_PORT);
});
