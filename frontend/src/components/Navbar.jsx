import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, UserRoundPlus } from 'lucide-react';

export default function Navbar() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const cerrarSesion = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="glass-panel sticky top-4 z-40 mx-4 flex flex-wrap justify-between items-center gap-4 px-6 py-4">
            <div className="flex items-center gap-3">
                <div className="bg-white/20 text-slate-900 w-12 h-12 rounded-3xl flex items-center justify-center font-semibold shadow-lg backdrop-blur-lg">
                    PMZ
                </div>
                <div>
                    <p className="text-slate-900/70 text-xs uppercase tracking-[0.3em]">PMZ</p>
                    <h1 className="text-slate-950 font-bold text-xl">Fierros</h1>
                </div>
            </div>

            <div className="flex flex-wrap gap-3 items-center">
                <button
                    onClick={() => navigate('/personas')}
                    className="btn-secondary"
                >
                    <User size={18} />
                    Personas
                </button>
                <button
                    onClick={() => navigate('/personas/nueva')}
                    className="btn-primary"
                >
                    <UserRoundPlus size={18} />
                    Nueva persona
                </button>
                <button
                    onClick={cerrarSesion}
                    className="btn-danger"
                >
                    Cerrar sesión
                </button>
            </div>
        </nav>
    );
}