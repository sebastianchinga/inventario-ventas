import Venta from "../models/Venta.js"

export const listar = async (req, res) => {
    const ventas = await Venta.findAll();
    res.json(ventas);
}

export const crear = async (req, res) => {
    const { fecha, hora, total, usuario_id } = req.body;
    const {productos} = req.body;
    
    const nuevaVenta = new Venta({fecha, hora, total, usuario_id});
    // console.log(nuevaVenta.toJSON());
    console.log(productos);
    try {
        // const resultado = 
    } catch (error) {
        
    }
}