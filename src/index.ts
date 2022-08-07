import express, { Express } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();
import router from "./routes/routes";

const app: Express = express();

app.use(bodyParser.json())
app.use(router);

app.listen(process.env.APP_PORT, () => {
  console.log("app started on port: 5000");
});
