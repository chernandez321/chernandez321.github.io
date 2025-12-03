--- 
title: "Bandit Nivel 25->26"  
date: 2024-11-05
tags: ["Bash", "OverTheWire"]  
categories: ["Bash"]  
summary: "Nos conectamos por ssh a una consola que no es bash."  
draft: false 

---

**Objetivo:** Iniciar sesión en bandit26 desde bandit25 debería ser bastante fácil... El shell del usuario bandit26 no es /bin/bash, sino algo diferente. Descubre qué es, cómo funciona y cómo salir de él.

NOTA: si eres un usuario de Windows y normalmente usas Powershell para acceder a bandit por SSH: se sabe que Powershell causa problemas con la solución prevista a este nivel. Deberías usar el símbolo del sistema en su lugar.

Nos conectamos a  la máquina:
```bash
ssh bandit25@bandit.labs.overthewire.org -p 2220
#Password bandit25
```

En el enunciado nos comentan que la terminal de bandit26 no es /bin/bash vamos a  echarle un vistazo. 

```bash
cat /etc/passwd | grep "bandit26"
```

![](Pasted_image_20241219102945.png)
Vemos que es un archivo llamado showtext. Vamos a verlo

```bash
cat /usr/bin/showtext
```
![](Pasted_image_20241219103119.png)

- Que vemos aquí se esta definiendo el archivo se interprete como por la shell  /bin/sh. 
- Luego define la variable TERM=linux, esto permite que el comando more funcione correctamente en el entorno actual.
- A continuacion ejecuta more a ~/text.txt lo que permite visualizar el archivo en modo paginado, con lo cual podemos interactuar a la vez que leemos el archivo y finalmente hace un exit al programa.

Vamos a leer el archivo text.txt

```bash
cat /home/bandit26/text.txt
```
![](Pasted_image_20241219104220.png)

Y vemos que no tenemos capacidad de lectura dado que estamos como bandit25.

Por otro lado si listamos nuestro directorio en bandit 25, vemos que contamos con una llave privada para el usuario bandit26.

![](Pasted_image_20241219104440.png)

Vale vamos a conectarnos al bandit 26, a ver como accedemos:
```bash
ssh -i bandit26.sshkey -p 2220 bandit26@localhost
```
![](Pasted_image_20241219104748.png)

Sin embargo vemos que nos cierra la conexión. Vamos a intentar entrar en el modo interactivo que vimos antes con more hacemos la consola pequeña para que nos cargue el contenido en modo paginado. 

```bash
ssh -i bandit26.sshkey -p 2220 bandit26@localhost
```
![](Pasted_image_20241219105028.png)

Damos v para entrar en  el modo inserción 
Damos Esc Shif + :  
Y nos definimos una variable con valor /bin/bash

![](Pasted_image_20241219105346.png)

Damos Esc Shif + :  
Y llamamos a dicha variable
`:shell`
![](Pasted_image_20241219110605.png)
Y ya estamos como bandit26. Vamos a por el password
```bash
cat /etc/bandit_pass/bandit26
```
![](Pasted_image_20241219110730.png)

Dando la contraseña para el siguiente nivel: s0773xxkk0MXfdqOfPRVr9L3jJBUOgCZ

Ya que estamos dentro del usuario bandit 26 se recomienda hacer el siguiente a continuación sin salir de la sesión.






