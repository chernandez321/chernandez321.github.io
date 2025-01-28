--- 
title: "Conceptos básicos de red"  
tags: ["Redes"]  
categories: ["Redes"]  
summary: "Vemos los conceptos más básicos de redes y tocamos comandos de linux sobre este tema."  
draft: false 

---

### Ipv4 - Ipv6

- **IPv4**
	- **Dirección de 32 bits**: Utiliza direcciones de 32 bits, lo que permite alrededor de 4.3 mil millones de direcciones IP únicas (2^32 = 4,294,967,296). Aunque esto parecía suficiente al principio, con el crecimiento de Internet, se agotaron las direcciones IPv4 disponibles.
    
	- **Formato de dirección**: Se presenta en 4 octetos (8 bits cada uno), separados por puntos. Ejemplo: `192.168.1.1`.

##### Comandos en linux
	`hostname -I` Muestra la ip.
	`ifconfig` Muestra las interfaces de red y datos de las conexiones.

**IPv6**
- - **Dirección de 128 bits**: Utiliza direcciones de 128 bits, lo que proporciona una cantidad prácticamente ilimitada de direcciones (2^128 = 340 undecillones de direcciones posibles). Esto garantiza que nunca se agotarán las direcciones, incluso con el crecimiento continuo de dispositivos conectados.
- **Formato de dirección**: Se presenta en 8 bloques de 4 caracteres hexadecimales, separados por dos puntos. Ejemplo: `2001:0db8:85a3:0000:0000:8a2e:0370:7334`.
### Dirección MAC o Dirección física
Dirección de 48 bit que coresponde a un identificador para un dispositivo o tarjeta de red.
Pasted image 20250113112248
![Direción MAC](../../../../images/mac.png)

**OUI:** Nos brinda información de la organización del dispositivo. Dígase Cisco, Vmware, Xiaomi, etc. 
**NICS:** Es la parte de la dirección MAC que identifica la tarjeta de red específica y es asignada por el fabricante.

### TCP/UDP

### TCP 
- Orientado a conexión, garantiza la entrega de todos los paquetes en el orden correcto.
- Transferencias de archivos, correo, navegación web.


**Three Way Handshake**
![TCP Handshake](../../../../images/TCP_handshake.png)

**Principales Puertos**

| Puerto   | Servicio |
| -------- | -------- |
| 21       | FTP      |
| 22       | SSH      |
| 23       | Telnet   |
| 25       | SMTP     |
| 53       | DNS      |
| 80       | HTTP     |
| 110      | POP3     |
| 139, 445 | SMB      |
| 143      | IMAP     |
| 443      | HTTPS    |

### **UDP:** 
- Basado en la transmisión sin conexión de datagramas. 
- No garantiza la entrega, el orden de los datos ni la corrección de errores, lo que lo hace más rápido y eficiente para ciertas aplicaciones.

**Usos comunes:**
- Streaming de audio y video.
- Juegos en línea.
- Servicios de descubrimiento de red (como DHCP).
- Consultas rápidas y ligeras (como DNS).

| Puerto     | Servicio | Descripción                                                                                  |
| ---------- | -------- | -------------------------------------------------------------------------------------------- |
| 53         | DNS      | Domain Name System: Traduce nombres de dominio a direcciones IP.                             |
| 67, 68<br> | DHCP     | Dynamic Host Configuration Protocol: Asigna direcciones IP de forma automática.              |
| 69         | TFTP     | Trivial File Transfer Protocol: Protocolo simple para transferir archivos sin autenticación. |
| 161,162    | SNMP     | Simple Network Management Protocol: Administra y monitorea dispositivos en una red.          |

#### Modelo OSI

![Modelo OSI](../../../../images/Modelo_OSI.png)

**Máscara de red:**
![Clases IPv4](../../../../images/Clases_IPv4.png)

Tener en cuenta el recurso para analizar subredes 
- https://www.ipaddressguide.com/cidr

#### Ejercicio de subnetting
Segun el rango completar el resto de columnas.

| Rango de Ips              | Network Mask    | Total Hosts | Network ID   | Broadcast Address |
| ------------------------- | --------------- | ----------- | ------------ | ----------------- |
| - **192.168.10.0/25**     | 255.255.255.128 | 126         | 192.168.10.0 | 192.168.10.127    |
| - **10.0.1.0/26**         | 255.255.255.192 | 62          | 10.0.1.0     | 10.0.1.63         |
| - **172.16.5.0/27**<br>   | 255.255.255.224 | 30          | 172.16.5.0   | 172.16.5.31       |
| - **192.168.50.0/28**     | 255.255.255.240 | 14          | 192.168.50.0 | 192.168.50.15     |
| - **10.0.0.0/29**         | 255.255.255.248 | 6           | 10.0.0.0     | 10.0.0.7          |
| - **172.16.100.0/30**     | 255.255.255.252 | 2           | 172.16.100.0 | 172.16.100.3      |
| - **192.168.20.0/22**<br> | 255.255.252.0   | 1024        | 192.168.20.0 | 192.168.23.255    |
| - **10.1.1.0/23**<br>     | 255.255.254.0   | 512         | 10.1.0.0     | 10.1.1.255        |
| - **172.20.0.0/21**<br>   | 255.255.248.0   | 2048        | 172.20.0.0   | 172.20.7.255      |
| - **192.168.15.0/19**     | 255.255.224.0   | 8192        | 192.168.0.0  | 192.168.31.255    |
