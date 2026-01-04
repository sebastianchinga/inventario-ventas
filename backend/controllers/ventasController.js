import Producto from "../models/Producto.js";
import ProductoVenta from "../models/ProductoVenta.js";
import Usuario from "../models/Usuario.js";
import Venta from "../models/Venta.js"

export const listar = async (req, res) => {
    const { usuario } = req
    const ventas = await Venta.findAll({ where: { usuario_id: usuario.id } });
    res.json(ventas);
}

export const crear = async (req, res) => {
    const { cliente, fecha, hora, total, carrito } = req.body;
    const { usuario } = req;

    try {
        const nuevaVenta = new Venta({ cliente, fecha, hora, total, usuario_id: usuario.id });
        const idVenta = await nuevaVenta.save();
        for (const producto of carrito) {
            // Creando detalle de venta por cada producto del carrito
            const detalleVenta = new ProductoVenta({
                venta_id: idVenta.id,
                producto_id: producto.id,
                precio_unitario: producto.precio,
                cantidad: producto.cantidad
            });
            // Guardo un detalle por cada producto
            const resultado = await detalleVenta.save();
            // Actualizo el stock por cada producto
            const product = await Producto.findOne({ where: { id: producto.id } });
            product.stock = product.stock - resultado.cantidad;
            await product.save()


        }
        res.json({ msg: 'Venta realizada' })

    } catch (error) {
        res.status(400).json({ msg: error })
    }
}

export const detalles = async (req, res) => {
    const { id } = req.params;
    
    const venta = await Venta.findByPk(id, {
        attributes: {
            exclude: ['usuario_id']
        },
        include: [
            { 
                model: Producto, 
                attributes: ['id', 'nombre'],
                through: {
                    attributes: ['precio_unitario', 'cantidad']
                } 
            },
            {model: Usuario}
        ]
    });

    if (!venta) {
        return res.status(400).json({ msg: 'Esta venta no existe' })
    }

    res.json(venta)
}