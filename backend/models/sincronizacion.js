import Rol from "./Rol.js";
import Categoria from "./Categoria.js";
import Producto from "./Producto.js";
import Usuario from "./Usuario.js";
import Venta from "./Venta.js";
import ProductoVenta from "./ProductoVenta.js";
import db from "../config/db.js";

export default function sincronizar() {
    db.sync().then(() => console.log('Tablas creadas')).catch(e => console.log(e))
}