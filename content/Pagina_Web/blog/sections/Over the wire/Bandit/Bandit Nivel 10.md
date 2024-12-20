---
title: Bandit Nivel 10 -> 11
description: Trabajarás con datos codificados en base64.
draft: false
weight: "11"
---

**Objetivo:** La contraseña para el siguiente nivel se almacena en el archivo data.txt, que contiene datos codificados en base64.

Nos conectamos a  la máquina:
```bash
ssh bandit10@bandit.labs.overthewire.org -p 2220
#Password bandit10
```

Listamos el contenido
```bash
ls
```
![](Pasted%20image%2020241211114627.png)

Leemos el archivo data.txt
```bash
cat data.txt
```
![](Pasted%20image%2020241211123051.png)
Sin embargo vemos que esta codificado tal cual nos lo indica en el enunciado del ejercicio. Con lo cual procedemos a decodificarlo de la siguiente forma:

```bash
base64 -d data.txt 
```
**Parámetros**
- -d: Decodifica el archivo de base 64 a texto claro.

![](Pasted%20image%2020241211114901.png)

Obtenemos la contraseña.

La contraseña para el siguiente nivel es: dtR173fZKb0RRsDFSGsg2RWnpNVj3qRr







