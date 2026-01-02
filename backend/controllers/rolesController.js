import Rol from "../models/Rol.js";

export const listar = async (req, res) => {
    const roles = await Rol.findAll();
    res.json(roles);
}

export const crear = async (req, res) => {
    const rol = new Rol(req.body);
    try {
        const resultado = await rol.save();
        res.json(resultado);
    } catch (error) {
        res.status(400).json({ msg: error });
    }
}

export const actualizar = async (req, res) => {
    const { id } = req.params;
    const rol = await Rol.findByPk(id);

    if (!rol) {
        return res.status(400).json({ msg: 'No existe un rol' });
    }

    rol.nombre = req.body.nombre || rol.nombre;

    try {
        const resultado = await rol.save();
        res.json(resultado);
    } catch (error) {
        res.status(400).json({ msg: error });
    }
}

export const eliminar = async (req, res) => {
    const { id } = req.params;
    const rol = await Rol.findByPk(id);

    if (!rol) {
        return res.status(400).json({ msg: 'No existe un rol' });
    }

    try {
        await rol.destroy();
        res.json({msg: 'Rol eliminado'});
    } catch (error) {
        res.status(400).json({ msg: error });
    }
}