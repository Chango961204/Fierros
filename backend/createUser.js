import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    const hash = await bcrypt.hash('Battery..1', 10);

    const user = await prisma.usuario.create({
        data: {
            nombre: 'Luis',
            email: 'luis@admin.com',
            password: hash,
            activo: true
        }
    });

    console.log('Usuario creado:', user);
}

main()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect());