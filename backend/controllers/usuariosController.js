import enviarEmail from "../helpers/enviarEmail.js";
import generarJWT from "../helpers/generarJWT.js";
import Rol from "../models/Rol.js";
import Usuario from "../models/Usuario.js";

export const login = async (req, res) => {
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({ where: { email }, include: { model: Rol, required: false } });

    if (!usuario) {
        return res.status(400).json({ msg: 'Este usuario no existe' });
    }

    if (!usuario.confirmado) {
        return res.status(400).json({ msg: 'Cuenta no confirmada' });
    }

    if (await usuario.comprobarPassword(password)) {
        res.json({
            id: usuario.id,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            email: usuario.email,
            role: usuario.role,
            token: generarJWT(usuario.id)
        })
    } else {
        return res.status(400).json({ msg: 'Password incorrecto' });
    }

}

export const listar = async (req, res) => {
    const usuarios = await Usuario.findAll({
        attributes: {
            exclude: ['rol_id', 'password', 'token', 'confirmado']
        },
        include: {
            model: Rol,
            where: {
                nombre: 'Cliente'
            }
        }
    });
    res.json(usuarios);
}

export const registro = async (req, res) => {
    const { email } = req.body;
    const usuarioEncontrado = await Usuario.findOne({ where: { email } });

    if (usuarioEncontrado) {
        return res.status(400).json({ msg: 'Usuario registrado' });
    }

    const usuario = new Usuario(req.body);
    
    try {
        await usuario.save();
        await enviarEmail(usuario)
        res.json({ msg: 'Te hemos enviado un código a tu e-mail' });
    } catch (error) {
        res.status(400).json({ msg: error });
    }
}

export const confirmar = async (req, res) => {
    const { token } = req.body;
    const usuario = await Usuario.findOne({ where: { token } });

    if (!usuario) {
        res.status(400).json({ msg: 'Token inexistente' });
    }

    usuario.token = null;
    usuario.confirmado = true;

    try {
        await usuario.save();
        res.json({ msg: 'Cuenta confirmada' });
    } catch (error) {
        res.status(400).json({ msg: error });
    }
}

export const perfil = async (req, res) => {
    const { usuario } = req;
    res.json(usuario);
}