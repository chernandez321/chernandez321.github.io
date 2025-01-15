---
title: Bandit Nivel 19-> 20
description: Ejecucion de binarios con privilegios SUID.
draft: false
weight: "20"
---

**Objetivo:** Para acceder al siguiente nivel, debe utilizar el binario setuid en el directorio de inicio. Ejecútelo sin argumentos para saber cómo usarlo. La contraseña para este nivel se puede encontrar en el lugar habitual (/etc/bandit_pass), después de haber utilizado el binario setuid.

Nos conectamos a  la máquina:
```bash
ssh bandit19@bandit.labs.overthewire.org -p 2220
#Password bandit19
```

Listamos el contenido:
```bash
ls
```
![](Pasted%20image%2020241214200921.png)

Vale ejecutamos el binario que nos comentan:
```bash
./bandit20-do id
```
![](Pasted%20image%2020241214200955.png)
Y nos explica que debemos ejecutarlo y pasarle como argumento el comando a ejecutar como root, vamos a hacer la prueba con el ejemplo que nos recomiendan.
```bash
./bandit20-do id
```
![](Pasted%20image%2020241214201143.png) 
Y vemos que lo ejecuta:
Entonces vamos a ir a por el password
```bash
./bandit20-do cat /etc/bandit_pass/bandit20 
```
![](Pasted%20image%2020241214201311.png)

Dando la contraseña para el siguiente nivel: 0qXahG8ZjOVMN9Ghs7iOWsCfZyXOUbYO







