import Categoria from "../models/Categoria.js";
import Producto from "../models/Producto.js"

export const listar = async (req, res) => {
    const productos = await Producto.findAll();
    res.json(productos);
}

export const crear = async (req, res) => {
    const { categoria_id } = req.body;
    const producto = new Producto(req.body);
    if (categoria_id) {
        const categoria = await Categoria.findOne({ where: { id: categoria_id } });

        if (!categoria) {
            return res.status(400).json({ msg: 'Esta categoría no existe' })
        }
    }

    try {
        const resultado = await producto.save();
        res.json({ msg: 'Producto guardado', resultado });
    } catch (error) {
        res.status(400).json({ msg: error })
    }
}

export const actualizar = async (req, res) => {
    const { id } = req.params;
    const { nombre, precio, stock, categoria_id } = req.body;
    const producto = await Producto.findByPk(id);
    const categoria = await Categoria.findOne({ where: { id: categoria_id } });

    if (!producto) {
        return res.status(400).json({ msg: 'Este producto no existe' })
    }

    if (!categoria) {
        return res.status(400).json({ msg: 'Esta categoría no existe' })
    }

    producto.nombre = nombre || producto.nombre;
    producto.precio = precio || producto.precio;
    producto.stock = stock || producto.stock;
    producto.categoria_id = categoria_id || producto.categoria_id;

    try {
        const resultado = await producto.save();
        res.json({ msg: 'Producto actualizado', resultado })
    } catch (error) {
        res.status(400).json({ msg: error })
    }
}

export const eliminar = async (req, res) => {
    const { id } = req.params;
    const producto = await Producto.findByPk(id);

    if (!producto) {
        return res.status(400).json({ msg: 'Este producto no existe' })
    }

    try {
        await producto.destroy();
        res.json({ msg: 'Producto eliminado' })
    } catch (error) {
        res.status(400).json({ msg: error })
    }
}

export const detalles = async (req, res) => {
    const { id } = req.params;
    const producto = await Producto.findOne({
        where: { id }, 
        attributes: {
            exclude: ['categoria_id']
        },
        include: { 
            model: Categoria, required: false 
        }
    });

    if (!producto) {
        return res.status(400).json({ msg: 'Este producto no existe' })
    }

    res.json(producto);
}