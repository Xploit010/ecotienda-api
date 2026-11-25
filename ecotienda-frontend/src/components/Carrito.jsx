"use client";

export default function Carrito({
  items,
  cliente,
  onCambiarCliente,
  onCambiarCantidad,
  onQuitar,
  onConfirmar,
  mensajePedido,
}) {
  const formatoCOP = (valor) =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(valor);

  const totalUnidades = items.reduce((sum, item) => sum + item.cantidad, 0);
  const totalPagar = items.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  return (
    <aside className="tarjeta">
      <h3 style={{ color: "#0352f1", marginBottom: "12px" }}>
        Carrito ({totalUnidades})
      </h3>

      {mensajePedido && (
        <p
          style={{
            backgroundColor: "#e6f4ea",
            color: "#137333",
            padding: "10px",
            borderRadius: "8px",
            fontSize: "0.9rem",
            marginBottom: "12px",
          }}
        >
          {mensajePedido}
        </p>
      )}

      {items.length === 0 ? (
        <p style={{ color: "#ffffff", fontSize: "0.95rem" }}>
          Aún no has agregado productos.
        </p>
      ) : (
        <>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {items.map((item) => (
              <li
                key={item.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: "1px solid #eee",
                  padding: "10px 0",
                  gap: "8px",
                }}
              >
                <div style={{ flex: 1 }}>
                  <strong style={{ fontSize: "0.9rem", display: "block" }}>
                    {item.nombre}
                  </strong>
                  <span style={{ fontSize: "0.85rem", color: "#ffffff" }}>
                    {formatoCOP(item.precio)} c/u
                  </span>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginTop: "6px",
                    }}
                  >
                    <button
                      onClick={() =>
                        onCambiarCantidad(item.id, item.cantidad - 1)
                      }
                      style={{
                        width: "26px",
                        height: "26px",
                        borderRadius: "6px",
                        border: "1px solid #ccc",
                        background: "#f8f9fa",
                        cursor: "pointer",
                        fontWeight: "bold",
                      }}
                    >
                      -
                    </button>
                    <span style={{ fontWeight: "600", fontSize: "0.9rem" }}>
                      {item.cantidad}
                    </span>
                    <button
                      onClick={() =>
                        onCambiarCantidad(item.id, item.cantidad + 1)
                      }
                      disabled={item.cantidad >= item.stock}
                      style={{
                        width: "26px",
                        height: "26px",
                        borderRadius: "6px",
                        border: "1px solid #ccc",
                        background: "#f8f9fa",
                        cursor:
                          item.cantidad >= item.stock
                            ? "not-allowed"
                            : "pointer",
                        fontWeight: "bold",
                        opacity: item.cantidad >= item.stock ? 0.5 : 1,
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => onQuitar(item.id)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "crimson",
                    cursor: "pointer",
                    fontWeight: "bold",
                    fontSize: "1rem",
                  }}
                  title="Eliminar producto"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>

          <div
            style={{
              marginTop: "16px",
              paddingTop: "12px",
              borderTop: "2px solid #0352f1",
            }}
          >
            <p
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontWeight: "bold",
                fontSize: "1.1rem",
              }}
            >
              <span>Total:</span>
              <span>{formatoCOP(totalPagar)}</span>
            </p>

            <input
              type="text"
              placeholder="Nombre del cliente..."
              value={cliente}
              onChange={(e) => onCambiarCliente(e.target.value)}
              style={{
                width: "100%",
                padding: "9px 12px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                marginTop: "10px",
              }}
            />

            <button
              onClick={onConfirmar}
              className="boton-primario"
              style={{ width: "100%", marginTop: "10px" }}
            >
              Confirmar pedido
            </button>
          </div>
        </>
      )}
    </aside>
  );
}