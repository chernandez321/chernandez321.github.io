--- 
title: "Cuidado al iniciar Sesión con Google"  
date: 2025-01-14  
tags: ["Autenticación", "Ciberseguridad", "Precaución"]
categories: ["Información"]
summary: "Vulnerabilidad en el flujo de autenticación 'Iniciar sesión con Google' permite a atacantes acceder a cuentas de ex empleados de startups que han cerrado, mediante la adquisición de sus dominios."
draft: false


---

![Google Auth](../../../images/google.png)
Una reciente investigación ha revelado una vulnerabilidad en el flujo de autenticación "Iniciar sesión con Google" que podría permitir a actores malintencionados acceder a datos sensibles mediante la adquisición de dominios de startups que han cesado sus operaciones.

#### **Descripción de la vulnerabilidad:**

El problema radica en que, al utilizar "Iniciar sesión con Google" para acceder a aplicaciones como Slack, Notion, Zoom y otras, Google envía al servicio información sobre el usuario, incluyendo su dirección de correo electrónico y el dominio asociado. Si un servicio confía únicamente en estos datos para autenticar a los usuarios, un atacante que adquiera el dominio de una startup inactiva podría recrear las cuentas de correo electrónico de antiguos empleados y, de este modo, obtener acceso no autorizado a diversas plataformas asociadas con esas direcciones.

#### **Impacto potencial:**

Esta vulnerabilidad expone datos sensibles, especialmente en sistemas de recursos humanos que contienen documentos fiscales, nóminas, información de seguros y números de seguridad social. Además, plataformas de entrevistas pueden almacenar información confidencial sobre candidatos, incluyendo evaluaciones y ofertas.

#### **Respuesta de Google:**

Inicialmente, Google consideró que este comportamiento era intencional. Sin embargo, tras una reevaluación, reabrió el informe de la vulnerabilidad el 19 de diciembre de 2024 y otorgó una recompensa de $1,337 al investigador que la reportó. Google ha clasificado el problema como una "metodología de abuso con alto impacto".

#### **Recomendaciones:**

Actualmente, no existen medidas que los proveedores de software puedan implementar para protegerse contra esta vulnerabilidad en la implementación de OAuth de Google. Se recomienda a los individuos que, al desvincularse de una startup, eliminen sus datos sensibles de las cuentas asociadas y eviten utilizar cuentas laborales para registros personales, con el fin de prevenir posibles exposiciones futuras.

Este incidente subraya la importancia de contar con identificadores inmutables para usuarios y espacios de trabajo, de modo que los cambios en la propiedad de dominios no comprometan la seguridad de las cuentas.