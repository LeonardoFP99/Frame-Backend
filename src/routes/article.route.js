import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  create,
  findAll,
  topArticle,
  findById,
  searchByTitle,
  findByUser,
} from "../controllers/article.controller.js";

const router = Router();

router.post("/", authMiddleware, create);
router.get("/", findAll);
router.get("/top", topArticle);
router.get("/search", searchByTitle);
router.get("/byUser", authMiddleware, findByUser)
router.get("/:id", authMiddleware, findById);

export default router;
