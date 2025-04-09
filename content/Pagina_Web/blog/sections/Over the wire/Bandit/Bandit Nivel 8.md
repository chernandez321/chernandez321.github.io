--- 
title: "Bandit Nivel 8->9"  
date: 2024-11-22  
tags: ["Bash", "OverTheWire","uniq"]  
categories: ["Bash"]  
summary: "Vamos a filtrar los datos que no se repiten en un documento usando el comando uniq."  
draft: false 

---

**Objetivo:** La contraseña para el siguiente nivel se almacena en el archivo data.txt y es la única línea de texto que aparece solo una vez.

Nos conectamos a  la máquina:
```bash
ssh bandit8@bandit.labs.overthewire.org -p 2220
#Password bandit8
```

Listamos el contenido
```bash
ls
```
![](../../../../../images/Pasted_image_20241211112420.png)

Leemos el archivo data.txt
```bash
cat data.txt
```

Sin embargo es muy grande, con lo debemos filtrar su contenido para llegar a una mejor respuesta, en este caso con el comando `sort` y `uniq`.

```bash
sort data.txt | uniq -u
```
**Parámetros**
- `sort`  Nos organiza el archivo 
- `uniq -u` Nos permite filtar el contenido por las líneas que aparecen una vez solamente.

![](../../../../../images/Pasted_image_20241211112839.png)

Dando como resultado la contraseña.

La contraseña para el siguiente nivel es: 4CKMh1JI91bUIZZPXDqGanal4xvAg0JM







