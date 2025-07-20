---
password: ""
icon: ""
date: "2024-07-14"
type: Post
category: 动手实践
slug: lubancat_conky
tags:
  - 实用教程
summary: 鲁班猫，目前是充当路由器的作用，前些日子实现了鲁班猫的PPPOE连接。并且结合自动创建热点实现了类似于路由器的作用，当然速率会受影响，但是就不用花钱再买路由器了，网口本来就100M，热点72M，刷视频反正是够了。
title: "[小鲁班猫]  PPPOE+Crontab+Conky，网口转热点+数字钟"
status: Published
urlname: 417c73c5-45ef-4f91-9060-21b1137781a7
updated: "2024-07-14 14:49:00"
---

# 前言

---

这周是放纵的一周，玩了 PUBG mobile，打了王者，但是打完之后就觉得没甚么意思，遂用快递盒给鲁班猫做个外壳。

# 正文

---

鲁班猫，目前是充当路由器的作用，前些日子实现了鲁班猫的 PPPOE 连接。并且结合自动创建热点实现了类似于路由器的作用，当然速率会受影响，但是就不用花钱再买路由器了，网口本来就 100M，热点 72M，刷视频反正是够了。见[[网络中继] 使用 linux 来中继 wifi 信号 | MatrixCore](https://matrixcore.life/article/linux-wifi)。

## 网络连接及到点自动关机

---

### 1. 安装 `pppoe` 软件包

---

首先，确保你已经安装了 `pppoe` 软件包，这个软件包提供了 `pppoeconf` 工具，可以帮助配置 PPPoE 连接。

打开终端并运行以下命令：

```shell
sudo apt-get update
sudo apt-get install pppoe

```

### 2. 配置 PPPoE 连接

---

使用 `pppoeconf` 工具进行配置：

```shell
sudo pppoeconf

```

此命令将启动一个交互式配置程序，按提示操作即可。配置过程中，你需要提供你的 PPPoE 用户名和密码。

### 3. 自动连接设置

---

配置完成后，PPPoE 连接信息会保存在 `/etc/ppp/peers/dsl-provider` 文件中。

为了使系统启动时自动连接到 PPPoE，可以编辑 `/etc/network/interfaces` 文件：

```shell
sudo nano /etc/network/interfaces
```

在文件末尾添加以下内容：

```text
auto dsl-provider
iface dsl-provider inet ppp
    pre-up /sbin/ifconfig eth0 up # eth0 是你的网络接口名称，可能是 eth1 或其他
    provider dsl-provider
```

请确保将 `eth0` 替换为你的实际网络接口名称。你可以使用 `ip link` 或 `ifconfig` 命令来查看你的网络接口名称。

### 4. 重启网络服务

---

保存并关闭文件后，重启网络服务以应用更改：

```shell
sudo systemctl restart networking
```

或者，你可以重启系统以确保所有更改生效。

### 5. 验证连接

---

检查 PPPoE 连接是否成功：

```shell
ifconfig ppp0

```

如果看到 `ppp0` 接口有 IP 地址，说明 PPPoE 连接已经成功。

### 注意事项

---

- 确保你的网络接口（例如 `eth0`）没有被其他网络管理工具（如 NetworkManager）管理，否则可能会导致冲突。
- 你可以使用 `sudo pon dsl-provider` 手动启动连接，使用 `sudo poff dsl-provider` 手动断开连接。

通过以上步骤，你应该能够在 Ubuntu 系统上配置并自动连接到 PPPoE 网络。

### 6.创建 crontab 脚本

---

1. 编辑 `root` 用户的 `crontab` 文件：

```text
sudo crontab -e
```

1. 添加以下行到 `crontab` 文件中：

```text
@reboot /usr/bin/pon dsl-provider
```

1. 保存并关闭文件。

### 7.到点自动关机

---

1. 打开终端。
2. 编辑 `crontab` 文件：

   ```text
   sudo crontab -e
   ```

3. 在 `crontab` 文件中添加以下行：

   ```text
   0 23 * * * /sbin/shutdown -h now
   这行表示每天晚上11点（23:00）执行 `shutdown -h now` 命令，关闭系统。
   ```

## 设置 Conky 时钟桌面

---

### 1. 安装 Conky

---

首先，确保你的包管理器是最新的，然后安装 Conky：

```shell
sudo apt-get update
sudo apt-get install conky
```

### 2. 启动 Conky

---

安装完成后，你可以通过在终端中输入以下命令来启动 Conky：

```shell
conky
```

### 3. 创建 Conky 全屏显示配置文件

---

创建或编辑 Conky 配置文件以全屏显示。我们将在 `~/.config/conky/` 目录下创建一个新的配置文件。

```shell
mkdir -p ~/.config/conky
nano ~/.config/conky/conky_fullscreen.conf
```

### 更新配置文件内容

---

```text
# Conky configuration

alignment middle_middle
background yes
double_buffer yes
draw_borders no
draw_outline no
draw_shades no
use_xft yes
xftfont Ubuntu Mono:size=200
gap_x 0
gap_y 0
minimum_size 1920 1080
own_window yes
own_window_class Conky
own_window_type override
own_window_transparent yes
own_window_hints undecorated,below,sticky,skip_taskbar,skip_pager
update_interval 1.0
uppercase no
use_spacer none

TEXT
${voffset -100}${alignc}${font Ubuntu Mono:size=200}${time %H:%M:%S}
```

### 安装字体（如果需要）

---

如果 `Ubuntu Mono` 字体未安装，可以通过以下命令安装：

```shell
sudo apt-get install fonts-ubuntu
```

### 解释配置

---

- `alignment middle_middle`：设置 Conky 窗口居中对齐。
- `xftfont Ubuntu Mono:size=200`：设置字体为 `Ubuntu Mono`，大小为 200。你可以根据需要调整这个数值。
- `gap_x 0` 和 `gap_y 0`：确保 Conky 窗口在屏幕中央。
- `minimum_size 1920 1080`：设置 Conky 窗口的最小尺寸为 1920x1080，确保它覆盖整个屏幕。
- `TEXT` 部分使用 `${voffset -100}` 来调整垂直位置，使时间在垂直方向上也居中。

### 4. 启动 Conky

---

保存并退出编辑器后，可以通过以下命令启动 Conky：

```shell
conky -c ~/.config/conky/conky_fullscreen.conf
```

### 5.Xfce 自启动 Conky

---

1. **打开“Session and Startup”**:
   - 打开“设置管理器”（Settings Manager），然后选择“会话和启动”（Session and Startup）。
2. **添加新的启动项**:

   - 在“自动启动应用程序”（Application Autostart）选项卡中，点击“添加”（Add）。
   - 在“名称”（Name）字段中输入一个描述性的名称，如“Conky”。
   - 在“描述”（Description）字段中可以输入一些描述性的文字（可选）。
   - 在“命令”（Command）字段中输入以下命令来延迟启动 Conky：

     ```shell
     sh -c "sleep 15 && conky -c /home/cat/.config/conky/conky_fullscreen.conf"
     ```

   - 点击“确定”保存。

# 效果展示

---

[PPPOE+Crontab+Conky，有个性的“路由器”\_哔哩哔哩\_bilibili](https://www.bilibili.com/video/BV1Sgb7ecEbC/?vd_source=237e295a40d7aaea043ead8c0d2c78ab)
