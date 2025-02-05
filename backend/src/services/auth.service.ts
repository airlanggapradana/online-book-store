import { Request, Response } from "express";
import prisma from "../../prisma/prisma";
import { Prisma } from "@prisma/client";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import environment from "../environment";

export const register = async (req: Request, res: Response) => {
  const { password, ...userInput } = req.body as Prisma.UserCreateInput;

  try {
    const user = await prisma.user.create({
      data: {
        password: await bcrypt.hash(password, 10),
        ...userInput,
      },
    });

    res.status(201).send({
      message: "User registered successfully",
      user,
    });
    return;
  } catch (error) {
    res.status(500).send({
      message: "An error occurred while registering the user",
      error,
    });
    return;
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body as Prisma.UserCreateInput;

  try {
    const isUserExists = await prisma.user.findUnique({
      where: { email },
    });

    if (isUserExists) {
      const isPasswordMatch = await bcrypt.compare(
        password,
        isUserExists.password
      );

      if (isPasswordMatch) {
        const token = jwt.sign(
          {
            id: isUserExists.id,
            email: isUserExists.email,
            username: isUserExists.username,
            role: isUserExists.role,
          },
          environment.JWT_SECRET,
          { expiresIn: "1d" }
        );

        res.status(200).send({
          message: "User logged in successfully",
          token,
        });
        return;
      }
      res.status(401).send({
        message: "Invalid password",
      });
      return;
    }
    res.status(404).send({
      message: "User not found",
    });
    return;
  } catch (error) {
    res.status(500).send({
      message: "An error occurred while logging in",
      error,
    });
    return;
  }
};
