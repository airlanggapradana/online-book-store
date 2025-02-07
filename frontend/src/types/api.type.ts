export interface IRegister {
  message: string;
  user: {
    id: string;
    username: string;
    email: string;
    password: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

export interface ILogin {
  message: string;
  token: string;
}

export interface IGetAllBorrows {
  message: string;
  borrows: {
    id: string;
    peminjam: string;
    buku: string;
    author: string;
    tgl_pinjam: Date;
    tgl_kembali: Date;
    isReturned: boolean;
    isLate: boolean;
    status: string;
  }[];
}

export interface ICreateBorrow {
  message: string;
  data: {
    id: string;
    peminjam: string;
    buku: string;
    author: string;
    tgl_pinjam: Date;
    tgl_kembali: Date;
    isReturned: boolean;
    isLate: boolean;
    status: string;
  };
}

export interface IGetBorrow {
  message: string;
  borrow: {
    id: string;
    peminjam: string;
    buku: string;
    author: string;
    tgl_pinjam: Date;
    tgl_kembali: Date;
    isReturned: boolean;
    isLate: boolean;
    status: string;
  };
}
