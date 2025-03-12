--- 
title: "Conceptos básicos de peticiones Web"  
tags: ["Redes", "URL", "HTTP", "HTTPS", CURL]  
categories: ["Redes"]  
summary: "Vemos como funcionan los protocolos http y https. Utilizamos la herramienta curl para hacer peticiones."  
draft: false 

---

**Composición de la URL** 

![](../../../../images/url.png)

| **Componente** | **Ejemplo**          | **Descripción**                                                                                                                                                                                        |
| -------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Scheme`       | `http://` `https://` | Esto se utiliza para identificar el protocolo al que accede el cliente y termina con dos puntos y una barra doble ( `://`)                                                                             |
| `User Info`    | `admin:password@`    | Este es un componente opcional que contiene las credenciales (separadas por dos puntos `:`) utilizadas para autenticarse en el host y está separado del host con un signo arroba ( `@`).               |
| `Host`         | `inlanefreight.com`  | El host indica la ubicación del recurso. Puede ser un nombre de host o una dirección IP.                                                                                                               |
| `Port`         | `:80`                | El `Port`se separa del `Host`por dos puntos ( `:`). Si no se especifica ningún puerto, `http`los esquemas usan el puerto de forma predeterminada `80`y `https`el puerto de forma predeterminada`443`   |
| `Path`         | `/dashboard.php`     | Esto indica el recurso al que se accede, que puede ser un archivo o una carpeta. Si no se especifica ninguna ruta, el servidor devuelve el índice predeterminado (por ejemplo, `index.html`).          |
| `Query String` | `?login=true`        | La cadena de consulta comienza con un signo de interrogación ( `?`) y consta de un parámetro (p. ej. `login`) y un valor (p. ej. `true`). Se pueden separar varios parámetros con un ampersand ( `&`). |
| `Fragments`    | `#status`            | Los navegadores procesan los fragmentos en el lado del cliente para ubicar secciones dentro del recurso principal (por ejemplo, un encabezado o una sección en la página).                             |

No todos los componentes son necesarios para acceder a un recurso. Los principales campos obligatorios son el esquema y el host, sin los cuales la solicitud no tendría ningún recurso que solicitar.

##### **CURL** 
Podemos enviar una solicitud HTTP básica a cualquier URL usándola como argumento para cURL, de la siguiente manera:

```bash 
	curl inlanefreight.com
```

También podemos usar cURL para descargar una página o un archivo:

```bash 
	curl -O inlanefreight.com/index.html
```

También podemos hacer la petición en modo silencioso con el parametro `-s`

```bash
	curl -s -O inlanefreight.com/index.html
```

Cuando visitamos un sitio por https con un certificado no válido o expirado `curl` nos lo expone, sin embargo si nos queremos saltar esa comprobación utilizamos el parametro `-k`:
```bash 
	curl -k https://inlanefreight.com
```

Para ver la solicitud y respuesta HTTP completa, simplemente podemos agregar el indicador `-v`:
```bash 
	curl -v https://inlanefreight.com
```

Para ver solo los encabezados de las solicitud usamos el parámetro  `-I`, en cambio si queremos ver tanto el cuerpo de la solicitud más los encabezados usamos el parámetro `-i`
```bash 
	curl -I https://inlanefreight.com
```

Algunos encabezados, como los `User-Agent`o `Cookie`los encabezados, tienen sus propios indicadores. Por ejemplo, podemos usar el `-A`para configurar nuestro `User-Agent`, de la siguiente manera:
```bash 
curl https://www.inlanefreight.com -A 'Mozilla/5.0'
```

#### **HTTP**

**Flujo:**

![](../../../../images/flujo_http.png)


Nuestros navegadores generalmente buscan primero los registros en el `/etc/hosts` en local y si el dominio solicitado no existe en él, se comunicarán con otros servidores DNS. Podemos usar el `/etc/hosts` para agregar registros manualmente para la resolución DNS, agregando la IP seguida del nombre de dominio.

**Ejemplo de Petición:**

![](../../../../images/peticion_http.png)

La versión 1.X de HTTP envía las solicitudes como texto sin formato y utiliza un carácter de nueva línea para separar los distintos campos y solicitudes. La versión 2.X de HTTP, en cambio, envía las solicitudes como datos binarios en formato de diccionario.

![](../../../../images/respuesta_http.png)

**Encabezados HTTP(Headers**)
Los encabezados pueden tener uno o varios valores, que se añaden después del nombre del encabezado y se separan con dos puntos. Tipos de encabezados:

1. `General Headers`
	 Se utilizan tanto en solicitudes como en respuestas HTTP. Son contextuales y se utilizan para describir el mensaje más que su contenido. (**Date, Connection**)
2. `Entity Headers`
	 Se utilizan para describir el contenido transferido por el mensaje. Por lo general, se encuentran en respuestas y solicitudes POST o PUT. (**Content-Type, Media-Type, Boundary, Content-Length, Content-Encoding**)
3. `Request Headers`
	Son utilizados en la solicitud HTTP y no se relaciona con el contenido del mensaje.(**Host, User-Agent, Referer,Accept, Cookie, Authorization**)
4. `Response Headers`
	Se utilizan en la respuesta HTTP y no se relacionan con el contenido. (Server, Set-Cookie, WWW-Authenticate)
5. `Security Headers`
	 Utilizados para especificar ciertas reglas y políticas deben ser seguidos por el navegador al acceder al sitio web.(**Content-Security-Policy, Strict-Transport-Security, Referrer-Policy**)

Una de las principales desventajas de HTTP es que todos los datos se transfieren en texto plano. Esto significa que cualquier persona entre el origen y el destino puede realizar un ataque de intermediario (MiTM) para acceder a los datos transferidos.

##### **Flujo HTTPS**

Si escribimos http:// en lugar de https:// para visitar un sitio web que implementa HTTPS, el navegador intenta resolver el dominio y redirige al usuario al servidor web que aloja el sitio web de destino. Primero se envía una solicitud al puerto 80, que es el protocolo HTTP sin cifrar. El servidor lo detecta y redirige al cliente al puerto HTTPS seguro 443. Esto se realiza mediante el código de respuesta 301 "Movido Permanentemente".

![](../../../../images/flujo_https.png)

Los datos se transfieren como un único flujo cifrado, lo que hace que sea muy difícil para cualquier persona capturar información como credenciales o cualquier otro dato confidencial.

#### **Métodos de Solicitud**

|**Método**|**Descripción**|
|---|---|
|`GET`|Solicita un recurso específico. Se pueden enviar datos adicionales al servidor mediante cadenas de consulta en la URL (p. ej., `?param=value`).|
|`POST`|Envía datos al servidor. Admite múltiples tipos de entrada, como texto, archivos PDF y otros formatos de datos binarios. Estos datos se añaden al cuerpo de la solicitud, después de los encabezados. El método POST se utiliza habitualmente al enviar información (p. ej., formularios o inicios de sesión) o al subir datos a un sitio web, como imágenes o documentos.|
|`HEAD`|Solicita los encabezados que se devolverían si se realizara una solicitud GET al servidor. No devuelve el cuerpo de la solicitud y suele configurarse para comprobar la longitud de la respuesta antes de descargar recursos.|
|`PUT`|Crea nuevos recursos en el servidor. Permitir este método sin los controles adecuados puede provocar la carga de recursos maliciosos.|
|`DELETE`|Elimina un recurso existente en el servidor web. Si no se protege adecuadamente, puede provocar una denegación de servicio (DoS) al eliminar archivos críticos del servidor web.|
|`OPTIONS`|Devuelve información sobre el servidor, como los métodos aceptados por él.|
|`PATCH`|Aplica modificaciones parciales al recurso en la ubicación especificada.|
#### **Códigos de respuesta**

| **Tipo** | **Descripción**                                                                                                              |
| -------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `1xx`    | Proporciona información y no afecta el procesamiento de la solicitud.                                                        |
| `2xx`    | Se devuelve cuando una solicitud tiene éxito.                                                                                |
| `3xx`    | Se devuelve cuando el servidor redirige al cliente.                                                                          |
| `4xx`    | Indica solicitudes incorrectas por parte del cliente. Por ejemplo, solicitar un recurso inexistente o un formato incorrecto. |
| `5xx`    | Se devuelve cuando hay algún problema del lado del servidor.                                                                 |
Los más comunes.

| **Código**                  | **Descripción**                                                                                                                                   |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `200 OK`                    | Se devuelve después de una solicitud exitosa y el cuerpo de la respuesta generalmente contiene el recurso solicitado.                             |
| `302 Found`                 | Redirecciona al cliente a otra URL. Por ejemplo, redirige al usuario a su panel de control después de iniciar sesión correctamente.               |
| `400 Bad Request`           | Se devuelve al encontrar solicitudes mal formadas, como solicitudes con terminadores de línea faltantes.                                          |
| `403 Forbidden`             | Indica que el cliente no tiene acceso adecuado al recurso. También puede devolverse cuando el servidor detecta información maliciosa del usuario. |
| `404 Not Found`             | Se devuelve cuando el cliente solicita un recurso que no existe en el servidor.                                                                   |
| `500 Internal Server Error` | Se devuelve cuando el servidor no puede procesar la solicitud.                                                                                    |

Estos son mis apuntes  del modulo de **Web Requests** de **Hack The Box Academy**. 
Te animo a que le heches un vistazo. 


https://academy.hackthebox.com/module/details/35