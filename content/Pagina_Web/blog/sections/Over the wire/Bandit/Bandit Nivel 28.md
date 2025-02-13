--- 
title: "Bandit Nivel 28->29"  
date: 2024-11-02
tags: ["Bash", "OverTheWire","git"]  
categories: ["Bash"]  
summary: "Repasamos conceptos de git"  
draft: false 

---

**Objetivo:** Hay un repositorio git en ssh://bandit28-git@localhost/home/bandit28-git/repo a través del puerto 2220. La contraseña para el usuario bandit28-git es la misma que la del usuario bandit28.

Clona el repositorio y encuentra la contraseña para el siguiente nivel.

Nos conectamos a  la máquina:
```bash
ssh bandit28@bandit.labs.overthewire.org -p 2220
#Password bandit28
```

Nos vamos a crear un directorio temporal para trabajar 
```bash
mktemp -d 
```
Nos movemos dentro
```bash
cd /tmp/tmp.wlgKE0NEbX
```

Y vemos que tenemos que clonar un repositorio de github nuevamente.
Lo hacemos de la siguiente manera:
```bash
git clone ssh://bandit28-git@localhost:2220/home/bandit28-git/repo
#Luego te pide la contraseña que tal cual nos lo indican en el enunciado del ejercicio es la misma que la de bandit 28.
```
![](../../../../../images/Pasted_image_20241219115850.png)
Hacemos cat al Readme.md
![](../../../../../images/Pasted_image_20241219115922.png)
Sin embargo no vemos el password. 
Con lo cual vamos a echar un vistazo a los commits del repositorio de git.
```bash
git log
```
![](../../../../../images/Pasted_image_20241219120053.png)

Si nos fijamos en el commit de arriba en la descripción pone que arreglaron la fuga de información. 
Vamos a echarle un vistazo:
```bash
git show 817e303aa6c2b207ea043c7bba1bb7575dc4ea73
```

![](../../../../../images/Pasted_image_20241219120330.png)

Vemos como la línea roja estaba antes y fue borrada y en su lugar esta la línea verde que la añadieron.

Dando la contraseña para el siguiente nivel: 4pT1t5DENaYuqnqvadYs1oE4QLCdjmJ7











