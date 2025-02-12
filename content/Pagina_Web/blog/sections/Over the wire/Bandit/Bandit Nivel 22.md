--- 
title: "Bandit Nivel 22->23"  
date: 2024-11-08
tags: ["Bash", "OverTheWire", "Tareas Cron"]  
categories: ["Bash"]  
summary: "Repasamos las tareas cron que se están ejecutando"  
draft: false 

---

**Objetivo:** Un programa se ejecuta automáticamente a intervalos regulares desde cron, el programador de tareas basado en tiempo. Busque en /etc/cron.d/ la configuración y vea qué comando se está ejecutando.

NOTA: Ver scripts de shell escritos por otras personas es una habilidad muy útil. El script para este nivel está diseñado para que sea fácil de leer. Si tiene problemas para comprender lo que hace, intente ejecutarlo para ver la información de depuración que imprime.

Nos conectamos a  la máquina:
```bash
ssh bandit22@bandit.labs.overthewire.org -p 2220
#Password bandit22
```

Buscamos la trarea cron en la ruta dada:
```bash
cat /etc/cron.d/cronjob_bandit23
```
![](Pasted%20image%2020241217210930.png)

Al igual que en el ejercicio anterior se ejecuta un script cada minuto, con lo cual vamos  a ver cual es ese script.

```bash
cat /usr/bin/cronjob_bandit23.sh
```

![](Pasted%20image%2020241217211212.png)

Vamos a desglosarlo:
**Nota:  $(comando) - bash interpreta el output del comando ejecutado**
1- Guarda en la variable myname 'bandit23' dado que esta tarea la ejecuta dicho usuario.
2- En $mytarget almacena otro valor que vamos a analizar a continuación

Vamos a ejecutar esta parte del script con nuestro ususario (bandit22) para saber que es lo que devuelve:
```bash
echo I am user $(whoami) 
```
![](Pasted%20image%2020241217212349.png)
```bash
echo I am user $(whoami) | md5sum
```
![](Pasted%20image%2020241217212506.png)
Vemos que nos devuelve el valor md5  de la cadena I am user bandit 22.
Con el cut simplemente nos quedamos con el primer argumento
```bash
echo I am user $(whoami) | md5sum | cut -d ' ' -f 1
```
Vamos a seguir analizando, a continuación imprime en pantalla que está copiando el password del usuario que ejecuta la tarea hacia un archivo temporal con nombre del valor md5 correspondiente: 
`echo "Copying passwordfile /etc/bandit_pass/$myname to /tmp/$mytarget"`

Vamos a probar a acceder al /tmp/md5sum(para el bandit22):
```bash
cat /tmp/8169b67bd894ddbb4412f91573b38db3
```
![](Pasted%20image%2020241217213507.png)
Y efectivamente nos indica el password para entrar del nivel anterior a este nivel. 
Con lo cual vamos a hacer lo mismo pero sustituyendo el usuario por bandit23.

```bash
echo I am user bandit23 | md5sum | cut -d ' ' -f 1
```
![](Pasted%20image%2020241217213754.png)
Aqui ya obtuvimos el md5sum, ahora intentamos leer el archivo temporal con dicho nombre y vemos que nos da una cadena.
```bash
cat /tmp/8ca319486bfbbc3663ea0fbe81326349
```
![](Pasted%20image%2020241217213850.png)
Dando la contraseña para el siguiente nivel: 0Zf11ioIjMVN551jX3CmStKLYqjk54Ga







