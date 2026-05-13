import { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem('usuario')) || null
    );

    const login = async (email, password) => {

        const res = await api.post('/auth/login', {
            email,
            password
        });

        localStorage.setItem(
            'token',
            res.data.token
        );

        localStorage.setItem(
            'usuario',
            JSON.stringify(res.data.user)
        );

        setUser(res.data.user);
    };

    const logout = () => {

        localStorage.removeItem('token');
        localStorage.removeItem('usuario');

        setUser(null);
    };

    return (
        <AuthContext.Provider value={{
            user,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);