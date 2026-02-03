import React from "react";

export default function Cap() {
  return (
    <article className="prose prose-invert">
      <h1>Write-up Cap - HackTheBox</h1>
      <br />
      <img src="/images/Blog/Miniaturas/Cap.png" alt="Cap machine thumbnail" />
      <br />
      <p>
        <strong>Descripción:</strong> Cap es una máquina Linux fácil que explora vulnerabilidades de 
        seguridad basadas en configuración incorrecta de permisos y acceso a archivos sensibles. 
        El objetivo es obtener acceso inicial y luego escalar privilegios a root.
      </p>
      <br />
      <p>
        <strong>Objetivos:</strong> Obtener la flag en <code>user.txt</code> y luego escalar privilegios 
        para obtener la flag en <code>root.txt</code>.
      </p>
      <br />

      <h2>Reconocimiento</h2>
      <p>Comenzamos con un escaneo inicial de puertos usando nmap:</p>
      <br />
      <pre className="rounded bg-muted p-4 overflow-auto">{`nmap -p- -n -Pn --open -sS --min-rate 1000 {IP}`}</pre>
      <br />
      <p>Parámetros clave:</p>
      <ul>
        <li><code>-p-</code> escanea todos los puertos</li>
        <li><code>-n</code> evita resolución DNS</li>
        <li><code>-Pn</code> no realiza descubrimiento de hosts</li>
        <li><code>--open</code> muestra solo puertos abiertos</li>
        <li><code>-sS</code> SYN stealth scan</li>
        <li><code>--min-rate 1000</code> velocidad mínima de paquetes</li>
      </ul>
      <br />
      <p>Se detectaron puertos abiertos. Realizamos un escaneo más detallado:</p>
      <br />
      <pre className="rounded bg-muted p-4 overflow-auto">{`nmap -p22,80,9999 -n -Pn -sCV {IP}`}</pre>
      <br />

      <h2>Análisis del Servicio Web</h2>
      <p>Utilizamos <code>whatweb</code> y <code>curl</code> para analizar el servicio web:</p>
      <br />
      <pre className="rounded bg-muted p-4 overflow-auto">{"whatweb http://{IP}:80"}</pre>
      <br />
      <p>La aplicación web tiene una interfaz para ver estadísticas de seguridad. Exploramos la aplicación 
      para identificar funcionalidades y posibles vulnerabilidades.</p>
      <br />

      <h2>Enumeración de Directorios</h2>
      <p>Realizamos fuzzing de directorios con gobuster:</p>
      <br />
      <pre className="rounded bg-muted p-4 overflow-auto">{`gobuster dir -u http://{IP} -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt`}</pre>
      <br />
      <p>Identificamos directorios interesantes que pueden contener información sensible o puntos de explotación.</p>
      <br />

      <h2>Identificación de Vulnerabilidades</h2>
      <p>Exploramos los archivos de configuración y datos de la aplicación. Buscamos archivos que puedan 
      contener credenciales, claves o configuraciones inseguras.</p>
      <br />
      <p>La clave está en identificar archivos con permisos incorrectos que expongan información sensible, 
      como capturas de tráfico de red o archivos de configuración.</p>
      <br />

      <h2>Explotación</h2>
      <p>Una vez identificada la vulnerabilidad, realizamos la explotación para obtener acceso inicial 
      a la máquina. Esto nos permite obtener credenciales o acceso directo al sistema.</p>
      <br />
      <p>Nos conectamos al servidor:</p>
      <br />
      <pre className="rounded bg-muted p-4 overflow-auto">{`ssh usuario@{IP}`}</pre>
      <br />
      <p>Buscamos la primera flag:</p>
      <br />
      <pre className="rounded bg-muted p-4 overflow-auto">{`cat /home/usuario/user.txt`}</pre>
      <br />

      <h2>Escalada de Privilegios</h2>
      <p>Verificamos qué comandos podemos ejecutar con sudo:</p>
      <br />
      <pre className="rounded bg-muted p-4 overflow-auto">{`sudo -l`}</pre>
      <br />
      <p>O realizamos enumeración manual del sistema para encontrar vectores de escalada:</p>
      <br />
      <pre className="rounded bg-muted p-4 overflow-auto">{`find / -perm -4000 2>/dev/null`}</pre>
      <br />
      <p>Identificamos un binario o configuración que nos permite escalar a root. Explotamos la 
      vulnerabilidad correspondiente.</p>
      <br />
      <p>Una vez escalados a root, buscamos la segunda flag:</p>
      <br />
      <pre className="rounded bg-muted p-4 overflow-auto">{`cat /root/root.txt`}</pre>
      <br />

      <h2>Conclusión</h2>
      <p>Cap es una máquina que enseña la importancia de configurar correctamente los permisos de archivos 
      y proteger información sensible en las aplicaciones web. Las vulnerabilidades explotadas demuestran 
      cómo una mala configuración puede llevar a la exposición de datos críticos.</p>
    </article>
  );
}
