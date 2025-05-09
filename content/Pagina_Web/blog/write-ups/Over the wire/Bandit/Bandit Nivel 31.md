--- 
title: "Bandit Nivel 31->32"  
date: 2024-10-30
tags: ["Bash", "OverTheWire","git"]  
categories: ["Bash"]  
summary: "Repasamos conceptos de git"  
draft: false 

---

**Objetivo:** Aquí hay un repositorio git en ssh://bandit31-git@localhost/home/bandit31-git/repo a través del puerto 2220. La contraseña para el usuario bandit31-git es la misma que la del usuario bandit31.

Clona el repositorio y encuentra la contraseña para el siguiente nivel.

Nos conectamos a  la máquina:
```bash
ssh bandit31@bandit.labs.overthewire.org -p 2220
#Password bandit31
```

Nos vamos a crear un directorio temporal para trabajar 
```bash
mktemp -d 
```
Nos movemos dentro
```bash
cd /tmp/tmp.NQNyShObmr/
```

Y vemos que tenemos que clonar un repositorio de github nuevamente.
Lo hacemos de la siguiente manera:
```bash
git clone ssh://bandit31-git@localhost:2220/home/bandit31-git/repo
```
Luego te pide la contraseña que tal cual nos lo indican en el enunciado del ejercicio es la misma que la de bandit 30.

Le echamos un ojo al repositorio: 
![repo](../../../../images/repo.png)

Valel y tenemos un archivo Readme que nos dice que debemos hacer un push a un archivo que creemos hacia el repositorio remoto. Donde las características del archivo son las que nos dicen nombre y contenido, y hacer el push a la rama master.

Entonces primero vamos a crear el archivo con esas caracteristicas
```bash
echo 'May I come in?' > key.txt
```
Luego hacemos add:
```bash
git add -f key.txt
```
Hacemos el commit:
```bash
git commit -m "mensaje para el commit"
```
Hacemos el push:
```bash
git push -u origin master
```

![](../../../../../images/Pasted_image_20241219132545.png)

Dando la contraseña para el siguiente nivel: 3O9RfhqyAlVBEZpVb6LYStshZoqoSx5K











