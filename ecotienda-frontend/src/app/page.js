import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <div className="alerta-aviso" role="alert">
        <strong>Dato crítico El Niño 2026:</strong> En la hora pico (6:00 p.m. a
        9:00 p.m.), el precio en bolsa alcanzó un máximo histórico de{" "}
        <strong>1.612 COP/kWh</strong> en septiembre de 2026.
      </div>

      <section id="intro">
        <h2>Impacto de El Niño 2026 en tu Factura</h2>
        <p style={{ marginBottom: "12px" }}>
          Durante el año 2026, el fenómeno de <strong>El Niño</strong> redujo
          drásticamente el nivel de los embalses en Colombia, provocando un
          aumento masivo en los costos de generación eléctrica. El precio de
          bolsa se multiplicó por 4,4, pasando de{" "}
          <strong>212 COP/kWh en enero</strong> a{" "}
          <strong>942 COP/kWh en agosto de 2026</strong>.
        </p>
        <p style={{ marginBottom: "16px" }}>
          Ante este panorama, la estrategia más efectiva es sustituir
          electrodomésticos y equipos de iluminación antiguos por tecnología
          inverter y LED de bajo consumo. Cada equipo eficiente reduce la
          demanda de la red y genera un ahorro directo en la tarifa mensual.
        </p>
        <Link href="/catalogo" className="btn btn-primario">
          Explorar catálogo de equipos
        </Link>
      </section>

      <section>
        <h2>¿Por qué elegir equipos eficientes ByteCentral?</h2>
        <div className="tarjetas">
          <article className="tarjeta">
            <h3>Reducción de Consumo</h3>
            <p>
              Un bombillo LED de 9 W entrega el mismo flujo luminoso que uno
              incandescente de 60 W consumiendo un 85% menos energía.
            </p>
          </article>
          <article className="tarjeta">
            <h3>Retorno Inmediato</h3>
            <p>
              Gracias al costo actual por kWh, el ahorro mensual acumulado
              amortiza el valor del equipo en pocos meses.
            </p>
          </article>
          <article className="tarjeta">
            <h3>Sostenibilidad Ambiental</h3>
            <p>
              Disminuye la necesidad de encender plantas térmicas altamente
              contaminantes durante las horas pico de demanda.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}