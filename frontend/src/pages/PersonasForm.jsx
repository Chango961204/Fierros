import Navbar from '../components/Navbar';
import PersonaForm from '../components/PersonaForm';
import api from '../api/axios';

export default function PersonasForm() {

    const guardarPersona = async (formData) => {
        await api.post('/personas', formData);
        alert('Persona creada');
    };

    return (
        <div>
            <Navbar />

            <div className="p-6 max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Nuevo Registro</h1>

                <PersonaForm onSubmit={guardarPersona} />
            </div>
        </div>
    );
}