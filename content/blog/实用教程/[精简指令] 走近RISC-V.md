---
<<<<<<< HEAD:content/posts/实用教程/[精简指令] 走近RISC-V.md
password: ""
icon: ""
date: "2024-04-25"
=======
password: ''
icon: ''
date: '2024-04-25 00:00:00'
>>>>>>> 5bd1d1a97a0d9dd146b00a4a5bd88b3c5ea7c07e:content/blog/实用教程/[精简指令] 走近RISC-V.md
type: Post
category: 璀璨星空
slug: RISC-V
tags:
  - 实用教程
summary: 这是一篇很仓促的文章，但与其说其非常不成熟，我更愿意视其为一个起点，因为目前所从事的岗位也是在和各种硬件打交道，所以我还是希望能对此保持长久的热情，去做自己喜欢的事情。
<<<<<<< HEAD:content/posts/实用教程/[精简指令] 走近RISC-V.md
title: "[精简指令] 走近RISC-V"
status: Published
urlname: a1ab1b34-cb6d-44bf-82b0-37dc781c79b9
updated: "2024-04-25 15:42:00"
=======
title: '[精简指令] 走近RISC-V'
status: Published
cover: 'https://bu.dusays.com/2024/04/25/662a720f33ff1.jpeg'
urlname: a1ab1b34-cb6d-44bf-82b0-37dc781c79b9
updated: '2024-04-25 23:42:00'
>>>>>>> 5bd1d1a97a0d9dd146b00a4a5bd88b3c5ea7c07e:content/blog/实用教程/[精简指令] 走近RISC-V.md
---

# 前言

<<<<<<< HEAD:content/posts/实用教程/[精简指令] 走近RISC-V.md
---

自从在 23 年开始关注并加入 RISC-V 社区以来，RISC-V 一直以来都引起我高度的兴趣，老石在这块的分享很棒，可以详见 B 站：[**这就是芯片未来！RISC-V 已势不可挡”一期视频看懂 RISC-V 的前世今生**](https://www.bilibili.com/video/BV1Xj411y79f/?spm_id_from=333.337.search-card.all.click&vd_source=237e295a40d7aaea043ead8c0d2c78ab)

# 正文

---

### 什么是 risc-v

RISC-V（读作“risk-five”）是一个开放标准的指令集架构（ISA），它基于精简指令集计算机（RISC）原则。由加州大学伯克利分校的研究人员于 2010 年启动，RISC-V 被设计为高度模块化的 ISA，允许广泛的实现可能性，从小型微控制器到高性能处理器。

以下是 RISC-V 的一些关键特点：

1. **开放和免费**：RISC-V 的规范可以自由下载，任何人都可以设计、制造和销售 RISC-V 芯片而不必支付许可费。这与 ARM 和 x86 等专有 ISA 形成鲜明对比。
2. **模块化设计**：RISC-V 的 ISA 分为基本的指令集，称为“基础整数 ISA”，以及一系列可选的扩展。这种模块化设计使得实现可以根据需要包含或排除特定的功能。
3. **简洁性**：RISC-V 遵循 RISC 原则，指令集被设计得尽可能简单，这有助于减少硬件的复杂性，提高能效，并简化软件开发。
4. **可扩展性**：RISC-V 支持从 32 位、64 位到 128 位的不同地址空间，适应不同的应用需求。
5. **支持自定义指令**：RISC-V 允许在保持与标准 ISA 兼容的同时添加自定义指令，这对于需要特定硬件加速的应用（如嵌入式系统、数字信号处理等）特别有用。
6. **生态系统**：随着 RISC-V 的普及，围绕它形成了一个生态系统，包括开源和商业工具链、操作系统支持、参考设计和教育资源。
7. **多用途**：RISC-V 已被用于各种应用，从物联网（IoT）设备的微控制器到高性能计算服务器的处理器核心。
8. **社区驱动**：RISC-V 的发展受到一个活跃社区的支持，这个社区由学术界、工业界和个人贡献者组成。

RISC-V 的开放性和灵活性使其在学术研究、教育、开源项目和商业产品中得到了广泛应用。尽管它是相对较新的 ISA，但 RISC-V 正快速成为全球计算领域的重要参与者。

### 我的感受和体验

---

据 IT 之家的报道：[**第三代“香山”RISC-V 开源高性能处理器核亮相，性能进入全球第一梯队**](https://www.ithome.com/0/764/177.htm)

[香山处理器官方文档](https://xiangshan-doc.readthedocs.io/zh-cn/latest/)

今晚参与了 RISC-V 社区分享的关于 RISC-V 历史的介绍，虽然很多部分听不懂哈，但也开始慢慢了解该组织的进展。

虽然目前对我而言，时间精力都非常宝贵，但我始终坚信，兴趣是最好的老师。自从参与中科院的“一生一芯”活动开始接触到 linux 以来，linux 一直在生活和精神上影响着我，不论是 crontab 的奇妙，还是其丰富多样的命令行，都让我感到非常奇妙的体验。

引用香山文档中，[孙院士对于开源精神](https://mp.weixin.qq.com/s/1Irs9a0EKoB7P-J_4ju66A)的介绍。我们可以看到在社区当中，奉献进步共享共治是一种宏伟的观念，在协作开发流程中增强团队的凝聚力，这是很有益的一件事。

这是香山的文档，我打算抽空看看。

[**20210622-RVWC-香山开源高性能 RISC-V 处理器.pdf**](https://github.com/OpenXiangShan/XiangShan-doc/blob/main/slides/20210622-RVWC-%E9%A6%99%E5%B1%B1%E5%BC%80%E6%BA%90%E9%AB%98%E6%80%A7%E8%83%BDRISC-V%E5%A4%84%E7%90%86%E5%99%A8.pdf)

以下是[RISC-V Architecture Profiles](https://github.com/riscv/riscv-profiles)

后续将对该文章进行补充更新。

# 总结

---

这是一篇很仓促的文章，但与其说其非常不成熟，我更愿意视其为一个起点，因为目前所从事的岗位也是在和各种硬件打交道，所以我还是希望能对此保持长久的热情，去做自己喜欢的事情。

## 附录

---

[**国产 RISC-V 芯片，还威胁不到 X86，但替代 ARM 真有戏**](https://www.bilibili.com/video/BV1ep421Q7UK/?spm_id_from=333.337.search-card.all.click&vd_source=237e295a40d7aaea043ead8c0d2c78ab)

[**被低估的国产 CPU 芯片 RISC-V 何以胜？为什么能发展得这样快？凭什么得到这样多国产操作系统**](https://www.bilibili.com/video/BV1kt421w7LB/?spm_id_from=333.337.search-card.all.click&vd_source=237e295a40d7aaea043ead8c0d2c78ab)

[**Linux 之父 Linus Torvalds 在一次对话中调侃 AI 炒作： 很搞笑，大概我也会被大模型取代**](https://www.bilibili.com/video/BV1ym411y7cN/?spm_id_from=333.337.search-card.all.click&vd_source=237e295a40d7aaea043ead8c0d2c78ab)

> 💡 MatrixCore 说：非常有趣的对话，得知了 linux 和 git 的起源

[**除了国产替代，卖出 100 亿的 RISC-V 还给芯片带来了什么？【差评君】**](https://www.bilibili.com/video/BV1qC4y127rs/?spm_id_from=333.337.search-card.all.click&vd_source=237e295a40d7aaea043ead8c0d2c78ab)

> 💡 MatrixCore 说：非常好的入门普及，讲得极为形象

![](https://bu.dusays.com/2024/04/25/662a79c7b49f4.jpeg)
=======

---


自从在23年开始关注并加入RISC-V社区以来，RISC-V一直以来都引起我高度的兴趣，老石在这块的分享很棒，可以详见B站：[**这就是芯片未来！RISC-V已势不可挡”一期视频看懂RISC-V的前世今生**](https://www.bilibili.com/video/BV1Xj411y79f/?spm_id_from=333.337.search-card.all.click&vd_source=237e295a40d7aaea043ead8c0d2c78ab)


# 正文


---


### 什么是risc-v


RISC-V（读作“risk-five”）是一个开放标准的指令集架构（ISA），它基于精简指令集计算机（RISC）原则。由加州大学伯克利分校的研究人员于2010年启动，RISC-V被设计为高度模块化的ISA，允许广泛的实现可能性，从小型微控制器到高性能处理器。


以下是RISC-V的一些关键特点：

1. **开放和免费**：RISC-V的规范可以自由下载，任何人都可以设计、制造和销售RISC-V芯片而不必支付许可费。这与ARM和x86等专有ISA形成鲜明对比。
2. **模块化设计**：RISC-V的ISA分为基本的指令集，称为“基础整数ISA”，以及一系列可选的扩展。这种模块化设计使得实现可以根据需要包含或排除特定的功能。
3. **简洁性**：RISC-V遵循RISC原则，指令集被设计得尽可能简单，这有助于减少硬件的复杂性，提高能效，并简化软件开发。
4. **可扩展性**：RISC-V支持从32位、64位到128位的不同地址空间，适应不同的应用需求。
5. **支持自定义指令**：RISC-V允许在保持与标准ISA兼容的同时添加自定义指令，这对于需要特定硬件加速的应用（如嵌入式系统、数字信号处理等）特别有用。
6. **生态系统**：随着RISC-V的普及，围绕它形成了一个生态系统，包括开源和商业工具链、操作系统支持、参考设计和教育资源。
7. **多用途**：RISC-V已被用于各种应用，从物联网（IoT）设备的微控制器到高性能计算服务器的处理器核心。
8. **社区驱动**：RISC-V的发展受到一个活跃社区的支持，这个社区由学术界、工业界和个人贡献者组成。

RISC-V的开放性和灵活性使其在学术研究、教育、开源项目和商业产品中得到了广泛应用。尽管它是相对较新的ISA，但RISC-V正快速成为全球计算领域的重要参与者。


### 我的感受和体验


---


据IT之家的报道：[**第三代“香山”RISC-V 开源高性能处理器核亮相，性能进入全球第一梯队**](https://www.ithome.com/0/764/177.htm)


[香山处理器官方文档](https://xiangshan-doc.readthedocs.io/zh-cn/latest/)


今晚参与了RISC-V社区分享的关于RISC-V历史的介绍，虽然很多部分听不懂哈，但也开始慢慢了解该组织的进展。


虽然目前对我而言，时间精力都非常宝贵，但我始终坚信，兴趣是最好的老师。自从参与中科院的“一生一芯”活动开始接触到linux以来，linux一直在生活和精神上影响着我，不论是crontab的奇妙，还是其丰富多样的命令行，都让我感到非常奇妙的体验。


引用香山文档中，[孙院士对于开源精神](https://mp.weixin.qq.com/s/1Irs9a0EKoB7P-J_4ju66A)的介绍。我们可以看到在社区当中，奉献进步共享共治是一种宏伟的观念，在协作开发流程中增强团队的凝聚力，这是很有益的一件事。


这是香山的文档，我打算抽空看看。


[**20210622-RVWC-香山开源高性能RISC-V处理器.pdf**](https://github.com/OpenXiangShan/XiangShan-doc/blob/main/slides/20210622-RVWC-%E9%A6%99%E5%B1%B1%E5%BC%80%E6%BA%90%E9%AB%98%E6%80%A7%E8%83%BDRISC-V%E5%A4%84%E7%90%86%E5%99%A8.pdf)


以下是[RISC-V Architecture Profiles](https://github.com/riscv/riscv-profiles)


后续将对该文章进行补充更新。


# 总结


---


这是一篇很仓促的文章，但与其说其非常不成熟，我更愿意视其为一个起点，因为目前所从事的岗位也是在和各种硬件打交道，所以我还是希望能对此保持长久的热情，去做自己喜欢的事情。


## 附录


---


[**国产RISC-V芯片，还威胁不到X86，但替代ARM真有戏**](https://www.bilibili.com/video/BV1ep421Q7UK/?spm_id_from=333.337.search-card.all.click&vd_source=237e295a40d7aaea043ead8c0d2c78ab)


[**被低估的国产CPU芯片RISC-V何以胜？为什么能发展得这样快？凭什么得到这样多国产操作系统**](https://www.bilibili.com/video/BV1kt421w7LB/?spm_id_from=333.337.search-card.all.click&vd_source=237e295a40d7aaea043ead8c0d2c78ab)


[**Linux之父Linus Torvalds在一次对话中调侃AI炒作： 很搞笑，大概我也会被大模型取代**](https://www.bilibili.com/video/BV1ym411y7cN/?spm_id_from=333.337.search-card.all.click&vd_source=237e295a40d7aaea043ead8c0d2c78ab)


> 💡 MatrixCore说：非常有趣的对话，得知了linux和git的起源


[**除了国产替代，卖出100亿的RISC-V还给芯片带来了什么？【差评君】**](https://www.bilibili.com/video/BV1qC4y127rs/?spm_id_from=333.337.search-card.all.click&vd_source=237e295a40d7aaea043ead8c0d2c78ab)


> 💡 MatrixCore说：非常好的入门普及，讲得极为形象


![662a79c7b49f4.jpeg](https://bu.dusays.com/2024/04/25/662a79c7b49f4.jpeg)

>>>>>>> 5bd1d1a97a0d9dd146b00a4a5bd88b3c5ea7c07e:content/blog/实用教程/[精简指令] 走近RISC-V.md
