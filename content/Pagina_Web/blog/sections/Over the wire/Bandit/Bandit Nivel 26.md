--- 
title: "Bandit Nivel 26->27"  
date: 2024-11-04
tags: ["Bash", "OverTheWire","SUID"]  
categories: ["Bash"]  
summary: "Usamos un archivo con SUID para listar el passwd del usuario siguiente"  
draft: false 

---

**Objetivo:** ¡Buen trabajo consiguiendo un shell! ¡Ahora date prisa y consigue la contraseña para bandit27!

Que sucede tener en cuenta que en bandit 26 no tenemos una bash sino el archivo showtext. Con lo cual para conectarnos debemos hacer igual que en el ejercicio anterior.
Listamos el contenido de mi directorio:
```bash 
ls
```
![](../../../../../images/Pasted_image_20241219111632.png)
vemos que tenemos un archivo suid y el text.txt que recordemos que se usa para la shell de bandit 26.
Ejecutamos el archivo y vemos lo siguiente 
```bash
./bandit27-do
```
![](../../../../../images/Pasted_image_20241219111828.png)
![](../../../../../images/Pasted_image_20241219111942.png)
Nos permite ejecutar comandos como bandit27
Así que vamos directamente a por el password.
```bash
./bandit27-do cat /etc/bandit_pass/bandit27
```
![](../../../../../images/Pasted_image_20241219112025.png)

Dando la contraseña para el siguiente nivel: s0773xxkk0MXfdqOfPRVr9L3jJBUOgCZ.









