import User from "./../models/user.js";
import { generateToken } from "./../utils/generateToken.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  const { name, email, password, avatar } = req.body;
  const userExists = await User.findOne({ $or: [{ name }, { email }] });
  if (userExists) {
    res.status(404);
    throw new Error("User already exists");
  }

  const user = await User.create({ name, email, password, avatar });
  if (!user) {
    res.status(400);
    throw new Error("Invalid user data");
  }

  generateToken(res, user._id);
  res.status(202).json({
    id: user._id,
    username: user.username,
    email: user.email,
    avatar: user.avatar,
    isAdmin: user.isAdmin,
  });
};

export const login = async (req, res) => {
  const { name, password } = req.body;
  try {
    const user = await User.findOne({ name });
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }
    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword) {
      res.status(401);
      throw new Error("Invalid Credentials!");
    }
    generateToken(res, user._id);
    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ success: true, message: "Logout successful" });
  } catch (error) {
    console.log(error);
  }
};
