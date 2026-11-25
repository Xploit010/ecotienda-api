// =============================================================
// CAPA 3 · REPOSITORIO: productoRepositorio.js
// QUE hace: habla con la base de datos. Aqui, y SOLO aqui, se escribe SQL.
// =============================================================

import bd from "../bd.js";

// listar: todos los productos (o filtrados por categoria si se envia una)
export function listar(categoria) {
  if (categoria) {
    return bd.prepare("SELECT * FROM productos WHERE categoria = ? ORDER BY id").all(categoria);
  }
  return bd.prepare("SELECT * FROM productos ORDER BY id").all();
}

// buscar: un producto por su id, o undefined si no existe
export function buscar(id) {
  return bd.prepare("SELECT * FROM productos WHERE id = ?").get(id);
}

// crear: inserta un producto nuevo y devuelve el registro creado
export function crear(producto) {
  const resultado = bd.prepare(`
    INSERT INTO productos (nombre, categoria, precio, precio_anterior, stock)
    VALUES (?, ?, ?, ?, ?)
  `).run(
    producto.nombre,
    producto.categoria,
    producto.precio,
    producto.precio_anterior ?? 0,
    producto.stock
  );
  return buscar(resultado.lastInsertRowid);
}

// actualizar: cambia los datos de un producto por su id
export function actualizar(id, producto) {
  const resultado = bd.prepare(`
    UPDATE productos
    SET nombre = ?, categoria = ?, precio = ?, precio_anterior = ?, stock = ?
    WHERE id = ?
  `).run(
    producto.nombre,
    producto.categoria,
    producto.precio,
    producto.precio_anterior ?? 0,
    producto.stock,
    id
  );
  return resultado.changes > 0 ? buscar(id) : null;
}

// eliminar: borra un producto por su id. Devuelve true si lo borro
export function eliminar(id) {
  const resultado = bd.prepare("DELETE FROM productos WHERE id = ?").run(id);
  return resultado.changes > 0;
}