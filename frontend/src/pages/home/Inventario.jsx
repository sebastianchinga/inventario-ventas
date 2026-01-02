import { useEffect, useState } from 'react'
import clienteAxios from '../../config/axios';
import convertirMoneda from '../../helpers/formatearMoneda';
import useModal from '../../hooks/useModal';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Inventario = () => {

    const { auth } = useAuth();
    const navigate = useNavigate();
    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const { abrirModal, cerrarModal, modal } = useModal();
    const [producto, setProducto] = useState({
        id: null,
        nombre: '',
        precio: '',
        stock: '',
        categoria_id: ''
    });

    useEffect(() => {
        if (auth?.role.nombre.toLowerCase() !== 'administrador') {
            return navigate('/home');
        }

        const obtenerProductos = async () => {
            try {
                const url = '/productos/';
                const { data } = await clienteAxios.get(url);
                setProductos(data)
            } catch (error) {
                setProductos([])
            }
        }

        const obtenerCategorias = async () => {
            try {
                const url = '/categorias/';
                const { data } = await clienteAxios.get(url);
                setCategorias(data);
            } catch (error) {
                setCategorias([]);
            }
        }

        obtenerCategorias()
        obtenerProductos()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (producto.nombre === '' || producto.precio === '' || producto.stock === '' || producto.categoria_id === '') {
            console.log('Completa los campos');
            return;
        }

        if (producto.id) {
            try {
                const url = `/productos/${producto.id}`;
                const { data } = await clienteAxios.put(url, producto);
                setProductos(prew => prew.map(p => p.id === data.resultado.id ? data.resultado : p));
            } catch (error) {
                setProductos([...productos]);
            }
        } else {
            try {
                const url = '/productos/';
                const { data } = await clienteAxios.post(url, producto);
                setProductos([...productos, data.resultado])
            } catch (error) {
                setProductos([...productos]);
            }
        }

        setProducto({
            id: null,
            nombre: '',
            precio: '',
            stock: '',
            categoria_id: ''
        })
        cerrarModal();
    }

    const eliminarProducto = async (producto) => {
        try {
            const url = `/productos/${producto.id}`;
            const { data } = await clienteAxios.delete(url);
            setProductos(prew => prew.filter(p => p.id !== producto.id));
        } catch (error) {
            console.log(error.response);
        }
    }

    const editandoProducto = (producto) => {
        const { id, nombre, precio, stock, categoria_id } = producto;
        abrirModal();
        setProducto({ id, nombre, precio, stock, categoria_id })
    }

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
            {/* Products Section with table and add product modal */}
            <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden mt-8">
                {/* Header with Add Product Button */}
                <div className="p-6 border-b border-gray-700 flex items-center justify-between">
                    <h3 className="text-xl font-bold">Lista de Productos</h3>
                    {/* Button to open modal */}
                    <button onClick={abrirModal}
                        className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition font-semibold text-sm"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                fillRule="evenodd"
                                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <span>Agregar Producto</span>
                    </button>
                </div>
                {/* Products Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-700 bg-opacity-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">
                                    ID
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">
                                    Nombre
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">
                                    Precio
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">
                                    Stock
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">

                            {productos.map(producto => (
                                <tr key={producto.id} className="hover:bg-gray-700/50 transition">
                                    <td className="px-6 py-4 text-sm font-semibold">{producto.id}</td>
                                    <td className="px-6 py-4 text-sm">{producto.nombre}</td>
                                    <td className="px-6 py-4 text-sm">{convertirMoneda(producto.precio)}</td>
                                    <td className="px-6 py-4 text-sm">
                                        <span className={`${producto.stock > 10 ? 'bg-green-500/20 text-green-400' : producto.stock > 5 || producto.stock === 10 ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'} px-3 py-1 rounded-full text-xs font-semibold`}>
                                            {producto.stock} uds
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm space-x-2">
                                        <button onClick={() => editandoProducto(producto)} className="text-blue-400 hover:text-blue-300 transition">
                                            Editar
                                        </button>
                                        <button onClick={() => eliminarProducto(producto)} className="text-red-400 hover:text-red-300 transition">
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>
            {/* Modal */}
            <div id="addProductModal" className={`${modal ? 'flex' : 'hidden'} fixed inset-0 bg-black/50 items-center justify-center z-50`}>
                <div className="bg-gray-800 rounded-lg border border-gray-700 w-full max-w-md mx-4 shadow-xl">
                    {/* Modal Header */}
                    <div className="p-6 border-b border-gray-700 flex items-center justify-between">
                        <h3 className="text-2xl font-bold">Agregar Nuevo Producto</h3>
                        {/* Close Button */}
                        <button onClick={() => {
                            cerrarModal(),
                                setProducto({
                                    id: null,
                                    nombre: '',
                                    precio: '',
                                    stock: '',
                                    categoria_id: ''
                                })
                        }}
                            className="text-gray-400 hover:text-gray-200 transition"
                        >
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </div>
                    {/* Modal Body with Form */}
                    <form className="p-6 space-y-4" onSubmit={handleSubmit}>
                        {/* Nombre Product */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-200 mb-2">
                                Nombre del Producto
                            </label>
                            <input
                                value={producto.nombre}
                                name='nombre'
                                onChange={e => setProducto({ ...producto, [e.target.name]: e.target.value })}
                                type="text"
                                placeholder="Ej: Laptop Dell Inspiron"
                                className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition"
                            />
                        </div>
                        {/* Price */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-200 mb-2">
                                Precio ($)
                            </label>
                            <input
                                value={producto.precio}
                                name='precio'
                                onChange={e => setProducto({ ...producto, [e.target.name]: Number(e.target.value) })}
                                type="number"
                                placeholder="Ej: 899.99"
                                className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                step="0.01"
                            />
                        </div>
                        {/* Stock */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-200 mb-2">
                                Stock
                            </label>
                            <input
                                value={producto.stock}
                                name='stock'
                                onChange={e => setProducto({ ...producto, [e.target.name]: Number(e.target.value) })}
                                type="number"
                                placeholder="Ej: 50"
                                className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition"
                            />
                        </div>
                        {/* Category Select */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-200 mb-2">
                                Categoría
                            </label>
                            <select
                                value={producto.categoria_id}
                                name='categoria_id'
                                onChange={e => setProducto({ ...producto, [e.target.name]: Number(e.target.value) })}
                                className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition"
                            >
                                <option disabled="" >
                                    Selecciona una categoría
                                </option>
                                {categorias.map(categoria => (
                                    <option value={categoria.id} key={categoria.id}>{categoria.nombre}</option>
                                ))}
                            </select>
                        </div>

                        {/* Modal Footer */}
                        <div className="flex gap-3 pt-3">
                            <button onClick={() => {
                                cerrarModal();
                                setProducto({
                                    id: null,
                                    nombre: '',
                                    precio: '',
                                    stock: '',
                                    categoria_id: ''
                                })
                            }}
                                className="w-full flex-1 px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-semibold transition"
                            >
                                Cancelar
                            </button>
                            <button className="w-full flex-1 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition">
                                Agregar Producto
                            </button>
                        </div>
                    </form>

                </div>
            </div>

        </>

    )
}

export default Inventario