import { Router } from "express";
import { createBorrow, updateBorrow } from "../services/borrow.service";

const router = Router();

router.post("/", createBorrow);
router.put("/:id", updateBorrow);

export default router;
