--- 
title: "Bandit Nivel 30->31"  
date: 2024-10-31
tags: ["Bash", "OverTheWire","git"]  
categories: ["Bash"]  
summary: "Repasamos conceptos de git"  
draft: false 

---

**Objetivo:** Hay un repositorio git en ssh://bandit30-git@localhost/home/bandit30-git/repo a través del puerto 2220. La contraseña para el usuario bandit30-git es la misma que la del usuario bandit30.

Clona el repositorio y encuentra la contraseña para el siguiente nivel.

Nos conectamos a  la máquina:
```bash
ssh bandit30@bandit.labs.overthewire.org -p 2220
#Password bandit30
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
git clone ssh://bandit30-git@localhost:2220/home/bandit30-git/repo
#Luego te pide la contraseña que tal cual nos lo indican en el enunciado del ejercicio es la misma que la de bandit 30.
```

Le echamos un ojo al repositorio: 

![](Pasted%20image%2020241219122520.png)
![](Pasted%20image%2020241219122628.png)

Revisamos los logs, nada
![](Pasted%20image%2020241219123934.png)
Revisamos las otras ramas, nada
![](Pasted%20image%2020241219124007.png)
Revisamos las etiquetas:
![](Pasted%20image%2020241219124040.png)
Y vemos una etiqueta secret
```bash
git show secret
```
![](Pasted%20image%2020241219124129.png)

Dando la contraseña para el siguiente nivel: fb5S2xb7bRyFmAvQYQGEqsbhVyJqhnDy











