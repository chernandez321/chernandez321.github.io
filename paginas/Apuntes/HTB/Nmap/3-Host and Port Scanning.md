    
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