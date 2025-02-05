import express, { Application } from "express";
import cors from "cors";
import environment from "./environment";
import user from "./controllers/user.controller";
import borrow from "./controllers/borrow.controller";
import book from "./controllers/book.controller";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/user", user);
app.use("/borrow", borrow);
app.use("/book", book);

app.listen(environment.PORT, () => {
  console.log(`Server is running on port ${environment.PORT}`);
});
