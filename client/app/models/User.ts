export interface User {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  requests?: Request[];
  friends?: User[];
}

export interface LoginUser {
  email: string;
  password: string;
}
export interface RegisterUser {
  email: string;
  password: string;
  name: string;
  avatar: string;
}
