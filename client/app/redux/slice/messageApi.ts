import { Message } from "../../models/Message";
import { MESSAGE_URL } from "../url";
import { apiSlice } from "./apiSlice";

type Params = { senderId: string; receiverId: string };
const messageApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query<Message[], Params>({
      query: ({ senderId, receiverId }) => ({
        url: MESSAGE_URL,
        method: "GET",
        params: {
          senderId,
          receiverId,
        },
      }),
    }),
    sendMessage: builder.mutation({
      query: (body) => ({
        url: MESSAGE_URL,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetMessagesQuery, useSendMessageMutation } = messageApi;
