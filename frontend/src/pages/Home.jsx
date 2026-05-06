import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, UserRoundPlus, FileDown, FileUp } from 'lucide-react';
import api from '../api/axios';
import Navbar from '../components/Navbar';

function Home() {
    const navigate = useNavigate();

    const exportarExcel = async () => {
        try {
            const res = await api.get('/excel/exportar', {
                responseType: 'blob'
            });

            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.download = 'personas.xlsx';
            link.click();
        } catch (error) {
            console.error('Error al exportar:', error);
            alert('Error al exportar Excel');
        }
    };

    const importarExcel = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            await api.post('/excel/importar', formData);
            alert('Excel importado correctamente');
            // Opcional: recargar la página o navegar a personas
            navigate('/personas');
        } catch (error) {
            console.error('Error al importar:', error);
            alert('Error al importar Excel');
        }
    };

    return (
        <div className="page-shell">
            <Navbar />
            <div className="page-wrapper">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-slate-950 mb-4">
                            Gestión de Personas
                        </h1>
                        <p className="text-slate-600 text-lg">
                            Administra y organiza la información de tus contactos de manera eficiente
                        </p>
                    </div>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Ver Personas */}
                        <div className="glass-card p-6 text-center hover:scale-105 transition-transform duration-300 cursor-pointer"
                            onClick={() => navigate('/personas')}>
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <User size={32} className="text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-950 mb-2">Ver Personas</h3>
                            <p className="text-slate-600 text-sm mb-4">
                                Consulta y administra la lista completa de personas registradas
                            </p>
                            <button className="btn-secondary w-full">
                                Ir a Personas
                            </button>
                        </div>

                        {/* Nueva Persona */}
                        <div className="glass-card p-6 text-center hover:scale-105 transition-transform duration-300 cursor-pointer"
                            onClick={() => navigate('/personas/nueva')}>
                            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <UserRoundPlus size={32} className="text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-950 mb-2">Nueva Persona</h3>
                            <p className="text-slate-600 text-sm mb-4">
                                Registra una nueva persona en el sistema
                            </p>
                            <button className="btn-primary w-full">
                                Crear Persona
                            </button>
                        </div>

                        {/* Importar Excel */}
                        <div className="glass-card p-6 text-center hover:scale-105 transition-transform duration-300">
                            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FileUp size={32} className="text-purple-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-950 mb-2">Importar Excel</h3>
                            <p className="text-slate-600 text-sm mb-4">
                                Carga múltiples personas desde un archivo Excel
                            </p>
                            <label className="btn-primary w-full cursor-pointer block text-center">
                                Seleccionar Archivo
                                <input
                                    type="file"
                                    accept=".xlsx"
                                    hidden
                                    onChange={importarExcel}
                                />
                            </label>
                        </div>

                        {/* Exportar Excel */}
                        <div className="glass-card p-6 text-center hover:scale-105 transition-transform duration-300 cursor-pointer"
                            onClick={exportarExcel}>
                            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FileDown size={32} className="text-orange-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-950 mb-2">Exportar Excel</h3>
                            <p className="text-slate-600 text-sm mb-4">
                                Descarga toda la información en formato Excel
                            </p>
                            <button className="btn-success w-full">
                                Exportar Datos
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;