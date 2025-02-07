import axios from "axios";
import { env } from "@/env";
import {
  CreateBookSchema,
  LoginSchema,
  RegisterSchema,
  UpdateBookSchema,
} from "./schema";
import {
  ICreateBorrow,
  IGetAllBorrows,
  IGetBorrow,
  ILogin,
  IRegister,
  IUpdateBorrow,
} from "@/types/api.type";

export const register = async (data: RegisterSchema) => {
  try {
    const response = await axios.post(
      `${env.NEXT_PUBLIC_API_URL}/auth/register`,
      {
        username: data.username,
        email: data.email,
        password: data.password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return { status: response.status, result: response.data as IRegister };
  } catch (error) {
    return { status: 500, message: error };
  }
};

export const login = async (data: LoginSchema) => {
  try {
    const response = await axios.post(
      `${env.NEXT_PUBLIC_API_URL}/auth/login`,
      data,
      { headers: { "Content-Type": "application/json" } },
    );
    return { status: response.status, result: response.data as ILogin };
  } catch (error) {
    return { status: 500, message: error };
  }
};

export const getAllBorrows = async (token: string) => {
  try {
    const response = await axios.get(`${env.NEXT_PUBLIC_API_URL}/borrow`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return {
      status: response.status,
      result: response.data as IGetAllBorrows,
      message: response.data.message as IGetAllBorrows,
    };
  } catch (error) {
    return { status: 500, message: error, result: null };
  }
};

export const getBorrowById = async (id: string, token: string) => {
  try {
    const response = await axios.get(
      `${env.NEXT_PUBLIC_API_URL}/borrow/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );
    return { status: response.status, result: response.data as IGetBorrow };
  } catch (error) {
    return { status: 500, message: error, result: null };
  }
};

export const createBorrow = async (data: CreateBookSchema, token: string) => {
  try {
    const response = await axios.post(
      `${env.NEXT_PUBLIC_API_URL}/borrow`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );
    return { status: response.status, result: response.data as ICreateBorrow };
  } catch (error) {
    return { status: 500, message: error };
  }
};

export const updateBorrow = async (
  id: string,
  token: string,
  data: UpdateBookSchema,
) => {
  try {
    const currentDate = new Date();
    const returnDate = new Date(data.tgl_kembali);
    const status = currentDate <= returnDate ? "DIKEMBALIKAN" : "TERLAMBAT";

    const isReturned = status === "DIKEMBALIKAN" || status === "TERLAMBAT";
    const isLate = status === "TERLAMBAT";

    const response = await axios.put(
      `${env.NEXT_PUBLIC_API_URL}/borrow/${id}`,
      {
        peminjam: data.peminjam,
        buku: data.buku,
        author: data.author,
        tgl_kembali: currentDate,
        status: status,
        isReturned: isReturned,
        isLate: isLate,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );
    return {
      status: response.status,
      result: response.data as IUpdateBorrow,
      message: response.data.message,
    };
  } catch (error) {
    return { status: 500, message: error, result: null };
  }
};
