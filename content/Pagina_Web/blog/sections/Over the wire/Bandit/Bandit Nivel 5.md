--- 
title: "Bandit Nivel 5->6"  
date: 2024-11-25  
tags: ["Bash", "OverTheWire","find"]  
categories: ["Bash"]  
summary: "Localizamos un archivo con un tamaño específico utilizando herramientas como find."  
draft: false 

---

**Objetivo:** La contraseña para el siguiente nivel se almacena en un archivo en algún lugar del directorio inhere y tiene las siguientes propiedades:

- legible para humanos
- 1033 bytes de tamaño
- no ejecutable

Nos conectamos a  la máquina:
```bash
ssh bandit5@bandit.labs.overthewire.org -p 2220
#Password bandit5
```

Listamos el contenido
```bash
ls
```
![](Pasted%20image%2020241210233254.png)
Entramos en la carpeta inhere
```bash
cd inhere/
ls
```
![](Pasted%20image%2020241210233434.png)

Perfecto tenemos que encontrar el archivo con dichas caracteríticas, vamos con el comando find.
```bash
find /home/bandit5/inhere/ -size 1033c 
```
- -size es para filtrar por tamaño en este caso 1033 bytes.
![](Pasted%20image%2020241210235720.png)
Luego comprobamos si es legible:
```bash
find /home/bandit5/inhere/ -size 1033c | xargs file 
```
![](Pasted%20image%2020241210235957.png)
Es legible. Confirmamos los permisos:
```bash
find /home/bandit5/inhere/ -size 1033c | xargs ls -l
```
![](Pasted%20image%2020241211000133.png)
Efectivamente vemos que no tiene permisos de ejecución, pues no tiene ninguna x. Cumple todos los requisitos. Procedemos a leerlo.
```bash
cat /home/bandit5/inhere/maybehere07/.file2 
```
![](Pasted%20image%2020241211000413.png)

La contraseña para el siguiente nivel es: HWasnPhtq9AVKe0dmk45nxy20cvUa6EG





