import multer from 'multer';
import fs from 'fs';
import path from 'path';

const storagePath = path.join(process.cwd(), 'storage/figuras');

// Crear carpeta si no existe
if (!fs.existsSync(storagePath)) {
    fs.mkdirSync(storagePath, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, storagePath);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const nombre = `persona_${Date.now()}${ext}`;
        cb(null, nombre);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Solo imágenes'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // máximo 5MB por imagen
});

export default upload;