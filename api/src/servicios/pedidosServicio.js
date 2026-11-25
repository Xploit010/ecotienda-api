// CAPA 2 · SERVICIO: pedidosServicio.js
// QUE hace: valida el pedido, verifica stock, calcula el total
// y guarda el pedido descontando las unidades compradas.


import * as pedidosRepositorio from "../repositorios/pedidosRepositorio.js";
import * as productoRepositorio from "../repositorios/productoRepositorio.js";

// formatearPedido: convierte el texto JSON de productos en arreglo al leer de SQLite
function formatearPedido(pedido) {
    return {
        ...pedido,
        productos: JSON.parse(pedido.productos)
    };
}

// validar: revisa los datos del pedido. Devuelve lista de errores (vacia [] si todo esta bien)
function validar(datos) {
    const errores = [];

    if (typeof datos.cliente !== "string" || datos.cliente.trim() === "") {
        errores.push("El nombre del cliente es obligatorio.");
    }

    if (!Array.isArray(datos.productos) || datos.productos.length === 0) {
        errores.push("Debe incluir al menos un producto en el pedido.");
        return errores;
    }

    for (const item of datos.productos) {
        if (!Number.isInteger(item.id) || item.id <= 0) {
            errores.push("Cada producto debe tener un id valido.");
            continue;
        }
        if (!Number.isInteger(item.cantidad) || item.cantidad <= 0) {
            errores.push(`La cantidad para el producto ${item.id} debe ser un entero mayor que 0.`);
            continue;
        }

        const productoBd = productoRepositorio.buscar(item.id);
        if (!productoBd) {
            errores.push(`El producto con id ${item.id} no existe.`);
        } else if (productoBd.stock < item.cantidad) {
            errores.push(`Stock insuficiente para ${productoBd.nombre}. Disponible: ${productoBd.stock}.`);
        }
    }

    return errores;
}

// --- Lo que usa la capa de rutas ---

// listarPedidos: todos los pedidos registrados
export function listarPedidos() {
    return pedidosRepositorio.listar().map(formatearPedido);
}

// crearPedido: valida, calcula el total real desde la BD, guarda y descuenta stock
export function crearPedido(datos) {
    const errores = validar(datos);
    if (errores.length > 0) {
        return { errores };
    }

    let total = 0;
    const detalleProductos = [];

    for (const item of datos.productos) {
        const productoBd = productoRepositorio.buscar(item.id);
        const subtotal = productoBd.precio * item.cantidad;
        total += subtotal;

        detalleProductos.push({
            id: productoBd.id,
            nombre: productoBd.nombre,
            precio: productoBd.precio,
            cantidad: item.cantidad,
            subtotal
        });

        pedidosRepositorio.descontarStock(productoBd.id, item.cantidad);
    }

    const nuevoPedido = {
        cliente: datos.cliente.trim(),
        fecha: new Date().toISOString(),
        total,
        productos: detalleProductos
    };

    const creado = pedidosRepositorio.crear(nuevoPedido);
    return { pedido: formatearPedido(creado) };
}