import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginLayout from './layouts/LoginLayout'
import Login from './pages/auth/Login'
import AdminLayout from './layouts/AdminLayout'
import Home from './pages/home/Home'
import Inventario from './pages/home/Inventario'
import Ventas from './pages/home/Ventas'
import NuevaVenta from './pages/home/NuevaVenta'
import Usuarios from './pages/home/Usuarios'
import { AuthProvider } from './context/AuthContext'
import NuevoUsuario from './pages/home/NuevoUsuario'
function App() {

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<LoginLayout />}>
              <Route index element={<Login />} />
            </Route>

            <Route element={<AdminLayout />}>
              <Route path='home' element={<Home />} />
              <Route path='inventario' element={<Inventario />} />
              <Route path='ventas' element={<Ventas />} />
              <Route path='nueva-venta' element={<NuevaVenta />} />
              <Route path='usuarios' element={<Usuarios />} />
              <Route path='nuevo-usuario' element={<NuevoUsuario />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
