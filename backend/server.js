import express from 'express';
import cors from 'cors';

import personasRoutes from './src/routes/personas.routes.js';
import excelRoutes from './src/routes/excel.routes.js';
import authRoutes from './src/routes/auth.routes.js';

const app = express(); 

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/personas', personasRoutes);
app.use('/api/excel', excelRoutes);
app.use('/api/auth', authRoutes);

app.use('/storage', express.static('storage'));

const PORT = 4000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});