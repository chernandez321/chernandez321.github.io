--- 
title: "Bandit Nivel 29->30"  
date: 2024-11-01
tags: ["Bash", "OverTheWire","git"]  
categories: ["Bash"]  
summary: "Repasamos conceptos de git"  
draft: false 

---

**Objetivo:** Hay un repositorio git en ssh://bandit29-git@localhost/home/bandit29-git/repo a través del puerto 2220. La contraseña para el usuario bandit29-git es la misma que la del usuario bandit29.

Clona el repositorio y encuentra la contraseña para el siguiente nivel.

Nos conectamos a  la máquina:
```bash
ssh bandit29@bandit.labs.overthewire.org -p 2220
#Password bandit29
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
git clone ssh://bandit29-git@localhost:2220/home/bandit29-git/repo
#Luego te pide la contraseña que tal cual nos lo indican en el enunciado del ejercicio es la misma que la de bandit 29.
```

Le echamos un ojo al repositorio 
![](Pasted%20image%2020241219121529.png)
Leemos el README.md
![](Pasted%20image%2020241219121613.png)

Y nos dice que no hay passwords en producción.
```bash
git log
```
![](Pasted%20image%2020241219121655.png)
Vemos ahí lo commits pero nada interesante
Vamos a listar las ramas del repositorio:
```bash
git branch -a
```
![](Pasted%20image%2020241219121836.png)

Y vemos lo siguiente estamos en la rama master, sin embargo nos podemos mover a otra rama para ver si encontramos algo intersante.

```bash
git checkout dev
```
![](Pasted%20image%2020241219122007.png)
Leemos el Readme.md
![](Pasted%20image%2020241219122040.png)

Dando la contraseña para el siguiente nivel: qp30ex3VLz5MDG1n91YowTv4Q8l7CDZL











