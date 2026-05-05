import { useState, useEffect } from 'react';

export default function PersonaForm({ onSubmit, personaEditando, loading }) {

    const [form, setForm] = useState({
        nombre: '',
        comunidad: '',
        anioRegistro: '',
        ultimoAnioRefrendado: '',
        libro: '',
        hoja: '',
        observacion: ''
    });

    const [file, setFile] = useState(null);

    useEffect(() => {
        if (personaEditando) {
            setForm({
                nombre: personaEditando.nombre || '',
                comunidad: personaEditando.comunidad || '',
                anioRegistro: personaEditando.anioRegistro || '',
                ultimoAnioRefrendado: personaEditando.ultimoAnioRefrendado || '',
                libro: personaEditando.libro || '',
                hoja: personaEditando.hoja || '',
                observacion: personaEditando.observacion || ''
            });
        }
    }, [personaEditando]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();

        Object.keys(form).forEach(key => {
            if (form[key] !== '') {
                formData.append(key, form[key]);
            }
        });

        if (file) {
            formData.append('figura', file);
        }

        onSubmit(formData);

        if (!personaEditando) {
            setForm({
                nombre: '',
                comunidad: '',
                anioRegistro: '',
                ultimoAnioRefrendado: '',
                libro: '',
                hoja: '',
                observacion: ''
            });
            setFile(null);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

            <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
                <input id="nombre" name="nombre" value={form.nombre} onChange={handleChange} placeholder="Ingrese el nombre" className="glass-input" />
            </div>

            <div>
                <label htmlFor="comunidad" className='block text-sm font-medium text-gray-700'>Comunidad</label>
                <input name="comunidad" value={form.comunidad} onChange={handleChange} placeholder="Ingrese la comunidad" className="glass-input" />
            </div>

            <div>
                <label htmlFor="anioRegistro" className='block text-sm font-medium text-gray-700'>Año de Registro</label>
                <input name="anioRegistro" type="number" value={form.anioRegistro} onChange={handleChange} placeholder="Ingrese el año de registro" className="glass-input" />
            </div>

            <div>
                <label htmlFor="ultimoAnioRefrendado" className='block text-sm font-medium text-gray-700'>Último Año Refrendado</label>
                <input name="ultimoAnioRefrendado" type="number" value={form.ultimoAnioRefrendado} onChange={handleChange} placeholder="Ingrese el último año refrendado" className="glass-input" />
            </div>

            <div>
                <label htmlFor="libro" className='block text-sm font-medium text-gray-700'>Libro</label>
                <input name="libro" value={form.libro} onChange={handleChange} placeholder="Ingrese el libro" className="glass-input" />
            </div>

            <div>
                <label htmlFor="hoja" className='block text-sm font-medium text-gray-700'>Hoja</label>
                <input name="hoja" value={form.hoja} onChange={handleChange} placeholder="Ingrese la hoja" className="glass-input" />
            </div>

            <div>
                <label htmlFor="observacion" className='block text-sm font-medium text-gray-700'>Observación</label>
                <textarea name="observacion" value={form.observacion} onChange={handleChange} placeholder="Ingrese alguna observación" className="glass-input col-span-2 min-h-[120px]" />
            </div>

            <input type="file" onChange={(e) => setFile(e.target.files[0])} className="glass-input col-span-2" />

            <button className="col-span-2 btn-primary">
                {loading ? 'Guardando...' : personaEditando ? 'Actualizar' : 'Crear'}
            </button>

        </form>
    );
}