import express from 'express';
import multer from 'multer';
import { exportarExcel, importarExcel } from '../controllers/excel.controller.js';
import { verificarToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

const uploadMemoria = multer({ storage: multer.memoryStorage() });

router.get('/exportar', verificarToken, exportarExcel);
router.post('/importar', verificarToken, uploadMemoria.single('archivo'), importarExcel);

export default router;