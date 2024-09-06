import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { io, Socket } from "socket.io-client";
import { BASE_URL } from "../url";

interface SocketState {
  socket: Socket | null;
}

const initialState: SocketState = {
  socket: null,
};

export const connectSocket = createAsyncThunk(
  "socket/connectSocket",
  async (userId: string, { getState, rejectWithValue }) => {
    try {
      const socket = io(BASE_URL, {
        query: { userId },
      });

      return socket;
    } catch (error) {
      return rejectWithValue("Failed to connect to the socket");
    }
  }
);
export const disconnectSocket = createAsyncThunk(
  "socket/disconnectSocket",
  async (_, { getState }) => {
    const state = getState() as { socket: SocketState };
    state.socket.socket?.disconnect();
  }
);
const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(connectSocket.fulfilled, (state, action) => {
        state.socket = action.payload;
      })
      .addCase(disconnectSocket.fulfilled, (state) => {
        state.socket = null;
      });
  },
});

export default socketSlice.reducer;
