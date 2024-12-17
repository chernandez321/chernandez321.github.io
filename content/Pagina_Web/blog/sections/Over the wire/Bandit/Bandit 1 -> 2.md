---
title: Bandit Nivel 1 -> 2
description: Aprenderás a leer contenido de archivos, aunque tengan nombres inusuales.
draft: false
---

**Objetivo:** La contraseña para el siguiente nivel se almacena en un archivo llamado - ubicado en el directorio de inicio.

Nos conectamos a  la máquina:
```bash
ssh bandit1@bandit.labs.overthewire.org -p 2220
#Password bandit1
```

Listamos el contenido:
```bash
ls
```
![[Pasted image 20241210210650.png]]

Perfecto tenemos el archivo con nombre -, que sucede que el comando cat admite parámetros, como vemos a continuación, con lo que cat - el programa interpreta que viene un parámetro especificado por el usuario.

![[Pasted image 20241210210845.png]]

Con lo cual leemos el archivo de la siguiente forma:
Leyendo desde el directorio actual 
```bash
cat ./-
```
O también le podemos leer especificando la ruta absoluta:
```bash
cat /home/bandit1/-
```

![[Pasted image 20241210211415.png]]

La contraseña para el siguiente nivel es: 263JGJPfgU6LtdEvgfWU1XP5yac29mFx



