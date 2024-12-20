---
title: Bandit Nivel 11 -> 12
description: Resolución de Bandit.
draft: false
weight: "12"
---

**Objetivo:** La contraseña para el siguiente nivel se almacena en el archivo data.txt, donde todas las letras minúsculas (a-z) y mayúsculas (A-Z) se han rotado 13 posiciones.

Nos conectamos a  la máquina:
```bash
ssh bandit11@bandit.labs.overthewire.org -p 2220
#Password bandit11
```

Listamos el contenido
```bash
ls
```
![](Pasted%20image%2020241211115210.png)

Leemos el archivo data.txt
```bash
cat data.txt
```
![](Pasted%20image%2020241211115825.png)
Sin embargo vemos que esta cifrado tal cual nos lo indica en el enunciado del ejercicio. Con lo cual procedemos a decifrarlo. 

Pero antes vamos a ver como funciona el algoritmo de cifrado de rotar 13 posiciones los caracteres.(Conocido como rot13)

![](rot13.png)

Basicamente siguiendo el ejemplo de la imagen las letras:
A + 13 pos = N
B + 13 pos = O
y así sucecivamente.

Con lo cual si nosotros tenemos el texto ya cifrado necesitamos restarle 13 posiciones a esos caracteres para hacerlos legibles.

Con esto claro lo deciframos de la siguiente forma:
```bash
cat data.txt | tr 'A-Za-z' 'N-ZA-Mn-za-m' 
```
Definiendo que nuestro abecedario va a empezar por la N ... hasta la Z, y luego seguimos desde la A hasta la M. (Ya Rotado)

![](Pasted%20image%2020241211121229.png)

Obtenemos la contraseña.

La contraseña para el siguiente nivel es: 7x16WNeHIi5YkIhWsfFIqoognUTyj9Q4







