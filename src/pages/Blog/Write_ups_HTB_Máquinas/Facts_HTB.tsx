import React from "react";

export default function Facts() {
  return (
    <article className="prose prose-invert">
      <br />
      <img src="/images/Blog/Miniaturas/facts.png" alt="Facts machine thumbnail" className="mx-auto" />
      <br />
      <p><strong>Descripción:</strong> Facts es una máquina Linux de dificultad fácil que corre un CMS llamado
      Cameleon. El objetivo es explotar vulnerabilidades de control de acceso para elevar privilegios de
       usuario, luego abusar de una vulnerabilidad LFI para obtener credenciales SSH y finalmente, escalar
       a root explotando permisos sudoers en el binario facter.</p>
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

      <img src="/images/Blog/Máquinas/Facts_HTB/Enumeracion/enumeracion_1.png" alt="nmap first scan" className="mx-auto" />
      <br />

      <p>Se detectaron los puertos 22, 80 y 54321 abiertos. Realizamos un escaneo más detallado:</p>
      <br />
      <pre className="rounded bg-muted p-4 overflow-auto">{`nmap -p22,80,54321 -sCV -n -Pn {IP}`}</pre>
      <br />

      <img src="/images/Blog/Máquinas/Facts_HTB/Enumeracion/enumeracion_2.png" alt="nmap second scan" className="mx-auto" />
      <img src="/images/Blog/Máquinas/Facts_HTB/Enumeracion/enumeracion_3.png" alt="whatweb scan" className="mx-auto" />
      <br />

      <p>Vemos las versiones de los servicios SSH, del servidor web para el servicio HTTP del puerto 80 y por el puerto 54321 vemos otro servicio 
      http donde vemos que corre sobre golang y hay una redireccion que no se resuelve.</p>
      <p>Debemos también añadir al /etc/hosts la dirección http://facts.htb/ que resuelva a la ip de la máquina.
      
      Realizamos una enumeración adicional del servidor web con <code>whatweb</code>:</p>
      <br />
      <pre className="rounded bg-muted p-4 overflow-auto">{`whatweb http://facts.htb`}</pre>
      <br />
      <img src="/images/Blog/Máquinas/Facts_HTB/Enumeracion/enumeracion_4.png" alt="web interface" className="mx-auto" />
      
      <br />

      <p>Confirmamos que la versión de nginx es la 1.26.3, vemos poco más.</p>
      <br />

      <h2>Enumeración del Servicio Web</h2>
      <p>Al acceder al servicio web nos encontramos con la una página web donde analizando la tecnología utilizada, está hecha con un CMS,
        llamado Cameleon, donde vemos algunos posts e imágenes graciosas.</p>
      <br />    

      <p>A continuación, hacemos fuzzing a la página para ver si encontramos alguna ruta interesante:</p>
      <br />
      <pre className="rounded bg-muted p-4 overflow-auto">{`ffuf -u http://facts.htb/FUZZ -w /usr/share/Seclists/rockyou.txt -t 20`}</pre>
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

      <img src="/images/Blog/Máquinas/Facts_HTB/Enumeracion/enumeracion_5.png" alt="api enumeration" className="mx-auto" />
      <br />
      
      <p>Y vemos que existe una ruta /admin/login a la que vamos a echar un vistazo.</p>
      <br />
      <img src="/images/Blog/Máquinas/Facts_HTB/Enumeracion/enumeracion_6.png" alt="web interface" className="mx-auto" />
      <br />
      <p>Donde nos encontramos un panel de autenticación. Lo que vamos a hacer a continuación es crearnos una cuenta en la aplicación para ver 
        si podemos acceder.</p>
      <br />
      <img src="/images/Blog/Máquinas/Facts_HTB/Enumeracion/enumeracion_7.png" alt="web interface" className="mx-auto" />
      <br />
      <p>Vemos que efectivamente podemos loguearnos con la cuenta que creamos.</p>
      <br />
      <img src="/images/Blog/Máquinas/Facts_HTB/Enumeracion/enumeracion_8.png" alt="web interface" className="mx-auto" />

      <br />
      <p>A continuación nos dan la bienvenida al panel de administración, sin embargo vemos que no podemos hacer mucho ahora mismo. 
        Si nos fijamos abajo en el footer de la página nos esta indicando que estamos frente al CMS Cameleon en su versión 2.9.0</p>
      <br />
      <p>Investigando dicha versión vemos que hay algunas vulnerabilidades conocidas, las cuales podemos probar para ver si nos funcionan.</p>
      <br />
      
      <strong>Explotación</strong>
      <p>En el siguiente repositorio vemos que, con un usuario autenticado, podemos cambiar de rol dentro del CMS, permitiendo así acceder a funcionalidades que ahora tenemos restringidas. 
      <a href="https://github.com/Alien0ne/CVE-2025-2304" target="_blank" className="text-blue-500 hover:underline" rel="noopener noreferrer"> Alien0ne/CVE-2025-2304</a></p>
      <br />
      <img src="/images/Blog/Máquinas/Facts_HTB/Explotacion/explotacion_1.png" alt="web interface" className="mx-auto" />
      <br />
      <p>Nos están explicando que debemos iniciar sesión, obtener el CSRF token y añadir el campo <code>password[role]=admin</code> en la petición de cambio de contraseña. Vamos a hacerlo:</p>
      <br />
      <p>Para esto, nos vamos al panel de administración anterior, accedemos a nuestro perfil en la parte superior derecha de la página y hacemos clic en cambiar contraseña. Interceptamos esa petición con <code>Burpsuite</code>.</p>
      <br />
      <img src="/images/Blog/Máquinas/Facts_HTB/Explotacion/explotacion_2.png" alt="web interface" className="mx-auto" />
      <br />
      <p>Observamos que cambiamos la contraseña por "admin" y al final concatenamos el campo indicado en el repositorio de GitHub. Refrescamos la página y se nos deslogueará, por lo que volvemos a iniciar sesión con el mismo usuario y contraseña actualizada.</p>
      <br />
      <img src="/images/Blog/Máquinas/Facts_HTB/Explotacion/explotacion_3.png" alt="web interface" className="mx-auto" />
      <br />
      <p>Donde nos va a mostrar opciones que antes no veíamos. Seguimos investigando y vemos que también hay otra vulnerabilidad conocida que podemos probar: <a href="https://github.com/afifudinmtop/Camaleon-CMS-2.9.0-Vuln?tab=readme-ov-file" target="_blank" className="text-blue-500 hover:underline" rel="noopener noreferrer"> afifudinmtop/CVE-2024-46987</a></p>
      <br />
      <img src="/images/Blog/Máquinas/Facts_HTB/Explotacion/explotacion_4.png" alt="web interface" className="mx-auto" />
      <br />
      <p>Reproducimos la vulnerabilidad con nuestro target y vemos lo siguiente:</p>
      <br />
      <img src="/images/Blog/Máquinas/Facts_HTB/Explotacion/explotacion_5.png" alt="user registration" className="mx-auto" />
      <br />
      <p>Comprobamos así que tenemos LFI en el servidor y vemos dos usuarios: trivia y william. Después de listar algunos archivos, vemos lo siguiente:</p>
      <br />
      <img src="/images/Blog/Máquinas/Facts_HTB/Explotacion/explotacion_6.png" alt="registration form" className="mx-auto" />
      <br />
      <p>La clave pública para el usuario trivia. Procedemos a listarla y vemos que nos muestra:</p>
      <br />
      <img src="/images/Blog/Máquinas/Facts_HTB/Explotacion/explotacion_7.png" alt="registration success" className="mx-auto" />
      <br />
      <p>Mostrándonos la clave privada del usuario trivia. La copiamos localmente.</p>
      <br />
      <img src="/images/Blog/Máquinas/Facts_HTB/Explotacion/explotacion_8.png" alt="invite code" className="mx-auto" />
      <br />
      <p>Sin embargo, cuando intentamos acceder por SSH utilizando esta clave, nos pide una passphrase que no tenemos. Por lo tanto, intentamos descifrarla:</p>
      <br />
      <pre className="rounded bg-muted p-4 overflow-auto">{`ssh2john id_rsa > hash.txt`}</pre>
      <br />
      <pre className="rounded bg-muted p-4 overflow-auto">{`john hash.txt --wordlist=/usr/share/SecLists/rockyou.txt`}</pre>
      <br />
      <img src="/images/Blog/Máquinas/Facts_HTB/Explotacion/explotacion_9.png" alt="account activated" className="mx-auto" />
      <br />
      <p>Contando con la passphrase, podemos intentar acceder por SSH como el usuario trivia usando su clave privada:</p>
      <br />
      <pre className="rounded bg-muted p-4 overflow-auto">{`ssh trivia@{IP} -i id_rsa`}</pre>
      <br />
      <img src="/images/Blog/Máquinas/Facts_HTB/Explotacion/explotacion_10.png" alt="api enumeration" className="mx-auto" />
      <br />
      <p>Nos movemos entre los directorios y encontramos la primera flag en /home/william/user.txt</p>
      <br />
      <img src="/images/Blog/Máquinas/Facts_HTB/Explotacion/explotacion_11.png" alt="api endpoints" className="mx-auto" />
      <br />
      <strong>Escalada de Privilegios</strong>
      <p>Ahora procedemos con la escalada de privilegios. Ejecutamos el comando:</p>
      <br />
      <pre className="rounded bg-muted p-4 overflow-auto">{`sudo -l`}</pre>
      <br />
      <img src="/images/Blog/Máquinas/Facts_HTB/Escalada/escalada_1.png" alt="api user invite" className="mx-auto" />
      <br />
      <p>Vemos que podemos ejecutar el comando facter como root sin contraseña. Investigamos más sobre este comando en <a href="https://gtfobins.org/gtfobins/facter/" target="_blank" className="text-blue-500 hover:underline" rel="noopener noreferrer">GTFOBins</a>.</p>      
      <br />
      <img src="/images/Blog/Máquinas/Facts_HTB/Escalada/escalada_2.png" alt="api user invite" className="mx-auto" />
      <br />
      <p>Vemos que es una vía potencial de escalada. El repositorio nos indica que si ejecutamos:</p>
      <br />
      <pre className="rounded bg-muted p-4 overflow-auto">{`facter --custom-dir=/path/ x`}</pre>
      <br />
      <p>Ejecutará el primer archivo .rb que encuentre en el directorio especificado. Por lo tanto, vamos a crear nuestro propio archivo .rb para obtener una bash y ejecutamos:</p>
      <br />
      <pre className="rounded bg-muted p-4 overflow-auto">{`sudo /usr/bin/facter --custom-dir=/home/trivia/`}</pre>
      <br />
      <img src="/images/Blog/Máquinas/Facts_HTB/Escalada/escalada_3.png" alt="api user invite" className="mx-auto" />
      <br />
      <p>Obtenemos una shell como root. Ahora nos movemos al directorio /root para leer la segunda flag.</p>
      <br />
      <strong>Conclusiones</strong>
      <p>Facts es un excelente ejemplo de cómo un ataque no depende de una única vulnerabilidad sino de cómo
      encadenar varios fallos de seguridad aparentemente pequeños para lograr el control total de un sistema.
      Comenzamos como usuarios normales con acceso limitado, pero encontramos una forma de cambiar nuestro 
      rol dentro de la aplicación. Luego, con más permisos, pudimos acceder a archivos que no deberíamos ver,
      obteniendo credenciales que nos permitieron entrar por SSH. Finalmente, aprovechamos un comando mal
      configurado para obtener acceso de administrador.</p>
    </article>
  );
}