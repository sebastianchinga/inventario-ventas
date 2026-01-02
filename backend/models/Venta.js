import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Venta = db.define('ventas', {
    fecha: {
        type: DataTypes.DATE
    },
    hora: {
        type: DataTypes.DATE
    },
    total: {
        type: DataTypes.DECIMAL
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            key: 'id',
            model: 'usuarios'
        },
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
    }
}, {
    timestamps: false
});

export default Venta;