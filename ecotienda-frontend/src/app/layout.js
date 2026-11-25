import "./globals.css";
import Encabezado from "../components/Encabezado";

export const metadata = {
  title: "ByteCentral: Equipos de Alta Eficiencia Energética",
  description:
    "Tecnología eficiente para proteger tu bolsillo frente a la crisis energética de El Niño.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body style={{ background: "transparent" }}>
        {/* Video de fondo 100% nítido, sin capa oscura */}
        <video
          src="/fondo.mp4"
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            objectFit: "cover",
            zIndex: -1,
            pointerEvents: "none",
          }}
        />

        <div className="contenedor">
          <Encabezado />
          {children}
          <footer
            className="pie"
            style={{
              color: "#ffffff",
              textShadow: "0 1px 4px rgba(0,0,0,0.8)",
            }}
          >
            <p>
              Fuente de datos de energía:{" "}
              <a
                href="https://www.xm.com.co"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#38bdf8", fontWeight: "bold" }}
              >
                XM Colombia
              </a>
              .
            </p>
            <p>Ingeniería Web I · IU Digital de Antioquia · 2026-2</p>
          </footer>
        </div>
      </body>
    </html>
  );
}