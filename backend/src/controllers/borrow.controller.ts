import { Router } from "express";
import {
  createBorrow,
  getAllBorrows,
  updateBorrow,
} from "../services/borrow.service";

const router = Router();

router.get("/", getAllBorrows);
router.post("/", createBorrow);
router.put("/:id", updateBorrow);

export default router;
