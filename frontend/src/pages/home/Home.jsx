const Home = () => {
    console.log();
    
    return (
        <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Card 1 */}
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-blue-500 transition">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm">Total de Productos</p>
                            <p className="text-3xl font-bold mt-2">1,248</p>
                        </div>
                        <div className="bg-blue-500/20 p-3 rounded-lg">
                            <svg
                                className="w-6 h-6 text-blue-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"></path>
                            </svg>
                        </div>
                    </div>
                </div>
                {/* Card 2 */}
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-green-500 transition">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm">Ventas Hoy</p>
                            <p className="text-3xl font-bold mt-2">$12,450</p>
                        </div>
                        <div className="bg-green-500/20 p-3 rounded-lg">
                            <svg
                                className="w-6 h-6 text-green-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M8.16 2.75a.75.75 0 00-1.32 0l-3.5 9.5A.75.75 0 003.25 13h13.5a.75.75 0 00.66-1.25l-3.5-9.5z"></path>
                            </svg>
                        </div>
                    </div>
                </div>
                {/* Card 3 */}
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-yellow-500 transition">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm">Stock Bajo</p>
                            <p className="text-3xl font-bold mt-2">23</p>
                        </div>
                        <div className="bg-yellow-500/20 p-3 rounded-lg">
                            <svg
                                className="w-6 h-6 text-yellow-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
                {/* Card 4 */}
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-purple-500 transition">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm">Clientes Activos</p>
                            <p className="text-3xl font-bold mt-2">856</p>
                        </div>
                        <div className="bg-purple-500/20 p-3 rounded-lg">
                            <svg
                                className="w-6 h-6 text-purple-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM9 6a3 3 0 11-6 0 3 3 0 016 0zm7.707 6.707a1 1 0 00-1.414-1.414A4.5 4.5 0 0016.5 11h.5a1 1 0 100-2h-.5a6.5 6.5 0 00-6.5 6.5v1a1 1 0 102 0v-1a4.5 4.5 0 014.5-4.5h.5a1 1 0 100-2h-.5a6.5 6.5 0 00-6.5 6.5v1a1 1 0 102 0v-1a4.5 4.5 0 014.5-4.5z"></path>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            {/* Recent Activity Section */}
            <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                <div className="p-6 border-b border-gray-700">
                    <h3 className="text-xl font-bold">Actividad Reciente</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-700 bg-opacity-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">
                                    Tipo
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">
                                    Descripción
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">
                                    Hora
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">
                                    Estado
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            <tr className="hover:bg-gray-700 bg-opacity-50 transition">
                                <td className="px-6 py-4 text-sm">Venta</td>
                                <td className="px-6 py-4 text-sm">
                                    Venta realizada - Orden #2847
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-400">Hace 5 min</td>
                                <td className="px-6 py-4">
                                    <span className="bg-green-500 bg-opacity-20 text-green-400 px-3 py-1 rounded-full text-xs font-semibold">
                                        Completado
                                    </span>
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-700 bg-opacity-50 transition">
                                <td className="px-6 py-4 text-sm">Inventario</td>
                                <td className="px-6 py-4 text-sm">
                                    Entrada de stock - Producto ABC123
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-400">Hace 15 min</td>
                                <td className="px-6 py-4">
                                    <span className="bg-blue-500 bg-opacity-20 text-blue-400 px-3 py-1 rounded-full text-xs font-semibold">
                                        Procesado
                                    </span>
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-700 bg-opacity-50 transition">
                                <td className="px-6 py-4 text-sm">Alerta</td>
                                <td className="px-6 py-4 text-sm">
                                    Stock bajo detectado - Producto XYZ789
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-400">Hace 1 hora</td>
                                <td className="px-6 py-4">
                                    <span className="bg-yellow-500 bg-opacity-20 text-yellow-400 px-3 py-1 rounded-full text-xs font-semibold">
                                        Pendiente
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>

    )
}

export default Home