import { Request, Response } from "express";
import prisma from "../../prisma/prisma";
import { Prisma } from "@prisma/client";
import * as bcrypt from "bcrypt";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        borrows: {
          include: { book: true },
        },
      },
    });

    if (users.length === 0) {
      res.status(404).send({ message: "No users found" });
      return;
    }

    res.status(200).send({
      message: "Users found",
      data: users,
    });
    return;
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
    return;
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        borrows: {
          include: { book: true },
        },
      },
    });

    if (!user) {
      res.status(404).send({ message: "User not found" });
      return;
    }

    res.status(200).send({
      message: "User found",
      data: user,
    });
    return;
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
    return;
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { email, password, ...userInput } = req.body as Prisma.UserCreateInput;

  const hashedPwd = await bcrypt.hash(password, 10);

  try {
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPwd,
        ...userInput,
      },
    });

    res.status(201).send({
      message: "User created",
      data: newUser,
    });
    return;
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
    return;
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { password, ...userInput } = req.body as Prisma.UserUpdateInput;

  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        password: await bcrypt.hash(password as unknown as string, 10),
        ...userInput,
      },
    });

    res.status(200).send({
      message: "User updated",
      data: updatedUser,
    });
    return;
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error });
    return;
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.user.delete({
      where: { id },
    });

    res.status(200).send({
      message: "User deleted",
    });
    return;
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
    return;
  }
};
