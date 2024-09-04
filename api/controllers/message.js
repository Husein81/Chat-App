import Message from "../models/message.js";

export const sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, message } = req.body;

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    await newMessage.save();

    //   const receiverSocketId = userSocketMap[receiverId];

    //   if (receiverSocketId) {
    //     console.log('emitting recieveMessage event to the reciver', receiverId);
    //     io.to(receiverSocketId).emit('newMessage', newMessage);
    //   } else {
    //     console.log('Receiver socket ID not found');
    //   }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("ERROR", error);
  }
};

export const getMessages = async (req, res) => {
  try {
    const { senderId, receiverId } = req.query;

    const messages = await Message.find({
      $or: [
        { senderId: senderId, receiverId: receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    }).populate("senderId", "_id name");

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error", error);
  }
};
