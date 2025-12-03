--- 
title: "Laboratorio de Fundamentos de la Red"  
date: 2025-11-30
tags: [HTB,  Redes]
categories: ["Hack The Box"]
summary: "Uso práctico de ifconfig y netstat para identificar interfaces, servicios en escucha y comprender cómo HTB enruta el tráfico mediante la interfaz tun0 dentro de los laboratorios."
draft: false

---

![](../../../../../images/Miniaturas/Network_Foundations.png)
#### Enunciado
Ahora que conocemos los conceptos básicos de las redes informáticas, es hora de aplicarlos en una situación real. En esta evaluación guiada, exploraremos las redes que se encuentran detrás de los entornos de laboratorio de HTB Academy. La evaluación se divide en tres capítulos, pero solo los dos primeros son necesarios para completar las preguntas de seguridad y completar la evaluación. El tercer capítulo es opcional para quienes deseen profundizar en el tema.

`Chapter 1. - Keep me in the Loop`
[→ Haga clic para mostrar ←](https://academy.hackthebox.com/beta/module/289/section/3246)
Voy a resumirlo un poco para que no se nos vaya de más:
La herramienta `ifconfig` se utiliza para configurar interfaces de red y mostrar su estado actual. De forma predeterminada, solo muestra las interfaces activas, pero al usar la `-a`bandera se mostrarán todas, incluidas las que están inactivas. 
Tras ejecutar el comando, deberíamos ver tres interfaces:
- `ens3` -> (Ip pública)
- `lo` -> (loopback)
- `tun0` -> (Ip privada)
```bash
ifconfig -a
```

La utilidad `netstat` muestra las conexiones de red, las tablas de enrutamiento y las estadísticas de la interfaz.
 Con los siguientes párametros enumeramos todos los puertos `TCP` y `UDP` abiertos o en escucha para IPv4 en el formato " `IP:PORT`". 
 Si los permisos lo permiten, también puede mostrar el nombre del programa responsable de cada puerto abierto.
```bash
netstat -tulnp4
```

Al eliminar el párametro `-n`, la salida se mostrará como " `hostname:service`" en lugar de " `IP:PORT`". 
Podemos ver que la dirección IP de bucle invertido se resuelve como `localhost`. 
La `ens3`dirección IP se resuelve como el nombre de host de Pwnbox.
Además, cabe destacar que un servicio que escucha en `0.0.0.0`está escuchando en todas las interfaces.
```bash
netstat -tulp4
```

**¿Qué dirección IPv4 se utiliza cuando un host desea enviar y recibir tráfico de red hacia sí mismo?**

`127.0.0.1`

**¿Cuál es el nombre del programa que escucha en localhost:5901 del Pwnbox?**

`Xtigervnc`

**¿Qué interfaz de red nos permite interactuar con las máquinas de destino en el entorno de laboratorio HTB?**

`tun0`

**¿Qué herramienta de línea de comandos se utiliza para configurar interfaces de red y mostrar su estado actual?**

`ifconfig`

**¿Qué herramienta de línea de comandos se utiliza para mostrar conexiones de red, información de enrutamiento y estadísticas de interfaz?**

`netstat`

**Opcionales:**

**¿Cuál es el comando FTP utilizado para recuperar un archivo? (Formato: XXXX)**

`RETR`

**Omite el filtrado de solicitudes del servicio HTTP de la máquina de destino y envía la bandera encontrada en la respuesta. La bandera tendrá el formato: HTB{...}**

![](../../../../../images/HTB_modulos/Network_Foundations/flag_1-1.png)

`HTB{S00n_2_B_N3tw0rk1ng_GURU!}`


Si te sirvió de algo este tutorial ya para mi es más que suficiente, si me puedes decir en que podemos mejorar te lo voy a agradecer un montón.