---
title: Bandit Nivel 7 -> 8
description: Vamos a filtrar los datos en un documento usando el comando grep.
draft: false
---

**Objetivo:** La contraseña para el siguiente nivel se almacena en el archivo data.txt junto a la palabra **millionth**.

Nos conectamos a  la máquina:
```bash
ssh bandit7@bandit.labs.overthewire.org -p 2220
#Password bandit7
```

Listamos el contenido
```bash
ls
```
![](Pasted%20image%2020241211002835.png)
Leemos el archivo data.txt
```bash
cat data.txt
```
Sin embargo es muy grande, con lo debemos filtrar su contenido para llegar a una mejor respuesta, en este caso con el comando grep.

```bash
cat data.txt | grep "millionth"
```

![](Pasted%20image%2020241211003103.png)

Dando como resultado la contraseña.

La contraseña para el siguiente nivel es: dfwvzFQi4mU0wfNbFOe9RoWskMLg7eEc







