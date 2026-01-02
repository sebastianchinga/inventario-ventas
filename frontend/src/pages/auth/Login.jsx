import { useState } from "react"
import clienteAxios from "../../config/axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Login = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alerta, setAlerta] = useState({});
    const { setAuth } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if ([email, password].includes("")) {
            return console.log('Completa los campos');
        }

        try {
            const url = '/usuarios/';
            const { data } = await clienteAxios.post(url, { email, password });
            localStorage.setItem('token', data.token);
            navigate('/home');
            setAuth(data)
        } catch (error) {
            console.log(error.response);
        }
    }
    return (
        <>
            {/* Card Container */}
            <div className="bg-white rounded-lg shadow-xl p-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-600 rounded-lg mb-4">
                        <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">Inventario+</h1>
                    <p className="text-gray-500 text-sm mt-2">
                        Sistema de Inventario y Venta
                    </p>
                </div>
                {/* Login Form */}
                <form className="space-y-5" onSubmit={handleSubmit}>
                    {/* Email Input */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                            Correo Electrónico
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            id="email"
                            name="email"
                            placeholder="tu@email.com"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                        />
                    </div>
                    {/* Password Input */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                            Contraseña
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            id="password"
                            name="password"
                            placeholder="••••••••"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                        />
                    </div>
                    {/* Remember Me & Forgot Password */}
                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center text-gray-700">
                            <input
                                type="checkbox"
                                name="remember"
                                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer"
                            />
                            <span className="ml-2">Recuérdame</span>
                        </label>
                        <a
                            href="#"
                            className="text-indigo-600 hover:text-indigo-700 font-semibold"
                        >
                            ¿Olvidaste tu contraseña?
                        </a>
                    </div>
                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-4 rounded-lg transition duration-200 transform hover:scale-105 active:scale-95"
                    >
                        Iniciar Sesión
                    </button>
                </form>
                {/* Sign Up Link */}
                <p className="text-center text-gray-600 text-sm mt-4">
                    ¿No tienes cuenta? {""}
                    <a href="#" className="text-indigo-600 hover:text-indigo-700 font-bold">
                        Contactate al administrador
                    </a>
                </p>
            </div>
            {/* Footer Info */}
            <p className="text-center text-gray-500 text-xs mt-6">
                © 2025 Sistema de Inventario y Venta. Todos los derechos reservados.
            </p>
        </>

    )
}

export default Login