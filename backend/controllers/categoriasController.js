import Categoria from "../models/Categoria.js"
import Producto from "../models/Producto.js";

export const listar = async (req, res) => {
    const categorias = await Categoria.findAll();
    res.json(categorias);
}

export const crear = async (req, res) => {
    const categoria = new Categoria(req.body);

    try {
        const resultado = await categoria.save();
        res.json(resultado);
    } catch (error) {
        res.status(400).json({ msg: error })
    }
}

export const encontrar = async (req, res) => {
    const { id } = req.params;
    try {
        const categoria = await Categoria.findOne({
            where: {id},
            include: {
                model: Producto
            }
        });
        if (!categoria) {
            const error = new Error('Categoría no encontrada');
            return res.status(400).json({ msg: error.message })
        }
        res.json(categoria);
    } catch (error) {
        res.status(400).json({ msg: error })
    }
}

export const actualizar = async (req, res) => {
    const { id } = req.params;
    try {
        const categoria = await Categoria.findByPk(id);
        if (!categoria) {
            const error = new Error('Categoría no encontrada');
            return res.status(400).json({ msg: error.message })
        }
        categoria.nombre = req.body.nombre || categoria.nombre;
        const resultado = await categoria.save();
        res.json(resultado);
    } catch (error) {
        res.status(400).json({ msg: error })
    }
}

export const eliminar = async (req, res) => {
    const { id } = req.params;
    try {
        const categoria = await Categoria.findByPk(id);
        if (!categoria) {
            const error = new Error('Categoría no encontrada');
            return res.status(400).json({ msg: error.message })
        }
        await categoria.destroy();
        res.json({msg: 'Categoría eliminada'});
    } catch (error) {
        res.status(400).json({ msg: error });
    }
}