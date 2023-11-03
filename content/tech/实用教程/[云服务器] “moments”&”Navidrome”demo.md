---
password: ""
icon: ""
date: "2023-09-24"
type: Post
category: 动手实践
slug: azure
tags:
  - 实用教程
summary: "用热情去做好自己喜欢的事情 "
title: "[云服务器] “moments”&”Navidrome”demo"
status: Published
urlname: b457af70-b5c6-460a-870a-3896d3c41856
updated: "2023-11-02 17:17:00"
---

# 前言

---

[鸦鸦的博客](https://crowya.com/friendlinks)通过 wp 框架开发 rss 友链框架，好棒！好心动 🥰！

偶然间看到[时雨开发的 moment](https://shiyu.dev/archives/2069/moments-教程之docker部署/)，也可以实现同样的功能，更心动 😋！

后面也借助 Navidrome 搭建了之前想要实现的云音乐。

效果如下，也在首页添加了导航：

![](https://bu.dusays.com/2023/09/24/65100ca288ad5.png)

![](https://bu.dusays.com/2023/09/24/6510108841216.png)

![](https://bu.dusays.com/2023/09/24/65100d1972f1b.png)

# 简明教程

---

这部分介绍我的踩坑经历和经验回顾，时间有限，有些地方会省略。

## 1.云服务器的选择

---

第一次选择了 AWS 的服务器，但是我感觉不是很稳定。

第二次选择了 Azure，有时不稳定，但用起来感觉还可以。

服务器相关的准备，参考[这篇教程](https://zhuanlan.zhihu.com/p/157632464)

## 2.**Moments 教程之 Docker 部署**

---

这是时雨大大的[教程](https://shiyu.dev/archives/2069/moments-教程之docker部署/)，我再次基础上做一些补充

- 访问 [http://ip:3000](http://ip:3000/)
  这是项目的第一步，通过 docker 部署完成，开放端口之后，您应可以正常访问。

      <details>
        <summary>Azure云服务器上打开端口3000</summary>

      1. 登录到Azure门户（[portal.azure.com](http://portal.azure.com/)）。
      2. 导航到你的虚拟机资源。这可能是通过搜索虚拟机名称或浏览到相关资源组来实现的。
      3. 在虚拟机资源的概述页面上，点击左侧导航栏中的"网络安全组"（Network security group）。
      4. 在网络安全组页面上，选择与你的虚拟机关联的安全组。
      5. 在安全组的概述页面上，点击左侧导航栏中的"入站规则"（Inbound security rules）。
      6. 在入站规则页面上，点击"添加"（Add）按钮以创建新的规则。
      7. 在添加规则的页面上，提供以下信息：
      	- 规则名称（Name）：可以为规则指定一个描述性的名称，例如"Allow Port 3000"。
      	- 优先级（Priority）：指定规则的优先级，数字越小优先级越高。
      	- 源（Source）：指定允许访问端口的来源。可以是特定IP地址、IP范围或者所有来源（0.0.0.0/0）。
      	- 端口范围（Port range）：指定要打开的端口范围，对于端口3000，输入"3000"。
      	- 协议（Protocol）：选择要允许的协议，通常是TCP。
      	- 操作（Action）：选择允许（Allow）流量通过规则。
      8. 完成后，点击"添加"（Add）按钮以创建规则。

      现在，你的Azure云服务器应该允许通过端口3000的流量。请确保你的应用程序在服务器上监听该端口，以便能够接受传入的连接。



        </details>


      <details>
        <summary>Ubuntu服务器上开放端口3000</summary>

      1. 使用SSH登录到服务器。确保你具有管理员权限或可以使用sudo命令。
      2. 打开防火墙配置。Ubuntu使用ufw（Uncomplicated Firewall）作为默认的防火墙管理工具。可以使用以下命令打开ufw配置文件：

      	```shell
      	sudo ufw allow 3000
      	```


      	这将允许从外部访问服务器的3000端口。

      3. 启用防火墙。如果ufw尚未启用，请使用以下命令启用它：

      	```shell
      	sudo ufw enable
      	```


      	系统会提示你确认启用防火墙，输入"y"并按Enter键。

      4. 验证端口是否已打开。可以使用以下命令检查ufw的状态，确保3000端口已打开：

      	```shell
      	sudo ufw status
      	```


      	如果一切正常，你应该看到类似以下内容的输出：


      	```text
      	Status: active

      	To                         Action      From
      	--                         ------      ----
      	3000                       ALLOW       Anywhere
      	```


      	这表示端口3000已成功开放。


      请注意，如果你使用的是云服务提供商（如AWS、DigitalOcean等），你还需要在云服务提供商的控制面板中配置相应的安全组规则，以允许从外部访问端口3000。具体操作步骤可能会有所不同，你可以参考云服务提供商的文档或联系他们的支持部门以获取更多帮助。



        </details>

- 为项目进行自定义域名（可选）

  <details>
    <summary>如何使用nginx反向代理到自己的域名</summary>

  要使用 Nginx 进行反向代理到自己的域名，你可以按照以下步骤进行操作：

  1.  安装 Nginx：首先，确保你的服务器上已经安装了 Nginx。你可以使用适合你的操作系统的包管理器来安装 Nginx，例如在 Ubuntu 上可以使用以下命令进行安装：

      ```shell
      sudo apt update
      sudo apt install nginx
      ```

  2.  配置 Nginx：Nginx 的配置文件通常位于`/etc/nginx`目录下。打开该目录中的`nginx.conf`文件或者在`/etc/nginx/conf.d/`目录中创建一个新的配置文件。
  3.  编辑 Nginx 配置文件：在配置文件中，你需要定义一个反向代理的服务器块。以下是一个示例配置，将请求代理到本地运行的应用程序（假设应用程序运行在本地的 3000 端口）：

      ```html
      server { listen 80; server_name yourdomain.com; location / { proxy_pass
      <http://IP:3000>; proxy_set_header Host $host; proxy_set_header X-Real-IP
      $remote_addr; } }
      ```

      在上述配置中，将`yourdomain.com`替换为你自己的域名，并将`proxy_pass`指令中的端口号和后端应用程序的地址替换为实际的值。

  4.  保存并关闭文件。
  5.  检查 Nginx 配置：运行以下命令检查 Nginx 配置是否正确：

      ```shell
      sudo nginx -t
      ```

  6.  重新加载 Nginx 配置：如果配置文件没有错误，重新加载 Nginx 以使配置生效：

      ```shell
      sudo systemctl reload nginx
      ```

  现在，当访问你的域名时，Nginx 将会将请求反向代理到指定的应用程序。请确保你的应用程序正在监听 Nginx 配置文件中指定的端口。

    </details>

  您还需要放开[nginx 常用的端口](https://cloud.tencent.com/developer/article/1835556)
  您还需要在域名控制台中正确配置您的[DNS 解析](https://blog.csdn.net/bangshao1989/article/details/121913780)
  当您更换服务器 IP 地址时，您还需要注意[DNS 解析生效](https://zhuanlan.zhihu.com/p/650905793?utm_id=0)的问题

- 为域名颁发 ssl 证书（可选）

  <details>
    <summary>颁发ssl证书</summary>

  要为自己的服务器颁发 SSL 证书，你可以按照以下步骤进行操作：

  1.  生成私钥（Private Key）：首先，你需要生成一个私钥文件。在服务器上使用以下命令生成私钥文件（通常使用 OpenSSL 工具）：

      ```shell
      openssl genpkey -algorithm RSA -out private.key
      ```

  2.  生成证书签名请求（Certificate Signing Request，CSR）：使用生成的私钥文件，生成一个证书签名请求文件。运行以下命令并按照提示提供必要的信息：

      ```shell
      openssl req -new -key private.key -out csr.pem
      ```

  3.  购买或使用免费的 SSL 证书：你可以选择购买商业 SSL 证书，或者使用一些免费的证书颁发机构（例如 Let's Encrypt）提供的免费证书。对于 Let's Encrypt，他们提供了一个自动化的工具 Certbot，可以帮助你获取和管理证书。
  4.  安装 SSL 证书：根据你选择的证书颁发机构，按照他们的指南和文档来安装 SSL 证书。这通常涉及将证书文件和私钥文件放置在服务器上的特定位置，并在服务器配置文件中指定证书的路径。
  5.  配置服务器以使用 SSL：在服务器配置文件（如 Nginx 或 Apache）中进行相应的配置更改，以启用 SSL。这包括指定证书文件的路径、监听 SSL 端口（通常是 443）以及其他相关的 SSL 配置选项。
  6.  测试 SSL 连接：完成上述步骤后，重新启动服务器并测试 SSL 连接。你可以使用 Web 浏览器访问你的服务器，并确保连接是通过 HTTPS（而不是 HTTP）来建立的，并且浏览器不会显示任何关于证书的警告或错误信息。

  请注意，这只是一个基本的概述，实际操作可能因你选择的证书颁发机构和服务器软件而有所不同。在实施 SSL 证书之前，建议你仔细阅读相关的文档和指南，以确保正确配置和安全性。

    </details>

  如果一切顺利，您可以通过您的域名正常访问，后续的修改工作，请参考[时雨的教程](https://github.com/Drizzle365/Moments)

## 3.Navidrome

---

关于 Navidrome 的介绍和部署您可以参考[这篇文章](https://zhuanlan.zhihu.com/p/653913549)，非常详细，我对我遇到的问题做一些补充。

- 本地和服务器文件传输的问题

  ![](https://bu.dusays.com/2023/09/24/650ff8be45e0a.jpeg)

- [**Music Tag Web**](https://github.com/xhongc/music-tag-web)编辑歌曲的属性（可选）

## 4.问题补充

---

<details>
  <summary>查看ubuntu的目录列表</summary>

要查看 Ubuntu 上的目录列表，可以使用`ls`命令。`ls`命令用于列出当前目录下的文件和子目录。

在终端中打开一个新的命令行窗口，并输入以下命令：

```shell
ls
```

按下回车键后，将显示当前目录下的文件和子目录的列表。

如果要查看特定目录的列表，可以在`ls`命令后面加上目录的路径。例如，要查看`/home/user/Documents`目录的列表，可以输入以下命令：

```shell
ls /home/user/Documents
```

这将显示`/home/user/Documents`目录下的文件和子目录的列表。

`ls`命令还有一些有用的选项，可以根据需要使用。例如，`ls -l`命令将以长格式显示目录列表，包括文件的权限、所有者、大小等详细信息。`ls -a`命令将显示所有文件，包括隐藏文件。要了解更多选项，可以使用`man ls`命令查看`ls`命令的手册页。

希望这可以帮助到你！

  </details>

<details>
  <summary>ubuntu命令行无响应</summary>

如果 Ubuntu 命令行卡住了，你可以尝试以下几种方法来解决问题：

1. 检查命令是否仍在运行：有时候，一个命令可能需要更长的时间才能完成。在等待一段时间后，可以检查命令是否仍在运行。按下键盘上的`Ctrl + C`组合键可以尝试中止当前运行的命令。
2. 检查系统资源：卡顿可能是由于系统资源不足引起的。可以使用`top`命令或者`htop`命令来查看系统资源的使用情况，包括 CPU、内存和磁盘等。如果发现某个进程占用了大量资源，可以尝试终止该进程或者释放资源。
3. 重启终端：如果命令行完全无响应，可以尝试关闭当前终端窗口，然后重新打开一个新的终端窗口。
4. 重启系统：如果上述方法都没有解决问题，可以尝试重启整个系统。可以使用`reboot`命令或者点击系统菜单中的关机选项来重启 Ubuntu。
5. 检查系统日志：如果问题仍然存在，可以查看系统日志以获取更多信息。系统日志通常位于`/var/log`目录下，可以使用`less`命令或者其他文本编辑器来打开并查看日志文件。

  </details>

<details>
  <summary>ubuntu删除多个文件</summary>

要在 Ubuntu 上删除多个文件，可以使用`rm`命令。以下是几种常见的方法：

1. 删除指定文件列表：

   ```shell
   rm file1.txt file2.txt file3.txt
   ```

2. 删除指定目录下的所有文件：

   ```shell
   rm /path/to/directory/*
   ```

   请注意，上述命令将删除目录中的所有文件，但不会删除目录本身。

3. 删除指定目录及其所有内容：

   ```shell
   rm -r /path/to/directory
   ```

   使用`-r`选项会递归地删除目录及其所有内容，包括子目录和文件。

4. 删除指定文件类型的所有文件：

   ```shell
   rm *.txt
   ```

   上述命令将删除当前目录下所有以`.txt`为扩展名的文件。

在使用`rm`命令时，请务必小心，因为删除的文件将无法恢复。请确保在执行命令之前确认要删除的文件列表，并确保不会误删重要文件。

  </details>

<details>
  <summary>linux文件移动</summary>

在 Linux 中，你可以使用  `mv`  命令来移动文件或目录。`mv`  命令的基本语法如下：

```text
mv [选项] 源文件或目录 目标文件或目录


```

以下是一些常用的  `mv`  命令选项：

- `i`：在移动文件之前进行确认提示，以防止覆盖已存在的目标文件。
- `u`：只移动更新或更改了的文件，或者移动不存在于目标位置的文件。
- `v`：显示详细的移动过程，输出每个移动的文件名。

下面是一些示例用法：

1. 移动文件到目标目录：

   ```text
   mv file.txt /path/to/destination/


   ```

   这将把名为  `file.txt`  的文件移动到  `/path/to/destination/`  目录中。

2. 重命名文件：

   ```text
   mv oldname.txt newname.txt


   ```

   这将把名为  `oldname.txt`  的文件重命名为  `newname.txt`。

3. 移动目录到目标位置：

   ```text
   mv directory /path/to/destination/


   ```

   这将把名为  `directory`  的目录移动到  `/path/to/destination/`  目录中。

4. 移动多个文件到目标目录：

   ```text
   mv file1.txt file2.txt /path/to/destination/


   ```

   这将同时移动  `file1.txt`  和  `file2.txt`  到  `/path/to/destination/`  目录中。

请注意，如果目标位置已经存在同名的文件或目录，`mv`  命令将覆盖它。如果你想要保留原始文件或目录，可以使用  `-i`  选项来进行确认提示，或者使用  `-u`  选项来只移动更新或更改了的文件。

  </details>

<details>
  <summary>linux文件删除</summary>

要删除文件夹（目录）及其内容，你可以使用  `rm`  命令。请注意，删除文件夹是一个潜在的危险操作，请谨慎使用，并确保你要删除的是正确的目录。

以下是删除文件夹的一些常见用法：

1. 删除空文件夹：

   ```shell
   rm -d empty_directory
   ```

   这将删除名为  `empty_directory`  的空文件夹。

2. 删除非空文件夹：

   ```shell
   rm -r directory
   ```

   这将递归地删除名为  `directory`  的文件夹及其所有内容。请注意，这是一个危险操作，因为它会永久删除文件夹及其内容，无法恢复。在使用  `-r`  选项时要特别小心，确保你要删除的是正确的目录。

3. 删除文件夹并强制删除：

   ```shell
   rm -rf directory
   ```

   这将递归地删除名为  `directory`  的文件夹及其所有内容，并强制删除，无需确认提示。这是一个非常危险的操作，请确保你要删除的是正确的目录，并且你真正想要永久删除它及其内容。

请记住，在使用  `rm`  命令时要小心，确保你要删除的是正确的文件夹。删除操作无法撤消，并且会永久删除文件夹及其内容。

  </details>

<details>
  <summary>vim编辑器的退出</summary>

要退出 Vim 编辑器，可以按照以下步骤进行操作：

1. 确保你处于"命令模式"（Command mode）。如果你处于"插入模式"（Insert mode）或"编辑模式"（Edit mode），可以按下键盘上的 Esc 键返回命令模式。
2. 在命令模式下，输入冒号（:）字符，然后输入以下命令之一：
   - `q`：退出 Vim。如果没有做任何更改，Vim 将立即退出。如果有未保存的更改，Vim 将显示错误消息并拒绝退出。你可以使用`:q!`命令来强制退出 Vim，丢弃未保存的更改。
   - `wq`：保存更改并退出 Vim。
   - `x`：保存更改并退出 Vim 的简写形式。
3. 按下回车键执行命令。Vim 将执行相应的操作并退出编辑器。

请注意，Vim 有许多其他命令和选项可用于编辑和保存文件。上述命令是最基本和常用的命令。如果你对 Vim 的使用不熟悉，可以参考 Vim 的文档或教程以了解更多详细信息。

  </details>

<details>
  <summary>使用vscode远程ssh链接</summary>

使用 VS Code 进行远程 SSH 连接非常方便，以下是连接到远程服务器的一般步骤：

1. 安装 VS Code 插件：打开 VS Code，点击左侧的扩展图标（或按下`Ctrl+Shift+X`），搜索并安装名为"Remote - SSH"的插件。
2. 配置 SSH 配置文件：在 VS Code 中，点击左下角的"Remote Explorer"图标，然后选择"SSH Targets"。在弹出的菜单中，选择"Configure SSH Hosts"。这将打开一个 SSH 配置文件，你可以在其中添加远程服务器的连接信息。

   在配置文件中，你可以添加类似以下的条目：

   ```text
   Host my-remote-server
       HostName <远程服务器IP或域名>
       User <远程服务器用户名>
       IdentityFile <私钥文件路径>


   ```

   替换`<远程服务器IP或域名>`、`<远程服务器用户名>`和`<私钥文件路径>`为实际的值。如果你使用密码进行身份验证，可以省略`IdentityFile`行。

3. 连接到远程服务器：在 VS Code 的"Remote Explorer"中，点击左上角的"SSH Targets"图标，然后选择你配置的远程服务器。VS Code 将自动连接到远程服务器，并在新的窗口中打开一个远程终端。
4. 在远程服务器上使用 VS Code：一旦连接成功，你可以像在本地使用 VS Code 一样，在远程服务器上编辑文件、运行终端命令等。

请注意，为了进行远程 SSH 连接，你需要确保本地计算机可以访问远程服务器的 SSH 端口（默认为 22）。如果你的服务器有安全组或防火墙设置，确保允许 SSH 流量通过。

  </details>

<details>
  <summary>使用nginx反向代理到自己的域名之后仍然无法访问</summary>

如果你已经将 Nginx 配置为反向代理到自己的域名，但仍然无法访问，请检查以下几个可能的原因和解决方法：

1. 检查域名解析是否正确：确保你的域名已正确解析到你的服务器的公共 IP 地址。你可以通过运行  `ping your-domain.com`  命令来验证域名是否解析到正确的 IP 地址。如果解析不正确，你需要在域名注册商或 DNS 服务提供商的控制面板中进行相应的修改。
2. 防火墙设置：检查服务器上的防火墙设置，确保端口 80（HTTP）和/或 443（HTTPS）是打开的。你可以使用以下命令来检查防火墙规则：

   ```shell
   sudo ufw status
   ```

   如果防火墙是启用的，并且端口被阻止，你可以使用  `ufw`  命令打开相应的端口。例如，要打开 HTTP 端口 80，可以运行：

   ```shell
   sudo ufw allow 80
   ```

3. 检查 Nginx 配置是否正确：确保你的 Nginx 配置文件中的反向代理设置正确无误。检查以下几个方面：
   - `server_name`  是否设置为你的域名。
   - `proxy_pass`  是否指向正确的后端服务器地址和端口。
   - 其他相关的代理设置是否正确，如  `proxy_set_header`  等。
4. 检查后端服务器是否正常工作：确保你的后端服务器正常运行并且可以通过指定的地址和端口访问。你可以尝试直接访问后端服务器的地址和端口来验证是否正常工作。
5. 检查 Nginx 日志：查看 Nginx 的错误日志文件，通常位于  `/var/log/nginx/error.log`。检查是否有与访问问题相关的错误或警告消息。

  </details>

<details>
  <summary>云服务器中如何让进程保持运行</summary>

在云服务器中，您可以使用以下方法之一来使进程持续运行：

1. 使用终端后台运行：您可以在终端中运行命令，并使用`&`符号将其放在后台运行。例如：

   ```text
   command &


   ```

   这将使命令在后台运行，并且即使您关闭终端或断开与服务器的连接，该进程也会继续运行。

2. 使用 nohup 命令：`nohup`命令可让您在断开与服务器连接后继续运行进程。例如：

   ```text
   nohup command &


   ```

   这将使用`nohup`命令将进程放在后台运行，并将输出重定向到一个名为`nohup.out`的文件中。

3. 使用系统服务（systemd）：对于长期运行的进程，建议将其配置为系统服务。使用 systemd 可以管理进程的启动、停止和自动重启。以下是一个简单的示例：

   - 创建一个名为`your-service.service`的服务配置文件，例如：

     ```text
     sudo nano /etc/systemd/system/your-service.service


     ```

   - 在文件中添加以下内容（根据您的进程和需求进行修改）：

     ```text
     [Unit]
     Description=Your Service
     After=network.target

     [Service]
     ExecStart=/path/to/your/command
     Restart=always

     [Install]
     WantedBy=multi-user.target


     ```

   - 保存并关闭文件。
   - 启用和启动服务：

     ```text
     sudo systemctl enable your-service
     sudo systemctl start your-service


     ```

     这将使服务在系统启动时自动启动，并且可以使用`systemctl`命令来管理服务。

使用上述方法之一，您可以确保进程在云服务器中持续运行，并且不会受到终端连接断开的影响。请根据您的需求和具体情况选择适合的方法。

  </details>

<details>
  <summary>服务器如何停止并重新运行一个进程</summary>

要停止并重新运行一个进程，您可以使用以下步骤：

1. 查找进程 ID（PID）：首先，您需要找到要停止的进程的 PID。您可以使用`ps`命令或`pgrep`命令来查找进程的 PID。例如，假设您要停止名为`your-process`的进程，可以运行以下命令：

   ```shell
   ps aux | grep your-process
   ```

   这将显示与`your-process`相关的进程列表，包括其 PID。

2. 停止进程：一旦您找到了进程的 PID，您可以使用`kill`命令来停止它。例如，假设进程的 PID 为`12345`，您可以运行以下命令来停止进程：

   ```shell
   kill 12345
   ```

   如果进程不会立即停止，您可以尝试使用`kill -9`命令来强制终止进程：

   ```shell
   kill -9 12345
   ```

   请注意，使用`kill -9`命令会强制终止进程，可能会导致数据丢失或其他不良影响。请谨慎使用。

3. 重新运行进程：一旦您停止了进程，您可以根据需要重新启动它。具体的方法取决于您的进程类型和启动方式。您可以使用命令行或其他启动脚本来重新启动进程。

   - 如果您的进程是通过命令行启动的，您可以再次运行启动命令来重新启动进程。
   - 如果您的进程是通过系统服务（如 systemd）管理的，您可以使用相应的命令来重新启动服务。例如，使用 systemd 管理的服务可以使用以下命令重新启动：

     ```shell
     sudo systemctl restart your-service
     ```

   - 如果您使用其他工具或方法来管理进程，请参考相应的文档或说明来重新启动进程。

通过以上步骤，您可以停止并重新运行一个进程。请确保在重新运行进程之前，您已经停止了该进程，以避免冲突或其他问题。

  </details>

<details>
  <summary>如何建立远程服务器对本机的信任</summary>

要建立远程服务器对本机的信任，你可以使用 SSH 密钥进行身份验证。以下是建立信任的一般步骤：

1. 生成 SSH 密钥对：在本机上生成 SSH 密钥对，包括公钥和私钥。如果你已经有 SSH 密钥对，请跳过此步骤。要生成 SSH 密钥对，请在终端上运行以下命令：

   ```text
   ssh-keygen -t rsa -b 4096


   ```

   这将生成一个 RSA 密钥对，密钥将保存在  `~/.ssh/id_rsa`（私钥）和  `~/.ssh/id_rsa.pub`（公钥）文件中。

2. 将公钥复制到远程服务器：使用以下命令将公钥复制到远程服务器上的  `authorized_keys`  文件中：

   ```text
   ssh-copy-id matrixcore@20.243.81.174


   ```

   这将将本机上的公钥复制到远程服务器的  `~/.ssh/authorized_keys`  文件中。你需要提供远程服务器的用户名和密码。

   如果  `ssh-copy-id`  命令不可用，你可以手动将公钥内容复制到远程服务器的  `~/.ssh/authorized_keys`  文件中。

3. 验证连接：现在，你应该能够通过 SSH 连接到远程服务器而无需输入密码。尝试使用以下命令连接到服务器：

   ```text
   ssh matrixcore@20.243.81.174


   ```

   如果一切设置正确，你将能够无需密码直接登录到远程服务器。

这样，你就建立了远程服务器对本机的信任关系，可以在进行 SSH 连接时无需输入密码。请注意，这种信任建立是基于公钥加密的身份验证，因此确保你的私钥保密，并采取适当的安全措施来保护它。

  </details>

<details>
  <summary>Azure 虚拟机代理状态未就绪问题处理</summary>

重新部署虚拟机

  </details>

<details>
  <summary>重启docker特定进程并进行系统守护</summary>

要重启 Docker 中的特定进程并将其设置为系统守护进程，你可以执行以下步骤：

1. 首先，使用以下命令查找要重启的 Docker 容器的 ID 或名称：

   ```shell
   docker ps
   ```

   这将列出当前正在运行的 Docker 容器，找到你要重启的容器并记下其 ID 或名称。

2. 使用以下命令重启 Docker 容器：

   ```shell
   docker restart <容器ID或名称>
   ```

   将  `<容器ID或名称>`  替换为你要重启的容器的实际 ID 或名称。

3. 确保 Docker 容器在系统启动时自动启动并作为守护进程运行，可以使用以下命令：

   ```shell
   docker update --restart=unless-stopped <容器ID或名称>
   ```

   这将将容器的重启策略设置为除非手动停止，否则在系统启动时自动重启。

现在，你的 Docker 容器将被重启，并且在系统启动时将自动作为守护进程运行。请确保在命令中替换  `<容器ID或名称>`  为实际的容器标识符。

  </details>

<details>
  <summary>navidrom不支持aac格式的音频</summary>

![](https://bu.dusays.com/2023/09/25/65117f660a64b.png)

  </details>

# 总结

---

用热情去做好自己喜欢的事情 😊
