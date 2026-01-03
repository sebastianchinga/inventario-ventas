import ProductoVenta from "../models/ProductoVenta.js";
import Venta from "../models/Venta.js"

export const listar = async (req, res) => {
    const ventas = await Venta.findAll();
    res.json(ventas);
}

export const crear = async (req, res) => {
    const { cliente, fecha, hora, total, carrito } = req.body;
    const { productos } = req.body;
    const {usuario} = req;    

    const nuevaVenta = new Venta({ cliente, fecha, hora, total, usuario_id: usuario.id });
    try {
        const idVenta = await nuevaVenta.save();
        for (let index = 0; index < carrito.length; index++) {
            const element = carrito[index];
            const detalleVenta = new ProductoVenta({
                venta_id: idVenta.id,
                producto_id: element.id,
                precio_unitario: element.precio,
                cantidad: element.cantidad
            });
            await detalleVenta.save();
        }
        res.json({msg: 'Venta realizada'})

    } catch (error) {

    }
}