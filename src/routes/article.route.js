import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { create, findAll, topArticle } from '../controllers/article.controller.js';

const router = Router();

router.post('/', authMiddleware, create);
router.get('/', findAll);
router.get('/top', topArticle);

export default router;