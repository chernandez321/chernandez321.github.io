--- 
title: "Laboratorio de Footprinting - Medio"  
date: 2025-04-25  
tags: ["Footprinting","Enumeración","NFS","SMB","RDP","SQL Server", "Hack The Box"]  
categories: ["Footprinting","NFS","SMB","RDP","SQL Server"]  
summary: "En este laboratorio intermedio de **footprinting**, exploramos un servidor de red interna utilizando técnicas de enumeración activa. Aprovechando servicios como **NFS**, **SMB** y **RDP**, encadenamos vulnerabilidades que nos permitieron extraer credenciales sensibles y acceder a una base de datos"
draft: false 

---
#### Enunciado
En este laboratorio intermedio de footprinting, analizamos un servidor accesible para usuarios de red interna. Utilizaremos técnicas OSINT y de enumeración activa para identificar servicios vulnerables, extraer credenciales y lograr acceso al sistema. El objetivo es obtener las credenciales del usuario `HTB`.

#### **Enumeración de puertos**
Vamos con lo básico a ver qué servicios están corriendo sobre el servidor.
```bash
nmap -p- -sS --min-rate 2000 -n -Pn <IP>
```

![](../../../../../images/HTB_modulos/footprinting_htb_labs_2/medio1.png)
Ahora vamos a ver con un poco más de detalle que hay corriendo en cada puerto que nos salió a ver si vemos algo interesante.
```bash
nmap -p111,135,139,445,2049,3389,5985,47001 -sCV -n -Pn <IP>
```

![](../../../../../images/HTB_modulos/footprinting_htb_labs_2/medio2.png)

![](../../../../../images/HTB_modulos/footprinting_htb_labs_2/medio3.png)

![](../../../../../images/HTB_modulos/footprinting_htb_labs_2/medio4.png)

Perfecto podemos ir trabajando con esto.
##### **Análisis del servicio NFS (puerto 111)**
El puerto 111 suele estar asociado al `NFS` donde su finalidad es que los usuarios transfieran información.
Con el siguiente comando vemos si hay información disponible:
```bash 
showmount -e <IP>
```
![](../../../../../images/HTB_modulos/footprinting_htb_labs_2/medio5.png)
Y vemos que hay una carpeta llamada `TechSupport`

A continuación montamos dicho servicio para acceder desde nuestra máquina local
```bash
mount -t nfs <IP>:/ ./ -o nolock
```
Y Listamos su contenido:
![](../../../../../images/HTB_modulos/footprinting_htb_labs_2/medio6.png)
sin embargo notamos un archivo diferente al resto cuando listamos con `ls -la`
![](../../../../../images/HTB_modulos/footprinting_htb_labs_2/medio7.png)
Abrimos el archivo y vemos lo siguiente:
![](../../../../../images/HTB_modulos/footprinting_htb_labs_2/medio8.png)
Donde obtenemos un usuario y contraseña para `smtp`

##### **Acceso mediante SMB (puerto 445)**
Enumeramos para tener más detalle al respecto
```bash
nmap -p445 -sCV -n -Pn <IP>
```
![](../../../../../images/HTB_modulos/footprinting_htb_labs_2/medio9.png)
Donde vemos que está montado un servicio de smb donde entiendo que se comparta información entre usuarios de la red. 
Vamos a intentar conectarnos.
```bash
smbclient -L //<IP> -N
```
![](../../../../../images/HTB_modulos/footprinting_htb_labs_2/medio10.png)
Y veo que necesito credenciales, intentamos con las credenciales que recopilamos antes 
```bash
smbclient -L //<IP> -U alex --password='lol123!mD'
```
![](../../../../../images/HTB_modulos/footprinting_htb_labs_2/medio11.png)
Donde veo que contenido hay, pero no me puedo conectar.
Intentamos listar el contenido de `devshare`
```bash
smbclient //10.129.118.197/devshare -U alex --password='lol123!mD'
```
![](../../../../../images/HTB_modulos/footprinting_htb_labs_2/medio12.png)
Y vemos que podemos entrar, donde vemos que hay un archivo **important.txt**
![](../../../../../images/HTB_modulos/footprinting_htb_labs_2/medio13.png)
Nos descargamos el archivo a local y vemos que tiene lo siguiente:
![](../../../../../images/HTB_modulos/footprinting_htb_labs_2/medio14.png)
Seguimos revisando pero no vi nada más interesante en el servidor.

#### **Acceso remoto RDP (puerto 3389)**

Dado que este puerto está abierto y es orientado a la conexión intentamos con lo que tenemos enumerar y conectarnos
![](../../../../../images/HTB_modulos/footprinting_htb_labs_2/medio15.png)

Aquí recolectamos la versión del servidor y el nombre.
Intentamos conectarnos con lo que tenemos 
```bash
xfreerdp /u:alex /p:'lol123!mD' /v:<IP>
```
![](../../../../../images/HTB_modulos/footprinting_htb_labs_2/medio16.png)
Y vemos que tenemos acceso, con lo cual procedemos a revisar el servidor a ver si vemos la flag por algún lugar. 

Sin embargo abrimos el Microsoft SQL Server Management Studio 18 como `administrador` 
utilizando la clave anteriormente recolectada y nos permite entrar a la aplicación.
`sa:87N1ns@slls83`
![](../../../../../images/HTB_modulos/footprinting_htb_labs_2/medio17.png)
Y nos conectamos a la base de datos con autenticación de Windows.
Una vez dentro del SQL Server Management Studio, exploramos las bases de datos disponibles  y vemos que contamos con una base  de datos llama `cuentas` y dentro de ella una tabla llamada `dbo.devsacc` donde contamos con datos de usuarios y contraseñas.
![](../../../../../images/HTB_modulos/footprinting_htb_labs_2/medio18.png)

Y revisando en dicha tabla vemos que efectivamente hay un usuario HTB con la contraseña que es nuestra flag

![](../../../../../images/HTB_modulos/footprinting_htb_labs_2/medio19.png)

Este laboratorio demuestra cómo un simple acceso a un recurso NFS mal configurado puede desencadenar una cadena de ataques que terminan en el acceso completo a una base de datos crítica. Siempre es clave validar configuraciones de servicios internos que muchas veces se dan por seguras dentro de la red.

Si te sirvió de algo este tutorial ya para mi es más que suficiente, si me puedes decir en que podemos mejorar te lo voy a agradecer un montón.