import { DataTypes } from "sequelize";
import db from "../config/db.js";

const ProductoVenta = db.define('productos_ventas', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    venta_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: false,
        references: {
            key: 'id',
            model: 'ventas'
        },
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
    },
    producto_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: false,
        references: {
            key: 'id',
            model: 'productos'
        },
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
    },
    precio_unitario: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
});

export default ProductoVenta;