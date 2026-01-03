const formatearFecha = (fecha) => {
    const date = new Date(fecha)
    return new Intl.DateTimeFormat('pe-PE').format(date)
}

export default formatearFecha