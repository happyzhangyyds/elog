---
password: ""
icon: ""
date: "2023-10-11"
type: Post
category: 动手实践
slug: elog
tags:
  - 实用教程
  - 推荐
summary: 通过elog实现notion文章批量下载到本地，以及自动化云端备份和迁移。
title: "[跨域协同]  elog+notion实现md优雅备份"
status: Published
urlname: 1ab6b359-03fa-4d3a-8a7e-6d0871344a97
updated: "2023-11-02 17:17:00"
---

# 前言

---

前几天吃午饭的时候，突然想到一件事情，就是关于博客备份的事情。
之前为了对高数 18 讲进行全部重新 CDN 加速，一直用的都是 notion 自带的导出为 markdown 的功能，但是如果数据一多，速度就很慢，而且一个一个导出很费时间。
昨天晚上和今天尝试并使用了 elog，实现了 notion 文章自动批量下载到本地，并根据自定义的数据库属性进行合适的归档。
首先非常感谢这个想法的启蒙博主：某中二的黑科技研究中心
文章标题及链接：[ ](https://darkreunion.tech/article/backup-notion-to-github?giscus=5b1855710a9073bbb30d3264lzzxL%2FY5boFMZEtzfT2uvrsTkpO815dTCl%2BcFCsI%2FwZTnmkVo1SjQB2CllPRsX9pkEFoeAZ77J%2FviSyilYpOqYYX%2FGm9rbQWTk0T8J0bqUaJf4Q%2BJl9YANenxts%3D)[**备份 Notion 文档到 Github**](https://darkreunion.tech/article/backup-notion-to-github?giscus=5b1855710a9073bbb30d3264lzzxL%2FY5boFMZEtzfT2uvrsTkpO815dTCl%2BcFCsI%2FwZTnmkVo1SjQB2CllPRsX9pkEFoeAZ77J%2FviSyilYpOqYYX%2FGm9rbQWTk0T8J0bqUaJf4Q%2BJl9YANenxts%3D)

# 正文

---

实践的过程并不顺利，甚至还有些小艰难，作为纯技术小白，以下记录我的一些踩坑经历。

首先从阅读[技术文档](https://elog.1874.cool/)开始。

## 一、备份文件夹及环境配置

---

导航到技术文档的[快速开始](https://elog.1874.cool/notion/start)，使用 vscode 创建备份文件夹并开始环境配置。

⚠️ 请注意环境需要正确安装，理论上安装环境的时间在 2-3 分钟左右。

然后对项目进行初始化配置，生成`elog.config.js`以及`.elog.env`两个文件，接下来就是进入[配置详情](https://elog.1874.cool/notion/fe8ywmt999gon12w)，配置相应的参数。
  ⚠️ 请注意，将您的.elog.env 文件列入 git 的忽略跟踪

```markdown
使用`.gitignore` 文件：创建一个名为 `.gitignore` 的文件，并在其中列出你想要隐藏的文件或文件夹的名称。在这个文件中，你可以使用通配符或模式来指定要忽略的文件类型或文件夹。当你将 `.gitignore` 文件提交到 GitHub 仓库时，Git 将忽略这些文件，不会将它们包含在版本控制中。

请注意，`.gitignore` 文件只能隐藏未被跟踪的文件。如果某个文件已经被 Git 跟踪并提交到仓库中，那么即使你在 `.gitignore` 文件中将其列为忽略项，它仍然会在仓库中可见。（解决该问题请导航到结尾彩蛋部分）
```

```shell
## 下面是一个示例 `.gitignore` 文件的内容：

# 忽略所有 .txt 文件
*.txt

# 忽略文件夹
my_folder/

# 忽略特定文件
secret.txt
```

## 二、正确进行参数配置

---

我希望对 notion 的数据库的文章进行批量导出，那么在配置`elog.config.js`就需要注意平台的选择。

```javascript
module.exports = {
  write: {
    platform: "notion", //注意平台的选择
  },
};
```

⚠️ 在最开始的时候，我忽视了平台的选择，导致报错：`未知的写作平台`

然后是 notion 相关的配置，首先要关注自己的数据库的属性。
作者大大也提供了数据库的模板，可以参考[配置流程](https://elog.1874.cool/notion/gvnxobqogetukays#notion)。

我采用的数据库是 notionnext 的数据库格式，并且 elog 也支持自定义数据库的字段。

```javascript
//这是默认的配置
notion: {
      token: process.env.NOTION_TOKEN,
      databaseId: process.env.NOTION_DATABASE_ID,
      filter: false,
      sorts: false,
      catalog: false,
    },

//以下是我修改后针对notionnext数据库的配置
notion: {
      token: process.env.NOTION_TOKEN,
      databaseId: process.env.NOTION_DATABASE_ID,
      filter:  {
        property: 'type',
        select: {
          equals: 'Post'
        }
      },
      sorts: true,
      catalog: {
        enable: true,
        property: "tags",
      }
    },
//这里我希望筛选数据库中属性type中的post，也就是发布文章，同时我也希望文章按照tags的标签进行本地归档。所以对此处进行了如下修改。
```

另外如果想要正确输出到指定目录，还需要注意该问题：

```javascript
deploy: {
    platform: 'local',
    local: {
      outputDir: './docs',
      filename: 'title',
      format: 'markdown',
      catalog: true,
//在部署平台配置项中配置deploy.local.catalog=true
      formatExt: '',
    },
//一定要记得勾选部署时候到目录选项
```

![](https://bu.dusays.com/2023/10/11/65269d1bd607c.png)

![](https://bu.dusays.com/2023/10/11/65269d8c5bdd1.png)

如果要做针对自己数据库的属性更改，请参照[**Notion API 文档 - Filter database entries**](https://developers.notion.com/reference/post-database-query-filter)**。**

接下来就是正确获取 notion 的 Integration Token 和 DatabaseId，按照[配置流程](https://elog.1874.cool/notion/gvnxobqogetukays#notion)走就可以。

![](https://bu.dusays.com/2023/10/11/65269eb157ccb.png)

![](https://bu.dusays.com/2023/10/11/65269ec15fd7e.png)

## 三、合适的网络条件

---

在正确配置 notion 的集成和 id 之后，可以开始执行

```shell
elog sync -e .elog.env
```

⚠️ 注意，由于 notion api 的延时问题，校园网条件下，notion api 会经常超时，所以推荐使用手机流量。
如果一切顺利，那么您将可以看到文章被正常输入到本地目录。

## 四、进阶操作，自动备份

---

阅读技术文档[持续集成](https://elog.1874.cool/notion/vy55q9xwlqlsfrvk)

notion 的自动化流程有一定的起手难度。

### 原理介绍

---

通过 slack 捕捉 notion 数据库字段的变化，比如“status”从“Draft”变为“Published”，那么就可以推送到 slack 的频道中，然后开始触发 pipedream，调用 github actions 的 api 进行部署。

### 关联 slack+notion

---

首先，需要进行 slack 注册，授权给 notion 进行关联。

![](https://bu.dusays.com/2023/10/11/6526a1e54f8c2.png)

![](https://bu.dusays.com/2023/10/11/6526a1f09a7e6.png)

### pipedream 配置

---

如果一切顺利，那么接下来进入 pipedream 的部署，将 slack 与 pipedream 进行关联，最困难的是如何配置 https 请求。

![](https://bu.dusays.com/2023/10/11/6526a771a80be.png)

在这里我要特别感谢 DC's 博主，他的文章给了我启发 ：[ 定期备份 notion](https://aaqq.cc/article/24c2897b-78f3-4f6a-b8e6-292ea60edf7c)

```javascript
https://serverless-api-elog.vercel.app/api/github?user=xxx&repo=xxx&event_type=xxx&token=xxx
//注意将xxx替换为自己的数据
```

```javascript
https://serverless-api-elog.vercel.app/api/github?user=cyolc932&repo=elog&event_type=deploy&token=xxx
//例如你的github用户名，仓库名称，部署名称以及github的token
```

```javascript
user: Github用户名
repo: Github仓库名
token: Github Token
event_type: 配置在 Github workflows 中的repository_dispatch.types的值
```

同时参考 1874 博主的[文档](https://github.com/LetTTGACO/serverless-api)，正确配置该请求。

在这个步骤中，您还要获取[GitHub 的 token](https://github.com/settings/tokens/)

如果这一步正确，并且 serverless api 返回`sussess！`，那么恭喜你，已经成功了一半了。

### 安装打包环境

---

接下来让我们回到 vscode 的文件夹，进行打包环境的安装

```shell
yarn add @elog/cli
```

在`package.json`加上如下脚本

```javascript
{
  "dependencies": {
    "@elog/cli": "^0.8.0"
  },
//以下为添加的脚本
  "scripts": {
    "build": "yarn",
    "elog:init": "elog init",
    "sync:local": "elog sync -e .elog.env",
    "sync": "elog sync",
    "clean": "elog clean"
  }
}
```

### 调试 github 自动化脚本

---

接下来到了困难的阶段，配置 GitHub 的 actions，首先配置环境变量，主要是 notion 的 token 和 id，填入在第二步获得的参数。

路径如下：`设置-Secrets and variables-Actions-Secrets`

![](https://bu.dusays.com/2023/10/12/65274e6154488.png)

接下来创建 GitHub 的工作流：`.github/workflows/main.yaml`

最主要的是这一步，配置完成之后，在 vscode 拉取仓库内容，进行本地和远程的同步。

```yaml
- name: 配置Git用户名邮箱
        run: |
          git config --global user.name "xxxx"
          git config --global user.email "xxxx"
```

⚠️ 请注意，接下来不要随意在本地和远程双向修改，不然会导致冲突。

### 放开 actions 的写入权限

---

⚠️ 同时注意放开 actions 的写入权限，在该仓库的设置，工作流里找到该选项。

![](https://bu.dusays.com/2023/10/12/65274f9c74f51.png)

### 脚本触发

---

如果一切顺利，当您在 notion 中将文章的状态变为“Published”时候，将会自动触发工作流，进行备份，如果遇到错误，请排查工作流的报错信息。

![](https://bu.dusays.com/2023/10/11/6526a765b9ded.png)

最后当您二次修改文章之后再次触发，文章会进行增量更新。

# 总结

---

elog 的项目非常具有实践价值，通过该项目，不仅可以实现博客文档的整洁有序自动化的归档，而且可以兼容多平台，实现数据的自由迁移。

在我遇到困难的时候，离不开群主和群友的耐心解答和帮助！

> 💡 **特别鸣谢：  
> 🌺** [1874 博主的 elog 项目及其技术文档](https://github.com/LetTTGACO/elog)  
> 🌺 [在自行实践遇到困难和解决的宝贵经历](https://bu.dusays.com/2023/10/12/6527510b65304.png)  
> 🌺 [北门清燕](https://www.bmqy.net/2651.html#more)、[DC's](https://aaqq.cc/article/24c2897b-78f3-4f6a-b8e6-292ea60edf7c)、[IMQL.LIFE](https://www.imql.life/2023/08/12/Writing_on_The_Cloud_With_YuQue/)等群友的最佳实践文档

### 小彩蛋

---

<details>
  <summary>介绍一下slack</summary>

```markdown
Slack 是一种团队协作工具，旨在改善团队内部沟通和协作的效率。它提供了实时聊天、文件共享、通知和集成等功能，使团队成员能够更轻松地进行交流和合作。
以下是一些 Slack 的主要特点和功能：

1. 实时聊天：Slack 提供了实时聊天功能，团队成员可以通过文本消息、表情符号、贴图等方式进行即时交流。你可以创建不同的频道（channels）来组织讨论，例如项目频道、团队频道等。
2. 文件共享：你可以在 Slack 上轻松共享文件，包括文档、图片、音频和视频等。这样团队成员可以方便地查看、评论和编辑这些文件。
3. 通知和提醒：Slack 可以发送通知和提醒，包括新消息、提及你的消息、任务截止日期等。你可以通过设置来控制接收哪些通知，以确保你能及时获取重要信息。
4. 集成和应用程序：Slack 支持与其他工具和应用程序的集成，例如 Google Drive、GitHub、Jira 等。这样你可以在 Slack 中直接访问和操作这些工具，提高工作效率。
5. 搜索和存档：Slack 有强大的搜索功能，你可以轻松找到之前的消息、文件和链接等。此外，Slack 还会自动存档你的聊天记录，方便你随时回顾和查找。
6. 多设备支持：你可以在电脑、手机和平板电脑等不同设备上使用 Slack，并且它们之间的聊天同步。
   总的来说，Slack 是一个强大的团队协作工具，可以帮助团队成员更好地沟通、协作和组织工作。它已经成为许多组织和公司的首选工具之一，无论是小型团队还是大型企业都可以受益于它的功能和便利性。
```

  </details>

<details>
  <summary>actions的权限不够</summary>

```markdown
使用 github action 时报错 Run ad-m/github-push-action@master
Push to branch main
remote: Write access to repository not granted.
fatal: unable to access '[https://github.com/happyzhangyyds/elog.git/](https://github.com/happyzhangyyds/elog.git/)': The requested URL returned error: 403
Error: Invalid exit code: 128
at ChildProcess.<anonymous> (/home/runner/work/\_actions/ad-m/github-push-action/master/start.js:30:21)
at ChildProcess.emit (node:events:514:28)
at maybeClose (node:internal/child_process:1105:16)
at ChildProcess.\_handle.onexit (node:internal/child_process:305:5) {
code: 128
```

```markdown
这个错误表明您在尝试使用 GitHub Actions 运行 ad-m/github-push-action@master 时遇到了权限问题。具体来说，错误消息中提到您对存储库的写访问权限不足。
要解决这个问题，您可以执行以下步骤：

1. 确保您有足够的权限来对该存储库进行写操作。请确保您是该存储库的所有者或具有足够的权限来进行推送操作。
2. 检查您在 GitHub Actions 的工作流文件中是否正确配置了凭据。您需要在工作流文件中提供正确的凭据，以便能够对存储库进行推送操作。您可以使用 GitHub 提供的 secrets 功能来安全地存储和使用凭据。确保您在工作流文件中使用正确的凭据。
3. 如果您使用的是个人访问令牌 (Personal Access Token) 进行身份验证，请确保该令牌具有足够的权限来对存储库进行写操作。您可以在 GitHub 的个人设置中生成和管理个人访问令牌。
4. 如果您使用的是 OAuth 应用程序进行身份验证，请确保您的应用程序已正确设置并被授权对存储库进行写操作。

请检查上述步骤，确认您具有正确的权限和凭据，并且已正确配置 GitHub Actions 的工作流文件。这样应该能够解决您遇到的问题。如果问题仍然存在，请提供更多的上下文和详细信息，以便我能够更好地帮助您解决问题。
```

  </details>

<details>
  <summary>actions的本地远程冲突</summary>

```markdown
产生了如下报错信息：Run ad-m/github-push-action@master
Push to branch main
error: atomic push failed for ref refs/heads/main. status: 5

fatal: protocol error: bad line length character: erro
To https://github.com/happyzhangyyds/elog.git
! [rejected] HEAD -> main (fetch first)
error: failed to push some refs to 'https://github.com/happyzhangyyds/elog.git'
hint: Updates were rejected because the remote contains work that you do not
hint: have locally. This is usually caused by another repository pushing to
hint: the same ref. If you want to integrate the remote changes, use
hint: 'git pull' before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.
Error: Invalid exit code: 1
at ChildProcess.<anonymous> (/home/runner/work/\_actions/ad-m/github-push-action/master/start.js:30:21)
at ChildProcess.emit (node:events:514:28)
at maybeClose (node:internal/child_process:1105:16)
at ChildProcess.\_handle.onexit (node:internal/child_process:305:5) {
code: 1
}
```

````markdown
这个错误表明在尝试使用 GitHub Actions 运行 `ad-m/github-push-action@master` 时遇到了推送失败的问题。根据错误消息，推送失败的原因可能是由于远程存储库包含了您本地没有的提交，导致冲突。

要解决这个问题，您可以执行以下步骤：

1. 按照错误消息中的建议，运行 `git pull` 命令来将远程存储库的更改合并到本地仓库。这将更新您的本地分支，使其包含远程存储库中的最新提交。

   ```bash
   git pull origin main
   ```
````

2. 在合并远程更改后，解决可能的冲突。如果存在冲突，您需要手动解决它们以确保代码的一致性。

3. 确保您有足够的权限来对存储库进行推送操作。请确保您是该存储库的所有者或具有足够的权限来进行推送操作。

4. 检查您在 GitHub Actions 的工作流文件中是否正确配置了凭据。您需要在工作流文件中提供正确的凭据，以便能够对存储库进行推送操作。您可以使用 GitHub 提供的 secrets 功能来安全地存储和使用凭据。确保您在工作流文件中使用正确的凭据。

请按照上述步骤逐一检查和解决问题。如果问题仍然存在，请提供更多的上下文和详细信息，以便我能够更好地帮助您解决问题。

尽管您已经尝试了之前提到的解决步骤，但问题仍然存在。根据错误消息，推测可能是由于其他人在您尝试推送时同时对相同的分支进行了推送，导致冲突。

在这种情况下，您可以尝试以下步骤：

1. 确保您的本地仓库是干净的，没有未提交的更改。运行以下命令来查看当前的仓库状态：

   ```bash
   git status
   ```

   如果有未提交的更改，请先提交或取消更改，确保仓库是干净的。

2. 删除本地分支 `main`，然后重新拉取远程分支 `main` 的最新状态：

   ```bash
   git branch -D main
   git fetch origin main
   git checkout main
   ```

   这将删除您本地的 `main` 分支，并从远程存储库中获取最新的 `main` 分支。

3. 如果您在本地有重要的更改，可以创建一个新的分支来保存这些更改：

   ```bash
   git checkout -b my_changes
   ```

   这将创建一个名为 `my_changes` 的新分支，并将您的更改保存在该分支上。

4. 现在，尝试将新分支推送到远程存储库：

   ```bash
   git push origin my_changes
   ```

   如果推送成功，您可以在 GitHub 上查看并比较分支，然后创建一个合并请求（Pull Request），将 `my_changes` 分支的更改合并到 `main` 分支中。

请注意，如果其他人在您尝试推送时继续对相同的分支进行推送，可能仍会导致冲突。在这种情况下，您需要与其他人协调，以确保您的更改能够成功地合并到主分支中。

如果问题仍然存在，请提供更多的上下文信息，例如您的工作流文件、代码片段或其他相关细节，以便我能够更好地帮助您解决问题。

````



  </details>


<details>
  <summary>解决环境变量可见性问题</summary>


```markdown
如果某个文件已经被 Git 跟踪并提交到仓库中，即使你在 `.gitignore` 文件中将其列为忽略项，它仍然会在仓库中可见。要解决这个问题，你需要执行以下步骤：

1. 首先，从 Git 仓库中删除已经跟踪的文件。可以使用以下命令将文件从 Git 仓库中删除，但保留在本地文件系统中：

````

git rm --cached <file>

```

将 `<file>` 替换为要从 Git 仓库中删除的文件的路径。

2. 然后，将删除的文件添加到 `.gitignore` 文件中，以确保将来不会再次将其纳入版本控制。在 `.gitignore` 文件中添加文件路径或模式，例如：

```

<file>
```

3. 最后，提交对 `.gitignore` 文件和已删除文件的更改：

```
git add .gitignore
git commit -m "Remove and ignore the specified file"
```

这样，已删除的文件将不再出现在 Git 仓库的历史记录中，并且在将来的提交中也不会被包含。

请注意，这些步骤仅会将文件从 Git 仓库中删除，并阻止将来的提交。如果你希望完全从仓库中删除文件的所有痕迹，你可能需要执行其他操作，如修改 Git 的历史记录。这种情况下，建议谨慎操作，并在进行任何重要操作之前备份你的仓库。

````



  </details>


<details>
  <summary>如何删除git的历史痕迹</summary>


```markdown
要删除 Git 仓库中的文件的所有痕迹，包括历史记录和提交信息，可以按照以下步骤进行操作：

1. 首先，确保你备份了重要的文件和仓库，以防止意外数据丢失。

2. 使用 `git filter-branch` 命令来修改 Git 的历史记录。这个命令可以重写提交历史，并删除指定文件的所有痕迹。以下是一个示例命令：

````

git filter-branch --force --index-filter 'git rm --cached --ignore-unmatch <file>' --prune-empty --tag-name-filter cat -- --all

```

将 `<file>` 替换为要删除痕迹的文件的路径。这个命令将遍历所有提交，并从中删除指定文件的所有痕迹。

3. 执行该命令后，Git 将会重写历史记录。这可能需要一些时间，具体取决于你的仓库大小和提交数量。在完成后，Git 会显示重写的提交数量。

4. 接下来，使用 `git push --force` 命令将修改后的历史记录推送到远程仓库。请注意，这个命令会强制推送修改后的历史记录，因此请确保你在进行此操作之前已经备份了重要的数据。

```

git push --force origin <branch-name>

```

将 `<branch-name>` 替换为你要推送的分支名称。

这样，指定文件的所有痕迹将从 Git 仓库的历史记录中完全删除。

请注意，这个操作是不可逆的，并且会影响到与指定文件相关的所有提交和分支。因此，在执行此操作之前，请务必谨慎，并确保你理解操作的影响。
```

  </details>
