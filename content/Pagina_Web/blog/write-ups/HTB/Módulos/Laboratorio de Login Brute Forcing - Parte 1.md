--- 
title: "Laboratorio de Login Brute Forcing 1"  
date: 2025-08-17
tags: [hackthebox, login, brute force]
categories: ["Brute Force", "Hack The Box"]
summary: "En este breve laboratorio repasamos fuerza bruta por http con `hydra`."
draft: false 

---
![](../../../../../images/Miniaturas/login_brute_forcing_1.png)
#### Enunciado
La primera parte de la evaluación de habilidades requerirá que accedas a la instancia de destino mediante fuerza bruta. Si encuentras el inicio de sesión correcto, obtendrás el nombre de usuario necesario para iniciar la segunda parte de la evaluación de habilidades.
Es posible que las siguientes listas de palabras le resulten útiles en esta tarea: [nombresdeusuario.txt](https://github.com/danielmiessler/SecLists/blob/master/Usernames/top-usernames-shortlist.txt) y [contraseñas.txt](https://github.com/danielmiessler/SecLists/blob/master/Passwords/Common-Credentials/2023-200_most_used_passwords.txt)


**¿Cuál es la contraseña para el inicio de sesión de autenticación básica?**
Antes de nada vamos a descargarnos las listas que nos dan.
Ahora procedemos a hacer fuerza bruta 
```bash
hydra -L users.txt -P passwds.txt <IP> -s <Puerto> http-get
```

![](../../../../../images/HTB_modulos/Login_Brute_Force_htb_lab_1/flag_1-1.png)
Y vemos que tenemos login exitoso.

**Después de haber forzado con éxito el inicio de sesión, ¿cuál es el nombre de usuario que le han dado para la siguiente parte de la evaluación de habilidades?**

Ahora accedemos a la dirección que nos dan (http://IP:Puerto/) en el navegador y nos logueamos con las credenciales.

![](../../../../../images/HTB_modulos/Login_Brute_Force_htb_lab_1/flag_1-3.png)
Obtenemos el usuario `satwossh`


Si te sirvió de algo este tutorial ya para mi es más que suficiente, si me puedes decir en que podemos mejorar te lo voy a agradecer un montón.