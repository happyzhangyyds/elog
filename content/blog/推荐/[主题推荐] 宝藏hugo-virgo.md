---
password: ""
icon: ""
date: "2023-11-21"
type: Post
category: 动手实践
slug: hugo-virgo
tags:
  - 推荐
summary: Hugo是静态网页的速度很快，virgo主题又非常简洁美观，值得推荐给大家。
title: "[主题推荐] 宝藏hugo-virgo"
status: Published
urlname: d16af3db-e30c-475c-9dfa-8b544723d587
updated: "2024-04-23 12:57:00"
---

# 前言

---

一般来说，每写一篇文章，我需要完成两件事情，第一件，就是对脑海里反复思考的事情进行归档，因为担负着这些事情，会让我很难进行下一步的工作，我需要把思绪放下来，所以如果是偏实操类的文章，一般可以直接跳过我写的前言。

第一件事情，就是，昨晚上我得出了一个结论，我觉得深入研究文学容易致郁，研究历史也是这样，没有强大的精神承受能力，恐怕会很痛苦。所以，虽然我很喜欢文学，喜欢历史，但是被伤过的次数也不少，初中读《红楼梦》半夜痛得睡不着，大一放暑假追《红楼梦》电视剧，刷到半夜两点给我难受得睡不着。其次看《平凡的世界》也是这样，既让人难受又让人逃不走，还有《边城》。
第二件事情，就是，今天得出一个结论，问世间情为何物，直教人生死相许，看到 Jack 的猫猫去了喵星的消息，我也很难受。不仅是人，世间的很多生灵都会经历成住坏空，这些个境界，人能在世界里善终，已经是很大的福分了，这需要很大的人生智慧。

所以，被伤过，或许才会变得坚强，所以如果，觉得在文学里感受到的痛苦和无奈，就去学一门编程语言吧，用一种新的知识，打开新的世界和逃避一个过去的世界。Javascript，C，Verilog 都是很好的。

# 正文

---

我们来介绍一个我喜欢的 Hugo 的主题，在之前的文章中简单介绍过我和 hugo 之间的故事，当时我正处在探索博客的兴趣高峰期，通过 1panel 安装了 wordpress 和 halo，用过一段时间后，感觉 wordpress 略微有些卡顿，而 halo 开放的 api 不是很多，使得文章迁移存在困难。

后来我又在各种知乎评论区徘徊良久，最终我被 hugo 所吸引了，因为 Hugo 的标语就是，最快的引擎，我也认真对比了 hexo 和 hugo 的优缺点，最终决定开始尝试 hugo。

尝试 hugo 的过程并不是一帆风顺的，还有些坎坷。但这些都值得回忆。

## 部署方案

---

最开始我是打算在 vps 上部署 hugo 的，惯性思维使得我认为部署 hugo 就像部署 wordpress 一样，但是在 nginx 这一步上我一直没弄明白，我不知道如何把 vps 的本地端口反向代理到 web 服务器上。

后来最终我还是回到了 vercel，因为作为静态托管网站，vercel 可以说是为博主提供了非常好的环境，更加简单的面板，强大的全球 CDN。
关于 hugo 我需要多介绍两点，在 vercel 中部署 hugo，用两种方式，一种是直接托管 public 文件夹，一种是采用 hugo 进行构建，前者不需要特别指定 vercel 的框架，后者需要指定 vercel 的框架为 hugo 且选定特定的版本，因为 vercel 默认使用旧版本会产生报错。选择两者都可以，可以去网上寻找相关的教程学习一下。

然后我在 mac 上预装了 hugo 的环境。关于如何安装 Hugo，可以进行 Hugo 的[官网](https://gohugo.io/installation/)开始操作。然后关于各个系统如何安装 hugo，知乎上也有介绍，可以尝试一下。

## 本地安装 hugo

---

关于 mac 安装 Hugo 要简单一些。

```shell
brew install hugo
sudo port install hugo
#两种方式都可以，选择其一就行
```

或者您也可以选择根据指导，从源代码进行搭建。关于 win 如何安装 Hugo，您可以参考[这篇文章](https://zhuanlan.zhihu.com/p/440175312)。

## 选择喜欢的 hugo 主题

---

我之前选择的是[meme](https://themes.gohugo.io/themes/hugo-theme-meme/)主题，我觉得非常简洁明快，但是我不知道为什么，有时候在安卓端加载的时候，菜单栏有的时候加载缓慢。

然后我也看到一些很优秀的主题，比如[NeeBee](https://themes.gohugo.io/themes/newbee/)、[mini](https://themes.gohugo.io/themes/hugo-theme-cactus-plus/)主题。

然后我今天主要想来推荐一下 virgo 主题，这里是简单的[演示的视频](https://www.bilibili.com/video/BV1wj4117769/?spm_id_from=333.999.0.0)。

当时我遇到 virgo 的第一眼的时候，就觉得非常惊艳，遂发了篇朋友圈介绍了一下，然后自己尝试部署了一下。

## 内容创作与 virgo 的配置

---

virgo 大概分为精简版和完整版，可以去[作者的博客](https://walkssi.com/如何使用-hugo-theme-virgo-主题/)，看一看主题的更新日志。

关于内容创作，我主要是通过 notion 进行写作，然后通过[elog-hugo](https://elog.1874.cool/)的方式自动同步到 Hugo 的。关于[elog 的介绍](https://matrixcore.top/article/elog)，可以参照我前面的文章。

然后 virgo 的主要的配置就是`config.toml`,作者[在这里](https://themes.gohugo.io/themes/hugo-theme-virgo/)提供了说明，修改为自己的信息就好了。

我主要补充一个点，就是关于搜索和导航界面 404 点问题，因为 hugo 读取页面是需要`front-matter`的，所以，你需要先创建存放搜索的目录

```shell
hugo new search/index.md
```

然后在 index.md 里填入标头

```shell
---
title: "Search"
draft: false
---
```

这样配置，本地的全局搜索才会生效，同理导航，归档页也是这样的原理。

# 总结

---

这是我之前写的关于 virgo 的评价。

> 💡 优点和提升
>
> - 感谢作者开发出的这款优秀主题
> - 优点：部署和响应速度较快  
>   支持全局搜索（yyds）  
>
> - 提升：字体可能会有些拖慢网站整体速度

本身 hugo 是静态网页的速度就很快，而且 virgo 又非常简洁美观，所以我觉得值得推荐给大家。
