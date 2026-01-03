import { Link, useLocation } from "react-router-dom"
import useAuth from "../hooks/useAuth";

const Aside = () => {
    const { pathname } = useLocation();
    const { auth } = useAuth();

    return (
        <aside className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
            {/* Logo */}
            <div className="p-6 border-b border-gray-700">
                <h1 className="text-2xl font-bold text-blue-500">InvSystem</h1>
                <p className="text-sm text-gray-400">Gestión de Inventario</p>
            </div>
            {/* Navigation Menu */}
            <nav className="flex-1 px-4 py-6 space-y-2">
                <Link to="/home" className={`flex items-center px-4 py-3 rounded-lg ${pathname === '/home' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50' : 'text-gray-300 hover:bg-gray-700 transition'}`}>
                    <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                    </svg>
                    <span>Dashboard</span>
                </Link>

                {auth?.id && auth.role.nombre.toLowerCase() === 'administrador' && (

                    <Link to="/inventario" className={`flex items-center px-4 py-3 rounded-lg ${pathname === '/inventario' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50' : 'text-gray-300 hover:bg-gray-700 transition'}`}>
                        <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"></path>
                        </svg>
                        <span>Inventario</span>
                    </Link>

                )}


                <Link to='/ventas' className={`flex items-center px-4 py-3 rounded-lg ${pathname === '/ventas' || pathname === '/nueva-venta' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50' : 'text-gray-300 hover:bg-gray-700 transition'}`}>
                    <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 6H6.28l-.31-1.243A1 1 0 005 4H3z"></path>
                    </svg>
                    <span>Ventas</span>
                </Link>

                {auth?.id && auth.role.nombre.toLowerCase() === 'administrador' && (
                    <Link to="/usuarios" className={`flex items-center px-4 py-3 rounded-lg ${pathname === '/usuarios' || pathname === '/nuevo-usuario' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50' : 'text-gray-300 hover:bg-gray-700 transition'}`}>
                        <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                        </svg>
                        <span>Usuarios</span>
                    </Link>
                )}


            </nav>
            {/* Footer */}
            <div className="p-4 border-t border-gray-700">
                <p className="text-xs text-gray-400">© 2025 InvSystem</p>
            </div>
        </aside>
    )
}

export default Aside