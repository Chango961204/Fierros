import { useEffect, useState } from 'react';
import api from '../api/axios';
import Navbar from '../components/Navbar';
import PersonaCard from '../components/PersonaCard';
import ExcelActions from '../components/ExcelActions';

export default function PersonasLista() {

    const [personas, setPersonas] = useState([]);

    const obtenerPersonas = async () => {
        const res = await api.get('/personas');
        setPersonas(res.data);
    };

    useEffect(() => {
        obtenerPersonas();
    }, []);

    const actualizarPersona = async (id, formData) => {
        try {
            await api.put(`/personas/${id}`, formData);
            obtenerPersonas();
        } catch (error) {
            console.error(error);
        }
    };
    const eliminar = async (id) => {
        await api.delete(`/personas/${id}`);
        obtenerPersonas();
    };

    return (
        <div>
            <Navbar />

            <div className="p-6">
                <ExcelActions onSuccess={obtenerPersonas} />

                <div className="grid md:grid-cols-3 gap-6 mt-6">
                    <h1 className="text-3xl font-bold col-span-full">Registros</h1>
                    {personas.map(p => (
                        <PersonaCard
                            key={p.id}
                            persona={p}
                            onDelete={eliminar}
                            onUpdate={actualizarPersona}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}