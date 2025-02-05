import { Router } from "express";
import { createBook, getAllBooks, getBookById } from "../services/book.service";

const router = Router();

router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.post("/", createBook);

export default router;
