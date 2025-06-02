--- 
title: "Laboratorio de Ataques de Contraseña - Díficil"  
date: 2025-06-02
tags: []  
categories: ["Hack The Box", "Password Cracking"]
summary: ""
draft: false 

---
#### Enunciado
El siguiente host es un cliente basado en Windows. Al igual que en las evaluaciones anteriores, nuestro cliente desea asegurarse de que un atacante no pueda acceder a ningún archivo confidencial en caso de un ataque exitoso. Mientras nuestros compañeros estaban ocupados con otros hosts de la red, descubrimos que el usuario `Johanna`está presente en muchos hosts. Sin embargo, aún no hemos podido determinar el motivo exacto de esto.

De entrada nos están dando un posible usuario, más adelante vemos donde lo podemos usar.

#### **Enumeración de puertos**
Vamos con lo básico a ver qué servicios están corriendo sobre el servidor.
```bash
nmap -p- -sS --min-rate 2000 -n -Pn <IP>
```

![](../../../../../images/HTB_modulos/password_atk_htb_labs_3/nmap1.png)
Vemos que tenemos los puertos 111, 135, 139, 445, 2049, 3389, 5985, etc, abiertos, vamos a recoger más información de los servicios que hay corriendo en cada puerto que nos salió a ver si vemos algo interesante.
```bash
nmap -p22,111,135,139,445,2049,3389,5985,47001,49664,49668 -sCV -n -Pn <IP>
```

![](../../../../../images/HTB_modulos/password_atk_htb_labs_3/nmap2.png)
![](../../../../../images/HTB_modulos/password_atk_htb_labs_3/nmap3.png)

Donde vemos que el Nombre de la Máquina es WINSRV, nos da una versión de Windows de 10.0.17763.
Empezamos a enumerar servicios y nos encontramos que en en el puerto 445 con el usuario que nos dieron al principio `johanna` y la lista de password mutada con las custom rules. 
Hacemos un ataque de fuerza bruta sobre ese servicio de la siguiente forma:


```bash
crackmapexec smb <IP> -u johanna -p /.../mut_password.list
```

![](../../../../../images/HTB_modulos/password_atk_htb_labs_3/crackmapexec1.png)

Listamos la información del servidor con las credenciales:
```bash
smbclient -L //10.129.67.26/ -U Johanna
#password
```

![](../../../../../images/HTB_modulos/password_atk_htb_labs_3/smbclient1.png)

Vemos que hay un recurso david el cual intentamos listar pero con el usuario `johanna` no tenemos los permisos para ver nada.







Si te sirvió de algo este tutorial ya para mi es más que suficiente, si me puedes decir en que podemos mejorar te lo voy a agradecer un montón.