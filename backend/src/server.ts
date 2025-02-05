import express, { Application } from "express";
import cors from "cors";
import environment from "./environment";
import auth from "./controllers/auth.controller";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/auth", auth);

app.listen(environment.PORT, () => {
  console.log(`Server is running on port ${environment.PORT}`);
});
