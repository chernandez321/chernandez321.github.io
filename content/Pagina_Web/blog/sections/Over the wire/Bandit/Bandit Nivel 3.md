--- 
title: "Bandit Nivel 3->4"  
date: 2024-11-27  
tags: ["Bash", "OverTheWire","ls"]  
categories: ["Bash"]  
summary: "Aprenderemos a manejar archivos ocultos en Linux."  
draft: false 

---

**Objetivo:** La contraseña para el siguiente nivel se almacena en un archivo oculto en el directorio inhere.

Nos conectamos a  la máquina:
```bash
ssh bandit3@bandit.labs.overthewire.org -p 2220
#Password bandit3
```

Listamos el contenido:
```bash
ls
```
![](../../../../../images/Pasted_image_20241210230658.png)

Entramos en la carpeta inhere y listamos su contenido sin embargo no nos devuleve nada, que pasa que tal cual dice la orden el archivo esta oculto.

```bash
cd inhere/
ls
```

![](../../../../../images/Pasted_image_20241210230812.png)

Con lo cual procedemos a listar los archivos ocultos:

```bash
ls -a
```
![](../../../../../images/Pasted_image_20241210230954.png)
Ya tenemos el archivo, procedemos a leerlo 
```bash
cat ...Hiding-From-You
```
![](../../../../../images/Pasted_image_20241210231236.png)

La contraseña para el siguiente nivel es: 2WmrDFRmJIq3IPxneAaMGhap0pFhF3NJ





