---
title: Bandit Nivel 15 -> 16
description: Resolución de Bandit.
draft: false
weight: "16"
---

**Objetivo:** La contraseña para el siguiente nivel se puede recuperar enviando la contraseña del nivel actual al puerto 30001 en el host local mediante cifrado SSL/TLS.

Nota útil: ¿Está obteniendo “TERMINANDO”, “RENEGOCIANDO” o “ACTUALIZANDO KEYUPDATE”? Lea la sección “COMANDOS CONECTADOS” en la página del manual.

Nos conectamos a  la máquina:
```bash
ssh bandit15@bandit.labs.overthewire.org -p 2220
#Password bandit15
```

En este nivel necesitamos "conectarnos" mediante el protocolo ssl/tls a nuestro propio equipo para obtener la contraseña, como hacemos esto. Utilizamos la herramienta openssl.

```bash
openssl s_client -connect localhost:30001
```
- El comando `openssl s_client` nos permite establecer una conexión SSL/TLS con un servidor en un puerto específico. 
- **-connect** para conectarnos y especificamos a que pc y por cual puerto vamos a relaizar la conexión. (Especificamos el pc y puerto que nos indican en la orden del ejercicio)

![](Pasted%20image%2020241213120613.png)
Luego de conectado le vamos a pasar la contraseña actual que tenemos:

`8xCjnmgoKbGLhHFAZlGE5Tmu4M2tKJQo`

![](Pasted%20image%2020241213120737.png)

Dando la contraseña para el siguiente nivel: kSkvUpMQ7lBYyCM4GBPvCvT1BfWRy0Dx







