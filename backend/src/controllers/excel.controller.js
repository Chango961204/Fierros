import ExcelJS from 'exceljs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Exportar a Excel
export const exportarExcel = async (req, res) => {
    try {
        const personas = await prisma.persona.findMany({
            orderBy: { nombre: 'asc' }
        });

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Personas');

        worksheet.columns = [
            { header: 'ID', key: 'id', width: 10 },
            { header: 'Nombre', key: 'nombre', width: 30 },
            { header: 'Comunidad', key: 'comunidad', width: 25 },
            { header: 'Año de Registro', key: 'anioRegistro', width: 20 },
            { header: 'Último Año Refrendado', key: 'ultimoAnioRefrendado', width: 25 },
            { header: 'Figura', key: 'figura', width: 20 },
            { header: 'Libro', key: 'libro', width: 15 },
            { header: 'Hoja', key: 'hoja', width: 10 },
            { header: 'Observación', key: 'observacion', width: 30 },
        ];

        personas.forEach(p => {
            worksheet.addRow({
                id: p.id,
                nombre: p.nombre,
                comunidad: p.comunidad,
                anioRegistro: p.anioRegistro,
                ultimoAnioRefrendado: p.ultimoAnioRefrendado || '',
                figura: p.figura || '',
                libro: p.libro || '',
                hoja: p.hoja || '',
                observacion: p.observacion || ''
            });
        });

        res.setHeader('Content-Disposition', 'attachment; filename=personas.xlsx');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

        await workbook.xlsx.write(res);
        res.end();

    } catch (error) {
        res.status(500).json({
            error: 'Error al exportar Excel',
            detalle: error.message
        });
    }
};

// ⚠️ AQUÍ hay un bug que te corrijo también 👇
export const importarExcel = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                error: 'No se recibió ningún archivo Excel'
            });
        }

        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(req.file.buffer);

        const worksheet = workbook.getWorksheet(1);

        const resultados = { insertados: 0, errores: [] };

        for (let i = 2; i <= worksheet.rowCount; i++) {
            const row = worksheet.getRow(i);

            try {
                await prisma.persona.create({
                    data: {
                        nombre: String(row.getCell(2).value || '').trim(),
                        comunidad: String(row.getCell(3).value || '').trim(),
                        anioRegistro: parseInt(row.getCell(4).value) || new Date().getFullYear(),
                        ultimoAnioRefrendado: row.getCell(5).value
                            ? parseInt(row.getCell(5).value)
                            : null,
                        figura: row.getCell(6).value ? String(row.getCell(6).value).trim() : null,
                        libro: row.getCell(7).value ? String(row.getCell(7).value).trim() : null,
                        hoja: row.getCell(8).value ? String(row.getCell(8).value).trim() : null,
                        observacion: row.getCell(9).value
                            ? String(row.getCell(9).value).trim()
                            : null,
                    }
                });

                resultados.insertados++;
            } catch (err) {
                resultados.errores.push({
                    fila: i,
                    error: err.message
                });
            }
        }

        res.json(resultados);

    } catch (error) {
        res.status(500).json({
            error: 'Error al importar Excel',
            detalle: error.message
        });
    }
};