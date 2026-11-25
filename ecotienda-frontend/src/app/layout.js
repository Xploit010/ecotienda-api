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
      <body>
        <div className="contenedor">
          <Encabezado />
          {children}
          <footer className="pie">
            <p>
              Fuente de datos de energía:{" "}
              <a
                href="https://www.xm.com.co"
                target="_blank"
                rel="noopener noreferrer"
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