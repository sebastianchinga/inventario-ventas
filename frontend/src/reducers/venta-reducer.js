export const initialState = {
    cliente: '',
    carrito: [],
    total: 0
}
export const ventaReducer = (state, action) => {
    switch (action.type) {
        case "add_to_cart":
            const existe = state.carrito.some(item => item.id === action.payload.id)
            if (existe) {
                const nuevoArray = state.carrito.map(item => {
                    if (Number(item.id) === Number(action.payload.id)) {
                        return {
                            ...item,
                            cantidad: item.cantidad + 1
                        }
                    }
                    return item
                })

                return {
                    ...state,
                    carrito: nuevoArray,
                    total: nuevoArray.reduce((acc, item) => acc + (Number(item.precio) * Number(item.cantidad)) ,0)
                }

            } else {
                const { id, nombre, precio, stock } = action.payload;

                const nuevoItem = {
                    id,
                    nombre,
                    precio: Number(precio),
                    stock,
                    cantidad: 1
                }

                const newArray = [...state.carrito, nuevoItem];

                return {
                    ...state,
                    carrito: newArray,
                    total: newArray.reduce((acc, item) => acc + (Number(item.precio) * Number(item.cantidad)) ,0)
                }
            }

            break;

        case "change_input":
            return {
                ...state,
                cliente: action.payload
            }

            break

        case "decrement_quantity":
            const nuevoArray = state.carrito.map(item => {
                if (Number(item.id) === Number(action.payload.id)) {
                    if (item.cantidad >= 1) {
                        return {
                            ...item,
                            cantidad: item.cantidad - 1
                        }
                    } else {
                        return item
                    }
                } else {
                    return item;
                }
            })
            return {
                ...state,
                carrito: nuevoArray,
                total: nuevoArray.reduce((acc, item) => acc + (Number(item.precio) * Number(item.cantidad)) ,0)
            }
            break

        case "increment_quantity":
            const newArray = state.carrito.map(item => {
                if (Number(item.id) === Number(action.payload.id)) {
                    if (item.cantidad < action.payload.stock) {
                        return {
                            ...item,
                            cantidad: item.cantidad + 1
                        }
                    } else {
                        return item
                    }
                } else {
                    return item;
                }
            });

            return {
                ...state,
                carrito: newArray,
                total: newArray.reduce((acc, item) => acc + (Number(item.precio) * Number(item.cantidad)) ,0)
            }

            break

        case "delete":
            const arrayNew = state.carrito.filter(item => item.id !== action.payload.id)
            return {
                ...state,
                carrito: arrayNew,
                total: arrayNew.reduce((acc, item) => acc + (Number(item.precio) * Number(item.cantidad)) ,0)
            }
            break

        case "":
            break

        default:
            break; 
    }

    return state;
}