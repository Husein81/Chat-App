// controllers/message.js
import Message from "../models/message.js";
import { io, userSocketMap } from "../app.js"; // Import io and userSocketMap

export const sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, message } = req.body;

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    await newMessage.save();

    const receiverSocketId = userSocketMap[receiverId];

    if (receiverSocketId) {
      console.log("Emitting receiveMessage event to the receiver", receiverId);
      io.to(receiverSocketId).emit("newMessage", newMessage);
    } else {
      console.log("Receiver socket ID not found");
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("ERROR", error);
    res.status(500).json({ error: "Failed to send message" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { senderId, receiverId } = req.query;
    if (!senderId || !receiverId) {
      return res
        .status(400)
        .json({ error: "Both senderId and receiverId are required." });
    }
    const messages = await Message.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    }).populate("senderId", "_id name");

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ error: "Failed to get messages" });
  }
};
