import { Request, Response, NextFunction } from "express";
import { validateTokenExpiration } from "../utils/helper";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const [prefix, base64] = token.split(" ");

  if (prefix !== "Bearer") {
    res.status(401).json({ message: "Invalid token format" });
    return;
  }

  try {
    const isValid = validateTokenExpiration(base64);
    if (isValid.valid) {
      req.body.user = isValid.payload;
      next();
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};
