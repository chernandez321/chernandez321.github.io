--- 
title: "Laboratorio de Uso de servidores Proxy Web"  
date: 2025-08-14
tags: [hackthebox, fuzzing, web]
categories: ["Fuzzing", "Web", "Hack The Box"]
summary: "En este ejercicio ponemos en práctica lo dado en el modulo el fuzzin tanto en subdominios, directorios, páginas, parámetros y valores."
draft: false 

---
![](../../../../../images/Miniaturas/fuzzing_web_htb.png)
#### Enunciado
Se le proporciona la dirección IP de una academia en línea, pero no dispone de más información sobre su sitio web. Como primer paso para realizar una prueba de penetración, se espera que localice todas las páginas y dominios vinculados a su IP para enumerarlos correctamente.
Finalmente, deberías realizar pruebas de fuzzing en las páginas que identifiques para ver si alguna tiene parámetros con los que se pueda interactuar. Si encuentras parámetros activos, comprueba si puedes recuperar datos de ellos



**Ejecute un análisis de fuzzing de subdominio/vhost en '*.academy.htb' para la IP mostrada arriba. ¿Cuáles son todos los subdominios que puede identificar? (Escriba solo el nombre del subdominio).**

Antes de nada añadir `IP     academy.htb` al /etc/hosts/

Primero hice el escaneo básico pero no dió ningún resultado.
```bash
ffuf -w /usr/share/wordlists/seclists/Discovery/DNS/subdomains-top1million-5000.txt:FUZZ -u http://FUZZ.academy.htb:35510
```

Luego intente con método `POST`:
```bash
ffuf -w /usr/share/wordlists/seclists/Discovery/DNS/subdomains-top1million-5000.txt -u http://academy.htb:35510 -X POST -H 'Host: FUZZ.academy.htb:35510' 
-fs 985
```

![](../../../../../images/HTB_modulos/Fuzzing_Web/flag_1-2.png)
Quedando como respuesta `archive test faculty`
Antes de seguir debemos añadir los correspondientes subdominios al /etc/hosts/
`IP         archive.academy.htb`
`IP         test.academy.htb`
`IP         faculty.academy.htb`

**Antes de ejecutar un análisis de fuzzing de páginas, debería ejecutar un análisis de fuzzing de extensiones. ¿Qué extensiones aceptan los dominios?**
Hacemos con uno de los dominios probamos con la página index y fuzzeamos con las extensiones.
```bash
ffuf -w /usr/share/wordlists/seclists/Discovery/Web-Content/web-extensions.txt 
-u http://faculty.academy.htb:47613/indexFUZZ
```
![](../../../../../images/HTB_modulos/Fuzzing_Web/flag_2-1.png)
`.php .php7 .phps`
**Una de las páginas que identifiques debería decir "¡No tienes acceso!". ¿Cuál es la URL completa de la página?**
Ahora toca hacer fuzzing de directorios y archivos: debemos tener en cuenta que tenemos 3 subdominios a analizar y 3 extensiones para las páginas.
Luego de hacer varios escaneos damos con que en el subdominio `http://faculty.academy.htb` encontramos estás páginas.
```bash
ffuf -w /usr/share/wordlists/seclists/Discovery/Web-Content/directory-list-2.3-small.txt -u http://faculty.academy.htb:47613/FUZZ -e .php,.php7,.phps -mc 200 -ic -recursion
```

![](../../../../../images/HTB_modulos/Fuzzing_Web/flag_3-1.png)
Visitamos la página 
![](../../../../../images/HTB_modulos/Fuzzing_Web/flag_3-2.png)

**En la página de la pregunta anterior, deberías poder encontrar varios parámetros aceptados por la página. ¿Cuáles son?**
Ahora vamos con los parámetros que acepta la página web. Hacemos primero con GET.

```bash
ffuf -w /usr/share/wordlists/seclists/Discovery/Web-Content/burp-parameter-names.txt:FUZZ -u http://faculty.academy.htb:39152/courses/linux-security.php7?FUZZ=key -ic -mc 200 -fs 774
```
![](../../../../../images/HTB_modulos/Fuzzing_Web/flag_4-1.png)
Nos da el parámetro `user`, ahora vamos con el `POST`:
```bash
ffuf -w /usr/share/wordlists/seclists/Discovery/Web-Content/burp-parameter-names.txt:FUZZ -u http://faculty.academy.htb:39152/courses/linux-security.php7 -X POST -d 'FUZZ=key' -H 'Content-Type: application/x-www-form-urlencoded'
```
![](../../../../../images/HTB_modulos/Fuzzing_Web/flag_4-2.png)
Y nos da también el parámetro `username`.
**Intenta fuzzear los parámetros que identificaste como valores de trabajo. Uno de ellos debería devolver una bandera. ¿Cuál es el contenido de la bandera?**
	En este paso vamos por valores válidos, probamos con `POST`:
```bash
ffuf -w /usr/share/wordlists/seclists/Usernames/Names/names.txt:FUZZ -u http://faculty.academy.htb:39041/courses/linux-security.php7 -X POST -d 'username=FUZZ' -H 'Content-Type: application/x-www-form-urlencoded' -fs 781
```

![](../../../../../images/HTB_modulos/Fuzzing_Web/flag_5-1.png)
Vemos que tenemos el usuario `harry`, tal cual nos indica la pista con una petición tipo POST con ese valor obtenemos la flag.

```bash
curl http://faculty.academy.htb:39041/courses/linux-security.php7 -X POST -d 'username=harry' -H 'Content-Type: application/x-www-form-urlencoded'
```


Si te sirvió de algo este tutorial ya para mi es más que suficiente, si me puedes decir en que podemos mejorar te lo voy a agradecer un montón.