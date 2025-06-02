--- 
title: "Laboratorio de Ataques de Contraseña - Fácil"  
date: 2025-05-26  
tags: ["HTB", "Hydra", "FTP", "SSH", "privilege escalation", "brute force", "Linux", "password attacks"]  
categories: ["Password Cracking", "Hack The Box"]
summary: "En este laboratorio de Hack The Box, nos enfrentamos al reto de auditar un servidor con FTP y SSH expuestos. Mediante fuerza bruta con Hydra, acceso a claves SSH y análisis de archivos residuales, logramos escalar privilegios hasta root. Una práctica fundamental para entender errores comunes en la gestión de credenciales y accesos."
draft: false 

---
#### Enunciado
Nuestro cliente, Inlanefreight, nos contrató para evaluar los hosts individuales de su red, centrándonos en el control de acceso. Recientemente, la empresa implementó controles de seguridad relacionados con la autorización que desea que analicemos. Esta evaluación abarca tres hosts. El primero se utiliza para administrar y gestionar otros servidores de su entorno.

#### **Enumeración de puertos**
Vamos con lo básico a ver qué servicios están corriendo sobre el servidor.
```bash
nmap -p- -sS --min-rate 2000 -n -Pn <IP>
```

![](../../../../../images/HTB_modulos/password_atk_htb_labs_1/nmap1.png)
Vemos que tenemos los puertos 21 y 22 abiertos, vamos a recoger más información de los servicios que hay corriendo en cada puerto que nos salió a ver si vemos algo interesante.
```bash
nmap -p21,22 -sCV -n -Pn <IP>
```

![](../../../../../images/HTB_modulos/password_atk_htb_labs_1/nmap2.png)

Vemos las versiones de los servicios, así como que está corriendo un Linux en el servidor. 

Dado que lo hemos visto en el presente módulo al tener ftp y ssh como servicios corriendo podemos a partir de los recursos que tenemos el username.list y el password.list intentar obtener acceso mediante las credenciales en estas wordlists.

![](../../../../../images/HTB_modulos/password_atk_htb_labs_1/hydra1.png)

```bash
hydra -L /.../username.list -P /.../password.list ftp://<IP> -t 30 -V
```

![](../../../../../images/HTB_modulos/password_atk_htb_labs_1/hydra2.png)

Luego de mucho rato obtenemos un par de credenciales válidas. 

Accedemos por ftp con dichas credenciales:
```bash
ftp <IP>
```
![](../../../../../images/HTB_modulos/password_atk_htb_labs_1/ftp1.png)
Y observamos la presencia de claves SSH (pública y privada), que podrían permitir autenticación por clave.
Las descargamos:
```bash
get id_rsa
get authorized_keys
get id_rsa.pub
```
![](../../../../../images/HTB_modulos/password_atk_htb_labs_1/ftp2.png)

Con dichas claves intentamos acceder por ssh

```bash
ssh mike@<IP> -i id_rsa
#Te va a pedir una passphrase, que es su contraseña (7777777)
```

Sin embargo vemos que nos da un problema con los permisos.
![](../../../../../images/HTB_modulos/password_atk_htb_labs_1/ssh1.png)

Cambiamos los permisos del archivo, lo intentamos de nuevo y estamos dentro.
```bash 
chmod 
```
![](../../../../../images/HTB_modulos/password_atk_htb_labs_1/ssh2.png)

Ya dentro de la máquina hacemos reconocimiento de archivos vemos los permisos, en que grupo esta el usuario mike, etc y vemos que en el directorio de mike hay un archivo **.bash_history** 
```bash
ls -la
cat .bash_history
```

En el cual si nos fijamos se esta ejecutando un script de python proporcionando el usuario root y su contraseña.

![](../../../../../images/HTB_modulos/password_atk_htb_labs_1/ep1.png)
La copiamos, e intentamos autenticarnos como root con ella
```bash
su root
```
Y perfecto. Tenemos nuestra flag.
![](../../../../../images/HTB_modulos/password_atk_htb_labs_1/ep2.png)


Si te sirvió de algo este tutorial ya para mi es más que suficiente, si me puedes decir en que podemos mejorar te lo voy a agradecer un montón.