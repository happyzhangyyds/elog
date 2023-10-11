# 前言

---

前几天吃午饭的时候，突然想到一件事情，就是关于博客备份的事情。
之前为了对高数 18 讲进行全部重新 CDN 加速，一直用的都是 notion 自带的导出为 markdown 的功能，但是如果数据一多，速度就很慢，而且一个一个导出很费时间。
昨天晚上和今天尝试并使用了 elog，实现了 notion 文章自动批量下载到本地，并根据自定义的熟悉进行合适的归档。
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

## 二、正确进行参数配置

---

我希望对 notion 的数据库的文章进行批量导出，那么在配置`elog.config.js`就需要注意平台的选择。

```javascript
module.exports = {
  write: {
    platform: "notion", //那么要注意平台的选择
  },
};
```

⚠️ 在最开始的时候，我忽视了平台的选择，导致报错：`未知的写作平台`

然后是 notion 相关的配置，首先要关注自己的数据库的属性。
作者大大也提供了数据库的模板，可以参考[配置流程](https://elog.1874.cool/notion/gvnxobqogetukays#notion)。

我采用的数据库是 notionnext 的数据库格式，并且 elog 也支持自定义数据库的字段。

```javascript
notion: {
      token: process.env.NOTION_TOKEN,
      databaseId: process.env.NOTION_DATABASE_ID,
      filter: false, // {property: 'status', select: {equals: '已发布'}}
      sorts: false, // [{timestamp: 'created_time', direction: 'descending'}],
      catalog: false,
    },

//这是默认的配置，以下是我修改后针对notionnext数据库的配置
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

原理是通过 slack 捕捉 notion 数据库字段的变化，比如“status”从“Draft”变位“Published”，那么就可以推送到 slack 的频道中，然后开始触发 pipedream，调用 github actions 的 api 进行部署。

有些复杂，首先，需要进行 slack 注册，并且进行 notion 的关联。

![](https://bu.dusays.com/2023/10/11/6526a1e54f8c2.png)

![](https://bu.dusays.com/2023/10/11/6526a1f09a7e6.png)

如果一切顺利，那么接下来进入 pipedream 的部署，将 slack 与 pipedream 进行关联，最困难的是如何配置 https 请求。

![](https://bu.dusays.com/2023/10/11/6526a771a80be.png)

在这里我要特别感谢 DC's 博主，他的文章给了我启发 ：[ 定期备份 notion](https://amydc.com/a/24c2897b-78f3-4f6a-b8e6-292ea60edf7c)

```javascript
https://serverless-api-elog.vercel.app/api/github?user=cyolc932&repo=elog&event_type=deploy&token=xxx
```

同时参考 1874 博主的[文档](https://github.com/LetTTGACO/serverless-api)，正确配置该请求。

```javascript
user: Github用户名
repo: Github仓库名
token: Github Token
event_type: 配置在 Github workflows 中的repository_dispatch.types的值
```

在这个步骤中，您还要获取[GitHub 的 token](https://github.com/settings/tokens/)

如果这一步正确，并且 serverless api 返回`sussess！`，那么恭喜你，已经成功了一半了。

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

接下来到了困难的阶段，配置 GitHub 的 actions，首先配置环境变量，主要是 notion 的 token 和 id。

路径如下：`设置-Secrets and variables-Actions-Secrets`

接下来创建 GitHub 的工作流：`.github/workflows/main.yaml`

最主要的是这一步

```yaml
- name: 配置Git用户名邮箱
        run: |
          git config --global user.name "xxxx"
          git config --global user.email "xxxx"
```

⚠️ 请注意，接下来不要随意在本地和远程修改，不然会导致冲突。

如果一切顺利，当您在 notion 中将文章的状态变为“Published”时候，将会自动触发工作流，进行备份，如果遇到错误，请排查工作流的报错信息。

![](https://bu.dusays.com/2023/10/11/6526a765b9ded.png)

⚠️ 同时注意放开 workflow 的写入权限，在该仓库的设置，工作流里找到该选项。

如果一切顺利，将会自动触发备份。

# 总结

---

特别鸣谢：1874 博主和群友的耐心解答！
