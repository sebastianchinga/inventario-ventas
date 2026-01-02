import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import Aside from '../components/Aside'
import useAuth from '../hooks/useAuth'
import obtenerIniciales from '../helpers/obtenerIniciales'
import mostrarTitulo from '../helpers/mostrarTitulo'

const AdminLayout = () => {
    const { auth, cargando, cerrarSesion } = useAuth();
    const { pathname } = useLocation();

    if (cargando) return 'cargando';

    return (
        <div className='bg-gray-900 text-white'>
            <div className='flex h-screen'>
                {/* Sidebar */}
                <Aside />
                {/* Main Content */}
                <main className="flex-1 flex flex-col overflow-hidden">
                    {/* Header */}
                    <header className="bg-gray-800 border-b border-gray-700 px-8 py-4 flex items-center justify-between">
                        <div>
                            <h2 className="text-3xl font-bold">
                                {mostrarTitulo(pathname)}
                            </h2>
                            <p className="text-gray-400 text-sm">
                                Bienvenido a tu sistema de gestión
                            </p>
                        </div>
                        {/* User Profile Button with Dropdown */}
                        <div className="group relative">
                            {/* Button with user initials */}
                            <button className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition font-semibold">
                                <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center text-sm font-bold">
                                    {auth?.nombre && obtenerIniciales(auth.nombre)}
                                </div>
                                <span>{auth?.nombre}</span>
                                <svg
                                    className="w-4 h-4 ml-1 group-hover:rotate-180 transition"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                            {/* Dropdown Menu - Hidden by default, shown on hover */}
                            <div className="hidden group-hover:block absolute right-0 mt-2 w-48 bg-gray-700 rounded-lg shadow-xl border border-gray-600 py-1 z-50">
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-600 transition"
                                >
                                    <svg
                                        className="w-4 h-4 inline mr-2"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    Mi Perfil
                                </a>
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-600 transition"
                                >
                                    <svg
                                        className="w-4 h-4 inline mr-2"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5.951-1.488 5.951 1.488a1 1 0 001.169-1.409l-7-14z"></path>
                                    </svg>
                                    Configuración
                                </a>
                                <hr className="border-gray-600 my-1" />
                                <button onClick={cerrarSesion} className="block px-4 py-2 text-sm text-red-400 hover:bg-gray-600 transition">
                                    <svg
                                        className="w-4 h-4 inline mr-2"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M3 6a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    Cerrar Sesión
                                </button>

                            </div>
                        </div>
                    </header>
                    {/* Content Area */}
                    <div className={`flex-1 overflow-auto bg-gray-900 p-8 ${pathname === '/nuevo-usuario' && 'flex justify-center items-start'}`}>
                        {auth?.id ? <Outlet /> : <Navigate to="/" />}
                    </div>
                </main>
            </div>
        </div>
    )
}

export default AdminLayout