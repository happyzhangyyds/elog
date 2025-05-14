---
password: ""
icon: ""
date: "2025-05-15"
type: Post
category: 动手实践
slug: "250515"
tags:
  - 实用教程
summary: 在使用 OpenCore 启动引导时，许多用户会遇到一个小烦恼：安装 Ubuntu 后，OpenCore 会自动识别 EFI/ubuntu/shimx64.efi 并在启动菜单中生成一个自动启动项，通常名称是奇怪的 SYSTEM_DRV，图标也不美观，影响整体启动体验。本文将介绍一种优雅、高效、不影响功能的方法，来隐藏这个自动识别的启动项，同时保留我们自定义的 Ubuntu 启动入口。
title: "[邂逅黑果]  如何优雅地隐藏 OpenCore 启动菜单中的 Ubuntu 自动识别项（如 SYSTEM_DRV）"
status: Draft
urlname: 1f36ddcd-5429-80c1-910a-d2ebb31257f1
updated: "2025-05-14 16:26:00"
---

# 前言

---

自从沉溺在 Mac 的怀抱中，一年多都没碰 ubuntu 了，当时还是在 22.10 版本，而且背光调节失效，内存早先也才分了 20GB，从昨天开始进行重刷系统，体验了一个多小时 24.04lts，体验一般，换回了 22.04.5LTS，在分区的时候当时在 free space 给 ubuntu 分了单独了 efi 分区，后面发现 opencore 在启动的时候一直有 no name 的启动项，今晚合并到 system_drv 这个分区当中，让这个硬盘只保留一块 500MB 的 Fat32 的分区来进行系统引导，后面发现，启动项一直出现有 system_drv 这个启动项，上网搜半天，没找到好的解决办法，但是后面自己慢慢摸索，也发现一条简单且安全可以尝试的思路。

![](https://bu.dusays.com/2025/05/15/6824c25c051eb.png)

# 正文

---

以下教程由和 4o 的 46 轮对话总结而来，需要辅助 up 主：[注水的干货](https://www.bilibili.com/video/BV1TK411n7sv/?spm_id_from=333.1007.top_right_bar_window_history.content.click)的讲解使用。

## 💡 教程：如何优雅地隐藏 OpenCore 启动菜单中的 Ubuntu 自动识别项（如 SYSTEM_DRV）

---

在使用 OpenCore 启动引导时，许多用户会遇到一个小烦恼：安装 Ubuntu 后，OpenCore 会自动识别 `EFI/ubuntu/shimx64.efi` 并在启动菜单中生成一个自动启动项，通常名称是奇怪的 `SYSTEM_DRV`，图标也不美观，影响整体启动体验。本文将介绍一种**优雅、高效、不影响功能**的方法，来隐藏这个自动识别的启动项，同时保留我们自定义的 Ubuntu 启动入口。

---

## 🧩 背景说明

Ubuntu 安装完成后，会在 EFI 分区的 `EFI/ubuntu/` 目录下生成以下文件：

- `shimx64.efi`：微软签名的 Secure Boot 启动 shim
- `grubx64.efi`：实际用于加载 Ubuntu 的 GRUB 启动器

OpenCore 在扫描时，如果发现 `shimx64.efi`，就会自动将这个分区识别为 Ubuntu 启动项，并添加到启动菜单中，通常名称为 `SYSTEM_DRV` 或显示为硬盘图标，无法自定义图标或名称。

---

## 🎯 目标

- **隐藏** OpenCore 自动识别的 `SYSTEM_DRV` 启动项
- **保留** 自定义的 Ubuntu 启动项（带图标、名称）
- **不影响 Ubuntu 正常启动**
- **不修改分区结构或复制文件**

---

## ✅ 解决方案：重命名 `shimx64.efi`

只需一步：

> 将 EFI/ubuntu/shimx64.efi 重命名为 shimx64.efi.bak

### 🔧 操作方法（在 macOS 或 Linux 下）：

挂载 EFI 分区后，进入 `EFI/ubuntu/` 目录，执行：

```shell
mv shimx64.efi shimx64.efi.bak
```

## 效果

---

![](https://bu.dusays.com/2025/05/15/6824c26887f50.png)
