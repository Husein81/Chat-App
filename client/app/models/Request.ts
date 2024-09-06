import { User } from "./User";

export interface Request {
  _id: string;
  from: {
    _id: string;
    name: string;
    email: string;
    avatar: string;
  };
  message: string;
  status: "pending" | "accepted" | "rejected";
}
