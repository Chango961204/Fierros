import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const obtenerAuditorias = async (req, res) => {

    try {

        const auditorias = await prisma.auditoria.findMany({
            orderBy: {
                fecha: 'desc'
            }
        });

        res.json(auditorias);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }
};