import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';
import Rol from '../models/Rol.js';
const authMiddleware = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split("Bearer ")[1];

        try {
            const { id } = await jwt.verify(token, process.env.PALABRA_SECRETA);
            req.usuario = await Usuario.findByPk(id, {
                include: {
                    model: Rol,
                    required: true
                },
                attributes: {
                    exclude: ['password', 'token', 'confirmado']
                }
            });
            return next();
        } catch (error) {
            return res.status(400).json({ msg: 'Hubo un error con el token' });
        }
    }

    if (!token) {
        return res.status(400).json({ msg: 'Token inexistente' });
    }

    next()

}

export default authMiddleware