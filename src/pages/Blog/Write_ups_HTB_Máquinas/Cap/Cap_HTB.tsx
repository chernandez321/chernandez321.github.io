import React from "react";

export default function Cap() {
  return (
    <article className="prose prose-invert">
      <br />
      <img src="/images/Blog/Miniaturas/cap.png" alt="Cap machine thumbnail" className="mx-auto" />
      <br />
      <p>
        <strong>Descripción:</strong> Cap es una máquina Linux fácil que explora vulnerabilidades de 
        seguridad basadas en configuración incorrecta de permisos y acceso a archivos sensibles. 
        El objetivo es obtener acceso inicial y luego escalar privilegios a root.
      </p>
      <br />
        <strong>Objetivos:</strong>
        <br/> 
        <p>Obtener la flag en <code>user.txt</code></p>
        <p>Luego escalar privilegios para obtener la flag en <code>root.txt</code>.</p>
        <br />

      <strong>Reconocimiento</strong>
      <p>Comenzamos con un escaneo inicial de puertos usando nmap:</p>
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

      <img src="/images/Blog/Máquinas/Cap_HTB/Enumeracion/enumeracion_nmap1.png" alt="nmap first scan" className="mx-auto" />
      <br />

      <p>Se detectaron puertos abiertos. Realizamos un escaneo más detallado:</p>
      <br />
      <pre className="rounded bg-muted p-4 overflow-auto">{`nmap -p21,22,80 -n -Pn -sCV {IP}`}</pre>
      <br />

      <img src="/images/Blog/Máquinas/Cap_HTB/Enumeracion/enumeracion_nmap2.png" alt="nmap second scan" className="mx-auto" />
      <br />

      <p>Vemos las versiones de los servicios FTP y SSH, así como la tecnología que está corriendo en el servidor web. </p>
      <br />

      <h2>Análisis del Servicio Web</h2>
      <p>Al acceder al servicio web, vemos que estamos como una interfaz para ver estadísticas de seguridad. Exploramos la aplicación para identificar posibles vulnerabilidades.</p>
      <br />

      <img src="/images/Blog/Máquinas/Cap_HTB/Enumeracion/enumeracion_web_1.png" alt="web enumeration" className="mx-auto" />
      <br />

      <p>Donde nos damos cuenta que en el Dashboard con url 'ip/data/3' nos da unos pocos paquetes de red, sin embargo nos percatamos que al cambiar la url por 'ip/data/0' vemos una mayor cantidad de paquetes.</p>
      <br />

      <img src="/images/Blog/Máquinas/Cap_HTB/Enumeracion/enumeracion_web_2.png" alt="web enumeration" className="mx-auto" />
      <br />

      <p>Este reporte no los podemos descargar y analizarlo en Wireshark.</p>
      <br />

      <img src="/images/Blog/Máquinas/Cap_HTB/Enumeracion/enumeracion_wireshark.png" alt="wireshark analysis" className="mx-auto" />
      <br />

      <p>Donde vemos que hay una autenticación por FTP al servidor con credenciales válidas.</p>
      <p>Las anotamos 'nathan' y 'Buck3tH4TF0RM3!'</p>
      <br />

      <p>Confirmamos que las credenciales funcionan accediendo por FTP al servidor y nos descargamos el archivo 'user.txt' que contiene la primera flag.</p>
      <br />
      
      <pre className="rounded bg-muted p-4 overflow-auto">{`ftp nathan@{IP}`}</pre>
      <br />

      <img src="/images/Blog/Máquinas/Cap_HTB/Enumeracion/enumeracion_ftp.png" alt="ftp credentials" className="mx-auto" />
      <br />

      <img src="/images/Blog/Máquinas/Cap_HTB/Enumeracion/enumeracion_ftp2.png" alt="ftp credentials" className="mx-auto" />
      <br />

      <strong>Explotación</strong>
      <p>Luego vemos que podemos reutilizar esas credenciales para el servicio ssh</p>
      <br />

      <pre className="rounded bg-muted p-4 overflow-auto">{`ssh nathan@{IP}`}</pre>
      <br />

      <img src="/images/Blog/Máquinas/Cap_HTB/Explotacion/acceso_ssh.png" alt="ssh credentials" className="mx-auto" />
      <br />

      <p>Y vemos que tenemos acceso al sistema como el usuario nathan.</p>
      <br />

      <strong>Escalada de Privilegios</strong>
      <p>Ya dentro del sistema como nathan, nuestro objetivo es escalar privilegios a root. Luego de revisar un poco el sistema vemos que hay procesos en el servidor con capabilites, con lo que podemos aprovechar esto.</p>
      <br />
      <pre className="rounded bg-muted p-4 overflow-auto">{`find /usr/bin /usr/sbin /usr/local/bin /usr/local/sbin -type f -exec getcap {} \; /`}</pre>
      <br />
      
      <img src="/images/Blog/Máquinas/Cap_HTB/Escalada/escalada1.png" alt="ssh credentials" className="mx-auto" />
      <br />
      
      <p>En este caso vemos que el /usr/bin/python3.8 tiene el capability CAP_SETUID. Accediendo al recurso <a href="https://gtfobins.org/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400 underline">https://gtfobins.org/</a> podemos que lo podemos explotar.</p>
      <br />
      
      <img src="/images/Blog/Máquinas/Cap_HTB/Escalada/escalada2.png" alt="ssh credentials" className="mx-auto" />
      <br />
      
      <p>Ejecutamos el comando adaptando con el path absoluto de nuestro python3.8</p>
      <br />
      <pre className="rounded bg-muted p-4 overflow-auto">{`/usr/bin/python3.8 -c 'import os; os.setuid(0); os.execl("/bin/sh", "sh")'`}</pre>
      <br />

      <img src="/images/Blog/Máquinas/Cap_HTB/Escalada/escalada3.png" alt="ssh credentials" className="mx-auto" />
      <br />

      <p>Y vemos que ya estamos como root, por lo que ahora solo nos queda obtener la flag de root.</p>
      <br />

      <p>Cap es una máquina que enseña la importancia de configurar correctamente los permisos de archivos y proteger información sensible en las aplicaciones 
      web. Las vulnerabilidades explotadas demuestran cómo una mala configuración puede llevar a la exposición del servidor.</p>
    </article>
  );
}
