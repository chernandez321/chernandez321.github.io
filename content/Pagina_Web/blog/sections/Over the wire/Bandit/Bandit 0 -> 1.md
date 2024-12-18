---
title: Bandit Nivel 0 -> 1
description: Encontrarás un archivo en el directorio home que contiene la contraseña para el siguiente nivel.
draft: false
weight: "2"
---
Partimos de la base que estamos logueados como bandit0.

**Objetivo:** La contraseña para el siguiente nivel se almacena en un archivo llamado **readme** ubicado en el directorio de inicio. Usa esta contraseña para iniciar sesión en bandit1 mediante SSH.

Vale listamos el contenido de donde estamos:

**Comando:**
```bash
ls
```

![ls](../../../../../images/ls)

Donde procedemos a leer el archivo tal cual nos indica el objetivo del ejercicio.

**Comando:**
```bash
cat readme
```
![[Pasted image 20241210205743.png]]

Dando el password para el siguiente nivel.

ZjLjTmM6FvvyRnrb2rfNWOZOTa6ip5If