import { useEffect, useReducer, useState } from "react"
import clienteAxios from "../../config/axios";
import convertirMoneda from "../../helpers/formatearMoneda";
import { initialState, ventaReducer } from "../../reducers/venta-reducer";
import { useNavigate } from "react-router-dom";

const NuevaVenta = () => {
  const [productos, setProductos] = useState([]);
  const [venta, dispatch] = useReducer(ventaReducer, initialState);
  const navigate = useNavigate()

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const url = '/productos/';
        const { data } = await clienteAxios(url);
        setProductos(data);
      } catch (error) {
        setProductos([]);
      }
    }

    cargarProductos();
  }, [])

  const handleSubmit = async e => {
    e.preventDefault();
    const { cliente, carrito, total } = venta;
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const url = '/ventas/';
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
      const { data } = await clienteAxios.post(url, { cliente, total, carrito }, config);
      
    } catch (error) {

    }
  }

  return (
    <div className="max-w-4xl">
      {/* Form Card */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-8">
        {/* Form Section */}
        <form className="space-y-8" onSubmit={handleSubmit}>
          {/* Cliente Field */}
          <div>
            <label className="block text-sm font-semibold mb-3 text-gray-200">
              Cliente
            </label>
            <input
              type="text"
              value={venta.cliente}
              onChange={e => dispatch({ type: 'change_input', payload: e.target.value })}
              placeholder="Ingresa el nombre del cliente"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>
          {/* Products Section */}
          <div>
            <label className="block text-sm font-semibold mb-4 text-gray-200">
              Productos
            </label>
            {/* Products as Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {/* Product Card 1 */}
              {productos.map(producto => (
                <div
                  key={producto.id}
                  onClick={() => dispatch({ type: 'add_to_cart', payload: producto })}
                  className="bg-gray-700 rounded-lg border border-gray-600 hover:border-blue-500 cursor-pointer transition p-4 hover:shadow-lg hover:shadow-blue-500/20"
                >
                  <p className="font-semibold text-white mb-2">{producto.nombre}</p>
                  <p className="text-sm text-gray-400 mb-3">Stock: {producto.stock}</p>
                  <p className="text-blue-400 font-bold text-lg">{convertirMoneda(producto.precio)}</p>
                </div>
              ))}
            </div>
            {/* Cart/Selected Products List */}
            <div
              id="cartSection"
              className="bg-gray-700 bg-opacity-50 rounded-lg p-6 border border-gray-600"
            >
              <h3 className="text-lg font-semibold text-white mb-4">
                Productos en Carrito
              </h3>
              <div id="cartItems" className="space-y-3">

                {venta.carrito.length > 0 ? (
                  venta.carrito.map(item => (
                    <div key={item.id} className="flex items-center justify-between bg-gray-600  rounded-xl p-4">
                      {/* Product Info */}
                      <div className="flex flex-col gap-1">
                        <h3 className="text-white font-bold text-base tracking-tight">
                          {item.nombre}
                        </h3>
                        <div className="flex items-baseline gap-2">
                          <span className="text-blue-400 font-extrabold text-xl leading-none">
                            {convertirMoneda(item.precio)}
                          </span>
                        </div>
                      </div>
                      {/* Quantity Controls & Actions */}
                      <div className="flex items-center gap-4">
                        {/* Counter */}
                        <div className="flex items-center bg-gray-600 rounded-lg p-1">
                          <button
                            onClick={(e) => {
                              e.preventDefault()
                              dispatch({ type: 'decrement_quantity', payload: item })
                            }}
                            className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-gray-700 rounded-md transition-colors"
                            aria-label="Disminuir cantidad"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={16}
                              height={16}
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <line x1={5} y1={12} x2={19} y2={12} />
                            </svg>
                          </button>
                          <span className="w-10 text-center text-white font-bold text-sm">{item.cantidad}</span>
                          <button
                            onClick={e => {
                              e.preventDefault();
                              dispatch({ type: 'increment_quantity', payload: item })
                            }}
                            className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-gray-700 rounded-md transition-colors"
                            aria-label="Aumentar cantidad"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={16}
                              height={16}
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <line x1={12} y1={5} x2={12} y2={19} />
                              <line x1={5} y1={12} x2={19} y2={12} />
                            </svg>
                          </button>
                        </div>
                        {/* Delete Button */}
                        <button
                          onClick={() => dispatch({ type: 'delete', payload: item })}
                          className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-400/10 rounded-full transition-all group"
                          aria-label="Eliminar producto"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={20}
                            height={20}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="group-hover:scale-110 transition-transform"
                          >
                            <path d="M3 6h18" />
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-sm">
                    Ningún producto seleccionado
                  </p>
                )}

              </div>
            </div>
          </div>
          {/* Resumen Total */}
          <div className="bg-gray-700 bg-opacity-50 rounded-lg p-6 border border-gray-600">
            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold text-gray-200">Total a Pagar:</p>
              <p className="text-3xl font-bold text-blue-400">{convertirMoneda(venta.total)}</p>
            </div>
          </div>
          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              className="flex-1 px-6 py-3 rounded-lg bg-gray-700 text-white font-semibold hover:bg-gray-600 transition border border-gray-600"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
              Completar Venta
            </button>
          </div>
        </form>
      </div>
    </div>

  )
}

export default NuevaVenta