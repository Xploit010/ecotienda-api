// Router: un grupo de rutas que despues se conecta en el servidor
import { Router } from "express";
// Las funciones de la capa de abajo: el servicio
import * as servicio from "../servicios/productoServicio.js";

// Crea el grupo de rutas de productos (todas quedan debajo de /api/productos)
const rutas = Router();

// GET /api/productos -> todos los productos (o filtrados con ?categoria=Hogar)
rutas.get("/", (req, res) => {
    res.json(servicio.listarProductos(req.query.categoria));
});

// GET /api/productos/1 -> un producto
rutas.get("/:id", (req, res) => {
    const producto = servicio.obtenerProducto(Number(req.params.id));
    if (!producto) {
        return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json(producto);
});

// POST /api/productos -> crea un producto con el JSON del cuerpo
rutas.post("/", (req, res) => {
    const resultado = servicio.crearProducto(req.body ?? {});
    if (resultado.errores) {
        return res.status(400).json({ errores: resultado.errores });
    }
    res.status(201).json(resultado.producto);
});

// PUT /api/productos/1 -> modifica un producto
rutas.put("/:id", (req, res) => {
    const resultado = servicio.actualizarProducto(Number(req.params.id), req.body ?? {});
    if (resultado.errores) {
        return res.status(400).json({ errores: resultado.errores });
    }
    if (!resultado.producto) {
        return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json(resultado.producto);
});

// DELETE /api/productos/1 -> borra un producto
rutas.delete("/:id", (req, res) => {
    if (!servicio.eliminarProducto(Number(req.params.id))) {
        return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.status(204).end();
});

// Lo que entrega este archivo: el grupo de rutas
export default rutas;