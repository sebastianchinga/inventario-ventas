import express from 'express';
import { actualizar, crear, detalles, eliminar, listar } from '../controllers/productosController.js';

const router = express.Router();

router.route('/').get(listar).post(crear);
router.route('/:id').put(actualizar).delete(eliminar).get(detalles);

export default router;