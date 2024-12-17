---
title: Bandit Nivel 13 -> 14
description: Resolución de Bandit.
draft: false
---

**Objetivo:** La contraseña para el siguiente nivel se almacena en /etc/bandit_pass/bandit14 y solo la puede leer el usuario bandit14. Para este nivel, no obtienes la siguiente contraseña, pero sí una clave SSH privada que se puede usar para iniciar sesión en el siguiente nivel. 
- Nota: localhost es un nombre de host que hace referencia a la máquina en la que estás trabajando

Nos conectamos a  la máquina:
```bash
ssh bandit13@bandit.labs.overthewire.org -p 2220
#Password bandit13
```


Para este nivel partimos de la base de tener la clave privada del usuario bandit14:
```bash
ls
```
![](Pasted%20image%2020241213110313.png)

Que sucede cuando tenemos la clave privada de un usuario la podemos usar como recurso para identificarnos como el, similar a la contraseña. 

Como lo hacemos, tenemos en cuenta que el password esta almacenado en la ruta dada lo que solo la puede leer el usuario bandit14, con lo cual nos tenemos que autenticar como tal.

Lo hacemos de la siguiente forma:
```bash
ssh -i sshkey.private -p 2220 bandit14@localhost
```
**Parámetros:** 
- -i para especificar la clave privada.
- -p para especificar el puerto por el que nos vamos a conectar. (Recordar que en bandit tenemos habilitado el 2220 para los ejercicios, el 22 esta deshabilitado).
- usuario@máquina (el usuario es bandit 14 ya que estamos accediendo con su clave privada y la maquina es la local ya que simplemente necesitamos tener acceso a un directorio que podemos acceder desde donde estamos pero que no podemos leer el archivo por tema de permisos)

![](Pasted%20image%2020241213110740.png)
Ya como bandit 14 nos vamos al directorio indicado:
![](Pasted%20image%2020241213111545.png)
Y vemos que el archivo bandit14 tiene permisos de solo lectura por el usuario propietario que es bandit 14. Le hacemos cat.
![](Pasted%20image%2020241213111728.png)

La contraseña para el siguiente nivel es: MU4VWeTyJk8ROof1qqmcBPaLh7lDCPvS







