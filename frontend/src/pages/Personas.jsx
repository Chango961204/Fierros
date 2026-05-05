import { useEffect, useState } from 'react';
import api from '../api/axios';
import Navbar from '../components/Navbar';
import PersonaForm from '../components/PersonaForm';
import PersonaCard from '../components/PersonaCard';
import ExcelActions from '../components/ExcelActions';

export default function Personas() {

    const [personas, setPersonas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');

    const obtenerPersonas = async () => {
        const res = await api.get('/personas');
        setPersonas(res.data);
    };

    useEffect(() => {
        obtenerPersonas();
    }, []);

    // 🔥 CREATE / UPDATE
    const guardarPersona = async (id, formData) => {
        setLoading(true);

        try {
            if (id) {
                await api.put(`/personas/${id}`, formData);
            } else {
                await api.post('/personas', formData);
            }

            obtenerPersonas();

        } catch (error) {
            console.error(error);
        }

        setLoading(false);
    };

    // 🔥 DELETE
    const eliminar = async (id) => {
        if (!confirm('¿Eliminar persona?')) return;

        await api.delete(`/personas/${id}`);
        obtenerPersonas();
    };

    const filtered = personas.filter(p =>
        p.nombre.toLowerCase().includes(search.toLowerCase()) ||
        p.comunidad.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="page-shell">
            <Navbar />

            <div className="page-wrapper max-w-7xl mx-auto">
                <header className="mb-10 text-center">
                    <p className="text-cyan-600 uppercase tracking-[0.3em] font-semibold mb-3">Administración pública</p>
                    <h1 className="text-5xl md:text-6xl font-bold text-slate-950">Gestión de Personas</h1>
                    <p className="mt-4 text-slate-600 max-w-2xl mx-auto">Interfaz limpia y moderna para el registro y la administración transparente de datos comunitarios.</p>
                </header>

                <div className="grid gap-6 lg:grid-cols-[1fr_320px] items-start">
                    <div className="glass-panel p-6">
                        <div className="flex flex-col gap-6 mb-6">
                            <ExcelActions onSuccess={obtenerPersonas} />
                        </div>

                        <div className="glass-panel p-6">
                            <PersonaForm
                                onSubmit={(formData) => guardarPersona(null, formData)}
                                loading={loading}
                            />
                        </div>
                    </div>

                    <div className="glass-panel p-6">
                        <label className="block text-sm font-medium text-slate-700 mb-3">Buscar personas</label>
                        <input
                            type="text"
                            placeholder="Buscar por nombre o comunidad"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="glass-input"
                        />
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mt-8">
                    {filtered.map(p => (
                        <PersonaCard
                            key={p.id}
                            persona={p}
                            onDelete={eliminar}
                            onUpdate={guardarPersona}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}