---
password: ''
icon: ''
date: '2023-11-23 00:00:00'
type: Post
category: 动手实践
slug: LubanCat-16
tags:
  - 鲁班猫
summary: 从理论角度介绍了如何为鲁班猫设置静态ip
title: '[静态网络] 为鲁班猫设置静态ip（理论）'
status: Published
cover: 'https://bu.dusays.com/2023/11/23/655f113b183dd.png'
urlname: cf3a7e3b-8afa-46c8-bde2-dbc8036001ea
updated: '2024-02-25 17:28:00'
---

# 前言


---


  有时候待久了就会犯迷糊，失去动力，情绪就像捉摸不定的天气一样。


  今天来分享一下关于鲁班猫的一些小百科。鲁班猫是对标树莓派，香橙派的linux卡片电脑。通过对linux卡片电脑的学习，我们可以对操纵系统有一个更加直观的了解。


  对内核的启动过程，网络的配置，如何使用命令行来查看相关的信息，因为我们平时操作电脑大多数时候都是在图形化界面中进行操作的，而我们购买的服务器，也是无需我们去了解如何配置网络和ip的，也是直接提供好的给我们。


  linux卡片电脑可以用来学习嵌入式开发，可以用来对接项目，当然，在这前提下，是需要很多专业知识的。


  我觉得学习知识，需要一种好的心态，但凡内心不够宁静，绝对是在浪费时间而毫无成效，所以这也是为什么我不喜欢开摆的时候的自己。


# 正文


---


  关于鲁班猫的详细介绍可以[查看文档](https://doc.embedfire.com/products/link/zh/latest/linux/ebf_lubancat.html)，静态的[文档](https://doc.embedfire.com/linux/rk356x/quick_start/zh/latest/quick_start/network/network2.html)，[视频](https://www.bilibili.com/video/BV16h4y1x7k8/?spm_id_from=333.999.top_right_bar_window_history.content.click&vd_source=237e295a40d7aaea043ead8c0d2c78ab)。


  鲁班猫连接网络的方式很多，以太网口，Wi-Fi模块，PCIE，USB。


## 前置知识


---


  通过ping命令检测网络连接是否通畅。


```shell
#ping命令
sudo ping + ip地址
sudo ping xxx.com

#查看ip
ifconfig
```


  设备如果想要连接互联网就需要获取IP，那这个IP就是可以对应设备的名字，然后局域网的设备就可以通过ip进行沟通，我们使用ssh连接远程服务器也是这个原理。鲁班猫可以通过网线进行网络的接入。


## 无线连接


---


  可通过USB网卡或者pcie网卡。

- 命令行图形化的连接方式，移到 `Active a connection` 按 `Enter键`，然后选择wifi，按住`Enter`进行连接。

```shell
sudo nmtui
```

- 命令行连接

```shell
nmcli dev wifi list
# 列出可用的wifi接入点, list可以省略
sudo nmcli dev wifi list

# 连接热点PPP, 连接成功后，就会自动生成配置文件，以后要再连接，可以使用nmcli connectio up mySSID命令了
sudo nmcli dev wifi connect PPP password '00000000' ifname wlan0

#如果连接成功后，下次想再连接，就可以使用
sudo nmcli dev wifi connect PPP

#更多nmcli的命令可以使用来查看
nmcli help
nmcli OBJECT help
```


  这篇文章详细介绍[nmcli](https://doc.embedfire.com/linux/rk356x/quick_start/zh/latest/quick_start/wireless/wifi/wifi.html#nmcli)命令。

- 桌面端连接是我们熟用的办法。

## USB网络共享


---


  可以采用手机或者电脑进行网络共享。当然我现在还没试过，之后再看看，可以先[阅读手册](https://doc.embedfire.com/linux/rk356x/quick_start/zh/latest/quick_start/network/network2.html)的理论部分。


## 配置静态ip


---


  刚刚阅读了一篇[很好的文章](https://mp.weixin.qq.com/s/jiPMUk6zUdOY6eKxAjNDbQ)，介绍生活中的互联网的数据传输，设计到mac地址，ip地址，路由器，交换机等概念的讲解，有兴趣大家可以看看。


  为什么要配置静态ip，如果需要涉及到设备之间的数据通信，ssh连接，就希望ip地址是固定的。


  一种办法是需要有路由器的控制权，在路由器的面板上进行静态ip的配置。


  另一种方式是在板卡上进行静态ip的设置。


  一般会先设置为自动分配的ip地址，同时进行ping命令查看该ip地址是否被使用，然后在图形化界面进行静态ip和DNS服务器的设置。


  或者使用命令行进行静态ip的配置。先使用`ifconfig`查看网络的连接情况，记住ip地址和掩码，然后使用`route`查看网关，使用`nmtui`进行配置。


# 总结


---


  简单从理论角度介绍了如何为鲁班猫设置静态ip。

