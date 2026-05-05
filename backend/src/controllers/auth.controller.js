import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.usuario.findUnique({
            where: { email }
        });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        if (!user.activo) {
            return res.status(403).json({ message: 'Usuario desactivado' });
        }

        const valid = await bcrypt.compare(password, user.password);

        if (!valid) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({
            token,
            user: {
                id: user.id,
                nombre: user.nombre,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};