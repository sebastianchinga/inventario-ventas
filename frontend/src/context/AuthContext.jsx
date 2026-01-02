import { createContext } from "react";
import { useState, useEffect } from "react";
import clienteAxios from "../config/axios";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({});
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const authValidation = async () => {
            
            try {
                let token = localStorage.getItem('token');
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const url = '/usuarios/perfil';
                const {data} = await clienteAxios.get(url, config);
                setAuth(data)
            } catch (error) {
                setAuth({})
            }

            setCargando(false);
        }

        authValidation()
    }, [])

    const cerrarSesion = () => {
        localStorage.removeItem('token');
        setAuth({});
    }

    return (
        <AuthContext.Provider value={{
            auth,
            cargando,
            setCargando,
            setAuth,
            cerrarSesion
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext