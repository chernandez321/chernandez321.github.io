--- 
title: "Bandit Nivel 20->21"  
date: 2024-11-10
tags: ["Bash", "OverTheWire", "SUID"]  
categories: ["Bash"]  
summary: "Ejecución de binarios con privilegios SUID."  
draft: false 

---

**Objetivo:** Hay un binario setuid en el directorio de inicio que hace lo siguiente: establece una conexión con el **host local** en el puerto que especifique como argumento de línea de comandos. Luego lee una línea de texto de la conexión y la compara con la contraseña del nivel anterior (bandit20). Si la contraseña es correcta, transmitirá la contraseña para el siguiente nivel (bandit21).

Nos conectamos a  la máquina:
```bash
ssh bandit20@bandit.labs.overthewire.org -p 2220
#Password bandit20
```

Listamos el contenido:
```bash
ls
```
![](../../../../../images/Pasted_image_20241216144037.png)
Efectivamente vemos el binario con SUID. 
¿Que debemos hacer ? 
Tal cual nos indica el ejercicio, debemos establecer una conexión con la propia máquina para poder maniobrar con el binario. Lo hacemos de la siguiente manera.

Nos conectamos a  la máquina nuevamente en una 2da terminal:
```bash
ssh bandit20@bandit.labs.overthewire.org -p 2220
#Password bandit20
```
Y en esta 2da terminal hacemos un servidor en escucha en el puerto que deseemos.

```bash
nc -l -p 1212 
```
![](../../../../../images/Pasted_image_20241216144642.png)
Y ahí se va a quedar esperando. Luego vamos a la 1ra terminal y ejecutamos el binario especificamos el mismo puerto para establecer la conexión.
```bash
./suconnect 1212
```
![](../../../../../images/Pasted_image_20241216144752.png)

Perfecto ahi tenemos el binario en escucha y el servidor listo para enviar la contraseña del nivel anterior. Simplemente pegamos la contraseña del nivel anterior en la 2da terminal
![](../../../../../images/Pasted_image_20241216145034.png)
Y al enviarla (Enter) recibimos el password del siguiente nivel.
![](../../../../../images/Pasted_image_20241216145127.png)

En la primera terminal nos indica que se ha leído correctamente la cadena y matchea con el password del nivel anterior, por lo que nos envía la contraseña:
![](../../../../../images/Pasted_image_20241216145227.png)

Todo general
![](../../../../../images/Pasted_image_20241216145423.png)

Dando la contraseña para el siguiente nivel: EeoULMCra2q0dSkYj561DX7s1CpBuOBt







