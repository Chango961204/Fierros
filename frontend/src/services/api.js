import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

// Personas
export const getPersonas = () => api.get('/personas');
export const getPersona = (id) => api.get(`/personas/${id}`);

export const crearPersona = (formData) =>
    api.post('/personas', formData, {
        headers: { 'Content-Type': 'multipart/form-data' } // necesario para enviar imagen
    });

export const actualizarPersona = (id, formData) =>
    api.put(`/personas/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });

export const eliminarPersona = (id) => api.delete(`/personas/${id}`);

// Excel
export const exportarExcel = () =>
    api.get('/excel/exportar', { responseType: 'blob' }); // blob para descargar archivo

export const importarExcel = (archivo) => {
    const formData = new FormData();
    formData.append('archivo', archivo);
    return api.post('/excel/importar', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
};