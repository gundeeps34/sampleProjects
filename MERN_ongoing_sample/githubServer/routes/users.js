import express from "express";
import {
  getUser, getAllLiked, addRemoveLike
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:email", verifyToken, getUser);
router.get("/:email/liked", verifyToken, getAllLiked)

/* UPDATE */
router.patch("/:email/:recipeName", verifyToken, addRemoveLike);

export default router;
