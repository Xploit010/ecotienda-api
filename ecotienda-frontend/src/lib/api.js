const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002/api";

async function manejarRespuesta(respuesta) {
  if (!respuesta.ok) {
    const errorTexto = await respuesta.text().catch(() => "");
    throw new Error(
      `Error HTTP ${respuesta.status}: ${errorTexto || respuesta.statusText}`
    );
  }
  if (respuesta.status === 204) return null;
  return respuesta.json();
}

// --- PRODUCTOS ---
export async function obtenerProductos() {
  const respuesta = await fetch(`${API_URL}/productos`, { cache: "no-store" });
  return manejarRespuesta(respuesta);
}

export async function crearProducto(datosProducto) {
  const respuesta = await fetch(`${API_URL}/productos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datosProducto),
  });
  return manejarRespuesta(respuesta);
}

export async function actualizarProducto(id, datosProducto) {
  const respuesta = await fetch(`${API_URL}/productos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datosProducto),
  });
  return manejarRespuesta(respuesta);
}

export async function eliminarProducto(id) {
  const respuesta = await fetch(`${API_URL}/productos/${id}`, {
    method: "DELETE",
  });
  return manejarRespuesta(respuesta);
}

// --- PEDIDOS ---
export async function obtenerPedidos() {
  const respuesta = await fetch(`${API_URL}/pedidos`, { cache: "no-store" });
  return manejarRespuesta(respuesta);
}

export async function crearPedido(datosPedido) {
  const respuesta = await fetch(`${API_URL}/pedidos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datosPedido),
  });
  return manejarRespuesta(respuesta);
}