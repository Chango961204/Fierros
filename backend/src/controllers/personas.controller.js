import { PrismaClient } from '@prisma/client';
import path from 'path';
import fs from 'fs';

const prisma = new PrismaClient();

export const obtenerPersonas = async (req, res) => {
    try {
        const personas = await prisma.persona.findMany({
            orderBy: { nombre: 'asc' }
        });
        res.json(personas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const obtenerPersonaPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const persona = await prisma.persona.findUnique({
            where: { id: parseInt(id) }
        });

        if (!persona) {
            return res.status(404).json({ error: 'Persona no encontrada' });
        }

        res.json(persona);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const crearPersona = async (req, res) => {
    try {
        const { nombre, comunidad, anioRegistro, ultimoAnioRefrendado, libro, hoja, observacion } = req.body;

        let rutaFigura = null;
        if (req.file) {
            rutaFigura = `storage/figuras/${req.file.filename}`;
        }

        const nuevaPersona = await prisma.persona.create({
            data: {
                nombre,
                comunidad,
                anioRegistro: parseInt(anioRegistro),
                ultimoAnioRefrendado: ultimoAnioRefrendado ? parseInt(ultimoAnioRefrendado) : null,
                figura: rutaFigura,
                libro: libro || null,
                hoja: hoja || null,
                observacion: observacion || null,
            }
        });

        res.status(201).json(nuevaPersona);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const actualizarPersona = async (req, res) => {
    try {
        console.log('BODY:', req.body);
        console.log('FILE:', req.file);
        const { id } = req.params;
        const personaExistente = await prisma.persona.findUnique({
            where: { id: parseInt(id) }
        });

        if (!personaExistente) {
            return res.status(404).json({ error: 'Persona no encontrada' });
        }

        let rutaFigura = personaExistente.figura;

        if (req.file) {
            if (personaExistente.figura) {
                const rutaAnterior = path.join(process.cwd(), personaExistente.figura);
                if (fs.existsSync(rutaAnterior)) {
                    fs.unlinkSync(rutaAnterior);
                }
            }
            rutaFigura = `storage/figuras/${req.file.filename}`;
        }

        const personaActualizada = await prisma.persona.update({
    where: { id: parseInt(id) },
    data: {
        nombre: req.body.nombre,
        comunidad: req.body.comunidad,
        anioRegistro: req.body.anioRegistro
            ? parseInt(req.body.anioRegistro)
            : undefined,
        ultimoAnioRefrendado: req.body.ultimoAnioRefrendado
            ? parseInt(req.body.ultimoAnioRefrendado)
            : null,
        libro: req.body.libro || null,
        hoja: req.body.hoja || null,
        observacion: req.body.observacion || null,
        figura: rutaFigura
    }
});

        res.json(personaActualizada);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const eliminarPersona = async (req, res) => {
    try {
        const { id } = req.params;

        const persona = await prisma.persona.findUnique({
            where: { id: parseInt(id) }
        });

        if (!persona) {
            return res.status(404).json({ error: 'Persona no encontrada' });
        }

        if (persona.figura) {
            const ruta = path.join(process.cwd(), persona.figura);
            if (fs.existsSync(ruta)) {
                fs.unlinkSync(ruta);
            }
        }

        await prisma.persona.delete({
            where: { id: parseInt(id) }
        });

        res.json({ mensaje: 'Eliminado correctamente' });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};