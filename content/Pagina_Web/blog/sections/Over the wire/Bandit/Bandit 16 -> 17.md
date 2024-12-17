---
title: Bandit Nivel 16 -> 17
description: Resolución de Bandit.
draft: false
---

**Objetivo:** Las credenciales para el siguiente nivel se pueden recuperar enviando la contraseña del nivel actual a un puerto en el host local en el rango 31000 a 32000. Primero, averigüe cuáles de estos puertos tienen un servidor escuchando. Luego, averigüe cuáles de ellos usan SSL/TLS y cuáles no. Solo hay un servidor que proporcionará las siguientes credenciales, los demás simplemente le enviarán de vuelta lo que usted les envíe.

Nos conectamos a  la máquina:
```bash
ssh bandit16@bandit.labs.overthewire.org -p 2220
#Password bandit16
```

Vamos primero a saber cuales puertos estan abiertos en ese rango:
```bash
nmap -n -Pn -p31000-32000 --open localhost
```
![](Pasted%20image%2020241213131752.png)

Tenemos 5 puertos con los que trabajar, ahora con ncat vamos  a ver cuales de ellos tienen comunicación por SSL.

```bash
ncat --ssl 127.0.0.1 31046
```
![](Pasted%20image%2020241213132614.png)
Nos indica que por este puerto no está habilitado el ssl.

Lo hacemos en el siguiente puerto:
```bash
ncat --ssl 127.0.0.1 31518
```
![](Pasted%20image%2020241213132718.png)
Y vemos que si está habilitado el ssl y a la escucha sin embargo cuando le pasamos el password que nos dicen nos devuelve la misma cadena.

Lo hacemos en el siguiente puerto:
![](Pasted%20image%2020241213132847.png)

Lo hacemos en el siguiente puerto:
```bash
ncat --ssl 127.0.0.1 31790
```

![](Pasted%20image%2020241213132939.png)
Y nos devuelve la clave privada. La copiamos y luego nos hacemos un directorio temporal de trabajo.
```bash
mktemp -d 
```
Te crea un directorio y nos movemos para alla con `cd`
![](Pasted%20image%2020241213133938.png)
Creamos un archivo id_rsa, lo abrimos y pegamos la llave privada anteriormente copiada.
```bash
touch id_rsa
nano id_rsa
```
![](Pasted%20image%2020241213134146.png)

Perfecto ya con esto le asignamos los permisos requeridos y debemos podernos conectar como bandit17.
Asignamos permisos:
```bash
chmod 600 id_rsa
```

Nos conectamos a bandit17 utilizando su llave privada
```bash
ssh -i id_rsa -p2220 bandit17@bandit.labs.overthewire.org
```
![](Pasted%20image%2020241213134505.png)

Ya aquí estamos como bandit 17 sin embargo vamos a buscar su password para tenerlo almacenado. (Esto es opcional)
```bash
cat /etc/bandit_pass/bandit17
```
![](Pasted%20image%2020241213134957.png)

Dando la contraseña para el siguiente nivel: EReVavePLFHtFlFsjn3hyzMlvSuSAcRD







