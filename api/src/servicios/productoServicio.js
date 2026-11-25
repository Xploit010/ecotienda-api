import * as repositorio from "../repositorios/productoRepositorio.js";

// conValorInventario: le agrega a un producto cuanto vale todo su stock.
// Regla del negocio: valor del inventario = stock x precio
function conValorInventario(producto) {
    return { ...producto, valorinventario: producto.stock * producto.precio };
}

// validar: revisa los datos. Devuelve una LISTA de errores (vacia [] si todo esta bien).
function validar(datos) {
    const errores = [];

    // El nombre: obligatorio
    if (typeof datos.nombre !== "string" || datos.nombre.trim() === "") {
        errores.push("El nombre es obligatorio.");
    }

    // La categoria: obligatoria
    if (typeof datos.categoria !== "string" || datos.categoria.trim() === "") {
        errores.push("La categoria es obligatoria.");
    }

    // El precio: un numero mayor que 0
    if (typeof datos.precio !== "number" || datos.precio <= 0) {
        errores.push("El precio debe ser un numero mayor que 0.");
    }

    // El precio anterior: opcional, pero si llega debe ser un numero mayor o igual que 0
    if (datos.precio_anterior !== undefined && (typeof datos.precio_anterior !== "number" || datos.precio_anterior < 0)) {
        errores.push("El precio anterior debe ser un numero mayor o igual que 0.");
    }

    // El stock: un numero entero, 0 o mas
    if (!Number.isInteger(datos.stock) || datos.stock < 0) {
        errores.push("El stock debe ser un numero entero mayor o igual que 0.");
    }

    return errores;
}

// --- Lo que usa la capa de rutas (por eso lleva export) ---

// listarProductos: todos (o filtrados por categoria), cada uno con su valor de inventario
export function listarProductos(categoria) {
    return repositorio.listar(categoria).map(conValorInventario);
}

// obtenerProducto: uno por su id, o undefined si no existe
export function obtenerProducto(id) {
    const producto = repositorio.buscar(id);
    return producto ? conValorInventario(producto) : undefined;
}

// crearProducto: valida y guarda.
// Devuelve { errores } si algo esta mal, o { producto } si se creo
export function crearProducto(datos) {
    const errores = validar(datos);
    if (errores.length > 0) {
        return { errores };
    }

    const nuevo = {
        nombre: datos.nombre.trim(),
        categoria: datos.categoria.trim(),
        precio: datos.precio,
        precio_anterior: datos.precio_anterior ?? 0,
        stock: datos.stock
    };

    const creado = repositorio.crear(nuevo);
    return { producto: conValorInventario(creado) };
}

// actualizarProducto: valida y cambia. Devuelve { errores }, { producto } o {} si no existe
export function actualizarProducto(id, datos) {
    const errores = validar(datos);
    if (errores.length > 0) {
        return { errores };
    }

    const cambios = {
        nombre: datos.nombre.trim(),
        categoria: datos.categoria.trim(),
        precio: datos.precio,
        precio_anterior: datos.precio_anterior ?? 0,
        stock: datos.stock
    };

    const actualizado = repositorio.actualizar(id, cambios);
    return actualizado ? { producto: conValorInventario(actualizado) } : {};
}

// eliminarProducto: true si lo borro, false si no existia
export function eliminarProducto(id) {
    return repositorio.eliminar(id);
}