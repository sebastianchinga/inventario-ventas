import { useEffect, useState } from "react"
import clienteAxios from "../../config/axios";
import obtenerIniciales from "../../helpers/obtenerIniciales";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const { auth } = useAuth();
    const navigate = useNavigate()

    useEffect(() => {
        if (auth?.role.nombre.toLowerCase() !== 'administrador') return navigate('/home')
        const cargarVendedores = async () => {
            const url = '/usuarios/';
            const { data } = await clienteAxios(url);
            setUsuarios(data);
        }
        cargarVendedores();
    }, [])

    return (
        <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
            {/* Header with Add User Button */}
            <div className="p-6 border-b border-gray-700 flex items-center justify-between">
                <div>
                    <h3 className="text-xl font-bold">Usuarios Registrados</h3>
                    <p className="text-sm text-gray-400 mt-1">
                        Lista completa de usuarios del sistema
                    </p>
                </div>
                {/* Button to add new user */}
                <Link to="/nuevo-usuario" className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition font-semibold text-sm">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
                    </svg>
                    <span>Agregar Usuario</span>
                </Link>
            </div>
            {/* Users Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-700 bg-opacity-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">
                                Usuario
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">
                                Email
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">
                                Fecha de Registro
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {/* Users */}
                        {usuarios.map(usuario => (
                            <tr key={usuario.id} className="hover:bg-gray-700 bg-opacity-50 transition">
                                <td className="px-6 py-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-sm font-bold">
                                            {obtenerIniciales(usuario.nombre)}
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold">{usuario.nombre}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-300">
                                    {usuario.email}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-300">15 Ene 2024</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center space-x-2">
                                        <button className="text-blue-400 hover:text-blue-300 transition">
                                            <svg
                                                className="w-5 h-5"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                            </svg>
                                        </button>
                                        <button className="text-red-400 hover:text-red-300 transition">
                                            <svg
                                                className="w-5 h-5"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    )
}

export default Usuarios