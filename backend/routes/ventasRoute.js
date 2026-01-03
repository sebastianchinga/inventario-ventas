import express from 'express';
import { crear } from '../controllers/ventasController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, crear);

export default router;