---
title: Bandit Nivel 8 -> 9
description: Resolución de Bandit.
draft: false
---

### Nivel 8 -> 9

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
![](Pasted%20image%2020241211003617.png)

Leemos el archivo data.txt
```bash
cat data.txt
```
Sin embargo es muy grande, con lo debemos filtrar su contenido para llegar a una mejor respuesta, en este caso con los comandos `sort` y `uniq`

```bash
sort data.txt | uniq -c | sort
```
**Parámetros**
- -sort ordena el fichero.
- -uniq -c muestra cada línea con la cantidad de veces que aparece. 
- - luego las volvemos a ordenar por cantidad de veces que aparece. 

![](Pasted%20image%2020241211004708.png)

Obtenemos la contraseña.

La contraseña para el siguiente nivel es: 4CKMh1JI91bUIZZPXDqGanal4xvAg0JM







