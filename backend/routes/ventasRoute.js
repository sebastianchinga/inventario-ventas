import express from 'express';
import { crear, detalles, listar } from '../controllers/ventasController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, crear);
router.get('/', authMiddleware, listar);
router.get('/:id', detalles)

export default router;