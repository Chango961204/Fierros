import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(email, password);
      navigate('/personas');
    } catch {
      alert('Credenciales incorrectas');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-80"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Iniciar Sesión
        </h2>

        <input
          type="email"
          placeholder="Correo"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 mb-4 rounded"
        />

        <input
          type="password"
          placeholder="Contraseña"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 mb-4 rounded"
        />

        <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Entrar
        </button>

      </form>
    </div>
  );
}