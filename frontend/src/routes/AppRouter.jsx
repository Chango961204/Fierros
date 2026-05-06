import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import PersonasLista from '../pages/PersonasLista';
import PersonasForm from '../pages/PersonasForm';
import Home from '../pages/Home';
import PrivateRoute from '../components/PrivateRoute';

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />

                <Route path="/home" element={
                    <PrivateRoute>
                        <Home />
                    </PrivateRoute>
                } />

                <Route path="/personas" element={
                    <PrivateRoute>
                        <PersonasLista />
                    </PrivateRoute>
                } />

                <Route path="/personas/nueva" element={
                    <PrivateRoute>
                        <PersonasForm />
                    </PrivateRoute>
                } />
            </Routes>
        </BrowserRouter>
    );
}