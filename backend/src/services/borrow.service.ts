import { Request, Response } from "express";
import prisma from "../../prisma/prisma";
import { Prisma } from "@prisma/client";

export const createBorrow = async (req: Request, res: Response) => {
  const { book, user, ...borrowInput } = req.body as Prisma.BorrowCreateInput;

  try {
    const borrow = await prisma.borrow.create({
      data: {
        ...borrowInput,
        book: {
          connect: {
            id: book as unknown as string,
          },
        },
        user: {
          connect: {
            id: user as unknown as string,
          },
        },
      },
    });

    res.status(201).send({
      message: "Borrow created successfully",
      data: borrow,
    });
    return;
  } catch (error) {
    res
      .status(500)
      .send({ message: "An error occurred while creating the borrow", error });
    return;
  }
};

export const updateBorrow = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { book, user, returned, ...borrowInput } =
    req.body as Prisma.BorrowUpdateInput;
  const returnedInput = returned as unknown as string;

  try {
    const borrow = await prisma.borrow.update({
      where: {
        id,
      },
      data: {
        returned: returnedInput === "true" ? true : false,
        ...borrowInput,
        book: {
          connect: {
            id: book as unknown as string,
          },
        },
        user: {
          connect: {
            id: user as unknown as string,
          },
        },
      },
    });

    if (returnedInput === "true") {
      await prisma.borrow.delete({
        where: {
          id,
        },
      });
    }

    res.status(200).send({
      message: "Borrow updated successfully",
      data: borrow,
    });
    return;
  } catch (error) {
    res
      .status(500)
      .send({ message: "An error occurred while updating the borrow", error });
    return;
  }
};
