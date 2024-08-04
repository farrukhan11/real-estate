import express, { Router } from "express";
import verifyToken from "../../middleware/verifyToken.middleware.js";
import {
  addPost,
  deleteAllPosts,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../controllers/post.controller.js";

const router = Router();

router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", verifyToken, addPost);
router.put("/:id", verifyToken, updatePost);
router.delete("/:id", verifyToken, deletePost);
router.delete("/", verifyToken, deleteAllPosts);

export default router;
