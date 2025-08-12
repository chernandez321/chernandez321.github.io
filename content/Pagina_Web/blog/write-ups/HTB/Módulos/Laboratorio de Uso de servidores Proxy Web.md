--- 
title: "Laboratorio de Uso de servidores Proxy Web"  
date: 2025-08-10
tags: [hackthebox, proxy]
categories: ["Proxy Web", "Hack The Box"]
summary: "En el presente Laboratorio vamos a estar viendo escenarios donde utilizamos los conocimientos adquiridos en el módulo como modificar la respuesta de las solicitudes, decodificar y codificar, manipular las peticiones, etc."
draft: false 

---
![](../../../../../images/Miniaturas/burpsuite.png)
#### Enunciado
Estamos realizando pruebas de penetración internas para una empresa local. Al explorar sus aplicaciones web internas, se le presentan diferentes situaciones en las que Burp/ZAP podría ser útil. Lea cada escenario en las preguntas a continuación y determine las características más útiles en cada caso. Luego, utilícelas para alcanzar el objetivo especificado.

**La página /lucky.php tiene un botón que parece estar deshabilitado. Intenta habilitarlo y haz clic en él para obtener la bandera.**
Visitamos la página que nos dicen (http://IP:Puerto/lucky.php) y tenemos esto:

![](../../../../../images/HTB_modulos/Proxys_Webs/flag_1-1.png)
En el código nos fijamos que tenemos un botón con propiedad `disabled` que es el que queremos activar. 
Básicamente vamos a interceptar la petición, hacemos click derecho:
_Seleccionamos (Do Intercept)_ -> _Seleccionamos (Response to this request)_ -> Seleccionamos (_Foward_) Para que nos muestre la respuesta para poderla Editar.
![](../../../../../images/HTB_modulos/Proxys_Webs/flag_1-2.png)
Borramos la propiedad `disabled` y damos `Foward`.
![](../../../../../images/HTB_modulos/Proxys_Webs/flag_1-3.png)
Luego hacemos click en el botón que es la petición `POST`, la interceptamos y hacemos lo mismo que con el `GET` anterior:
_Seleccionamos (Do Intercept)_ -> _Seleccionamos (Response to this request)_ -> Seleccionamos (_Foward_) 
![](../../../../../images/HTB_modulos/Proxys_Webs/flag_1-4.png)
Y muy probablemente debamos repetirlo varias veces, hasta que aparece la flag.
![](../../../../../images/HTB_modulos/Proxys_Webs/flag_1-6.png)

**La página /admin.php usa una cookie codificada varias veces. Intente decodificarla hasta obtener un valor de 31 caracteres. Envíe el valor como respuesta.**
Visitamos la url que nos dicen y vemos efectivamente la cookie:
(http://IP:Puerto/admin.php)
![](../../../../../images/HTB_modulos/Proxys_Webs/flag_2-1.png)
Decodificamos la cookie: 
![](../../../../../images/HTB_modulos/Proxys_Webs/flag_2-2.png)
Como resultado tenemos :`3dac93b8cd250aa8c1a36fffc79a17a`

**Una vez decodificada la cookie, notará que solo tiene 31 caracteres, lo que parece ser un hash MD5 al que le falta el último. Por lo tanto, intente fuzzear el último carácter de la cookie MD5 decodificada con caracteres alfanuméricos, mientras codifica cada solicitud con los métodos de codificación que identificó anteriormente. (Puede usar la lista de palabras "alphanum-case.txt" de Seclist para la carga útil).**
La idea es la siguiente interceptamos una petición al (http://IP:Puertt/admin.php)
Editamos el campo de la cookie de forma tal que 
1. Añadimos como prefijo con el valor de la pregunta anterior.
2. Hacemos encode con Base64
3. Hacemos encode con Hexadecimal
![](../../../../../images/HTB_modulos/Proxys_Webs/flag_3-1.png)
Le damos a empezar el ataque y vemos que hay peticiones donde la respuesta tiene una longitud diferente.
![](../../../../../images/HTB_modulos/Proxys_Webs/flag_3-2.png)
Seleccionamos una, vamos a la respuesta y vemos la flag al final.
![](../../../../../images/HTB_modulos/Proxys_Webs/flag_3-3.png)

**Estás usando la herramienta 'auxiliary/scanner/http/coldfusion_locale_traversal' de Metasploit, pero no funciona correctamente. Decides capturar la solicitud enviada por Metasploit para verificarla manualmente y repetirla. Una vez capturada la solicitud, ¿a qué directorio se llama 'XXXXX' en '/XXXXX/administrator/..'?**
Vamos a abrir el Metasploit y vamos a usar el módulo que nos indican en la pregunta,
luego vamos a especificar con la IP, el puerto y el proxy, vamos además abrir el Burpuite para que escuche por su puerto por defecto :
```bash
msfconsole

msf6> use auxiliary/scanner/http/coldfusion_locale_traversal
msf6> set rhost <IP>
msf6> set rport <Puerto>
msf6> proxies http:127.0.0.1:8080

msf6> run
```
![](../../../../../images/HTB_modulos/Proxys_Webs/flag_4-1.png)
Le damos `RUN` y vemos que vamos a interceptar la petición donde nos aparece la ruta indicada.

Si te sirvió de algo este tutorial ya para mi es más que suficiente, si me puedes decir en que podemos mejorar te lo voy a agradecer un montón.