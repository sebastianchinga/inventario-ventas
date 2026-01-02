import express from 'express';
import { actualizar, crear, eliminar, encontrar, listar } from '../controllers/categoriasController.js';

const router = express.Router();

router.route('/').get(listar).post(crear);
router.route('/:id').get(encontrar).put(actualizar).delete(eliminar);

export default router;