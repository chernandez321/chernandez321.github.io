---
title: Bandit Nivel 3 -> 4
description: Aprenderás a manejar archivos ocultos en Linux.
draft: false
weight: "4"
---

**Objetivo:** La contraseña para el siguiente nivel se almacena en un archivo oculto en el directorio inhere.

Nos conectamos a  la máquina:
```bash
ssh bandit3@bandit.labs.overthewire.org -p 2220
#Password bandit3
```

Listamos el contenido:
```bash
ls
```
![ls_bandit3](Pasted%20image%2020241210230658.png)

Entramos en la carpeta inhere y listamos su contenido sin embargo no nos devuleve nada, que pasa que tal cual dice la orden el archivo esta oculto.

```bash
cd inhere/
ls
```

![](Pasted%20image%2020241210230812.png)

Con lo cual procedemos a listar los archivos ocultos:

```bash
ls -a
```
![](Pasted%20image%2020241210230954.png)
Ya tenemos el archivo, procedemos a leerlo 
```bash
cat ...Hiding-From-You
```
![](Pasted%20image%2020241210231236.png)

La contraseña para el siguiente nivel es: 2WmrDFRmJIq3IPxneAaMGhap0pFhF3NJ





