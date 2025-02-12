--- 
title: "Bandit Nivel 17->18"  
date: 2024-11-13
tags: ["Bash", "OverTheWire", "diff"]  
categories: ["Bash"]  
summary: "Trabajaremos con diff para ver las diferencias entre 2 archivos."  
draft: false 

---

**Objetivo:**Hay dos archivos en el directorio de inicio: passwords.old y passwords.new. La contraseña para el siguiente nivel está en passwords.new y es la única línea que se ha cambiado entre passwords.old y passwords.new

Nos conectamos a  la máquina:
```bash
ssh bandit17@bandit.labs.overthewire.org -p 2220
#Password bandit17
```

Listamos el contenido del directorio actual:
```bash
ls
```
![](Pasted%20image%2020241213135814.png)

Entonces basicamente lo que debemos buscar es la linea diferente entre estos 2 archivos. Esto lo podemos hacer con el comando diff
```bash
diff passwords.old passwords.new
```
Comando `diff`
- simplemente ponemos archivo 

![](Pasted%20image%2020241213140001.png)

Dando la contraseña para el siguiente nivel: x2gLTTjFwMOhQ8oWNbMN362QKxfRqGlO







