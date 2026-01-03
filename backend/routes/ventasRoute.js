import express from 'express';
import { crear, listar } from '../controllers/ventasController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, crear);
router.get('/', listar);

export default router;