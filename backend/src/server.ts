import express, { Application } from "express";
import cors from "cors";
import environment from "./environment";
import auth from "./controllers/auth.controller";
import borrow from "./controllers/borrow.controller";
import { authMiddleware } from "./middleware/auth.middleware";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/auth", auth);
app.use("/borrow", authMiddleware, borrow);

app.listen(environment.PORT, () => {
  console.log(`Server is running on port ${environment.PORT}`);
});
