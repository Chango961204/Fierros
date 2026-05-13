import { useEffect, useState } from 'react';
import api from '../api/axios';
import Navbar from '../components/Navbar';
import { ShieldCheck } from 'lucide-react';

export default function Auditoria() {

    const [auditorias, setAuditorias] = useState([]);
    const [loading, setLoading] = useState(true);

    const obtenerAuditorias = async () => {

        try {

            const res = await api.get('/auditoria');
            setAuditorias(res.data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {
        obtenerAuditorias();
    }, []);

    return (
        <div className="min-h-screen bg-slate-100">

            <Navbar />

            <div className="max-w-7xl mx-auto p-6">

                <div className="flex items-center gap-3 mb-8">

                    <div className="bg-indigo-600 text-white p-3 rounded-2xl shadow-lg">
                        <ShieldCheck size={28} />
                    </div>

                    <div>
                        <h1 className="text-3xl font-bold text-slate-800">
                            Auditoría del Sistema
                        </h1>

                        <p className="text-slate-500">
                            Historial de movimientos realizados
                        </p>
                    </div>

                </div>

                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead className="bg-slate-900 text-white">

                                <tr>
                                    <th className="text-left p-4">Usuario</th>
                                    <th className="text-left p-4">Acción</th>
                                    <th className="text-left p-4">Entidad</th>
                                    <th className="text-left p-4">Descripción</th>
                                    <th className="text-left p-4">Fecha</th>
                                </tr>

                            </thead>

                            <tbody>

                                {!loading && auditorias.map((a) => (

                                    <tr
                                        key={a.id}
                                        className="border-b hover:bg-slate-50 transition"
                                    >

                                        <td className="p-4 font-medium">
                                            {a.Usuario || a.usuario || 'Desconocido'}
                                        </td>

                                        <td className="p-4">

                                            <span className={`
                                                px-3 py-1 rounded-full text-sm font-semibold
                                                ${a.accion === 'CREATE' && 'bg-green-100 text-green-700'}
                                                ${a.accion === 'UPDATE' && 'bg-yellow-100 text-yellow-700'}
                                                ${a.accion === 'DELETE' && 'bg-red-100 text-red-700'}
                                            `}>
                                                {a.accion}
                                            </span>

                                        </td>

                                        <td className="p-4">
                                            {a.entidad}
                                        </td>

                                        <td className="p-4">
                                            {a.descripcion}
                                        </td>

                                        <td className="p-4 text-slate-500">
                                            {new Date(a.fecha).toLocaleString()}
                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                    {!loading && auditorias.length === 0 && (
                        <div className="p-10 text-center text-slate-500">
                            No hay registros de auditoría.
                        </div>
                    )}

                </div>

            </div>

        </div>
    );
}