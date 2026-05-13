import express from 'express';
import { obtenerAuditorias } from '../controllers/auditoria.controller.js';
import { verificarToken } from '../middlewares/auth.middleware.js';
import { soloAdmin } from '../middlewares/admin.middleware.js';

const router = express.Router();

router.get('/', verificarToken, soloAdmin, obtenerAuditorias);

export default router;