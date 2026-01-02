import express from 'express';
import { confirmar, listar, login, perfil, registro } from '../controllers/usuariosController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Login
router.route('/').post(login).get(listar);
// Registrar cuenta
router.post('/registro', registro);
// Confirmar cuenta
router.post('/confirmar', confirmar);
// Ver perfil
router.get('/perfil', authMiddleware, perfil);

export default router