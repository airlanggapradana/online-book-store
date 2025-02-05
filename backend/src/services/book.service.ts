import { Request, Response } from "express";
import prisma from "../../prisma/prisma";
import { Prisma } from "@prisma/client";

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await prisma.book.findMany({
      include: {
        borrows: true,
      },
    });

    if (books.length === 0) {
      res.status(404).send({ message: "No books found" });
      return;
    }
    res.status(200).send({
      message: "Books retrieved successfully",
      data: books,
    });
    return;
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error });
    return;
  }
};

export const getBookById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const book = await prisma.book.findUnique({
      where: { id },
      include: {
        borrows: true,
      },
    });

    if (!book) {
      res.status(404).send({ message: "Book not found" });
      return;
    }

    res.status(200).send({
      message: "Book retrieved successfully",
      data: book,
    });
    return;
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error });
    return;
  }
};

export const createBook = async (req: Request, res: Response) => {
  const bookInput = req.body as Prisma.BookCreateInput;

  try {
    const newBook = await prisma.book.create({
      data: bookInput,
    });

    res.status(201).send({
      message: "Book created successfully",
      data: newBook,
    });
    return;
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error });
    return;
  }
};
