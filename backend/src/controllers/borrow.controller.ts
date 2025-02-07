import { Router } from "express";
import {
  createBorrow,
  getAllBorrows,
  getBorrowById,
  updateBorrow,
} from "../services/borrow.service";

const router = Router();

router.get("/", getAllBorrows);
router.get("/:id", getBorrowById);
router.post("/", createBorrow);
router.put("/:id", updateBorrow);

export default router;
