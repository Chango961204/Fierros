import express from 'express';
import upload from '../middlewares/upload.middleware.js';
import { obtenerPersonas, obtenerPersonaPorId, crearPersona, actualizarPersona, eliminarPersona } from '../controllers/personas.controller.js';
import { verificarToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', verificarToken, obtenerPersonas);
router.get('/:id', verificarToken, obtenerPersonaPorId);
router.post('/', verificarToken, upload.single('figura'), crearPersona);
router.put('/:id', verificarToken, upload.single('figura'), actualizarPersona);
router.delete('/:id', verificarToken, eliminarPersona);

export default router;