---
title: Bandit Nivel 12 -> 13
description: Resolución de Bandit.
draft: false
---

**Objetivo:** La contraseña para el siguiente nivel se almacena en el archivo data.txt, que es un volcado hexadecimal de un archivo que ha sido comprimido repetidamente. 

**Pistas:** 
- Para este nivel puede ser útil crear un directorio en /tmp en el que pueda trabajar. 
- Utilice mkdir con un nombre de directorio difícil de adivinar.
- O mejor, utilice el comando “mktemp -d”. 

Nos conectamos a  la máquina:
```bash
ssh bandit12@bandit.labs.overthewire.org -p 2220
#Password bandit12
```

Listamos el contenido
```bash
ls
```
![](Pasted%20image%2020241211123546.png)

Leemos el archivo data.txt

```bash
cat data.txt
```

![](Pasted%20image%2020241211123620.png)

Sin embargo vemos que está en hexadecimal tal cual nos lo indica en el enunciado del ejercicio. Con lo cual procedemos a decifrarlo, para hacerlo lo mas cómodo posible nos copiamos al archivo a local.

![](Pasted%20image%2020241212224501.png)
Copiar. 
```bash
exit
cd /home/usuario/Downloads/ | xargs touch data.txt
nano data.txt

```

Ctrl + Shift + v - (Pegar)

Ya que tenemos el archivo en local toca buscar el archivo origen al cual se le aplico este volcado hexadecimal.
```bash
cat data.txt | xxd -r | sponge data.txt
```
Lo abrimos y vemos que no está legible:
![](Pasted%20image%2020241212232141.png)
Le pasamos el comando file para ver el tipo de archivo
![](Pasted%20image%2020241212232250.png)
Y vemos que es un comprimido, procedemos a descomprimirlo:
```bash
7z -x data.txt
```
![](Pasted%20image%2020241212232445.png)
Y vemos que tenemos un archivo llamado data2.bin, le pasamos el file y vemos que este también es un comprimido, lo cual hacemos lo mismo que en el paso anterior.
![](Pasted%20image%2020241212232538.png)
```bash
7z -x data2.bin
```
Al hacerlo nos da otro archivo data2, que igual es un comprimido hacemos la misma operación.
![](Pasted%20image%2020241212233238.png)
..... así sucecivamente hasta llegar al archivo data9.bin
![](Pasted%20image%2020241212233613.png)
Al hacerle file vemos que es un archivo de texto, no un comprimido. 
![](Pasted%20image%2020241212233716.png)
Le hacemos cat y tenemos nuestra flag.
![](Pasted%20image%2020241212233739.png)

La contraseña para el siguiente nivel es: FO5dwFsc0cbaIiH0h8J2eUks2vdTDwAn







