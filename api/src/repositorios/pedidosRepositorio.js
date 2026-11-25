import bd from "../bd.js";

// listar: todos los pedidos ordenados del mas reciente al mas antiguo
export function listar() {
    return bd.prepare("SELECT * FROM pedidos ORDER BY id DESC").all();
}

// crear: inserta un pedido nuevo y devuelve el registro creado
export function crear(pedido) {
    const resultado = bd.prepare(`
        INSERT INTO pedidos (cliente, fecha, total, productos)
        VALUES (?, ?, ?, ?)
    `).run(
        pedido.cliente,
        pedido.fecha,
        pedido.total,
        JSON.stringify(pedido.productos)
    );
    return bd.prepare("SELECT * FROM pedidos WHERE id = ?").get(resultado.lastInsertRowid);
}

// descontarStock: resta unidades compradas al stock del producto
export function descontarStock(idProducto, cantidad) {
    bd.prepare("UPDATE productos SET stock = stock - ? WHERE id = ?").run(cantidad, idProducto);
}