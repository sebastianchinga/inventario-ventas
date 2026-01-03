import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import clienteAxios from "../../config/axios";
import convertirMoneda from "../../helpers/formatearMoneda";
import formatearFecha from "../../helpers/formatearFecha";
import useModal from "../../hooks/useModal";

const Ventas = () => {

  const [ventas, setVentas] = useState([]);
  const { modal, abrirModal, cerrarModal } = useModal();
  const [venta, setVenta] = useState({});

  useEffect(() => {
    const obtenerVentas = async () => {

      const token = localStorage.getItem('token');
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }

      try {
        const url = '/ventas';
        const { data } = await clienteAxios.get(url, config);
        setVentas(data);
      } catch (error) {
        setVentas([]);
      }
    }

    obtenerVentas()
  }, [])

  const verDetalles = async (venta) => {
    const { id } = venta
    abrirModal();

    try {
      const { data } = await clienteAxios.get(`/ventas/${id}`);
      setVenta(data);
    } catch (error) {
      setVenta({})
    }

  }

  const resetarDetalles = () => {
    cerrarModal();
    setVenta({});
  }

  return (
    <>
      {/* Sales Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-green-500 transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Ventas Hoy</p>
              <p className="text-3xl font-bold mt-2">$4,520</p>
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
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-blue-500 transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total de Ventas (Mes)</p>
              <p className="text-3xl font-bold mt-2">$128,450</p>
            </div>
            <div className="bg-blue-500/20 p-3 rounded-lg">
              <svg
                className="w-6 h-6 text-blue-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"></path>
              </svg>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-purple-500 transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Número de Ventas</p>
              <p className="text-3xl font-bold mt-2">342</p>
            </div>
            <div className="bg-purple-500/20 p-3 rounded-lg">
              <svg
                className="w-6 h-6 text-purple-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 6H6.28l-.31-1.243A1 1 0 005 4H3z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
      {/* Sales Table Section */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        {/* Header with Create Sale Button */}
        <div className="p-6 border-b border-gray-700 flex items-center justify-between">
          <h3 className="text-xl font-bold">Lista de Ventas</h3>
          {/* Button to open new sale modal */}
          <Link to="/nueva-venta" className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition font-semibold text-sm">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            <span>Nueva Venta</span>
          </Link>
        </div>
        {/* Sales Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700/50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {/* Sales data rows with eye icon */}
              {ventas.map(venta => (
                <tr key={venta.id} className="hover:bg-gray-700/50 transition">
                  <td className="px-6 py-4 text-sm font-semibold">
                    {venta.cliente}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">{formatearFecha(venta.fecha)}</td>
                  <td className="px-6 py-4 text-sm font-bold">{convertirMoneda(venta.total)}</td>
                  <td className="px-6 py-4 text-sm">
                    <button onClick={() => verDetalles(venta)} className="text-blue-400 hover:text-blue-300 transition inline-flex items-center">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path
                          fillRule="evenodd"
                          d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div id="saleDetailsModal" className={`fixed inset-0 z-50 overflow-y-auto ${!modal && 'hidden'}`}>
        {/* Overlay */}
        <div className="fixed inset-0 bg-black/75 transition-opacity" />
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="relative bg-gray-800 rounded-xl shadow-2xl border border-gray-700 w-full max-w-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-700 flex items-center justify-between bg-gray-700 bg-opacity-30">
              <h3 className="text-xl font-bold text-white">Detalles de la Venta</h3>
              <button
                onClick={resetarDetalles}
                className="text-gray-400 hover:text-white transition"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Informacion General */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
                    Cliente
                  </p>
                  <p className="text-lg font-medium">{venta.cliente}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
                    Vendedor
                  </p>
                  <p className="text-lg font-medium text-blue-400">{venta?.id && venta.usuario.nombre}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
                    Fecha
                  </p>
                  <p className="text-gray-200">{venta?.id && formatearFecha(venta.fecha)}</p>
                </div>
              </div>
              {/* Tabla de Productos */}
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-3">
                  Productos
                </p>
                <div className="bg-gray-900 bg-opacity-50 rounded-lg border border-gray-700 overflow-hidden">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-gray-700 text-gray-300">
                      <tr>
                        <th className="px-4 py-2">Producto</th>
                        <th className="px-4 py-2 text-center">Cant.</th>
                        <th className="px-4 py-2 text-right">Precio</th>
                        <th className="px-4 py-2 text-right">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {venta?.id && (
                        venta.productos.map(producto => (
                          <tr key={producto.id}>
                            <td className="px-4 py-3">{producto.nombre}</td>
                            <td className="px-4 py-3 text-center">{producto.productos_ventas.cantidad}</td>
                            <td className="px-4 py-3 text-right">{convertirMoneda(producto.precio)}</td>
                            <td className="px-4 py-3 text-right font-semibold">
                              {convertirMoneda(producto.productos_ventas.cantidad * producto.precio)}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* Total */}
              <div className="flex justify-end pt-4 border-t border-gray-700">
                <div className="text-right">
                  <p className="text-gray-400 text-sm">Total a Pagar</p>
                  <p className="text-3xl font-bold text-green-400">{convertirMoneda(venta.total)}</p>
                </div>
              </div>
            </div>
            {/* Modal Footer */}
            <div className="px-6 py-4 bg-gray-700 bg-opacity-30 flex justify-end">
              <button
                onClick={resetarDetalles}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition font-semibold text-sm"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>

    </>

  )
}

export default Ventas