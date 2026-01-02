import express from 'express';
import { actualizar, crear, eliminar, listar } from '../controllers/rolesController.js';

const router = express.Router();

router.route('/').get(listar).post(crear);
router.route('/:id').put(actualizar).delete(eliminar);

export default router;