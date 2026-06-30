import React from "react";

export default function AcronimosSecurityPlus() {
  return (
    <div className="space-y-8">
      <div className="max-w-3xl space-y-4">
        <h1 className="text-3xl font-bold">Acrónimos de CompTIA Security+</h1>
        <p className="text-base leading-7">
          Esta página es un recurso simple y práctico para estudiar los acrónimos más útiles de
          redes y seguridad. Si necesitas repasar rápido, descarga el PDF y úsalo como recurso de estudio.
        </p>
      </div>

      <div className="max-w-3xl overflow-hidden rounded-2xl shadow-lg">
        <img src="/images/Blog/Acronimos/redes.jpg" alt="Acrónimos Security Plus" className="w-full h-auto" />
      </div>

      <div className="max-w-3xl space-y-3">
        <p>
          El PDF está disponible directamente desde el sitio. Es ideal para repasos offline,
          imprimir o tenerlo como referencia rápida durante tu estudio.
        </p>

        <a
          href="/pdf/Acronimos_Security+.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-xl bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-500"
        >
          Descargar PDF de acrónimos de Security+
        </a>
      </div>

      <div className="max-w-3xl space-y-3">
        <h2 className="text-2xl font-semibold">Consejo</h2>
        <p>
          Si estás estudiando para Security+, utiliza este PDF como apoyo y combina su lectura con ejemplos de 
          preguntas de examen. Esto te ayudará a reforzar tu comprensión de los acrónimos y su aplicación práctica. 
        </p>
      </div>
    </div>
  );
}
