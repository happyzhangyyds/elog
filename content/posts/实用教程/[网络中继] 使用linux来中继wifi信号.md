---
password: ""
icon: ""
date: "2024-03-30"
type: Post
category: 动手实践
slug: linux-wifi
tags:
  - 实用教程
summary: 大多数手机和许多现代的无线网卡支持一种叫作“Wi-Fi Direct”或“软件接入点（Soft AP）”的功能，它们可以让设备即作为无线客户端连接到Wi-Fi网络，同时也能作为热点向其他设备提供Wi-Fi连接。
title: "[网络中继] 使用linux来中继wifi信号"
status: Published
urlname: 360321b9-eb2a-4fbe-a76a-96c7b2671596
updated: "2024-03-30 17:05:00"
---

# 前言

---

这是一篇不成熟的日志，记录了我对于 linux 中继网络的一些思考。

我突然想到之前玩的一款手游，叫做贪婪洞窟，里面非常让人觉得有意思的事情是，往往在下洞穴探秘的时候，会收到前辈的手稿，这些手稿记录了先驱在探索洞穴的时的一些思考，读这些故事很有趣，此去经年，虽然已经不打这款游戏了，也装过盗版刷通了副本，但是这个片段始终让我觉得和现在的自己很像。

# 正文

---

首先，这个需求适用于哪些方面，适用于房间 wifi 信号不好的时候，才会考虑使用设备进行中继。

我先是去京东上看了看无线中继的价格，巴掌大小，也就几十块钱。

但是我突然一想，它能做，我的鲁班猫为什么不能做。

之前闲置了数个月的鲁班猫终于在尘封的袋子里被拿出来。

## 未能搞懂的驱动模块

---

在 Linux 上，你可以将你的电脑配置成一个无线信号中继器或扩展器，这样做可以帮助扩展现有无线网络的覆盖范围。这个过程通常包括两个无线网络接口：一个用于连接到现有的无线网络（作为客户端），另一个用于创建一个新的无线热点，其他设备可以连接到这个热点以接入网络。

在最开始，我是沿着这个思路去走的，过程如下；

1.  **确保硬件兼容性**：
    - 你需要一个支持 AP 模式的无线网卡。你可以通过运行`iw list`命令来检查你的无线网卡是否支持 AP 模式。
2.  **安装必要的软件**：

    - 确保你的系统上安装了`hostapd`（用于 AP 模式）和`dnsmasq`（用于 DHCP 和 DNS 服务）：

    ```shell
    sudo apt-get install hostapd dnsmasq
    ```

3.  **配置网络接口**：
    - 编辑`/etc/network/interfaces`或使用`nmcli`（NetworkManager 的命令行接口）来配置网络接口。你需要为两个无线接口分别配置客户端和 AP 设置。
4.  **配置\*\***`hostapd`\*\*：

    - 创建`/etc/hostapd/hostapd.conf`配置文件，设置 SSID 和密码等：

    ```shell
    interface=wlan1
    driver=nl80211 #卡在了这一步
    ssid=YourRepeaterSSID
    hw_mode=g
    channel=6
    wmm_enabled=0
    macaddr_acl=0
    ignore_broadcast_ssid=0
    auth_algs=1
    wpa=2
    wpa_passphrase=YourPassphrase
    wpa_key_mgmt=WPA-PSK
    wpa_pairwise=TKIP
    rsn_pairwise=CCMP
    ```

    最开始我使用 hostapd，一种有驱动报错的问题，之后就重启了系统找其他的思路。我也尝试过怎么适配这个驱动，但一时半会搞不成。

    ## **使用 create_ap 脚本**

    ***

    **使用** **`create_ap`** **脚本**：

    - `create_ap` 是一个简化创建接入点过程的 shell 脚本。它允许您通过一个命令行界面轻松地创建一个接入点。您可以从 GitHub 获取这个脚本并按照提供的说明进行安装和使用。

      我也尝试使用过这个脚本，但是实际情况是这样的，鲁班猫的网卡不具备同时开启 wlan0 和 waln1 的能力，在同一时间只能作为设备或者热点存在。

    ## 使用 NetworkManager 的热点功能

    ***

    我还是比较喜欢这个，原因如下：

    1.系统自带

    2.操作便捷

    ### 确认设备网卡是否支持 AP 模式。

    ***

    打开终端，运行以下命令查看无线网卡是否支持 AP 模式：

    ```shell
    iw list
    ```

    在输出中寻找 "Supported interface modes" 部分，查看是否包含 "AP"。

    终端我是使用串口进行连接的。

    ### **创建一个共享的网络连接**

    ***

    使用命令行：

    ```shell
    nmcli dev wifi hotspot ifname wlan0 ssid YourHotspotSSID password "YourPassword"
    ```

    请将 `wlan0` 替换为你的无线设备名称，`YourHotspotSSID` 替换为你想要的热点名称，`YourPassword` 替换为你的密码。

    一般在这种情况下，一个 wifi 热点就被创建完成了，但是需要注意的是，该热点还不具备上网功能，目前只具备信号的中继功能。您还需要输入，就是进入互联网的最根本的设备，可以是您的光猫，当然也可以是手机。

    ## 走过的弯路

    ***

    我花了很多时间尝试同时开启 wlan0 和 wlan1，在我一筹莫展的时候，我才突然想起手机可以作为信号的输入，但是由于手机的天线质量比较一般，通过鲁班猫做下一步操作或许更加合适。

    第一次成功是使用 wlan1 作为热点，但是缺点是重启后，鲁班猫又重新恢复了作为设备的角色。每一次重启重新用串口进终端显然不是我们需要的效果。

    而且中途还遇到了很奇怪的事情，让我深深陷进去了。在我执行完这一步之后，或许是一些其他的步骤，导致 wlan 在软件层面被禁用了，在终端里死活打不开，气得我都快要怀疑是硬件出了问题，都准备好重装系统了。然后还顺带看了点 openwrt 的知识，很零碎。

    **确保没有冲突的网络服务**:

        有时候，其他网络服务（如 `wpa_supplicant` 或 `dhclient`）可能会跟 NetworkManager 冲突，尝试禁用或停止这些服务，然后再次尝试启用接口。


        ```shell
        sudo systemctl stop wpa_supplicant
        sudo systemctl stop dhclient
        ```


        然后再次尝试启用 `wlan1`。

    一直在徘徊，找不到问题所在：

    **检查无线设备的 RF-Kill 状态**:

    有时候无线设备可能被软件或硬件层面的 RF-Kill 锁定，导致设备不可用。

    ```shell
    rfkill list
    ```

    如果您看到 `wlan1` 被列为 `Soft blocked` 或 `Hard blocked`，您可以解锁它：

    ```shell
    sudo rfkill unblock wifi
    ```

    **检查接口状态**:

    使用以下命令检查两个接口的状态：

    ```shell
    nmcli device status
    ```

    这将显示所有网络设备的列表以及它们的状态。

    一直是 wlan0 state DOWN，搞得我心灰意冷。

    <details>
      <summary>反复在终端里排查问题，不知道因为这个问题，绕了多少圈，然后心灰意冷的情况下接mipi显示屏的时候，FPC的线还接反了，我特么还以为mipi屏幕坏了，后来您知道怎么着了么，我在意识到mipi屏幕的问题了之后，重新用图形化界面开启了wlan，解决了在终端死活解决不了的问题，很烦躁。（一般半夜我和白天判若两人，不太能控制情绪，为啥啊，因为这个月流量超了快15块钱，学习通刷课刷得我是真没流量了，平时又好刷个视频，总之很烦）</summary>

    1. **检查无线设备是否被禁用**:

       ```shell
       rfkill list
       ```

       如果看到 `wlan0` 或 `wlan1` 被列为 `Soft blocked` 或 `Hard blocked`，可以使用以下命令解锁：

       ```shell
       sudo rfkill unblock wifi
       ```

    2. **启动无线接口**:

       尝试手动启动 `wlan0`：

       ```shell
       sudo nmcli device set wlan0 managed yes
       sudo nmcli device connect wlan0
       ```

    3. **检查 NetworkManager 配置**:

       确保 NetworkManager 配置没有错误地禁用了 `wlan0`。检查 `/etc/NetworkManager/NetworkManager.conf` 和 `/etc/NetworkManager/conf.d/` 目录下的任何配置文件，看看是否有任何配置可能会导致 `wlan0` 处于关闭状态。

    4. **查看接口状态**:

       再次检查接口的状态：

       ```shell
       nmcli device status
       ```

       这将显示所有网络设备的列表以及它们的状态。确保 `wlan0` 和 `wlan1` 都不是 `unavailable` 或 `down`。

    5. **检查驱动和硬件支持**:

       确保您的无线网络适配器和驱动程序支持同时用作连接到无线网络和热点。您可以使用 `iw list` 命令来检查无线适配器的功能。

       ```shell
       iw list
       ```

       在输出中查找 `valid interface combinations` 或类似的部分，以确定您的硬件是否支持所需的操作模式。

    6. **查看系统日志**:

       如果 `wlan0` 无法启动，查看系统日志可能会提供一些线索：

       ```shell
       journalctl -u NetworkManager
       ```

       这可能会显示尝试启动接口时遇到的任何错误信息。

      </details>

    更专业的问题的解释：

    您的无线设备支持接入点（AP）和监控（monitor）模式，但不支持接口组合。这意味着您的无线适配器可能无法同时在两个不同的模式下运行，例如，不能同时作为一个普通的无线网络连接（客户端模式）和一个无线热点（AP 模式）。

    如果您需要 `wlan0` 和 `wlan1` 同时运行，并且一个用于连接到无线网络，另一个用于创建热点，这可能是不可行的，因为硬件不支持这种配置。

    ### 热点模式系统守护

    ***

    经过上述一顿操作猛如虎，一看战绩 0-5 的操作之后，终于迈入了期待的方向，经过和舍友的讨论，确认了问题的解决思路，手机连接 wifi 同时使用 usb 共享到鲁班猫，这样就可以解决无法同时开启两个网口的问题，使用 usb 在传输速率和稳定性上也会好一点，然后鲁班猫进行中继，用两根小天线就可以将 wifi 广播到整个屋子了。

    要在系统启动时自动执行`nmcli`命令来创建一个热点，您可以将该命令添加到系统启动脚本中。在 Ubuntu 系统中，您可以使用`systemd`来管理系统服务和启动脚本。以下是一种在系统启动时自动执行`nmcli`命令创建热点的方法：首先，创建一个`nmcli-hotspot.service`服务文件，您可以使用以下命令创建并编辑该文件：

    ```shell
    sudo nano /etc/systemd/system/nmcli-hotspot.service
    ```

    在打开的编辑器中，添加以下内容：

    ```text
    [Unit]
    Description=Start nmcli wifi hotspot on boot

    [Service]
    Type=oneshot
    ExecStart=/usr/bin/nmcli dev wifi hotspot ifname wlan0 ssid cat password cattemppwd
    ExecStop=/usr/bin/nmcli con up id YourWiFiSSID
    RemainAfterExit=yes

    [Install]
    WantedBy=multi-user.target
    ```

    请确保`ExecStart`行中的命令与您想要运行的`nmcli`命令相匹配。启用并启动`systemd`服务：保存并关闭编辑器。然后，运行以下命令启用并启动新创建的`nmcli-hotspot.service`服务：

    ```shell
    sudo systemctl enable nmcli-hotspot.service
    sudo systemctl start nmcli-hotspot.service
    ```

    这将使您的`nmcli`命令在系统启动时自动执行，创建无线热点。请注意，确保您的系统正确配置了无线网络接口`wlan0`以及`nmcli`命令在系统启动时可以正确执行。如果有任何问题，您可以查看`systemd`日志以获取更多信息：

    ```shell
    sudo journalctl -u nmcli-hotspot
    ```

    这样您就可以在系统启动时自动创建无线热点了。

    在我断掉串口和 mipi 屏幕之后，重新启动之后，发现 cat 的热点正常启动，遂认为取得了够用的效果。

    ## 后话

    ***

    经过测试，ipad 可以正常使用，笔记本三个系统，ubuntu 好久没用了，没测试，mac 在使用 cat 热点的时候，存在问题，晚上没解决。win 是正常可以使用该热点的。

    ### 手机为什么既能连接网络又能充当热点

    ***

    我不得不感慨，生活中随便用的一个设备，tmd 功能这么牛逼。

    手机能够同时连接网络和充当热点是因为它们具备两种无线通信模块：

    1. **蜂窝数据连接**：手机通过蜂窝网络（如 2G, 3G, 4G, 或 5G）连接到互联网。这是通过手机内置的蜂窝无线模块实现的，该模块可以连接到移动运营商的网络。
    2. **Wi-Fi 热点功能**：同时，手机可以开启 Wi-Fi 热点功能，这实际上是将手机变成一个无线路由器。其他设备可以通过 Wi-Fi 连接到这个热点，然后通过手机的蜂窝数据连接访问互联网。

    这两种功能可以同时工作，因为它们使用不同的无线技术和频率。蜂窝网络通常在 800MHz 到 2600MHz 频段工作，而 Wi-Fi 则通常在 2.4GHz 或 5GHz 频段工作。因此，手机可以通过蜂窝网络接收数据，同时通过 Wi-Fi 热点功能分享这些数据。

    不过，值得注意的是，当手机作为热点使用时，它通常会消耗更多的电池电量，并且可能会变热，因为它需要同时处理蜂窝网络和 Wi-Fi 网络的信号。此外，手机作为热点时，其蜂窝数据使用量可能会增加，这取决于连接到热点的其他设备的数据使用情况。

    大多数手机和许多现代的无线网卡支持一种叫作“Wi-Fi Direct”或“软件接入点（Soft AP）”的功能，它们可以让设备即作为无线客户端连接到 Wi-Fi 网络，同时也能作为热点向其他设备提供 Wi-Fi 连接。

    但是，大多数手机和设备在使用 Wi-Fi 连接到网络的同时，通常不能将同一个 Wi-Fi 适配器用于创建热点来共享这个连接。这是因为大多数 Wi-Fi 适配器在任何给定时间只能在一个模式下工作，即要么作为客户端连接到一个 Wi-Fi 网络，要么作为热点允许其他设备连接。

    不过，一些特定的硬件和驱动程序支持一种名为“虚拟接入点（Virtual Access Point, VAP）”或“多 SSID”功能，它可以让单个无线网卡同时扮演多个角色。对于这样的硬件，理论上是可能的，但这需要硬件支持，并且在软件上也需要相应的配置，这通常不是大多数手机或操作系统默认提供的功能。

    因此，如果您的手机可以做到这一点，那么它可能具有特定的硬件和软件支持，允许其无线网卡同时运行在客户端模式和热点模式。这种功能不是所有设备都支持的，通常取决于设备的硬件能力和操作系统的软件实现。

    # 总结

    ***

    总之，今晚鲁班猫和它的两根小天线给了我巨大的失落和巨大的惊喜，感谢野火的奉献！后续我有机会抽空了解了解。
