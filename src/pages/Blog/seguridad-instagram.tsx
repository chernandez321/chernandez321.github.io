import React from "react";

export default function SeguridadInstagram() {
  return (
    <div>
      <p>
        Hoy en día, Instagram no es solo una red social para compartir fotos; es un espacio donde
        conectamos con amigos, gestionamos nuestra imagen pública, incluso hacemos negocios o
        creamos marca personal. Pero, ¿qué tan segura es realmente tu cuenta?
      </p>

      <h2>Configuraciones clave para mejorar tu privacidad</h2>

      <p>
        Cambia la contraseña si sospechas que es débil; recomiendo utilizar un gestor de
        contraseñas como Keepass.
      </p>

      <h3>Activa la autenticación en dos pasos (2FA)</h3>
      <p>
        Abre Instagram → Más → Configuración → Contraseña y seguridad → Autenticación en dos
        pasos. Selecciona una aplicación tipo OTP (Google Authenticator, Microsoft Authenticator)
        en lugar de SMS cuando sea posible.
      </p>

      <h3>Revisar controles de seguridad</h3>
      <p>
        Verifica los dispositivos con sesión iniciada y elimina los que no reconozcas. Revisa los
        correos asociados a la cuenta.
      </p>

      <h3>Administrar cookies</h3>
      <p>
        En el panel de seguridad, revisa "Tu información y permisos" → "Administrar cookies" y
        desactiva las no imprescindibles.
      </p>

      <h3>Buenas prácticas</h3>
      <ul>
        <li>Activa 2FA con una app segura.</li>
        <li>Revisa sesiones activas periódicamente.</li>
        <li>No compartas códigos de verificación.</li>
        <li>No hagas clic en enlaces sospechosos en DMs.</li>
      </ul>

      <p>
        Proteger tu cuenta es más fácil de lo que parece. Dedica unos minutos hoy y navega con más
        tranquilidad mañana.
      </p>
    </div>
  );
}
