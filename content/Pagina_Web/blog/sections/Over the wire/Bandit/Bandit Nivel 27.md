--- 
title: "Bandit Nivel 27->28"  
date: 2024-11-03
tags: ["Bash", "OverTheWire","git"]  
categories: ["Bash"]  
summary: "Repasamos conceptos de git"  
draft: false 

---

**Objetivo:** Hay un repositorio git en ssh://bandit27-git@localhost/home/bandit27-git/repo a través del puerto 2220. La contraseña para el usuario bandit27-git es la misma que para el usuario bandit27.

Nos conectamos a  la máquina:
```bash
ssh bandit27@bandit.labs.overthewire.org -p 2220
#Password bandit27
```

Nos vamos a crear un directorio temporal para trabajar 
```bash
mktemp -d 
```
Nos movemos dentro
```bash
cd /tmp/tmp.aaJbq8b7G5/
```

Y vemos que enemos que clonar un repositorio de github.
Lo hacemos de la siguiente manera:
```bash
git clone ssh://bandit27-git@localhost:2220/home/bandit27-git/repo
#Luego te pide la contraseña que tal cual nos lo indican en el enunciado del ejercicio es la misma que la de bandit 27.
```
Ya con el repositorio clonado entramos:
![](Pasted%20image%2020241219114344.png)
Entramos vemos que tenemos un archivo README y le hacemos cat.
![](Pasted%20image%2020241219114435.png)

Dando la contraseña para el siguiente nivel: Yz9IpL0sBcCeuG7m9uQFt8ZNpS4HZRcN











