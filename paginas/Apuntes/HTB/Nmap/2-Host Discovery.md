  
  When we need to conduct an internal penetration test for the entire network of a company, for example, then we should, first of all, get an overview of which systems are online that we can work with.
    
 To actively discover such systems on the network, we can use various `Nmap` host discovery options. There are many options `Nmap` provides to determine whether our target is alive or not. The most effective host discovery method is to use **ICMP echo requests**, which we will look into.
    
It is always recommended to store every single scan. This can later be used for comparison, documentation, and reporting. After all, different tools may produce different results. Therefore it can be beneficial to distinguish which tool produces which results.
    
**Scan Network Range**
    
`nmap ***10.129.2.0/24*** -sn -oA tnet | grep for | cut -d" " -f5`
    
|**Scanning Options**|**Description**|
    |---|---|
    |`10.129.2.0/24`|Target network range.|
    |`-sn`|Disables port scanning.|
    |`-oA tnet`|Stores the results in all formats starting with the name 'tnet'.|
    
**Scan using a list of hosts**
    
`sudo nmap -sn -oA tnet ***-iL hosts.lst***`
    
![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/04882ab5-1872-4434-a4b5-040f8bee2a4b/cf690418-636c-49b6-aae1-59fbb9c22944/Untitled.png)
    
**Scan Multiple IPs**
    
It can also happen that we only need to scan a small part of a network. An alternative to the method we used last time is to **specify multiple IP addresses**.
    
nmap -sn -oA tnet _**10.129.2.18 10.129.2.19 10.129.2.20**_
    
If these IP addresses are next to each other, we can also define the range in the respective octet
    
`nmap -sn -oA tnet *10.129.2.18-20*`

**Scan Single IP**
    
`nmap 10.129.2.18 -sn -oA host`
    
Track the icmp request
    
`nmap 10.129.2.18 -sn -oA host -PE --packet-trace`

|Scanning Options|Description|
    |---|---|
    |10.129.2.18|Performs defined scans against the target.|
    |-sn|Disables port scanning.|
    |-oA host|Stores the results in all formats starting with the name 'host'.|
    |-PE|Performs the ping scan by using 'ICMP Echo requests' against the target.|
    |--packet-trace|Shows all packets sent and received|
    
We see here that `Nmap` does indeed detect whether the host is alive or not through the `ARP request` and `ARP reply` alone. To disable ARP requests and scan our target with the desired `ICMP echo requests`, we can disable ARP pings by setting the "`--disable-arp-ping`" option. Then we can scan our target again and look at the packets sent and received.
    
```
    nmap 10.129.2.18 -sn -oA host -PE --packet-trace ***--disable-arp-ping*** 
    
    Starting Nmap 7.80 ( <https://nmap.org> ) at 2020-06-15 00:12 CEST
    **SENT (0.0107s) ICMP [10.10.14.2 > 10.129.2.18 Echo request (type=8/code=0) id=13607 seq=0] IP [ttl=255 id=23541 iplen=28 ]
    RCVD (0.0152s) ICMP [10.129.2.18 > 10.10.14.2 Echo reply (type=0/code=0) id=13607 seq=0] IP [ttl=128 id=40622 iplen=28 ]**
    Nmap scan report for 10.129.2.18
    Host is up (0.086s latency).
    MAC Address: DE:AD:00:00:BE:EF
    Nmap done: 1 IP address (1 host up) scanned in 0.11 seconds
    ```
    
    Other parameters in nmap:
    
    - -`v` (same as `-verbose`)
    
    By default, Nmap usually only prints active, responsive hosts. Verbose mode causes Nmap to print down hosts, as well as extra information about active ones.
    
    - `n`, `R`
    
    The `-n` option _**disables all DNS resolution**_, while the `-R` option _**enables DNS queries for all hosts**_, even down ones. The default behavior is to limit DNS resolution to active hosts. These options are particularly important for ping scanning because _**DNS resolution can greatly affect scan times**_.
    
    - `-dns-servers *<server1>*[,*<server2>*[,...]]` (Servers to use for reverse DNS queries)
    
    By default Nmap will try to determine your DNS servers (for rDNS resolution) from your resolv.conf file (Unix) or the Registry (Win32). Alternatively, you may use this option to specify alternate servers. This option is not honored if you are using `--system-dns` or an IPv6 scan. Using multiple DNS servers is often faster and more stealthy than querying just one. The best performance is often obtained by specifying all of the authoritative servers for the target IP space.