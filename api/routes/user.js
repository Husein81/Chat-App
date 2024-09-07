import express from "express";
import {
  acceptRequest,
  getMyUsers,
  getRequests,
  getUser,
  rejectRequest,
  sendRequest,
} from "../controllers/user.js";

const router = express.Router();

router.get("/users/:userId", getMyUsers);
router.get("/:userId", getUser);
router.get("/requests/:userId", getRequests);

router.post("/sendRequest", sendRequest);
router.post("/acceptRequest", acceptRequest);
router.post("/rejectRequest", rejectRequest);

export default router;
