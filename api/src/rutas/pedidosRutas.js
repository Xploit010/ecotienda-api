// Router: grupo de rutas para /api/pedidos
import { Router } from "express";
import * as servicio from "../servicios/pedidosServicio.js";

const rutas = Router();

// GET /api/pedidos -> todos los pedidos
rutas.get("/", (req, res) => {
    res.json(servicio.listarPedidos());
});

// POST /api/pedidos -> crea un pedido nuevo
rutas.post("/", (req, res) => {
    const resultado = servicio.crearPedido(req.body ?? {});
    if (resultado.errores) {
        return res.status(400).json({ errores: resultado.errores });
    }
    res.status(201).json(resultado.pedido);
});

export default rutas;