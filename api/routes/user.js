import express from "express";
import {
  acceptRequest,
  getMyUsers,
  getUser,
  sendRequest,
} from "../controllers/user.js";

const router = express.Router();

router.get("/users/:userId", getMyUsers);
router.get("/user/:userId", getUser);

router.post("/sendRequest", sendRequest);
router.post("/acceptRequest", acceptRequest);

export default router;
