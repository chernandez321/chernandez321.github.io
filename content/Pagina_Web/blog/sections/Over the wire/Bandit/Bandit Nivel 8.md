---
title: Bandit Nivel 8 -> 9
description: Resolución de Bandit.
draft: false
weight: "9"
---

**Objetivo:** La contraseña para el siguiente nivel se almacena en el archivo data.txt y es la única línea de texto que aparece solo una vez.

Nos conectamos a  la máquina:
```bash
ssh bandit8@bandit.labs.overthewire.org -p 2220
#Password bandit8
```

Listamos el contenido
```bash
ls
```
![](Pasted%20image%2020241211112420.png)

Leemos el archivo data.txt
```bash
cat data.txt
```

Sin embargo es muy grande, con lo debemos filtrar su contenido para llegar a una mejor respuesta, en este caso con el comando `sort` y `uniq`.

```bash
sort data.txt | uniq -u
```
**Parámetros**
- `sort`  Nos organiza el archivo 
- `uniq -u` Nos permite filtar el contenido por las líneas que aparecen una vez solamente.

![](Pasted%20image%2020241211112839.png)

Dando como resultado la contraseña.

La contraseña para el siguiente nivel es: 4CKMh1JI91bUIZZPXDqGanal4xvAg0JM







