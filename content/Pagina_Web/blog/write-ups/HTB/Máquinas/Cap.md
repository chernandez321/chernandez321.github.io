--- 
title: "Máquina de Hack the box Cap"  
date: 2025-08-12  
tags: ["HTB", "Pentesting","Web"]  
categories: ["Pentesting","Web"]  
summary: "Cap es una máquina Linux de dificultad fácil que ejecuta un servidor HTTP y realiza funciones administrativas, incluyendo capturas de red. Un control inadecuado da como resultado una Referencia Directa a Objetos Insegura (IDOR), que otorga acceso a la captura de otro usuario. La captura contiene credenciales en texto plano y puede utilizarse para obtener acceso. Posteriormente, se utiliza una función de Linux para escalar a la raíz."  
draft: false 

---
![](../../../../../images/HTB_modulos/ipobjetivo.pn)
#### **Enumeración**

Empezamos con la enumeración de puertos abiertos: 
```bash
nmap -sS -p- --min-rate 2000 -n -Pn 10.10.10.245
```
![](../../../../../images/HTB_maquinas/Cap/1-enum.png)
Luego vemos con mas detalle la información de estos puertos en específico:
![](../../../../../images/HTB_maquinas/Cap/2-enum.png)




Si te sirvió de algo este tutorial ya para mi es más que suficiente, si me puedes decir que podemos mejorar te lo voy a agradecer un montón.
