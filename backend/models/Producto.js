import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Producto = db.define('productos', {
    nombre: {
        type: DataTypes.STRING
    },
    precio: {
        type: DataTypes.DECIMAL
    },
    stock: {
        type: DataTypes.INTEGER
    },
    categoria_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            key: 'id',
            model: 'categorias'
        },
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
    }
}, {
    timestamps: false
});

export default Producto;