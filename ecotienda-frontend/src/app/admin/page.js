"use client";

import { useEffect, useState } from "react";
import {
  obtenerProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} from "@/lib/api";

const FORMULARIO_INICIAL = {
  nombre: "",
  categoria: "Iluminacion",
  precio: "",
  precio_anterior: "",
  stock: "",
};

export default function AdminPage() {
  const [productos, setProductos] = useState([]);
  const [formulario, setFormulario] = useState(FORMULARIO_INICIAL);
  const [editandoId, setEditandoId] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    cargarInventario();
  }, []);

  async function cargarInventario() {
    try {
      setCargando(true);
      const data = await obtenerProductos();
      setProductos(Array.isArray(data) ? data : []);
      setError("");
    } catch (err) {
      setError("No se pudo cargar el inventario desde la API.");
    } finally {
      setCargando(false);
    }
  }

  function manejarCambio(e) {
    const { name, value } = e.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
  }

  async function manejarEnvio(e) {
    e.preventDefault();
    setMensaje("");
    setError("");

    const payload = {
      nombre: formulario.nombre.trim(),
      categoria: formulario.categoria.trim(),
      precio: Number(formulario.precio),
      precio_anterior: Number(formulario.precio_anterior || formulario.precio),
      stock: Number(formulario.stock),
    };

    try {
      if (editandoId !== null) {
        await actualizarProducto(editandoId, payload);
        setMensaje("Producto actualizado correctamente.");
      } else {
        await crearProducto(payload);
        setMensaje("Producto creado y guardado en la base de datos.");
      }
      setFormulario(FORMULARIO_INICIAL);
      setEditandoId(null);
      cargarInventario();
    } catch (err) {
      setError(`Error al guardar el producto: ${err.message}`);
    }
  }

  function iniciarEdicion(producto) {
    setMensaje("");
    setError("");
    setEditandoId(producto.id);
    setFormulario({
      nombre: producto.nombre,
      categoria: producto.categoria,
      precio: producto.precio,
      precio_anterior: producto.precio_anterior ?? producto.precio,
      stock: producto.stock,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelarEdicion() {
    setEditandoId(null);
    setFormulario(FORMULARIO_INICIAL);
    setMensaje("");
    setError("");
  }

  async function manejarEliminar(id, nombre) {
    if (!window.confirm(`¿Seguro que deseas eliminar "${nombre}"?`)) return;
    setMensaje("");
    setError("");
    try {
      await eliminarProducto(id);
      setMensaje("Producto eliminado del inventario.");
      cargarInventario();
    } catch (err) {
      setError(`No se pudo eliminar: ${err.message}`);
    }
  }

  const formatoCOP = (valor) =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(valor);

  return (
    <main style={{ padding: "20px 0" }}>
      {/* Formulario de Creación / Edición */}
      <section className="tarjeta" style={{ marginBottom: "24px" }}>
        <h2 style={{ color: "#0352f1", marginBottom: "8px" }}>
          {editandoId !== null
            ? `Editando Producto #${editandoId}`
            : "Panel de Administración — Nuevo Producto"}
        </h2>
        <p style={{ color: "#ffffff", marginBottom: "16px" }}>
          Gestiona el catálogo e inventario de ByteCentral directamente contra la API.
        </p>

        {mensaje && (
          <p
            style={{
              backgroundColor: "#e6f4ea",
              color: "#137333",
              padding: "10px 14px",
              borderRadius: "8px",
              marginBottom: "14px",
              fontWeight: "600",
            }}
          >
            {mensaje}
          </p>
        )}

        {error && (
          <p
            style={{
              backgroundColor: "#fce8e6",
              color: "#c5221f",
              padding: "10px 14px",
              borderRadius: "8px",
              marginBottom: "14px",
              fontWeight: "600",
            }}
          >
            {error}
          </p>
        )}

        <form
          onSubmit={manejarEnvio}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "14px",
            alignItems: "end",
          }}
        >
          <div>
            <label style={{ display: "block", fontWeight: "600", marginBottom: "4px" }}>
              Nombre del producto
            </label>
            <input
              type="text"
              name="nombre"
              required
              value={formulario.nombre}
              onChange={manejarCambio}
              placeholder="Panel Solar Portátil 100W"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontWeight: "600", marginBottom: "4px" }}>
              Categoría
            </label>
            <select
              name="categoria"
              required
              value={formulario.categoria}
              onChange={manejarCambio}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            >
                <option value="Iluminacion">Iluminación</option>
                <option value="Electrodomesticos">Electrodomésticos</option>
                <option value="Solar">Solar</option>
            </select>
          </div>

          <div>
            <label style={{ display: "block", fontWeight: "600", marginBottom: "4px" }}>
              Precio actual (COP)
            </label>
            <input
              type="number"
              name="precio"
              required
              min="0"
              value={formulario.precio}
              onChange={manejarCambio}
              placeholder="45000"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontWeight: "600", marginBottom: "4px" }}>
              Precio anterior (COP)
            </label>
            <input
              type="number"
              name="precio_anterior"
              min="0"
              value={formulario.precio_anterior}
              onChange={manejarCambio}
              placeholder="58000"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontWeight: "600", marginBottom: "4px" }}>
              Stock (unidades)
            </label>
            <input
              type="number"
              name="stock"
              required
              min="0"
              value={formulario.stock}
              onChange={manejarCambio}
              placeholder="20"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <div style={{ display: "flex", gap: "8px" }}>
            <button
              type="submit"
              className="boton-primario"
              style={{ flex: 1, padding: "11px 16px", cursor: "pointer" }}
            >
              {editandoId !== null ? "Guardar cambios" : "Agregar producto"}
            </button>

            {editandoId !== null && (
              <button
                type="button"
                onClick={cancelarEdicion}
                style={{
                  padding: "11px 14px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  backgroundColor: "#f5f5f5",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </section>

      {/* Tabla de Inventario */}
      <section className="tarjeta">
        <h3 style={{ color: "#0352f1", marginBottom: "14px" }}>
          Inventario Actual ({productos.length} productos)
        </h3>

        {cargando ? (
          <p>Cargando inventario...</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                textAlign: "left",
              }}
            >
              <thead>
                <tr style={{ borderBottom: "2px solid #0352f1", color: "#0352f1" }}>
                  <th style={{ padding: "10px" }}>ID</th>
                  <th style={{ padding: "10px" }}>Nombre</th>
                  <th style={{ padding: "10px" }}>Categoría</th>
                  <th style={{ padding: "10px" }}>Precio</th>
                  <th style={{ padding: "10px" }}>Anterior</th>
                  <th style={{ padding: "10px" }}>Stock</th>
                  <th style={{ padding: "10px" }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((prod) => (
                  <tr key={prod.id} style={{ borderBottom: "1px solid #eee" }}>
                    <td style={{ padding: "10px" }}>{prod.id}</td>
                    <td style={{ padding: "10px", fontWeight: "600" }}>
                      {prod.nombre}
                    </td>
                    <td style={{ padding: "10px" }}>{prod.categoria}</td>
                    <td style={{ padding: "10px" }}>{formatoCOP(prod.precio)}</td>
                    <td style={{ padding: "10px", color: "#fdfdfd" }}>
                      {formatoCOP(prod.precio_anterior ?? prod.precio)}
                    </td>
                    <td style={{ padding: "10px" }}>{prod.stock}</td>
                    <td style={{ padding: "10px", display: "flex", gap: "8px" }}>
                      <button
                        onClick={() => iniciarEdicion(prod)}
                        style={{
                          padding: "6px 12px",
                          borderRadius: "6px",
                          border: "1px solid #0352f1",
                          backgroundColor: "white",
                          color: "#0352f1",
                          cursor: "pointer",
                          fontWeight: "600",
                        }}
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => manejarEliminar(prod.id, prod.nombre)}
                        style={{
                          padding: "6px 12px",
                          borderRadius: "6px",
                          border: "none",
                          backgroundColor: "#dc3545",
                          color: "white",
                          cursor: "pointer",
                          fontWeight: "600",
                        }}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}