import React from "react";
import { useImageLightbox } from "@/components/ImageLightbox";

export default function Seguridadwifi() {
  const { LightboxImage, LightboxOverlay } = useImageLightbox();
  return (
    <>
      <LightboxOverlay />
      <div>
      <LightboxImage src="/images/Blog/Miniaturas/wifi.png" alt="test" />
      <br />
      <p>
        Las redes Wi-Fi públicas (cafeterías, aeropuertos, hoteles, etc.) son prácticas porque nos ofrecen 
        Internet gratis o compartido, pero extremadamente inseguras para la información personal. Al ser
        abiertas (sin cifrado o con contraseñas débiles), un ciberdelincuente puede “colarse” en tu conexión
        y robar datos como contraseñas, accesos bancarios o fotos. 
        </p>
        <p>
        Este artículo explica de forma sencilla los riesgos concretos con ejemplos cotidianos, además de
        listar señales de peligro y medidas prácticas que nos ayudan a protegernos.
      </p>
      <br />
      <strong>¿Qué es una Wi-Fi pública y por qué es distinta de la doméstica?</strong>
      <br />
      <br />
      <p>
        Una red Wi-Fi pública es un punto de acceso compartido en espacios públicos (cafeterías, hoteles,
        aeropuertos, bibliotecas…). A diferencia de tu Wi-Fi de casa (que suele estar protegida con contraseña 
        WPA2/3 y solo conectan tus conocidos), las redes públicas suelen ser abiertas o tener claves simples.
        . En la práctica, esto significa que tu tráfico viaja por un canal abierto en el que
        personas malintencionadas pueden interceptarlo o verlo. Por ejemplo, un turista en la Puerta del
        Sol puede conectar al Wi-Fi gratuito del centro comercial sin darse cuenta de que hackers
        cercanos podrían espiar su navegación o redirigirlo a sitios falsos. En resumen, una Wi-Fi pública
         es menos confiable: no controlas quién más está conectado y puede haber atacantes ocultos cerca.
      </p>
      <br />
      <p>
        En este post, vamos a hablar sobre cómo mejorar la seguridad de tu cuenta de Instagram, especialmente activando la autenticación en dos pasos (2FA) de la forma más segura, para que tu información personal esté a salvo sin complicaciones técnicas.
      </p>
      <br />
      <h2> Configuraciones clave para mejorar tu privacidad </h2>
      <br />
      <p>Cambia la contraseña si sospechas que es débil; recomiendo utilizar un gestor de contraseñas como Keepass.</p>
      <br />
      <LightboxImage src="/images/Blog/seguridad_instagram/instagram1.png" alt="test" />
      <br />
      <ul>Abre Instagram → Más → Configuración → Contraseña y seguridad</ul>
      <br />
      <LightboxImage src="/images/Blog/seguridad_instagram/instagram2.png" alt="test" />
      <br />
      <p>Seleccionamos Contraseña y seguridad → Cambiar contraseña</p>
      <br />
      <LightboxImage src="/images/Blog/seguridad_instagram/instagram3.png" alt="test" />
      <br />
      <p>2. Activa la autenticación en 2 pasos</p>
      <br />
      <p>Seleccionamos Contraseña y seguridad → Autenticación en dos pasos</p>
      <br />
      <LightboxImage src="/images/Blog/seguridad_instagram/instagram4.png" alt="test" />
      <br />
      <p>A continuación nos va a pedir por donde vamos a configurar ese 2do factor de autenticación, ya sea por sms, whatsapp o alguna aplicación tipo one time token.</p>
      <br />
      <LightboxImage src="/images/Blog/seguridad_instagram/instagram5.png" alt="test" />
      <br />
      <p>Como vemos en la propia aplicación nos recomiendan hacerlo a través de una aplicación; yo personalmente uso Microsoft Authenticator, pero puedes escoger la que mejor te encaje.</p>
      <br />
      <LightboxImage src="/images/Blog/seguridad_instagram/instagram6.png" alt="test" />
      <br />
      <p>Luego que nos va aparecer un código similar a este para que desde nuestra aplicación lo escaneemos.</p>
      <br />
      <LightboxImage src="/images/Blog/seguridad_instagram/instagram7.png" alt="test" />
      <br />
      <p>A continuación, la aplicación del móvil nos va a generar un número de 6 dígitos que vamos a introducir en Instagram, validando esta segunda capa de seguridad sobre nuestra cuenta.</p>
      <br />
      <LightboxImage src="/images/Blog/seguridad_instagram/instagram8.png" alt="test" />
      <br />
      <p>3. Revisar Controles de seguridad.</p>
      <br />
      <p>Seleccionamos Contraseña y seguridad → Controles de seguridad</p>
      <br />
      <LightboxImage src="/images/Blog/seguridad_instagram/instagram9.png" alt="test" />
      <br />
      <p>En esta sección debemos verificar que los dispositivos que hayan iniciado sesión sean solamente los nuestros; eliminar las sesiones iniciadas en los dispositivos que no vayamos a usar más (por ejemplo, el teléfono o el PC de otra persona). Revisemos que los correos electrónicos asociados a la cuenta sean solamente los nuestros.</p>
      <br />
      <p>4. Administrar cookies.</p>
      <br />
      <p>Seleccionamos en el panel de seguridad Tu información y permisos → Administrar cookies.</p>
      <br />
      <LightboxImage src="/images/Blog/seguridad_instagram/instagram10.png" alt="test" />
      <br />
      <p>Recomendación deshabilitar todas las cookies posibles, solamente permitir las imprescindibles para el funcionamiento de la aplicación.</p>
      <br />
      <LightboxImage src="/images/Blog/seguridad_instagram/instagram11.png" alt="test" />
      <br />
      <br />
      <p>Buenas prácticas de seguridad en Instagram.</p>
      <br />
      <p>Activa la autenticación en dos pasos con una app segura (evita usar SMS si es posible).
         Revisa con frecuencia los dispositivos donde tienes la sesión iniciada.
         No hagas clic en enlaces sospechosos en mensajes directos (DMs), aunque parezcan venir de conocidos.
         No compartas códigos de verificación. Instagram nunca te los pedirá por mensaje ni correo.
      </p>
      <br />
      <p>¿Y tú? ¿Ya habías revisado estas configuraciones en tu cuenta?</p>
      <br />
      <p>Proteger tu cuenta de Instagram es más fácil de lo que parece, y puede evitarte muchos dolores de cabeza.</p>
      <br />
      <p>Dedica unos minutos hoy y navega con más tranquilidad mañana.</p>
      <br />
      <p>Si te resultó útil, ¡comparte este post con quien también debería reforzar su seguridad!</p>
      <br />
      </div>
    </>
  );
}
