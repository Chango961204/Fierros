import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const registrarAuditoria = async ({
    usuario,
    accion,
    entidad,
    descripcion
}) => {

    try {

        await prisma.auditoria.create({
            data: {
                Usuario: usuario,
                accion,
                entidad,
                descripcion
            }
        });

    } catch (error) {
        console.error('Error auditoría:', error);
    }
};
