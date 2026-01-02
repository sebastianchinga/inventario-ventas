const obtenerIniciales = (nombre) => {
    return nombre.split(" ").map(letra => letra.charAt(0)).slice(0, 2).join('');
}

export default obtenerIniciales