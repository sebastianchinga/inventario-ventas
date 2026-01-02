const mostrarTitulo = (url) => {
    let titulo;
    switch (url) {
        case "/home":
            titulo = 'Dashboard'
            break;
    
        case "/inventario":
            titulo = 'Inventario'
            break;
    
        case "/ventas":
            titulo = 'Ventas'
            break;
    
        case "/nueva-venta":
            titulo = 'Crear Venta'
            break;
    
        case "/usuarios":
            titulo = 'Usuarios'
            break;
    
        case "/nuevo-usuario":
            titulo = 'Nuevo Usuario'
            break;
    
        default:
            break;
    }

    return titulo
}

export default mostrarTitulo