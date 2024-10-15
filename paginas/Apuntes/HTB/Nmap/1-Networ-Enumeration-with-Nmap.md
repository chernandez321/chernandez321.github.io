## Intro

Nmap (Network Mapper) is an open source tool used for network scanning and security auditing. It is widely used by security professionals to discover hosts and services on a computer network, thus creating a "map" of the network.

Most scanning tools have a timeout set until they receive a response from the service.

**If this tool does not respond within a specific time, this service/port will be marked as closed, filtered, or unknown.** In the last two cases, we will still be able to work with it.

However, if a port is marked as closed and Nmap doesn't show it to us, we will be in a bad situation. This service/port may provide us with the opportunity to find a way to access the system. Therefore, this result can take much unnecessary time until we find it.

### **Nmap Architecture**

Nmap offers many different types of scans that can be used to obtain various results about our targets. Basically, Nmap can be divided into the following scanning techniques:

- Host discovery
- Port scanning
- Service enumeration and detection
- OS detection
- Scriptable interaction with the target service (Nmap Scripting Engine)

Nmap offers many different scanning techniques, making different types of connections and using differently structured packets to send. Here we can see all the scanning techniques Nmap offers:

| Scan mode                                           | Details                                                                                                         |
| --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| SYN (Half-open) - **-sS**                           | Sends SYN packets and waits for SYN/ACK responses. It is harder to detect                                       |
| TCP Connect - **-sT**                               | Makes a full TCP connection with a three-way handshake. Easy to detect.                                         |
| UDP Scan - **-sU**                                  | Sends UDP packets to target ports. It is slower and may be less accurate                                        |
| ACK Scan - **-sA**                                  | Sends ACK packets to determine if ports are filtered by a firewall.                                             |
| FIN Scan - **-sF**                                  | Sends FIN packets to evade some detection systems. An open port will not respond.                               |
| XMAS Scan - **-sX**                                 | Sends packets with the FIN, PSH, and URG flags set. Similar to the FIN scan.                                    |
| NULL Scan - **-sN**                                 | Sends no flags in the TCP header. A closed port will respond with a RST packet.                                 |
| IP Protocol Port Scan - **-sO**                     | Determines the IP protocols supported by the target host by sending IP packets with different protocol numbers. |
| Version Scan - **-sV**                              | Attempts to determine the version of the service running on open ports.                                         |
| Script Scan (Nmap Scripting Engine - NSE) - **-sC** | Uses Nmap scripts to perform a variety of tasks, such as vulnerability detection and user enumeration.          |
| Ping Scan - **-sn**                                 | Performs a ping scan to determine which hosts are active on a network without scanning ports.                   |
| IPv6 Network Scan - **-6**                          | Performs scans on IPv6 networks.                                                                                |
| Hosted Port Scan - **-sV**                          | Identifies services and software versions on open ports.                                                        |
| Aggressive Mode Scan - **-A**                       | Performs operating system detection, version scanning, script scanning, and traceroute.                         |
    
- **Host and Port Scanning**
    
    There are a total of 6 different states for a scanned port we can obtain:
    
    |State|Description|
    |---|---|
    |open|This indicates that the connection to the scanned port has been established. These connections can be TCP connections, UDP datagrams as well as SCTP associations.|
    |closed|When the port is shown as closed, the TCP protocol indicates that the packet we received back contains an RST flag. This scanning method can also be used to determine if our target is alive or not.|
    |filtered|Nmap cannot correctly identify whether the scanned port is open or closed because either no response is returned from the target for the port or we get an error code from the target.|
    |unfiltered|This state of a port only occurs during the TCP-ACK scan and means that the port is accessible, but it cannot be determined whether it is open or closed.|
    |open|filtered|
    |closed|filtered|
    
    By default, `Nmap` scans the top 1000 TCP ports with the SYN scan (`-sS`).
    
    This SYN scan is set only to default when we run it as root because of the socket permissions required to create raw TCP packets. Otherwise, the TCP scan (`-sT`) is performed by default. This means that if we do not define ports and scanning methods, these parameters are set automatically.
    
    We can define the ports:
    
    - One by one (`-p 22,25,80,139,445`),
    - By range (`-p 22-445`),
    - By top ports (`--top-ports=10`) from the `Nmap` database that have been signed as most frequent, by scanning all ports (`-p-`)
    - Also by defining a fast port scan, which contains top 100 ports (`-F`).
    
    Example:
    
    nmap 192.168.138.10 _**—top-ports=10**_
    
    ```
    Starting Nmap 7.80 ( <https://nmap.org> ) at 2020-06-15 15:36 CEST
    Nmap scan report for 10.129.2.28
    Host is up (0.021s latency).
    
    PORT     STATE    SERVICE
    21/tcp   closed   ftp
    **22/tcp   open     ssh**
    23/tcp   closed   telnet
    **25/tcp   open     smtp
    80/tcp   open     http
    110/tcp  open     pop3**
    139/tcp  filtered netbios-ssn
    443/tcp  closed   https
    445/tcp  filtered microsoft-ds
    3389/tcp closed   ms-wbt-server
    MAC Address: DE:AD:00:00:BE:EF (Intel Corporate)
    
    Nmap done: 1 IP address (1 host up) scanned in 1.44 seconds
    ```
    
    nmap 10.129.2.28 -p 21 _**--packet-trace -Pn -n --disable-arp-ping**_
    
    Starting Nmap 7.80 ( [https://nmap.org](https://nmap.org) ) at 2020-06-15 15:39 CEST SENT (0.0429s) TCP 10.10.14.2:63090 > 10.129.2.28:21 S ttl=56 id=57322 iplen=44 seq=1699105818 win=1024 <mss 1460> RCVD (0.0573s) TCP 10.129.2.28:21 > 10.10.14.2:63090 RA ttl=64 id=0 iplen=40 seq=0 win=0 Nmap scan report for 10.11.1.28 Host is up (0.014s latency).
    
    **PORT STATE SERVICE** 21/tcp closed ftp MAC Address: DE:AD:00:00:BE:EF (Intel Corporate)
    
    |**Scanning Options**|**Description**|
    |---|---|
    |`10.129.2.28`|Scans the specified target.|
    |`-p 21`|Scans only the specified port.|
    |`--packet-trace`|Shows all packets sent and received.|
    |`-n`|Disables DNS resolution.|
    |`--disable-arp-ping`|Disables ARP ping.|
    
    **Connect Scan**
    
    The Nmap [TCP Connect Scan](https://nmap.org/book/scan-methods-connect-scan.html) (`-sT`) uses the TCP three-way handshake to determine if a specific port on a target host is open or closed. The scan sends an `SYN` packet to the target port and waits for a response. It is considered
    
    - **Open** if the target port responds with an `SYN-ACK` packet
    - **Closed** if it responds with an `RST` packet.
    
    The `Connect` scan is useful because it is the most accurate way to determine the state of a port, and it is also the most stealthy. However, it is important to note that the Connect scan is slower than other types of scans because it requires the scanner to wait for a response from the target after each packet it sends
    
    Example:
    
    nmap 10.129.2.28 -p 443 --packet-trace --disable-arp-ping -Pn -n --reason _**-sT**_
    
    Starting Nmap 7.80 ( [https://nmap.org](https://nmap.org) ) at 2020-06-15 16:26 CET CONN (0.0385s) TCP localhost > 10.129.2.28:443 => Operation now in progress CONN (0.0396s) TCP localhost > 10.129.2.28:443 => Connected Nmap scan report for 10.129.2.28 Host is up, received user-set (0.013s latency).
    
    PORT STATE SERVICE REASON **443/tcp open https syn-ack**
    
    Nmap done: 1 IP address (1 host up) scanned in 0.04 seconds
    
    **Filtered Ports**
    
    When a port is shown as filtered, it can have several reasons. In most cases, firewalls have certain rules set to handle specific connections.
    
    As a response, we receive an `ICMP` reply with `type 3` and `error code 3`, which indicates that the desired port is unreachable. Nevertheless, if we know that the host is alive, we can strongly assume that the firewall on this port is rejecting the packets, and we will have to take a closer look at this port later.
    
    **Discovering Open UDP Ports**
    
    - `UDP scan` (`-sU`)
    - `TCP scan` (`-sS`)
    
    sudo nmap 10.129.2.28 -F -sU
    
    |`10.129.2.28`|Scans the specified target.|
    |---|---|
    |`-F`|Scans top 100 ports.|
    |`-sU`|Performs a UDP scan.|
    
    Starting Nmap 7.80 ( [https://nmap.org](https://nmap.org) ) at 2020-06-15 16:01 CEST Nmap scan report for 10.129.2.28 Host is up (0.059s latency). Not shown: 95 closed ports PORT STATE SERVICE 68/udp open|filtered dhcpc 137/udp open netbios-ns 138/udp open|filtered netbios-dgm 631/udp open|filtered ipp 5353/udp open zeroconf MAC Address: DE:AD:00:00:BE:EF (Intel Corporate)
    
    Nmap done: 1 IP address (1 host up) scanned in 98.07 seconds
    
    Another disadvantage of this is that we often do not get a response back because `Nmap` sends empty datagrams to the scanned UDP ports, and we do not receive any response. So we cannot determine if the UDP packet has arrived at all or not. If the UDP port is `open`, we only get a response if the application is configured to do so.
    
    `sudo nmap 10.129.2.28 -sU -Pn -n --disable-arp-ping --packet-trace -p 137 --reason`
    
    |canning Options|Description|
    |---|---|
    |10.129.2.28|Scans the specified target.|
    |-sU|Performs a UDP scan.|
    |-Pn|Disables ICMP Echo requests.|
    |-n|Disables DNS resolution.|
    |--disable-arp-ping|Disables ARP ping.|
    |--packet-trace|Shows all packets sent and received.|
    |-p 137|Scans only the specified port.|
    |--reason|Displays the reason a port is in a particular state.|
    
    Starting Nmap 7.80 ( [https://nmap.org](https://nmap.org) ) at 2020-06-15 16:15 CEST SENT (0.0367s) UDP 10.10.14.2:55478 > 10.129.2.28:137 ttl=57 id=9122 iplen=78 RCVD (0.0398s) UDP 10.129.2.28:137 > 10.10.14.2:55478 ttl=64 id=13222 iplen=257 Nmap scan report for 10.129.2.28 Host is up, received user-set (0.0031s latency).
    
    PORT STATE SERVICE REASON 137/udp open netbios-ns udp-response ttl 64 MAC Address: DE:AD:00:00:BE:EF (Intel Corporate)
    
    Nmap done: 1 IP address (1 host up) scanned in 0.04 seconds
    
    - If we get an ICMP response with `error code 3` (port unreachable), we know that the port is indeed `closed`.
    
    Another handy method for scanning ports is the `-sV` option which is used to get additional available information from the open ports. This method can identify versions, service names, and details about our target.
    
    `sudo nmap 10.129.2.28 -Pn -n --disable-arp-ping --packet-trace -p 445 --reason -sV`
    
    Starting Nmap 7.80 ( [https://nmap.org](https://nmap.org) ) at 2022-11-04 11:10 GMT SENT (0.3426s) TCP 10.10.14.2:44641 > 10.129.2.28:445 S ttl=55 id=43401 iplen=44 seq=3589068008 win=1024 <mss 1460> RCVD (0.3556s) TCP 10.129.2.28:445 > 10.10.14.2:44641 SA ttl=63 id=0 iplen=44 seq=2881527699 win=29200 <mss 1337> NSOCK INFO [0.4980s] nsock_iod_new2(): nsock_iod_new (IOD#1)NSOCK INFO [0.4980s] nsock_connect_tcp(): TCP connection requested to 10.129.2.28:445 (IOD#1) EID 8NSOCK INFO [0.5130s] nsock_trace_handler_callback(): Callback: CONNECT SUCCESS for EID 8 [10.129.2.28:445] Service scan sending probe NULL to 10.129.2.28:445 (tcp) NSOCK INFO [0.5130s] nsock_read(): Read request from IOD#1 [10.129.2.28:445] (timeout: 6000ms) EID 18NSOCK INFO [6.5190s] nsock_trace_handler_callback(): Callback: READ TIMEOUT for EID 18 [10.129.2.28:445] Service scan sending probe SMBProgNeg to 10.129.2.28:445 (tcp) NSOCK INFO [6.5190s] nsock_write(): Write request for 168 bytes to IOD#1 EID 27 [10.129.2.28:445]NSOCK INFO [6.5190s] nsock_read(): Read request from IOD#1 [10.129.2.28:445] (timeout: 5000ms) EID 34NSOCK INFO [6.5190s] nsock_trace_handler_callback(): Callback: WRITE SUCCESS for EID 27 [10.129.2.28:445] NSOCK INFO [6.5320s] nsock_trace_handler_callback(): Callback: READ SUCCESS for EID 34 [10.129.2.28:445] (135 bytes) Service scan match (Probe SMBProgNeg matched with SMBProgNeg line 13836): 10.129.2.28:445 is netbios-ssn. Version: |Samba smbd|3.X - 4.X|workgroup: WORKGROUP| NSOCK INFO [6.5320s] nsock_iod_delete(): nsock_iod_delete (IOD#1)Nmap scan report for 10.129.2.28 Host is up, received user-set (0.013s latency).
    
    PORT STATE SERVICE REASON VERSION 445/tcp open netbios-ssn syn-ack ttl 63 **Samba smbd 3.X - 4.X** (workgroup: WORKGROUP) Service Info: Host: Ubuntu
    
- **Service Enumeration**
    
    For us, it is essential to determine the application and its version as accurately as possible. We can use this information to scan for known vulnerabilities and analyze the source code for that version if we find it. An exact version number allows us to search for a more precise exploit that fits the service and the operating system of our target.
    
    `sudo nmap 10.129.2.28 -p- -v -sV --stats-every=5s`
    
    |**Scanning Options**|**Description**|
    |---|---|
    |10.129.2.28|Scans the specified target.|
    |-p-|Scans all ports.|
    |-sV|Performs service version detection on specified ports.|
    |--stats-every=5s|Shows the progress of the scan every 5 seconds|
    |-v|Increases the verbosity of the scan, which displays more detailed information.|
    
    Escaneo mas agresivo de nmap (-A : Se utiliza para realizar una exploración avanzada y obtener información detallada sobre los hosts y servicios encontrados )
    
    **nmap -A -p 31337 10.129.124.106**
    
    Parte de la respuesta:
    
    **PORT STATE SERVICE VERSION** 31337/tcp open Elite? | fingerprint-strings: | GetRequest: |_ **220 HTB{pr0F7pDv3r510nb4nn3r}**
    
    **Netcat**
    
    Usamos `netcat` (nc) para conectarnos manualmente al puerto y ver si el servicio proporciona más información cuando te conectas a él.
    
    nc <ip> <puerto> `nc -nv 10.129.2.28 25`
    
    **Telnet**
    
    Al igual con Telnet nos conectamos manualmente para ver si obtenemos mayor información.
    
    telnet <ip> <puerto>
    
    telnet 10.129.124.106 31337
    
- **Saving the Results**
    
    (`oN`) Normal output, with the `.nmap` file extension
    
    cat target.nmap
    
    # Nmap 7.80 scan initiated Tue Jun 16 12:14:53 2020 as:
    
    **nmap -p- -oA target 10.129.2.28**
    
    _**Nmap scan report for 10.129.2.28**_ Host is up (0.053s latency). Not shown: 4 closed ports PORT STATE SERVICE 22/tcp open ssh 25/tcp open smtp 80/tcp open http MAC Address: DE:AD:00:00:BE:EF (Intel Corporate)
    
    - (`oG`) Grepable output, with the `.gnmap` file extension
    
    cat target.gnmap
    
    # Nmap 7.80 scan initiated Tue Jun 16 12:14:53 2020 as:
    
    _**nmap -p- -oA target 10.129.2.28**_
    
    Host: 10.129.2.28 () Status: Up Host: 10.129.2.28 () Ports: 22/open/tcp//ssh///, 25/open/tcp//smtp///, 80/open/tcp//http/// Ignored State: closed (4)
    
    # Nmap done at Tue Jun 16 12:14:53 2020 -- 1 IP address (1 host up) scanned in 10.22 seconds
    
    - (`oX`) XML output, with the `.xml` file extension
    
    cat target.xml
    
    <?xml version="1.0" encoding="UTF-8"?> <!DOCTYPE nmaprun> <?xml-stylesheet href="file:///usr/local/bin/../share/nmap/nmap.xsl" type="text/xsl"?> <!-- Nmap 7.80 scan initiated Tue Jun 16 12:14:53 2020 as: nmap -p- -oA target 10.129.2.28 --> <nmaprun scanner="nmap" args="nmap -p- -oA target 10.129.2.28" start="12145301719" startstr="Tue Jun 16 12:15:03 2020" version="7.80" xmloutputversion="1.04"> <scaninfo type="syn" protocol="tcp" numservices="65535" services="1-65535"/> <verbose level="0"/> <debugging level="0"/> <host starttime="12145301719" endtime="12150323493"><status state="up" reason="arp-response" reason_ttl="0"/> <address addr="10.129.2.28" addrtype="ipv4"/> <address addr="DE:AD:00:00:BE:EF" addrtype="mac" vendor="Intel Corporate"/> <hostnames> </hostnames> <ports><extraports state="closed" count="4"> <extrareasons reason="resets" count="4"/> </extraports> <port protocol="tcp" portid="22"><state state="open" reason="syn-ack" reason_ttl="64"/><service name="ssh" method="table" conf="3"/></port> <port protocol="tcp" portid="25"><state state="open" reason="syn-ack" reason_ttl="64"/><service name="smtp" method="table" conf="3"/></port> <port protocol="tcp" portid="80"><state state="open" reason="syn-ack" reason_ttl="64"/><service name="http" method="table" conf="3"/></port> </ports> <times srtt="52614" rttvar="75640" to="355174"/> </host> <runstats><finished time="12150323493" timestr="Tue Jun 16 12:14:53 2020" elapsed="10.22" summary="Nmap done at Tue Jun 16 12:15:03 2020; 1 IP address (1 host up) scanned in 10.22 seconds" exit="success"/><hosts up="1" down="0" total="1"/> </runstats> </nmaprun>
    
    - (`-oA`) to save the results in all formats(**-oN**, **-oG**, **-oX**).
    
    Create a tool to do:
    
    With the XML output, we can easily create HTML reports that are easy to read, even for non-technical people. This is later very useful for documentation, as it presents our results in a detailed and clear way. To convert the stored results from XML format to HTML, we can use the tool `xsltproc`.
    
- **Nmap Scripting Engine (`NSE`)**
    
    Nmap provides us with the possibility to create scripts in Lua for interaction with certain services. There are a total of 14 categories into which these scripts can be divided
    
    |Category|Description|
    |---|---|
    |auth|Determination of authentication credentials.|
    |broadcast|Scripts, which are used for host discovery by broadcasting and the discovered hosts, can be automatically added to the remaining scans.|
    |brute|Executes scripts that try to log in to the respective service by brute-forcing with credentials.|
    |default|Default scripts executed by using the -sC option.|
    |discovery|Evaluation of accessible services.|
    |dos|These scripts are used to check services for denial of service vulnerabilities and are used less as it harms the services.|
    |exploit|This category of scripts tries to exploit known vulnerabilities for the scanned port.|
    |external|Scripts that use external services for further processing.|
    |fuzzer|This uses scripts to identify vulnerabilities and unexpected packet handling by sending different fields, which can take much time.|
    |intrusive|Intrusive scripts that could negatively affect the target system.|
    |malware|Checks if some malware infects the target system.|
    |safe|Defensive scripts that do not perform intrusive and destructive access.|
    |version|Extension for service detection.|
    |vuln|Identification of specific vulnerabilities.|
    
    The scripts are in this path:
    
    **/usr/share/nmap/scripts/**
    
    `Nmap` also gives us the ability to scan our target with the aggressive option (`-A`). This scans the target with multiple options as service detection (`-sV`), OS detection (`-O`), traceroute (`--traceroute`), and with the default NSE scripts (`-sC`).
    
    nmap <ip>-p <port> -sV --script vuln
    
    |`-A`|Performs service detection, OS detection, traceroute and uses defaults scripts to scan the target.|
    |---|---|
    |-sV|Performs service version detection on specified ports.|
    |--script vuln|Uses all related scripts from specified category.|
    
- **Performance**
    
    Scanning performance plays a significant role when we need to scan an extensive network or are dealing with low network bandwidth.
    
    We can use various options to tell `Nmap`
    
    - How fast (`-T <0-5>`),
    - With which frequency (`--min-parallelism <number>`),
    - Which timeouts (`--max-rtt-timeout <time>`) the test packets should have,
    - How many packets should be sent simultaneously (`--min-rate <number>`),
    - And with the number of retries (`--max-retries <number>`) for the scanned ports the targets should be scanned.
    
    At this 5 settings, `--min-parallelism <number>` ,`--max-rtt-timeout <time>` ,`--max-retries <number>`, modifying this 3 can give us an unreal results because we don’t wait the necesary to machines responds correctly, however `--min-rate <number>` and `-T <0-5>`, don’t change the result. Just -T in some enviroments could be block by firewalls or antivirus if we put at max because is very agressive sending packets.
    
    _**Recommends:**_
    
    - -T 4
    - —min-rate 5000
- **Firewall/IDS Evasion**
    
    `Nmap` gives us many different ways to bypass firewalls rules and IDS/IPS. These methods include the fragmentation of packets, the use of decoys, and others that we will discuss in this section.
    
    **Decoys**
    
    There are cases in which administrators block specific subnets from different regions in principle. This prevents any access to the target network. Another example is when IPS should block us. For this reason, the Decoy scanning method (`-D`) is the right choice
    
    Example:
    
    nmap 10.129.2.28 -p 80 -sS -Pn -n --disable-arp-ping --packet-trace _**-D RND:5**_
    
    |Scanning Options|Description|
    |---|---|
    |10.129.2.28|Scans the specified target.|
    |-p 80|Scans only the specified ports.|
    |-sS|Performs SYN scan on specified ports.|
    |-Pn|Disables ICMP Echo requests.|
    |-n|Disables DNS resolution.|
    |--disable-arp-ping|Disables ARP ping.|
    |--packet-trace|Shows all packets sent and received.|
    |**-D RND:5**|**Generates five random IP addresses that indicates the source IP the connection comes from.**|
    
    Anothe example `sudo nmap 10.129.2.28 -n -Pn -p 445 -O -S 10.129.2.200 -e tun0`
    
    |Scanning Options|Description|
    |---|---|
    |10.129.2.28|Scans the specified target.|
    |-O|Performs operation system detection scan.|
    |-S|Scans the target by using different source IP address.|
    |10.129.2.200|Specifies the source IP address.|
    |-e tun0|Sends all requests through the specified interface.|
    
    **DNS Proxying**
    
    By default, `Nmap` performs a reverse DNS resolution unless otherwise specified to find more important information about our target.
    
    However, `Nmap` still gives us a way to specify DNS servers ourselves (`--dns-server <ns>,<ns>`)
    
    **Example:**
    
    **SYN-Scan of a Filtered Port**
    
    ```
    nmap 10.129.2.28 -p50000 -sS -Pn -n --disable-arp-ping --packet-trace
    
    Starting Nmap 7.80 ( <https://nmap.org> ) at 2020-06-21 22:50 CEST
    SENT (0.0417s) TCP 10.10.14.2:33436 > 10.129.2.28:50000 S ttl=41 id=21939 iplen=44  seq=736533153 win=1024 <mss 1460>
    SENT (1.0481s) TCP 10.10.14.2:33437 > 10.129.2.28:50000 S ttl=46 id=6446 iplen=44  seq=736598688 win=1024 <mss 1460>
    
    Nmap scan report for 10.129.2.28
    Host is up.
    
    PORT      STATE    SERVICE
    50000/tcp **filtered** ibm-db2
    ```
    
    **SYN-Scan From DNS Port**
    
    ```
    nmap 10.129.2.28 -p50000 -sS -Pn -n --disable-arp-ping --packet-trace --source-port 53
    
    SENT (0.0482s) TCP 10.10.14.2:53 > 10.129.2.28:50000 S ttl=58 id=27470 iplen=44 
    seq=4003923435 win=1024 <mss 1460>
    RCVD (0.0608s) TCP 10.129.2.28:50000 > 10.10.14.2:53 SA ttl=64 id=0 iplen=44  seq=540635485 win=64240 <mss 1460>
    
    Nmap scan report for 10.129.2.28
    Host is up (0.013s latency).
    
    PORT      STATE SERVICE
    50000/tcp open  ibm-db2
    MAC Address: DE:AD:00:00:BE:EF (Intel Corporate)
    ```
    
    |Scanning Options|Description|
    |---|---|
    |-sS|Performs SYN scan on specified ports.|
    |--packet-trace|Shows all packets sent and received.|
    |--source-port 53|Performs the scans from specified source port.|
    
    Now that we have found out that the firewall accepts `TCP port 53`, it is very likely that IDS/IPS filters might also be configured much weaker than others. We can test this by trying to connect to this port by using `Netcat`. **Connect To The Filtered Port**
    
    ```
    ncat -nv **--source-port 53** 10.129.2.28 50000
    
    Ncat: Version 7.80 ( <https://nmap.org/ncat> )
    Ncat: Connected to 10.129.2.28:50000.
    220 ProFTPd
    ```
    
- **Notas de los laboratorios**
    
    Si tenemos el puerto 22 abierto nos podemos conectar con netcat para obtener información como por ejemplo el **SO**.
    
    En caso de que veamos que no podemos acceder por tcp a los servicios probar con udp porque igual estan menos protegidos y podemos obtener información por ahí.
    
    nc -nv 10.129.101.74 50000 -p 53
    
    - `nc`: Comando de netcat, una herramienta de red que puede leer y escribir datos a través de conexiones de red utilizando los protocolos TCP o UDP.
    - `nv`: Estos son dos parámetros combinados:
        - `n`: Evita que `nc` realice una búsqueda de nombres de host inversa y utiliza solo la IP proporcionada.
        - `v`: Activa el modo verbose (verboso), proporcionando más detalles sobre lo que está haciendo `nc`, como el estado de la conexión.
    - `10.129.101.74`: La dirección IP del host al que te estás conectando.
    - `50000`: El puerto al que te estás conectando en el host.
    - `p 53`: Especifica el puerto de origen desde el cual `nc` realiza la conexión, en este caso, el puerto 53.

