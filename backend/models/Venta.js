import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Venta = db.define('ventas', {
    cliente: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATE,
        defaultValue: Date.now()
    },
    hora: {
        type: DataTypes.DATE,
        defaultValue: Date.now()
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