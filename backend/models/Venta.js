import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Venta = db.define('ventas', {
    cliente: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW
    },
    hora: {
        type: DataTypes.TIME,
        defaultValue: DataTypes.NOW
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