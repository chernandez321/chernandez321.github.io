import React from "react";
import { useImageLightbox } from "@/components/ImageLightbox";

export default function Seguridadwifi() {
  const { LightboxImage, LightboxOverlay } = useImageLightbox();
  return (
    <>
      <LightboxOverlay />
      <div>
      <p>
        Antes de nada me gustaría que tomaras de este artículo recomendaciones para mejorar tu seguridad a nivel de usuario, no tiene 
        porque ser todas las medidas, pero al menos algunas de ellas. Agradecerte por dedicar parte de tu tiempo a leerlo
         y espero que te sea útil.
        </p>
        <br />
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
        Una red Wi-Fi pública es un punto de acceso compartido en espacios públicos (cafeterías, hoteles, aeropuertos, bibliotecas, etc.). A diferencia de tu Wi-Fi de casa (que suele estar protegida 
        con contraseña y solo se conectan tus conocidos), las redes públicas suelen ser abiertas o tener claves simples. En la práctica, esto significa que tu tráfico viaja por un canal abierto en el que
        personas malintencionadas pueden interceptarlo o verlo. </p>
        <p>
        Por ejemplo, un turista se puede conectar al Wi-Fi gratuito del aeropuerto sin darse cuenta de que ciberdelincuentes cercanos pueden espiar su navegación o redirigirlo a sitios falsos.
        En resumen, una Wi-Fi pública es menos confiable: <strong>no controlas quién más está conectado</strong> y puede haber atacantes cerca.
      </p>
      <br />

      <LightboxImage src="/images/Blog/seguridad_wifi/wifi_falso.png" alt="test" />
      <br />


      <strong> Señales de que una red es peligrosa </strong>
      <br />
      <ul className="list-disc list-inside space-y-2 ml-4">
        <li>No tiene contraseña / es de acceso “Libre”. Si ves “WiFi gratuito” o no pide clave alguna, cuidado.</li>
        <li>Nombre sospechoso o genérico. Redes con nombres tipo “Free_Public_WiFi” o “Invitados_123” no suenan oficiales.</li>
        <li>Preguntas inusuales al conectarte. Si al unirte te sale una página de login extraña (pidiendo usuario, número de teléfono o código de cupón) que no 
          reconoces, puede ser un portal falso. Desconfía si antes de navegar pide instalar una app o cambiar ajustes del dispositivo.</li>
        <li>Conexión automática activa. Muchos móviles tratan de reconectarse solos a redes abiertas conocidas. Kaspersky recomienda desactivar la conexión 
          automática a Wi-Fi públicas y obligar a que te pregunte cada vez. Así evitas conectarte sin darte cuenta a un punto malicioso.</li>
        <li>Certificados invalidos o advertencias. Si el navegador te alerta de que un sitio web no es seguro o que su certificado es inválido, ¡no ignores
          la advertencia! Es señal de que alguien podría estar manipulando la conexión.</li>
      </ul>
      <br />
        
      <p>En general, pregunta y verifica: cuando llegues a un aeropuerto, hotel o cafetería, pide al personal el nombre de la red y la contraseña (si la hay), comprueba que coincida y que al conectarte
      el navegador use HTTPS en las páginas. Configura tu dispositivo para que trate las Wi-Fi abiertas como “públicas” (no “privadas”) . Y después de usarlas, haz que tu dispositivo “olvide” la red
      para que no se vuelva a conectar solo .</p>
      <br />

      <LightboxImage src="/images/Blog/seguridad_wifi/https.png" alt="test" />
      <br />

      <strong>Medidas prácticas para mejorar tu seguridad paso a paso </strong>
      <br />
      <p>A continuación, medidas priorizadas y accionables para usar Wi-Fi pública de forma más segura:</p>
      <br />
      <ol className="list-decimal list-inside space-y-4 ml-4">
        <li>
          <strong>Mantén el equipo actualizado y protegido.</strong> Antes de nada, asegúrate de tener el sistema
          operativo y las aplicaciones al día con sus últimas actualizaciones (parches de seguridad). Instala
          y activa un buen antivirus o solución de seguridad (por ejemplo, Kaspersky Internet Security te
          alerta si la red no es fiable, o ESET, Avast, Bitdefender). Un antivirus actualizado puede
          bloquear malware que intentes descargar o conexiones sospechosas. Activa también el
          cortafuegos (firewall) del sistema. Este paso toma minutos y cubre muchas vulnerabilidades
          básicas.
        </li>
        <li>
          <strong>Revisa y configura la conexión.</strong> Antes de conectar, pregunta siempre el nombre exacto de la
          Wi-Fi oficial. Comprueba que coincida. Ten cuidado con redes con nombres idénticos o muy parecidos, señal de trampas.
          En tu dispositivo, marca la red como pública para que el sistema bloquee compartición de archivos. En Windows/Mac abre la
          configuración de Wi-Fi y elige "red pública" o "No aceptar uso compartido". En Android/iOS
          deshabilita la opción de "conexión automática" y desactiva compartir archivos o impresoras
          mientras viajas. Así evitas que tu ordenador exponga carpetas personales en la red.
        </li>
        <li>
          <strong>Usa VPN.</strong> Si es posible, conecta primero una Red Privada Virtual (VPN) antes de navegar. Una
          VPN crea un túnel cifrado desde tu dispositivo hasta un servidor remoto, de modo que aunque
          alguien intercepte el Wi-Fi público no podrá descifrar tus datos. En palabras sencillas, es
          como enviar tu tráfico a través de un túnel secreto. Si no tienes VPN, al menos prioriza sólo ver
          contenido público. Hay VPNs confiables como ProtonVPN (versión gratis con datos ilimitados),
          Windscribe (gratis 10 GB/mes) o servicios de pago populares (NordVPN, Surfshark,
          Kaspersky Secure Connection, etc.). Evita VPNs gratuitas desconocidas, pues muchas venden tus
          datos o tienen cifrado débil.
        </li>
        <li>
          <strong>Usa sitios web con HTTPS.</strong> Fíjate en el icono del candado en el navegador. Un sitio con
          "https://" cifra tus datos (usuario/contraseña, tarjetas, mensajes). HTTPS Everywhere, un
          complemento gratuito para Chrome/Firefox, puede ayudarte a forzar conexiones seguras en
          muchos sitios. Como dice Kaspersky: "solo utiliza páginas web que empiecen por HTTPS…
          encripta todo lo que envías y recibes". Si un sitio de banca o correo no muestra el candado,
          mejor no entrar.
        </li>
        <li>
          <strong>Evita transacciones sensibles y registro de cuentas.</strong> Si necesitas revisar algo urgente (ej. tu
          correo personal), hazlo solo si es imprescindible. Jamás hagas compras, transacciones
          bancarias ni entres a tu correo principal desde un Wi-Fi abierta. Según ESET, si es urgente lo
          mejor es usar los datos móviles o activar VPN. Cerrar sesión de todas tus cuentas antes de
          conectarte es buena idea. Cuanto menos ingreses en páginas que requieran usuario/contraseña,
          menor riesgo de robo de credenciales.
        </li>
        <li>
          <strong>Desactiva compartir y Bluetooth.</strong> Mientras uses una Wi-Fi pública, apaga servicios como
          Compartir archivos en red, AirDrop (iOS), Nearby Share (Android) o impresoras compartidas.
          Eso evita que otros dispositivos en la red accedan a tu PC o smartphone. También desconecta el
          Bluetooth cuando no lo necesites, pues puede suponer un vector extra de ataques.
        </li>
        <li>
          <strong>Olvida la red al terminar.</strong> Después de usar una Wi-Fi pública, ve a la lista de redes guardadas y
          pulsa "Olvidar" o "Eliminar". De ese modo tu dispositivo no se volverá a conectar solo en el
          futuro, evitando trampas de conexión automáticas.
        </li>
        <li>
          <strong>Activa la autenticación de dos factores (2FA).</strong> En todas tus cuentas importantes (correo,
          banca, tiendas, redes sociales) habilita 2FA. Así, aunque alguien robe tu contraseña, necesitará
          un código adicional que solo tú recibes en tu móvil. Es una capa extra de protección recomendada.
        </li>
      </ol>
      <br />

      <strong>Preguntas frecuentes</strong>
      <br />
      <div className="space-y-3">
        <p><strong>¿No es más fácil usar mis datos móviles?</strong> Sí, usar datos 4G/5G es más seguro porque tu conexión no pasa 
        por un hotspot público. Úsalo para tareas críticas o cuando no confíes de la Wi-Fi.</p>
        <p><strong>¿Debe usarse siempre VPN?</strong> No es obligatorio, pero es fuertemente recomendado en redes públicas. Una VPN
         confiable cifra TODO tu tráfico. Sin ella, dependes solo de HTTPS para proteger cada sitio que visites.</p>
        <p><strong>¿Un Wi-Fi con contraseña es seguro?</strong> No necesariamente. Los atacantes pueden conocer o “piratear” claves
         débiles de cafés/hoteles. Siempre verifica el nombre exacto y considera que un atacante podría clonar la red.</p>
        <p><strong>¿Qué es HTTPS y cómo sé que lo uso?</strong> HTTPS es la versión segura de “http”. Fíjate que en la barra del 
        navegador aparezca “https://” y un ícono de candado al lado de la URL. Esto significa que la información va cifrada. En 
        muchos smartphones puede activarse una opción para forzar HTTPS en todas las apps o el navegador.</p>
        <p><strong>¿Y si mi dispositivo se comporta raro?</strong> Si notas que tu móvil o laptop funciona lento tras usar una 
        Wi-Fi pública, desconéctate enseguida. Haz revisión antivirus. Es posible que un atacante haya instalado algo. Cambia 
        contraseñas sensibles desde otra conexión segura.</p>
        <p><strong>¿Las VPN gratis valen la pena?</strong> Algunas son útiles en emergencias (ProtonVPN gratis, Hotspot Shield 
        gratis 500 MB/día). Otras gratuitas muy desconocidas pueden espiar tus datos. Lo ideal es una VPN de pago o de un proveedor 
        de confianza.</p>
        <p><strong>¿Servirá de algo instalar un cortafuegos extra o antivirus móvil?</strong> El antivirus nativo (Windows Defender,
         iOS/Android integrado) ya protege lo básico. Un antivirus adicional puede aumentar la seguridad y suele avisarte de Wi-Fi 
         peligrosas. Sin embargo, la mejor defensa siempre será no exponer datos ni conectarte a redes dudosas.</p>
        <p><strong>¿Cómo recupero mi información si me hackean?</strong> Primero, desconéctate. Cambia todas tus contraseñas desde 
        otro lugar seguro (datos móviles o PC de casa). Revisa tus cuentas bancarias. En España, puedes llamar a la línea de ayuda 
        017 de INCIBE para asesoramiento personalizado. Instaura 2FA y revisa dispositivos autorizados en tus cuentas.</p>
      </div>
      <br />
      <br />

      <strong>Conclusión:</strong>
       <p>Navegar en Wi-Fi pública no es gratis si ignoras la seguridad. Apliquemos el principio de
       “pensar antes de conectar”: consulta siempre al local el nombre de la red, activa VPN o usa datos móviles para asuntos 
       sensibles, verifica el candado HTTPS y mantén tu dispositivo protegido. Siguiendo estas pautas (respaldadas por INCIBE, 
       Kaspersky, ESET, etc.), podrás usar Internet fuera de casa minimizando los riesgos de ataques o robo de información . ¡Tu 
       seguridad digital importa!
       </p>
      <br />

      <br />
      </div>
    </>
  );
}
