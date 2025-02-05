import { Request, Response } from "express";
import prisma from "../../prisma/prisma";

export const getAllBorrows = async (req: Request, res: Response) => {
  try {
    const borrows = await prisma.borrow.findMany();

    if (borrows.length === 0) {
      res.status(404).json({ message: "No borrows found" });
      return;
    }

    res.status(200).json({
      message: "Borrows found",
      borrows,
    });
    return;
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
    return;
  }
};

export const createBorrow = async (req: Request, res: Response) => {
  const { peminjam, buku, author } = req.body;

  if (!peminjam || !buku || !author) {
    res.status(400).json({ message: "Nama, buku, and author are required" });
    return;
  }

  try {
    const newBorrow = await prisma.borrow.create({
      data: {
        peminjam,
        buku,
        author,
        tgl_kembali: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });
    res.status(201).json({
      message: "Borrow created",
      data: newBorrow,
    });
    return;
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
    return;
  }
};

export const updateBorrow = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { isReturned, peminjam, buku, author, isLate, status } = req.body;
  const returnedInput = isReturned as unknown as string;

  try {
    const updatedBorrow = await prisma.borrow.update({
      where: { id },
      data: {
        peminjam,
        buku,
        author,
        isReturned: returnedInput === "true" ? true : false,
        isLate: isLate === "true" ? true : false,
        status,
      },
    });

    res.status(200).json({
      message: "Borrow updated",
      data: updatedBorrow,
    });
    return;
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
    return;
  }
};
