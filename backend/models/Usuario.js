import { DataTypes } from "sequelize";
import bcrypt from 'bcrypt';
import db from "../config/db.js";
import generarToken from "../helpers/generarToken.js";

const Usuario = db.define('usuarios', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: generarToken()
    },
    confirmado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    rol_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            key: 'id',
            model: 'roles'
        },
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
    }

}, {
    timestamps: false
})

Usuario.beforeSave(async (user, options) => {
    if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    }
})

Usuario.prototype.comprobarPassword = async function (passForm) {
    return bcrypt.compare(passForm, this.password);
}

export default Usuario