--- 
title: "Bandit Nivel 2->3"  
date: 2024-11-28  
tags: ["Bash", "OverTheWire","ls"]  
categories: ["Bash"]  
summary: "Aprendemos a leer contenido de archivos, aunque tengan nombres inusuales."  

draft: false 

---

**Objetivo:** La contraseña para el siguiente nivel se almacena en un archivo con espacios en su nombre ubicado en el directorio de inicio.

Nos conectamos a  la máquina:
```bash
ssh bandit2@bandit.labs.overthewire.org -p 2220
#Password bandit2
```

Listamos el contenido:
```bash
ls
```

![[Pasted image 20241210212119.png]]

Sucede igual que el ejercicio anterior, al tener espacios en el nombre te pilla las palabras como archivos independientes. 

Con lo cual leemos el archivo de la siguiente forma:
Leyendo desde el directorio actual 
```bash
cat ./spaces\ in\ this\ filename
```
O también le podemos leer especificando la ruta absoluta:
```bash
cat /home/bandit2/spaces\ in\ this\ filename
```

![[Pasted image 20241210212739.png]]

La contraseña para el siguiente nivel es: MNk8KNH3Usiio41PRUEoDFPqfxLPlSmx





