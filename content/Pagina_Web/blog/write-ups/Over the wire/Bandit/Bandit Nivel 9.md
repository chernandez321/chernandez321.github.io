--- 
title: "Bandit Nivel 9->10"  
date: 2024-11-21 
tags: ["Bash", "OverTheWire","string"]  
categories: ["Bash"]  
summary: "Aprendemos a usar herramientas como strings para encontrar texto legible en archivos binarios."  
draft: false 

---

**Objetivo:** La contraseña para el siguiente nivel se almacena en el archivo data.txt en una de las pocas cadenas legibles por humanos, precedida por varios caracteres ‘=’.

Nos conectamos a  la máquina:
```bash
ssh bandit9@bandit.labs.overthewire.org -p 2220
#Password bandit9
```

Listamos el contenido
```bash
ls
```

![](Pasted_image_20241211010001.png)

Leemos el archivo data.txt
```bash
cat data.txt
```
Sin embargo es muy grande, con lo debemos filtrar su contenido para llegar a una mejor respuesta, en este caso con los comandos `strings` y `grep`

```bash
strings data.txt | grep -E "=+"
```
**Parámetros**
- -strings: Extrae solo el contenido textual del archivo..
- -grep -E: Aplicamos una expresión regular donde filtramos por las líneas donde tengan uno o más símbolos de igual . 

![](Pasted_image_20241211010405.png)

Obtenemos la contraseña.

La contraseña para el siguiente nivel es: FGUW5ilLVJrxX9kMYMmlN4MgbpfMiqey







