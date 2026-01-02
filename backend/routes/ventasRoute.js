import express from 'express';
import { crear } from '../controllers/ventasController.js';

const router = express.Router();

router.post('/', crear);

export default router;