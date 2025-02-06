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
