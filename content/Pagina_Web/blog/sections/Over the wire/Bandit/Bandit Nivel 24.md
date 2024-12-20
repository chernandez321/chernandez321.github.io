---
title: Bandit Nivel 24 -> 25
description: Resolución de Bandit.
draft: false
weight: "25"
---

**Objetivo:** Un servicio está escuchando en el puerto 30002 y te dará la contraseña de bandit25 si le das la contraseña de bandit24 y un código PIN secreto de 4 dígitos. No hay forma de recuperar el código PIN excepto si se recorren las 10 000 combinaciones, lo que se denomina fuerza bruta.
No necesitas crear nuevas conexiones cada vez

Nos conectamos a  la máquina:
```bash
ssh bandit24@bandit.labs.overthewire.org -p 2220
#Password bandit24
```

Vamos a echarle un vistazo al servicio:
```bash
nc localhost 30002
```
![](Pasted%20image%2020241219000352.png)
Vemos que nos dice que le pasemos el password de bandit 24, seguido de un espacio y luego un pincode. Que en el enunciado del ejercicio dice que va desde 0 a 9999. Y que debemos aplicar fuerza bruta.
Cuando le paso el password de bandit 24 y un pin cualquiera me responde esto y se queda esperand le pases nuevamente otra petición.
![](Pasted%20image%2020241219000740.png)

Con lo cual procedemos con este formato a abarcar todas las posibilidades, nos creamos un directorio de trabajo temporal
```bash
mktemp -d
cd /tmp/tmp.I9jP7NN4Ob 
```
Luego hacemos una cadena con el formato anteriormente definido **pass_bandit24 pincode** y lo guardamos en un archivito.txt
```bash
for i in {0..9999}; do echo "gb8KRRCsshuZXI0tUuR6ypOFjiZbf3G8 $i"; done > data.txt
```
Luego ya con todas las combinaciones en la mano se las pasamos al servicio:
```bash
cat data.txt | nc localhost 30002
```
![](Pasted%20image%2020241219001356.png)
Se puede mejorar filtrando el output pero bueno ya tenemos el password.

Dando la contraseña para el siguiente nivel: iCi86ttT4KSNe1armKiwbQNmB3YJP3q4







