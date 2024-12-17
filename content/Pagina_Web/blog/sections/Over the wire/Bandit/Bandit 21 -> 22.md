---
title: Bandit Nivel 21 -> 22
description: Resolución de Bandit.
draft: false
---

**Objetivo:** Un programa se ejecuta automáticamente a intervalos regulares desde cron, el programador de tareas basado en tiempo. Busque en /etc/cron.d/ la configuración y vea qué comando se está ejecutando.

Nos conectamos a  la máquina:
```bash
ssh bandit21@bandit.labs.overthewire.org -p 2220
#Password bandit21
```

Listamos el contenido de la ruta que nos indican /etc/cron.d/
```bash
ls /etc/cron.d/
```

![](Pasted%20image%2020241217193311.png)

Y vemos diferentes archivos ahora mismo nos interesa el cronjob_bandit22 pues es el usuario al cual queremos convertirnos. 

```bash
cat /etc/cron.d/cronjob_bandit22
```

Vemos lo siguiente:

![](Pasted%20image%2020241217193527.png)

Como interpretamos esto (El asterisco significa todos)
En este caso se va a ejecutar cada minuto, hora, día del mes, mes y día de la semana el script ubicado en la ruta /usr/bin/cronjob_bandit22.sh, dicha tarea cron la ejecuta el usuario bandit 22. 

![](Pasted%20image%2020241217193906.png)

Entonces nos corresponde buscar dicho script:
```bash 
cat /usr/bin/cronjob_bandit22.sh
```

![](Pasted%20image%2020241217194604.png)

Vemos que dicho script en bash 
1ro  -  le define unos permisos a un archivo temporal(tener en cuenta que otros tienen capacidad de lectura)
2do - lee su contraseña y la envia al documento temporal que se le asignaron los permisos.

Entonces como somos bandit21 no tenemos permiso para acceder al /etc/bandit_pass/bandit22, sin ambargo con el chmod 644 si tenemos permisos de lectura sobre el archivo temporal

```bash
cat /tmp/t7O6lds9S0RqQh9aMcz6ShpAoZKF7fgv
```

![](Pasted%20image%2020241217195133.png)
Dando la contraseña para el siguiente nivel: tRae0UfB9v0UzbCdn9cY0gQnds9GF58Q







