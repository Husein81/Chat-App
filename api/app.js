// server.js
import express from "express";
import dotenv from "dotenv";
import connectDB from "./data/connection.js";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import messageRoutes from "./routes/message.js";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";

dotenv.config();

const app = express();
const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: "*", // Adjust based on your needs
  },
});

export const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("A user connected");

  const userId = socket.handshake.query.userId;

  if (userId && userId !== "undefined") {
    userSocketMap[userId] = socket.id;
  }

  console.log("user socket data", userSocketMap);

  socket.on("disconnect", () => {
    console.log("User disconnected");
    Object.keys(userSocketMap).forEach((key) => {
      if (userSocketMap[key] === socket.id) {
        delete userSocketMap[key];
      }
    });
  });

  socket.on("sendMessage", ({ senderId, receiverId, message }) => {
    const receiverSocketId = userSocketMap[receiverId];
    console.log("receiver Id", receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("receiveMessage", {
        senderId,
        message,
      });
    }
  });
});

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/message", messageRoutes);

// Connect to the database
await connectDB();

// Start the server
server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
