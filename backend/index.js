import express from 'express';
import cors from 'cors';
import usuariosRoute from './routes/usuariosRoute.js';
import categoriasRoute from './routes/categoriasRoute.js';
import rolesRoute from './routes/rolesRoute.js';
import db from './config/db.js';
import sincronizar from './models/sincronizacion.js';
import './models/asociaciones.js';
import productosRoute from './routes/productosRoute.js';
import ventasRoute from './routes/ventasRoute.js';

const app = express();

db.authenticate().then(() => console.log('Base de datos conectada')).catch(e => console.log(e))
sincronizar()

const PORT = process.env.PORT || 4000;

const urlPermitidos = [process.env.URL_FRONTEND];
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || urlPermitidos.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    }
};

app.use(express.json());

app.use(cors(corsOptions));

app.use('/api/usuarios', usuariosRoute);
app.use('/api/categorias', categoriasRoute);
app.use('/api/roles', rolesRoute);
app.use('/api/productos', productosRoute);
app.use('/api/ventas', ventasRoute);

app.listen(PORT, () => { 
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})