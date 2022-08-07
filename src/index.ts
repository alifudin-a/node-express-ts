import express, {Express} from "express";
import router from "./routes/routes";

const app: Express = express();

app.use(router)

app.listen(5000, () => {
  console.log("app started on port: 5000");
});
