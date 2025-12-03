--- 
title: "Bandit Nivel 14->15"  
date: 2024-11-16
tags: ["Bash", "OverTheWire", "netcat","nc"]  
categories: ["Bash"]  
summary: "Trabajamos con netcat para enviar una cadena a  un puerto."  
draft: false 

---

**Objetivo:** La contraseña para el siguiente nivel se puede recuperar enviando la contraseña del nivel actual al puerto 30000 en localhost.


Para este nivel partimos de la base de estar autenticados ya que lo hicimos en el ejercicio anterior a través de la clave privada del usuario bandit14. 

Como podemos enviar una cadena a traves de un puerto, utilizamos netcat
```bash
echo 'MU4VWeTyJk8ROof1qqmcBPaLh7lDCPvS' | nc localhost 30000
```
- echo 'pass' es para enviar la cadena en este caso el password que obtuvimos en el ejercicio anteriror
- netcat máquina puerto

![](Pasted_image_20241213112811.png)

La contraseña para el siguiente nivel es: 8xCjnmgoKbGLhHFAZlGE5Tmu4M2tKJQo







