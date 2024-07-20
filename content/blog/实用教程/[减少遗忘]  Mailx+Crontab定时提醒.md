---
password: ""
icon: ""
date: "2024-07-20"
type: Post
category: 动手实践
slug: mailx_crontab
tags:
  - 实用教程
summary: 本文介绍了如何在服务器上搭建邮件服务，使用 Postfix 和 Dovecot 的组合，以实现定时提醒功能。首先，安装并配置 Postfix 和 Dovecot，设置正确的 DNS 记录以确保邮件服务器可用。接着，安装并配置 mailx，添加必要的 SMTP 信息和 SSL 证书以确保邮件安全发送。最后，通过 cron 设置每日提醒，帮助用户避免忘记上下班打卡，从而提升日常工作管理效率。
title: "[减少遗忘]  Mailx+Crontab定时提醒"
status: Published
urlname: 909f8026-776e-4833-ba73-eae44a0b5941
updated: "2024-07-20 12:19:00"
---

# 前言

---

习惯的养成是主动和被动共同的硕果，但完全依赖习惯，也会增加大脑的负担。这几天往往因为其他的事情，而忘记上下班打卡。为此，基于之前的经验，重新在瓦工上部署了 mailx+posfix，并且通过 cron 脚本定时提醒，以下是操作的步骤。

# 正文

---

最初我的目的是搭建一个 web 邮箱服务，但后面考虑到复杂程度和需求，最终决定先使用 Postfix + Dovecot，

> 简介：Postfix 是一个流行的邮件传输代理，Dovecot 是一个 IMAP/POP3 服务器。结合使用可以搭建功能强大的邮件服务。特点：灵活性高，支持多种邮件协议，适合有一定技术基础的用户。

目前还没花时间研究 Dovecot，所以这部分等有空的时候再去补充。

## 安装 Postfix 和 Dovecot

---

在基于 Debian 或 Ubuntu 的系统上，可以使用以下命令安装：

```shell
sudo apt update
sudo apt install postfix dovecot-core dovecot-imapd

```

在安装过程中，会提示配置 Postfix，选择 "Internet Site"，并输入你的域名。

## 配置 Postfix

---

编辑 Postfix 配置文件 `/etc/postfix/main.cf`，确保以下设置：

```text
myhostname = your.com
alias_maps = hash:/etc/aliases
alias_database = hash:/etc/aliases
myorigin = /etc/mailname
mydestination = $myhostname, localhost.$mydomain, localhost, $mydomain
relayhost =
mynetworks = 127.0.0.0/8 [::ffff:127.0.0.0]/104 [::1]/128
mailbox_size_limit = 0
recipient_delimiter = +
inet_interfaces = all
inet_protocols = all

```

编辑 `/etc/mailname` 文件

```shell
sudo nano /etc/mailname

```

在文件中输入你的域名，例如：

```text
matrixcore.life

```

重启 postfix

```shell
sudo systemctl restart postfix

```

替换发件人名称，创建或编辑 `/etc/postfix/sender_canonical` 文件：

```shell
sudo nano /etc/postfix/sender_canonical

```

添加以下行：

```text
root@原来 root@现在

```

运行以下命令以生成 Postfix 可使用的映射数据库：

```shell
sudo postmap /etc/postfix/sender_canonical

```

确保在 `/etc/postfix/main.cf` 中添加或更新以下行：

```text
sender_canonical_maps = hash:/etc/postfix/sender_canonical

```

在完成上述步骤后，重新加载 Postfix 以应用更改：

```shell
sudo systemctl reload postfix

```

## 配置 DNS 记录

---

### 添加 MX 记录

---

- **查找 MX 记录设置**：在 DNS 管理页面，找到添加 MX 记录的选项。
- **输入信息**：
- **主机名**（Host）：通常是 `@`（表示根域名）。
- **值**（Value）：输入邮件服务器的完整域名（如 `mail.yourdomain.com`）。
- **优先级**（Priority）：设置优先级，通常为 `10`（如果没有其他邮件服务器，可以使用这个值）。
- **保存记录**。
-

### 添加 A 记录

---

- **查找 A 记录设置**：在 DNS 管理页面，找到添加 A 记录的选项。
- **输入信息**：
- **主机名**（Host）：通常是 `@`（表示根域名）或 `mail`（如果你希望使用 `mail.yourdomain.com`）。
- **值**（Value）：输入你的邮件服务器的 IP 地址。
- **TTL**（生存时间）：可以使用默认值或设置为 3600 秒（1 小时）。

### 验证配置

---

```shell
dig MX yourdomain.com
dig A mail.yourdomain.com

```

确保返回的结果与你设置的记录相符。

## 安装 mailx

---

```shell
sudo apt install mailutils
#sudo apt install bsd-mailx  或者使用这条命令

```

### 配置 mailx

---

```shell
sudo vim /etc/mail.rc

```

然后添加以下内容（根据你的邮件服务器设置进行调整）：

```text
set from=your@qq.com
set smtp=smtps://smtp.qq.com:465
set smtp-auth-user=your@qq.com
set smtp-auth-password=获取授权
set smtp-auth=login
set ssl-verify=ignore
set smtp-use-starttls
set nss-config-dir=/root/.certs/

set from=your@163.com
set smtp=smtps://smtp.163.com
set smtp-auth=login
set smtp-auth-user=your@163.com
set smtp-auth-password=获取授权
set ssl-verify=ignore
set nss-config-dir=/root/.certs/

```

参考[mailx 通过 smtp 登录 QQ 邮箱发送邮件 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/418193520)因为需要 QQ 邮箱的 SSL 证书，所以我们还需要手动的获取 QQ 邮箱的证书保存到本地指定的目录里以备调用和验证，具体命令如下：

```text
mkdir -p /root/.certs/
echo -n | openssl s_client -connect smtp.qq.com:465 | sed -ne '/-BEGIN CERTIFICATE-/,/-END CERTIFICATE-/p' > ~/.certs/qq.crt
certutil -A -n "GeoTrust SSL CA" -t "C,," -d ~/.certs -i ~/.certs/qq.crt
certutil -A -n "GeoTrust Global CA" -t "C,," -d ~/.certs -i ~/.certs/qq.crt
certutil -L -d /root/.certs

```

为了防止出现发送邮件警告提示，还需要进入邮箱 SSL 证书存放目录

cd /root/.certs 里执行如下命令：

```text
certutil -A -n "GeoTrust SSL CA - G3" -t "Pu,Pu,Pu" -d ./ -i qq.crt

```

返回如下提示即可：

**Notice: Trust flag u is set automatically if the private key is present.**

这是为了信任证书的标记操作

## 发送测试邮件

---

```shell
echo "Test email body" | mail -s "Test Subject" recipient@example.com

```

## 使用 cron 任务

---

使用以下命令查看当前时区：`timedatectl`

如果时区不正确，可以使用以下命令设置为上海时间：`sudo timedatectl set-timezone Asia/Shanghai`

更改时区后，您可能需要重启  `cron`  服务以应用更改：`sudo systemctl restart cron`

```text
30 19 * * 1-6 echo "记得打卡" | mailx -s "Remember to clock in and out." your@qq.com

```

# 总结

---

本文介绍了如何在服务器上搭建邮件服务，使用 Postfix 和 Dovecot 的组合，以实现定时提醒功能。首先，安装并配置 Postfix 和 Dovecot，设置正确的 DNS 记录以确保邮件服务器可用。接着，安装并配置 mailx，添加必要的 SMTP 信息和 SSL 证书以确保邮件安全发送。最后，通过 cron 设置每日提醒，帮助用户避免忘记上下班打卡，从而提升日常工作管理效率。
