--- 
title: "Laboratorio de Footprinting - Fácil"  
date: 2025-04-21  
tags: ["HTB", "Pentesting","FTP", "DNS"]  
categories: ["Pentesting","FTP", "DNS"]  
summary: "Este laboratorio muestra cómo identificar servicios mal configurados y acceder a un sistema solo con técnicas de recolección de información."
draft: false 

---

#### Enunciado
La empresa nos encargó `Inlanefreight Ltd`realizar pruebas en tres servidores diferentes de su red interna.
Además, nuestros compañeros de equipo encontraron las siguientes credenciales 
"**ceil:qwer1234**"
y señalaron que algunos de los empleados de la empresa estaban hablando sobre claves SSH en un foro.
Los administradores han almacenado un `flag.txt`archivo en este servidor para monitorear nuestro progreso y medir el éxito. Enumere el objetivo completo y envíe el contenido de este archivo como prueba.

#### Enumeración

```bash
nmap -p- -sS --min-rate 2000 -n -Pn <IP>
```

![](../../../../../images/footprinting_htb_labs_1/easy1.png)

```bash
nmap -p21,22,53,2121 -sCV -n -Pn <IP>
```

![](../../../../../images/footprinting_htb_labs_1/easy2.png)
Fijemonos en un detalle en la enumeración de los puertos 21 y 2121 en la descripción o banner en uno pone (**ftp.int.inlanefreight.htb** y en el otro pone **Ceil's FTP**)

##### **Puerto 21**
**Las credenciales ceil:qwer1234 son válidas para el servicio FTP en el puerto 21**.
```bash 
ftp <IP> 21
ceil
Password:qwer1234
```
![](../../../../../images/footprinting_htb_labs_1/easy3.png)
Listamos el contenido sin embargo no vemos nada
![](../../../../../images/footprinting_htb_labs_1/easy4.png)
Salimos
`exit`

**Para el puerto 22,  intentamos entrar pero no podemos acceder con las credenciales que disponemos actualmente**
```bash
ssh ceil@10.129.156.190
```

##### **Puerto 53**
**Nos ponemos a enumerar y encontramos esto:** 
```bash 
dig any inlanefreight.htb @10.129.251.72
```

![](../../../../../images/footprinting_htb_labs_1/easy5.png)

```bash 
dig axfr inlanefreight.htb @10.129.251.72
```

![](../../../../../images/footprinting_htb_labs_1/easy6.png)
Con esta información tenemos ips de servidores internos del supuesto dominio. Sin embargo no vi más.

##### **Puerto 2121**
Intentamos acceder por el puerto 2121 podemos acceder con las credenciales dadas hacemos algo de enumeración. 

![](../../../../../images/footprinting_htb_labs_1/easy7.png)
Cuando listamos el contenido oculto en la ruta en donde entramos vemos la carpeta `.ssh` donde se suelen guardar las claves de usuarios.
![](../../../../../images/footprinting_htb_labs_1/easy8.png)
Lo dicho, entramos en la carpeta y vemos la clave ssh para el usuario actual. Procedemos a descargarla para intentar entrar a la máquina con este recurso.
![](../../../../../images/footprinting_htb_labs_1/easy9.png)
Lo dicho intentamos acceder utilizando este recurso y nos dice que debemos modificar los permisos del archivo, para que no sea accesible por otros.
![](../../../../../images/footprinting_htb_labs_1/easy10.png)
Le cambiamos el permiso al archivo id_rsa con 
```bash
chmod 600 id_rsa
```
Y entramos
```bash
ssh ceil@<IP> -i id_rsa
```
![](../../../../../images/footprinting_htb_labs_1/easy11.png)
Ahora listamos el contenido del servidor 
![](../../../../../images/footprinting_htb_labs_1/easy12.png)
Y tenemos la flag.

#### **Conclusión**
Este laboratorio demostró cómo una combinación de malas prácticas —desde la exposición de credenciales en Internet, la configuración insegura del DNS que permite listar direcciones IP internas, hasta un servidor FTP sin restricciones que aloja archivos confidenciales como claves SSH— puede derivar en el compromiso total del sistema.

La fase de _footprinting_ fue fundamental para identificar vectores de ataque sin necesidad de utilizar fuerza bruta ni técnicas de explotación complejas.

Si te sirvió de algo este tutorial ya para mi es más que suficiente, si me puedes decir en que podemos mejorar te lo voy a agradecer un montón.