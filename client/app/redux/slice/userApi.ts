import { LoginUser, RegisterUser, User } from "../../models/User";
import { Request } from "../../models/Request";
import { LOGIN_URL, REGISTER_URL, USER_URL } from "../url";
import { apiSlice } from "./apiSlice";

const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation<User, LoginUser>({
      query: (body) => ({
        url: LOGIN_URL,
        method: "POST",
        body,
      }),
    }),
    registerUser: builder.mutation<User, RegisterUser>({
      query: (body) => ({
        url: REGISTER_URL,
        method: "POST",
        body,
      }),
    }),
    getMyUsers: builder.query<User[], string>({
      query: (id: string) => ({
        url: `${USER_URL}/users/${id}`,
        method: "GET",
      }),
    }),
    getUser: builder.query<User[], string>({
      query: (id: string) => ({
        url: `${USER_URL}/${id}`,
        method: "GET",
      }),
    }),
    getRequests: builder.query<Request[], string>({
      query: (id: string) => ({
        url: `${USER_URL}/requests/${id}`,
        method: "GET",
      }),
    }),
    sendRequests: builder.mutation({
      query: (body) => ({
        url: `${USER_URL}/sendRequest`,
        method: "POST",
        body,
      }),
    }),
    acceptRequest: builder.mutation({
      query: (body) => ({
        url: `${USER_URL}/acceptRequest`,
        method: "POST",
        body,
      }),
    }),
    rejectRequest: builder.mutation({
      query: ({ requestId, body }) => ({
        url: `${USER_URL}/rejectRequest/${requestId}`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useGetMyUsersQuery,
  useAcceptRequestMutation,
  useGetRequestsQuery,
  useGetUserQuery,
  useSendRequestsMutation,
  useRejectRequestMutation,
} = userApi;
