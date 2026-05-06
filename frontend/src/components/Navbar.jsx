import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { User, UserRoundPlus, Home } from 'lucide-react';
import logo from '../assets/Logo.webp';

export default function Navbar() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const cerrarSesion = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="glass-panel sticky top-4 z-40 mx-4 flex flex-wrap justify-between items-center gap-4 px-6 py-4">
            <Link to="/home" className="flex items-center gap-2 group">
                <img
                    src={logo}
                    alt="Fierros"
                    className="h-20 hover:scale-110 w-auto object-contain"
                    style={{ filter: "brightness(0) saturate(100%)", opacity: 0.96 }}
                />
            </Link>

            <div className="flex flex-wrap gap-3 items-center">

                <button
                    onClick={() => navigate('/home')}
                    className="btn-third flex items-center gap-2 hover:scale-105 "
                >
                    <Home size={18} />
                    Inicio
                </button>

                <button
                    onClick={() => navigate('/personas')}
                    className="btn-secondary flex items-center gap-2 hover:scale-105"
                >
                    <User size={18} />
                    Personas
                </button>

                <button
                    onClick={() => navigate('/personas/nueva')}
                    className="btn-primary flex items-center gap-2 hover:scale-105"
                >
                    <UserRoundPlus size={18} />
                    Nueva persona
                </button>

                <button
                    onClick={cerrarSesion}
                    className="btn-danger flex items-center gap-2 hover:scale-105"
                >
                    Cerrar sesión
                </button>

            </div>
        </nav>
    );
}