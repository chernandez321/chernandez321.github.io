---
title: Bandit Nivel 0
description: Introducción a la conexión SSH. Aprenderás a iniciar sesión en un servidor remoto usando un cliente SSH.
draft: false
weight: "0"
---

**Objetivo:** El objetivo de este nivel es que inicies sesión en el juego mediante SSH. El host al que debes conectarte es bandit.labs.overthewire.org, en el puerto 2220. El nombre de usuario es bandit0 y la contraseña es bandit0. 

Básicamente nos conectamos mediante ssh a una máquina de la siguiente forma:
-  Sintaxis `ssh usuario@dominio||ip` y luego contraseña.

**Comando:**
```bash
ssh bandit0@bandit.labs.overthewire.org -p 2220
#Password bandit0
```

- -p definimos el puerto (Por defecto es el 22) 


