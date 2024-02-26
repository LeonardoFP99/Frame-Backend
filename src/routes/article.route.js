import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  create,
  findAll,
  topArticle,
  findById,
  searchByTitle,
} from "../controllers/article.controller.js";

const router = Router();

router.post("/", authMiddleware, create);
router.get("/", findAll);
router.get("/top", topArticle);
router.get("/search", searchByTitle);
router.get("/:id", findById);

export default router;
