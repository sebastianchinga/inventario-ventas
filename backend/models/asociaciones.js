import Rol from "./Rol.js";
import Categoria from "./Categoria.js";
import Usuario from "./Usuario.js";
import Producto from "./Producto.js";
import Venta from "./Venta.js";
import ProductoVenta from "./ProductoVenta.js";

// Categoria - Producto
Categoria.hasMany(Producto, {foreignKey: 'categoria_id'});
Producto.belongsTo(Categoria, {foreignKey: 'categoria_id'});

// Roles - Usuarios
Rol.hasMany(Usuario, {foreignKey: 'rol_id'});
Usuario.belongsTo(Rol, {foreignKey: 'rol_id'});

// Usuarios - Ventas
Usuario.hasMany(Venta, {foreignKey: 'usuario_id'});
Venta.belongsTo(Usuario, {foreignKey: 'usuario_id'});

// Ventas - Productos
Producto.belongsToMany(Venta, {through: ProductoVenta, foreignKey: 'producto_id', otherKey: 'venta_id', onDelete: 'SET NULL', onUpdate: 'SET NULL'});
Venta.belongsToMany(Producto, {through: ProductoVenta, foreignKey: 'venta_id', otherKey: 'producto_id', onDelete: 'SET NULL', onUpdate: 'SET NULL'});