import { Router } from "express";
import { login, register } from "../services/auth.service";

const router = Router();

router.post("/register", register);
router.post("/login", login);

export default router;
