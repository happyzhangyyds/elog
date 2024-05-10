---
password: ''
icon: ''
date: '2024-04-21 00:00:00'
type: Post
category: 动手实践
slug: Nextcloud_Webdav-Zotero
tags:
  - 实用教程
summary: 这篇文章简单介绍了如何通过Nextcloud Webdav的方式进行Zotero同步，内容包括：服务器入门，linux运维面板的安装，Nextcloud和Mysql的安装，Nginx的使用，Zotero的Webdav的设置，解除php上传的限制，从而实现在自有网盘间进行数据同步，为搭建大规模数据集提供了基础。
title: '[文献管理]  Nextcloud_Webdav的Zotero同步方案'
status: Published
cover: 'https://bu.dusays.com/2024/04/23/6627aa88c05d9.jpeg'
urlname: d04a5572-3f9a-486d-ac95-c02ffd093e23
updated: '2024-04-23 20:36:00'
---

# 前言


---


需求的提出：

- flomo:#想法 在解决问题当中，工具和人是非常重要的两个因素 2024-02-23
- flomo:#学习 关联zotero和专业课的笔记，可以上传服务器进行查看 2024-02-29
- flomo:#学习 使用webdav建立文献管理方式 2024-04-19
- [流动核心](https://matrixcore.top/article/inexhaustible#a14a6f8b2275406ea446d94b9c191dd6):#言论 如果你没有时间集中精力学习新知识，那么就花时间复习已经学过的内容。

# 正文


---


解决的策略：


  首先，为什么是Zotero，引用红薯下士的：[Zotero 简明介绍](https://zhuanlan.zhihu.com/p/445621222#:~:text=Zotero%20%E6%98%AF%E4%B8%80%E4%B8%AA%20%E5%BC%80%E6%BA%90,%E3%80%81%E6%98%93%E7%94%A8%E7%9A%84%E5%A4%9A%E5%B9%B3%E5%8F%B0%E7%A7%91%E7%A0%94%E5%B7%A5%E5%85%B7%EF%BC%8C%E5%8F%AF%E7%94%A8%E6%9D%A5%E5%B8%AE%E5%8A%A9%E6%94%B6%E9%9B%86%E3%80%81%E7%BB%84%E7%BB%87%E3%80%81%E5%BC%95%E7%94%A8%E3%80%81%E5%88%86%E4%BA%AB%E5%90%84%E7%B1%BB%E8%B5%84%E6%96%99%EF%BC%8C%E6%B3%A8%E5%86%8C%E8%B4%A6%E5%8F%B7%E4%B9%8B%E5%90%8E%E5%8F%AF%E4%BB%A5%E4%BD%BF%E7%94%A8%E5%AE%98%E6%96%B9%E6%9C%8D%E5%8A%A1%E5%99%A8%E5%9C%A8%E5%A4%9A%E7%AB%AF%20%E8%87%AA%E5%8A%A8%E5%90%8C%E6%AD%A5%20%E4%BB%A5%E5%8F%8A%E4%BD%BF%E7%94%A8%E6%B5%8F%E8%A7%88%E5%99%A8%E6%8F%92%E4%BB%B6%EF%BC%8C%E8%BF%98%E5%8F%AF%E4%BB%A5%E7%9B%B4%E6%8E%A5%E5%9C%A8%E7%BD%91%E9%A1%B5%E4%B8%AD%E6%93%8D%E4%BD%9C%E3%80%82)，在windows端的文献管理方面，Zotero有他的独到之处。尽管我更喜欢苹果生态的Marginnote，但Zotero的多平台特性，使得它能满足绝大多数的使用场景。值得注意的是，Zotero如果是资深用户，就需要考虑有关存储空间的限制，当然如果仅在本地用，就无需考虑这些问题了，但涉及到云的问题，就变得复杂得多。目前很多主流的方式是搭配坚果云作为webdav，但我更倾向于自己折腾。因为就个人体验而言，我更喜欢Nextcloud。


## 青菜萝卜各有所爱


---


  首先我需要声明一点，需求可能具有普遍性，但是做法可能因人而异，选择适合自己的就行。我采用的方案是使用[软云](https://ruan.cloud/aff/HNAAAYYQ)的服务器，目前购置的是2H4G40G4M这款机型。三年的费用在500左右，目前体验下来速度很不错，跑了一个[hugo](http://hugo.matrixcore.top/)练练手，小破站弱不禁风，大佬手下留情😢，效果如下图所示，测试时间为北京时间上午11点左右，响应时长在1-2s之间。首先比较基础的就是，购买服务器之后进行ssh登陆，在终端输入ssh root@ipv4，输入密码进行验证即可。


![6627ab4ccee3d.jpeg](https://bu.dusays.com/2024/04/23/6627ab4ccee3d.jpeg)


![6627ab1eb234a.png](https://bu.dusays.com/2024/04/23/6627ab1eb234a.png)


## 安装1panel


---


  [1panel](https://1panel.cn/)可以将您 的linux性能可视化，同时在操作上更加亲切，我选的是ubuntu22.04系统，安装1panel非常简单，ubuntu在线安装命令如下，其他系统参照[手册](https://1panel.cn/docs/installation/online_installation/)。


```shell
curl -sSL https://resource.fit2cloud.com/1panel/package/quick_start.sh -o quick_start.sh && sudo bash quick_start.sh
```


  下面来解释为什么安装1panel，不仅是因为在管理服务器上更加方便，而且在装很多应用程序的时候，不需要您手动在命令化中进行复杂的操作，只需要通过内置的商店docker部署就行。额外插一句，1panel包含很多不错的博客框架，包括wordpress，halo都可以一键安装，感兴趣可以试试，目前wordpress对于博客入门来讲都是很好的选择，当然wordpress体量稍微有些大了，在访问速度上可能需要您进行优化。


  回归主题，这次我们要通过1panel安装nextcloud和mysql，这一步相对比较简单，装完mysql之后，新建一个账户。作为nextcloud的数据库，同时放开端口，一般是3306，然后安装完nextcloud一般首次需要进行初始化设置，一般是40069端口，同时需要记得放开这两个端口。


```shell
sudo ufw allow 3306 #示例
```


  通过浏览器访问40069一般会出现初始化界面，填入账号密码，然后关联数据库，最下面的对应ipv4:3306。然后初始化完成之后即可进行nextcloud。要注意的是，next可能只能通过https访问，通过http可能访问不了。所以可能得加上https://ipv4:40069的方式进行访问。


## 安装nginx


---


  nginx可以隐藏您的ip地址，通过域名进行访问。安装过程也比较简单。


```shell
sudo apt-get update #更新系统
sudo apt install nginx -y #进行安装
```


  安装完成后您可以按照网上的教程设置。回去补充更新。


## nextcloud通过域名访问


---


一般来讲，刚开始nextcloud还无法通过域名进行访问，需要在设置文件中进行配置，找到1panel安装nextcloud的文件夹，找到config.php，添加受信任的域名。前提是您需要拥有一个域名，并成功通过cloudflare进行dns解析。


```php
'trusted_domains' =>
array (
0 => 'localhost',
1 => 'server1.example.com',
2 => '192.168.1.50',
3 => '[fe80::1:50]',
),
```


## 关联nextcloud和zotero


---


> 💡 什么是 WebDAV 呢？  
> 简单来说，webdav就像一个存储服务，各种应用都可以连接到它，允许应用直接访问我们的云盘内容，对其进行读写操作。**我们可以网络服务比作一只章鱼，云盘是它的大脑，WebDAV是它的触角。**每个触角都连接到我们智能设备上的应用程序。我们的应用可以通过触角读取章鱼的大脑，并将数据写入大脑，改变大脑的记忆和内容。  
> 作者：知乎用户  
> 链接：[https://www.zhihu.com/question/30719209/answer/1229364665](https://www.zhihu.com/question/30719209/answer/1229364665)  
> 来源：知乎


	作者：知乎用户
	链接：[https://www.zhihu.com/question/30719209/answer/1229364665](https://www.zhihu.com/question/30719209/answer/1229364665)
	来源：知乎


参考官方说明，webdav一般格式为：


```html
https://example.com/remote.php/dav/files/USERNAME
<!--一般的webdav格式是这样，然后登入您的账号密码进行验证-->
```


感谢Zotero中文小组对[Zotero webdav的讲解](https://zotero-chinese.com/user-guide/sync.html)， 我就不多费口舌了。


## 修改nextcloud webdav php上传的限制


---


一开始我遇到的同步失败的问题，一些较小的文献可以成功，但另外一些较大的文献就会出现413的错误，查询后发现是因为文件体积过大，于是我就联想到了是不是nextcloud和nginx对这个进行了限制。于是进行了查询，发现确实有此限制。


> 💡 通过web客户端上传文件时，受PHP和Apache配置的限制。默认PHP只允许2兆字节的上传。此默认配置（2兆字节限制）并不适用，我们建议您的Nextcloud管理员将Nextcloud变量的大小增加到适合用户的大小。


修改方式参考[手册](https://docs.nextcloud.com/server/latest/admin_manual/configuration_files/big_file_upload_configuration.html)，回去再补充。


# 总结


---


   这篇文章简单介绍了，如何通过Nextcloud Webdav的方式进行Zotero同步，内容包括，服务器的入手，linux运维面板的安装，Nextcloud和Mysql的安装，Nginx的使用，Zotero的Webdav的设置，及如何解除php上传的限制，从而实现在自有网盘间进行数据同步，为搭建大规模数据提提供了基础。


## 附录


---


❤️体验效果：目前因为香港的带宽比较紧俏，所以在初次同步期间时间可能会略长些，但是同步完成之后，下载后就可以多设备正常使用，而且对于文件内修改标记追踪很灵敏，这也是我比较喜欢的地方。

