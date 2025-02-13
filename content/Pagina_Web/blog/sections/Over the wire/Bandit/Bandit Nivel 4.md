--- 
title: "Bandit Nivel 4->5"  
date: 2024-11-26  
tags: ["Bash", "OverTheWire","find"]  
categories: ["Bash"]  
summary: "Localizaremos un archivo con un tamaño específico utilizando herramientas como find."  
draft: false 

---

**Objetivo:** La contraseña para el siguiente nivel se almacena en el único archivo legible por humanos en el directorio inhere. 

Nos conectamos a  la máquina:
```bash
ssh bandit4@bandit.labs.overthewire.org -p 2220
#Password bandit4
```

Listamos el contenido
```bash
ls
```
![](../../../../../images/Pasted_image_20241210232430.png)
Entramos en la carpeta inhere
```bash
cd inhere/
ls
```
![](../../../../../images/Pasted_image_20241210232531.png)

Perfecto tenemos los archivos listados ahora toca ver cual de ellos es legibley lo hacemos de la siguiente manera:
```bash
find . | grep "file" | xargs file
```
Buscamos en el directorio todos los archivos llamados file y de ellos obtenemos el tipo de archivo, dando como resultado file07 que contiene texto.
![](../../../../../images/Pasted_image_20241210232721.png)

Le hacemos un cat 
```bash
cat ./-file07
```
![](../../../../../images/Pasted_image_20241210232924.png)

La contraseña para el siguiente nivel es: 4oQYVPkxZOOEOO5pTW81FB8j8lxXGUQw





