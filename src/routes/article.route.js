import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  create,
  findAll,
  topArticle,
  findById,
  searchByTitle,
  findByUser,
  update,
  erase,
  likeArticle
} from "../controllers/article.controller.js";

const router = Router();

router.post("/", authMiddleware, create);
router.get("/", findAll);
router.get("/top", topArticle);
router.get("/search", searchByTitle);
router.get("/byUser", authMiddleware, findByUser)
router.get("/:id", authMiddleware, findById);
router.patch("/:id", authMiddleware, update);
router.delete("/:id", authMiddleware, erase);
router.patch("/like/:id", authMiddleware, likeArticle);

export default router;
