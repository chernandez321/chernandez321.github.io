import React from "react";

export default function Network_Foundations() {
  return (
    <article className="prose prose-invert">
      <h1>Laboratorio de Fundamentos de la Red</h1>
      <br />
      <img src="/images/Blog/Miniaturas/Network_Foundations.png" alt="Network Foundations thumbnail" />
      <br />
      <p>
        Uso práctico de <code>ifconfig</code> y <code>netstat</code> para identificar interfaces, servicios en
        escucha y comprender cómo HTB enruta el tráfico mediante la interfaz <code>tun0</code> dentro de los
        laboratorios.
      </p>
      <br />
      <img src="/images/HTB_modulos/Network_Foundations/Network_Foundations.png" alt="" />
      <h4>Enunciado</h4>
      <br />
      <p>
        Ahora que conocemos los conceptos básicos de las redes informáticas, es hora de aplicarlos en una
        situación real. En esta evaluación guiada, exploraremos las redes que se encuentran detrás de los
        entornos de laboratorio de HTB Academy. La evaluación se divide en tres capítulos, pero solo los dos
        primeros son necesarios para completar las preguntas de seguridad y completar la evaluación. El tercer
        capítulo es opcional para quienes deseen profundizar en el tema.
      </p>
      <br />

      <p>
        <strong>Chapter 1. - Keep me in the Loop</strong>
        <br />
        <br />
        <a href="https://academy.hackthebox.com/beta/module/289/section/3246">→ Haga clic para mostrar ←</a>
      </p>
      <br />

      <p>Voy a resumirlo un poco para que no se nos vaya demasidado extenso:</p>
      <br />

      <p>
        La herramienta <code>`ifconfig`</code> se utiliza para configurar interfaces de red y mostrar su estado
        actual. De forma predeterminada, solo muestra las interfaces activas, pero al usar la bandera <code>`-a`</code>
          se mostrarán todas, incluidas las que están inactivas. Tras ejecutar el comando, deberíamos ver
        tres interfaces:
      </p>
      <br />

      <ul>
        <li><code>ens3</code> — (Ip pública)</li>
        <li><code>lo</code> — (loopback)</li>
        <li><code>tun0</code> — (Ip privada)</li>
      </ul>
      <br />

      <pre className="rounded bg-muted p-4 overflow-auto">{`ifconfig -a`}</pre>
      <br />

      <p>
        La utilidad <code>`netstat`</code> muestra las conexiones de red, las tablas de enrutamiento y las
        estadísticas de la interfaz. Con los siguientes parámetros enumeramos todos los puertos <code>`TCP`</code>
        y <code>`UDP`</code> abiertos o en escucha para IPv4 en el formato <code>`IP:PORT`</code>. Si los permisos lo
        permiten, también puede mostrar el nombre del programa responsable de cada puerto abierto.
      </p>
      <br />

      <pre className="rounded bg-muted p-4 overflow-auto">{`netstat -tulnp4`}</pre>
      <br />

      <p>
        Al eliminar el parámetro <code>-n</code>, la salida se mostrará como <code>`hostname:service`</code> en
        lugar de <code>`IP:PORT`</code>. Podemos ver que la dirección IP de bucle invertido se resuelve como
        <code>localhost</code>. La <code>`ens3`</code> dirección IP se resuelve como el nombre de host de Pwnbox.
        Además, cabe destacar que un servicio que escucha en <code>`0.0.0.0`</code> está escuchando en todas las
        interfaces.
      </p>
      <br />

      <pre className="rounded bg-muted p-4 overflow-auto">{`netstat -tulp4`}</pre>
      <br />

      <h3>Preguntas y respuestas</h3>
      <br />

      <p><strong>¿Qué dirección IPv4 se utiliza cuando un host desea enviar y recibir tráfico de red hacia sí mismo?</strong></p>
      <p><code>127.0.0.1</code></p>
      <br />

      <p><strong>¿Cuál es el nombre del programa que escucha en localhost:5901 del Pwnbox?</strong></p>
      <p><code>Xtigervnc</code></p>
      <br />

      <p><strong>¿Qué interfaz de red nos permite interactuar con las máquinas de destino en el entorno de laboratorio HTB?</strong></p>
      <p><code>tun0</code></p>
      <br />

      <p><strong>¿Qué herramienta de línea de comandos se utiliza para configurar interfaces de red y mostrar su estado actual?</strong></p>
      <p><code>ifconfig</code></p>
      <br />

      <p><strong>¿Qué herramienta de línea de comandos se utiliza para mostrar conexiones de red, información de enrutamiento y estadísticas de interfaz?</strong></p>
      <p><code>netstat</code></p>
      <br />

      <h4>Opcionales</h4>
      <p><strong>¿Cuál es el comando FTP utilizado para recuperar un archivo? (Formato: XXXX)</strong></p>
      <p><code>RETR</code></p>
      <br />

      <p>Omite el filtrado de solicitudes del servicio HTTP de la máquina de destino y envía la bandera encontrada en la respuesta. La bandera tendrá el formato: HTB{'{...}'}</p>
      <br />
      <img src="/images/Blog/Network_Foundations_HTB/flag_1-1.png" alt="flag" />
      <br />
      <pre className="rounded bg-muted p-4 overflow-auto">{`HTB{S00n_2_B_N3tw0rk1ng_GURU!}`}</pre>
      <br />
      <p>
        Si te sirvió de algo este tutorial ya para mi es más que suficiente, si me puedes decir en que podemos
        mejorar te lo voy a agradecer un montón.
      </p>
    </article>
  );
}
