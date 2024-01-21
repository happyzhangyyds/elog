---
password: ""
icon: ""
date: "2024-01-21"
type: Post
category: 动手实践
slug: crontab-1
tags:
  - 实用教程
summary: 尝试为obsidian建立数据中心，使用vps定时同步到onedrive
title: "[数据中心] 测试crontab同步elog+Onedrive"
status: Published
urlname: a4bc17f5-f35c-42b8-9099-c3cef783afe0
updated: "2024-01-21 16:31:00"
---

# 前言

---

这是一篇待完成的文章，用于测试 vps 中使用 crontab 定时脚本，执行 elog 的 git pull，从而拉取最新的文章到 onedrive，实现数据中心的集成。

# 正文

---

待完成

需要注意单向同步的操作

```shell
如果您的远程分支名称是`main`，则可以使用以下命令来强制单向拉取仓库并放弃本地更改：

```

git fetch --all
git reset --hard origin/main

```

这将执行以下操作：

# 1. git fetch --all：这将从远程存储库获取最新的更改，包括所有分支和标签，但不会合并到本地分支。
# 2. git reset --hard origin/<branch>：这将将本地分支重置为与远程分支完全一致的状态。请将<branch>替换为您要重置的分支名称。
请注意，执行此操作将放弃本地分支上的所有未提交的更改和提交历史。确保您已经备份了重要的更改，并且确定您要放弃本地更改并完全匹配远程分支的状态。
请谨慎使用此命令，并确保在执行之前理解其影响。
```

# 总结

---

待完成
