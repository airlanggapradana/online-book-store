import { Router } from "express";
import {
  createBorrow,
  deleteBorrow,
  getAllBorrows,
  getBorrowById,
  updateBorrow,
} from "../services/borrow.service";

const router = Router();

router.get("/", getAllBorrows);
router.get("/:id", getBorrowById);
router.post("/", createBorrow);
router.put("/:id", updateBorrow);
router.delete("/:id", deleteBorrow);

export default router;
