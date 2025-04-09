--- 
title: "Bandit Nivel 32->33"  
date: 2024-10-29
tags: ["Bash", "OverTheWire"]  
categories: ["Bash"]  
summary: "Lidiamos con una terminal que nos convierte todo a mayúsculas"  
draft: false 

---

**Objetivo:** Después de todo este asunto de git, es hora de escaparse otra vez. ¡Buena suerte!

Nos conectamos a  la máquina:
```bash
ssh bandit32@bandit.labs.overthewire.org -p 2220
#Password bandit32
```

Hacemos varios comandos básicos 
![](../../../../../images/Pasted_image_20241219134359.png)
Sin embargo vemos que nos lo convierte a mayúsculas, por lo que no nos lo interpreta. Podes ver que no es una bash sino una sh. 

Que hacemos en este punto:
Con el comando $0 hacemos referencia a la shell. Sin que nos pueda convertir nada a mayusculas.
```bash
$0
```
![](../../../../../images/Pasted_image_20241219134646.png)
Vemos que nos da una consola y luego nos lanzamos una bash para trabajar.
```bash
cat /etc/bandit_pass/bandit33
```
![](../../../../../images/Pasted_image_20241219134925.png)

Si nos vamos al directorio /home/bandit33 
```bash
cd /home/bandit33
```
Y leemos el archivo
![](../../../../../images/Pasted_image_20241219135143.png)

Donde nos da un mensaje de felicitaciones ya que hemos resuelto todos los ejercicios de bandit.

