--- 
title: "Cibercriminales explotan Google Tag Manager para Inyectar Skimmers de Tarjetas de Crédito en Tiendas Magento"  
date: 2025-02-12  
tags: ["Ciberseguridad", "Skimming", "Magento", "Google Tag Manager"]  
categories: ["Ciberseguridad"]  
summary: "Los ciberdelincuentes explotan vulnerabilidad con Google Tag Manager (GTM) para inyectar malware de skimming de tarjetas de crédito en tiendas en línea basadas en Magento."  

draft: false 

---

![Skimming](../../../images/skimming.jpg)


### ¿Cómo funciona este ataque?

Investigadores de la empresa de seguridad web Sucuri descubrieron que el código malicioso se oculta dentro de un script de GTM y Google Analytics que, en apariencia, es legítimo. Sin embargo, contiene una puerta trasera ofuscada que permite a los atacantes mantener acceso persistente a los sitios comprometidos.

Hasta el momento, se han identificado tres sitios web infectados con el identificador de GTM "GTM-MLHK2N68", una cifra menor que los seis reportados inicialmente por Sucuri. En estos ataques, los ciberdelincuentes utilizan la base de datos de Magento, específicamente la tabla "cms_block.content", para alojar y ejecutar el código malicioso.

El script malicioso intercepta la información de las tarjetas de crédito ingresadas en la página de pago y la envía a un servidor remoto controlado por los atacantes.

### Antecedentes y Relevancia

El uso de Google Tag Manager para propósitos maliciosos no es algo nuevo. En abril de 2018, Sucuri identificó una campaña de malvertising que utilizaba GTM para mostrar pop-ups y redirigir tráfico a sitios fraudulentos con el objetivo de generar ingresos ilícitos.

Más recientemente, se ha identificado una campaña dirigida a WordPress, donde los atacantes explotaron vulnerabilidades en plugins o utilizaron cuentas de administrador comprometidas para inyectar redirecciones maliciosas en los sitios web afectados.

### Acciones Legales y Recomendaciones

En un caso relacionado, el Departamento de Justicia de EE.UU. anunció recientemente la acusación formal de dos ciudadanos rumanos, Andrei Fagaras y Tamas Kolozsvari, por su presunta participación en una operación de skimming de tarjetas de pago. De ser condenados, podrían enfrentar hasta 15 años de prisión, tres años de libertad supervisada y multas de hasta $250,000 por cada cargo.

#### ¿Cómo protegerse de estos ataques?

- **Revisión de scripts externos:** Monitorea las etiquetas de GTM y otros scripts de terceros en tu sitio web para detectar actividades sospechosas.
    
- **Actualización y parches:** Mantén tu plataforma Magento y cualquier otro CMS actualizado para reducir vulnerabilidades.
    
- **Análisis de seguridad periódico:** Implementa herramientas de detección de malware y revisa el tráfico de red en busca de anomalías.
    
- **Política de seguridad estricta:** Restringe el acceso a las configuraciones críticas de tu sitio y utiliza autenticación de múltiples factores para las cuentas de administrador.
    

El uso de Google Tag Manager en campañas maliciosas resalta la necesidad de una seguridad web proactiva. Mantente alerta y protege tu negocio de las crecientes amenazas del cibercrimen.

---

*Esta información se basa en la fuente thehackernews.com Puedes leer más detalles sobre este caso en [TheHackerNews](https://thehackernews.com/2025/02/hackers-exploit-google-tag-manager-to.html).*

 