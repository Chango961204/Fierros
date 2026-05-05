const express = require('express');
const cors = require('cors');
const path = require('path');

const personasRoutes = require('./routes/personas.routes');
const excelRoutes = require('./routes/excel.routes');

const app = express();

// Middlewares globales
app.use(cors({ origin: 'http://localhost:5173' })); // Puerto de Vite
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Exponer la carpeta storage como archivos estáticos
// Así el frontend puede pedir GET /storage/figuras/imagen.jpg y recibirla
app.use('/storage', express.static(path.join(__dirname, '../../storage')));

// Rutas
app.use('/api/personas', personasRoutes);
app.use('/api/excel', excelRoutes);

module.exports = app;