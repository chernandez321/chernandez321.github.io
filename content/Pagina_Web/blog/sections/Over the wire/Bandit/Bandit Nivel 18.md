---
title: Bandit Nivel 18-> 19
description: Resolución de Bandit.
draft: false
weight: "19"
---

**Objetivo:**La contraseña para el siguiente nivel se almacena en un archivo readme en el directorio de inicio. Lamentablemente, alguien ha modificado .bashrc para cerrar la sesión cuando inicia sesión con SSH.

Nos intentamos conectar a  la máquina:
```bash
ssh bandit18@bandit.labs.overthewire.org -p 2220
#Password bandit18
```

Pero nos pone esto:
![](Pasted%20image%2020241214194833.png)
Nos cierra la conexión, debido a lo comentado en el enunciado del nivel, modificaro el archivo de configuracion .bashrc con lo cual debemos intentar, ejecutar un comando en la misma línea antes que nos lea el archivo de configuración
```bash
ssh bandit18@bandit.labs.overthewire.org -p 2220 whoami
```
![](Pasted%20image%2020241214195805.png)
Y vemos que aquí arriba nos lo ejecuta, con lo que vamos a intentar obtener una consola para poder trabajar.
```bash
ssh -p 2220 bandit18@bandit.labs.overthewire.org bash
```
![](Pasted%20image%2020241214200144.png)
Y vemos ahí que podemos ejecutar comandos,  con lo cual simplemente buscamos el archivo readme y le aplicamos un cat.

Dando la contraseña para el siguiente nivel: cGWpMaKXVwDUNgPAVJbWYuGHVn9zl3j8







