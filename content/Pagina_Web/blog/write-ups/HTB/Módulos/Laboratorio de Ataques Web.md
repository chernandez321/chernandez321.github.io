--- 
title: "Laboratorio de Ataques Web"  
date: 2025-09-15
tags: [hackthebox, Web Attacks]
categories: ["Hack the Box", "Web Attacks"]
summary: ""
draft: false 

---
![](../../../../../images/Miniaturas/file_upload.pn)
#### Enunciado
Estás realizando una prueba de penetración de aplicaciones web para una empresa de desarrollo de software, y te encargan probar la última versión de su aplicación web para redes sociales. Intenta utilizar las diversas técnicas aprendidas en este módulo para identificar y explotar las múltiples vulnerabilidades encontradas en la aplicación web.

- Autenticarse el usuario `htb-student` y la contraseña `Academy_student!`
 
**Intenta aumentar tus privilegios y explotar diferentes vulnerabilidades para leer la bandera en '/flag.php'.**

Accedemos a la página web que nos ponen.
![](../../../../../images/HTB_modulos/Web_Attacks_Lab_1/flag_1-1.png)
Inspeccionando el código de la página `profile.php` vemos una función que apunta a una ruta.
![](../../../../../images/HTB_modulos/Web_Attacks_Lab_1/flag_1-6.png)
Si la inspeccionamos vemos lo siguiente:
![](../../../../../images/HTB_modulos/Web_Attacks_Lab_1/flag_1-7.png)
Nos devuelve la información del usuario con el `uid` dado, si le pasamos otro `uid` nos devuelve los datos de otro usuario.
![](../../../../../images/HTB_modulos/Web_Attacks_Lab_1/flag_1-8.png)
Revisando el código de `settings.php` vemos 2 cosas, 
1. Que para cambiar contraseña no nos pide la actual.
2. Lo segundo es que en el código nos muestra una ruta.

![](../../../../../images/HTB_modulos/Web_Attacks_Lab_1/flag_1-9.png)

Si le hacemos petición vemos que nos devuelve el token del usuario con el `uid` que le pasemos:
![](../../../../../images/HTB_modulos/Web_Attacks_Lab_1/flag_1-2.png)
Sin embargo si cambiamos la solicitud a otro usuario vemos que nos devuelve su token también.
Por ejemplo token del usuario con uid=2
![](../../../../../images/HTB_modulos/Web_Attacks_Lab_1/flag_1-3.png)

Vemos que para hacer el cambio de contraseña se utilizan los parámetros `uid`, `token` y `password`. 
![](../../../../../images/HTB_modulos/Web_Attacks_Lab_1/flag_1-5.png)
Intentamos cambiarle la contraseña a nuestro usuario y perfecto. Intentamos cambiarle la contraseña a otro usuario:
![](../../../../../images/HTB_modulos/Web_Attacks_Lab_1/flag_1-10.png)
Y nos da acceso denegado. Sin embargo si cambiamos la petición a GET:
![](../../../../../images/HTB_modulos/Web_Attacks_Lab_1/flag_1-11.png)
Por lo que debemos buscar un usuario con mayores permisos, vamos a utilizar la `API` que nos devuelve los datos de los usuarios `.../api.php/user/uid`
Hacemos un ataque de tipo `Sniper` desde el BurpSuite Intruder.
![](../../../../../images/HTB_modulos/Web_Attacks_Lab_1/flag_1-12.png)
Buscamos entre las repsuestas y vemos:
![](../../../../../images/HTB_modulos/Web_Attacks_Lab_1/flag_1-13.png)
Que el usuario con `uid` 52 tiene como "compañía" `administrator`
Lo que vamos a hacer es cambiarle la contraseña como hicimos anteriormente con el usuario con `uid` 2.
Entramos 
`username`: a.corrales
`password`:tu_password
![](../../../../../images/HTB_modulos/Web_Attacks_Lab_1/flag_1-14.png)
Revisamos la funcionalidad nueva y vemos que maneja los eventos con `XML`:
![](../../../../../images/HTB_modulos/Web_Attacks_Lab_1/flag_1-15.png)
Entonces le pasamos el payload, nos muestra en este caso el archivo codificado en base 64 y con el mismo inspector lo decodificamos.
```xml
<!DOCTYPE email [
   <!ENTITY company SYSTEM "php://filter/convert.base64-encode/resource=/flag.php">
]>
```
![](../../../../../images/HTB_modulos/Web_Attacks_Lab_1/flag_1-16.png)

Si te sirvió de algo este tutorial ya para mi es más que suficiente, si me puedes decir en que podemos mejorar te lo voy a agradecer un montón.