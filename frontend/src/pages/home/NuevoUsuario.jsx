import { useEffect, useState } from "react"
import clienteAxios from "../../config/axios";
import { useNavigate } from "react-router-dom";

const NuevoUsuario = () => {

  const [creado, setCreado] = useState();
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({
    id: null,
    nombre: '',
    apellido: '',
    email: '',
    password: ''
  });

  const [token, setToken] = useState([]);

  useEffect(() => {
    setCreado(false);
  }, [])

  const handleSubmit = async e => {
    e.preventDefault();

    if ([usuario.nombre, usuario.apellido, usuario.email, usuario.password].includes("")) {
      console.log('Completa los campos');
      return;
    }

    try {
      const url = '/usuarios/registro';
      const { data } = await clienteAxios.post(url, usuario);
      console.log(data);
    } catch (error) {
      console.log(error.response);
    }

    setCreado(true);

  }

  const handleConfirmar = async e => {
    e.preventDefault();

    if (token.length === 0) return;

    const code = Number(token.join(""));

    try {
      const url = '/usuarios/confirmar'
      const { data } = await clienteAxios.post(url, { token: code });
      setToken([]);
      navigate('/usuarios')
    } catch (error) {
      console.log(error);
    }
  }

  return (

    <>
      <div className={`w-full max-w-2xl bg-gray-800 rounded-lg border border-gray-700 shadow-xl ${creado && 'hidden'}`}>
        <div className="p-6 border-b border-gray-700 text-xl font-bold">
          Datos del Usuario
        </div>
        <form className="p-8 space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nombre */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                Nombre
              </label>
              <input
                type="text"
                name="nombre"
                placeholder="Ej. Juan"
                value={usuario.nombre}
                onChange={e => setUsuario({ ...usuario, [e.target.name]: e.target.value })}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              />
            </div>
            {/* Apellido */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                Apellido
              </label>
              <input
                type="text"
                name="apellido"
                placeholder="Ej. Pérez"
                value={usuario.apellido}
                onChange={e => setUsuario({ ...usuario, [e.target.name]: e.target.value })}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              />
            </div>
          </div>
          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400 uppercase tracking-wider">
              Correo Electrónico
            </label>
            <input
              type="email"
              name="email"
              placeholder="juan.perez@empresa.com"
              value={usuario.email}
              onChange={e => setUsuario({ ...usuario, [e.target.name]: e.target.value })}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
            />
          </div>
          {/* Password */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400 uppercase tracking-wider">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={usuario.password}
              onChange={e => setUsuario({ ...usuario, [e.target.name]: e.target.value })}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
            />
            <p className="text-xs text-gray-500 italic">
              Mínimo 8 caracteres, incluye números y símbolos.
            </p>
          </div>
          {/* Botones de Acción */}
          <div className="pt-4 flex items-center justify-end space-x-4 border-t border-gray-700">
            <button
              type="button"
              className="px-6 py-2.5 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700 transition font-semibold"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-8 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition font-bold shadow-lg shadow-blue-900/20"
            >
              Guardar Usuario
            </button>
          </div>
        </form>
      </div>

      <div className={`w-full max-w-lg bg-gray-800 rounded-lg border border-gray-700 shadow-xl overflow-hidden ${!creado && 'hidden'}`}>
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-xl font-bold">Verificación de Código</h3>
          <p className="text-gray-400 text-sm mt-1">
            Ingresa el código de 5 dígitos enviado a tu correo.
          </p>
        </div>
        <div className="p-8">
          <form className="space-y-8" onSubmit={handleConfirmar}>
            {/* Inputs de Código */}
            <div className="flex justify-between gap-3">
              {/* Generación de 5 campos de entrada siguiendo el estilo de inputs del diseño original */}
              <input
                type="text"
                maxLength={1}
                value={token[0]}
                onChange={e => setToken([...token, Number(e.target.value)])}
                className="w-16 h-16 text-center text-2xl font-bold bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              />
              <input
                type="text"
                maxLength={1}
                value={token[1]}
                onChange={e => setToken([...token, Number(e.target.value)])}
                className="w-16 h-16 text-center text-2xl font-bold bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              />
              <input
                type="text"
                maxLength={1}
                value={token[2]}
                onChange={e => setToken([...token, Number(e.target.value)])}
                className="w-16 h-16 text-center text-2xl font-bold bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              />
              <input
                type="text"
                maxLength={1}
                value={token[3]}
                onChange={e => setToken([...token, Number(e.target.value)])}
                className="w-16 h-16 text-center text-2xl font-bold bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              />
              <input
                type="text"
                maxLength={1}
                value={token[4]}
                onChange={e => setToken([...token, Number(e.target.value)])}
                className="w-16 h-16 text-center text-2xl font-bold bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              />
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-400">
                ¿No recibiste el código? {""}
                <a
                  href="#"
                  className="text-blue-400 hover:text-blue-300 font-semibold underline decoration-2 underline-offset-4"
                >
                  Reenviar código
                </a>
              </p>
            </div>
            {/* Botones de Acción */}
            <div className="pt-6 flex flex-col space-y-3 border-t border-gray-700">
              <button
                type="submit"
                className="w-full py-3.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition font-bold shadow-lg shadow-blue-900/20 text-lg"
              >
                Confirmar Cuenta
              </button>
              <button
                type="button"
                className="w-full py-3 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700 transition font-semibold"
              >
                Volver al inicio
              </button>
            </div>
          </form>
        </div>
      </div>

    </>


  )
}

export default NuevoUsuario