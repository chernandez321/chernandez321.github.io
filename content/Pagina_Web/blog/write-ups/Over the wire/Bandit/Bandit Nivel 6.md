--- 
title: "Bandit Nivel 6->7"  
date: 2024-11-24  
tags: ["Bash", "OverTheWire","find"]  
categories: ["Bash"]  
summary: "Localizamos un archivo por su usuario y grupo propietario utilizando la herramienta find."  
draft: false 

---

**Objetivo:** La contraseña para el siguiente nivel se almacena en algún lugar del servidor y tiene todas las siguientes propiedades:

propiedad del usuario bandit7
propiedad del grupo bandit6
33 bytes de tamaño

Nos conectamos a  la máquina:
```bash
ssh bandit6@bandit.labs.overthewire.org -p 2220
#Password bandit6
```

Tenemos que encontrar el archivo con dichas caracteríticas, vamos con el comando find.
```bash
find / -user bandit7 -group bandit6 -size 33c 2>/dev/null
```
**Parametros**
- -user para filtrar por el usuario propietario del archivo
- -group para filtrar por el grupo al que pertenece el archivo
- -size para filtrar por tamaño en este caso 33 bytes.
- -2>/dev/null para redirigir todos los errores y no nos lo muestre, dado que estamos buscando archivos desde la raiz del sistema y no tenemos permisos para acceder a muchas rutas.
![](Pasted_image_20241211001645.png)
```bash
cat /var/lib/dpkg/info/bandit7.password
```
![](Pasted_image_20241211001748.png)
La contraseña para el siguiente nivel es: morbNTDkSW6jIlUc0ymOdMaLnOlFVAaj





