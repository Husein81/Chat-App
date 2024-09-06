import { User } from "./User";

export interface Message {
  _id: string;
  senderId: User;
  receiverId: string;
  message: string;
  timeStamp: Date;
  shouldShake: boolean;
}
