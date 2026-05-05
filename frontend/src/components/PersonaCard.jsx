import { useState } from 'react';
import PersonaForm from './PersonaForm';
import { UserX, UserRoundPen } from 'lucide-react';

export default function PersonaCard({ persona, onDelete, onUpdate }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmit = async (formData) => {
        await onUpdate(persona.id, formData);
        setIsModalOpen(false);
    };


    return (
        <>
            <div className="glass-card p-6">
                {persona.figura && (
                    <img
                        src={`http://localhost:4000/${persona.figura}`}
                        className="w-24 h-24 rounded-full mx-auto border border-white/50 shadow-xl"
                    />
                )}

                <h3 className="mt-5 text-center text-2xl font-semibold text-slate-950">{persona.nombre}</h3>
                <p className="text-center text-slate-600 mt-1">{persona.comunidad}</p>

                <div className="grid gap-3 mt-6">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="btn-warning w-full"
                    >
                        <UserRoundPen size={16} />
                        Editar
                    </button>
                    <button
                        onClick={() => onDelete(persona.id)}
                        className="btn-danger w-full"
                    >
                        <UserX size={16} />
                        Eliminar
                    </button>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
                    <div className="glass-panel p-6 max-w-md w-full">
                        <h2 className="text-2xl font-bold text-slate-950 mb-4">Editar Persona</h2>
                        <PersonaForm
                            onSubmit={handleSubmit}
                            personaEditando={persona}
                        />
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="mt-4 btn-secondary w-full"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}