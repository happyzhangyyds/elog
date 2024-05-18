---
password: ''
icon: ''
date: '2023-09-28 00:00:00'
type: Post
category: 动手实践
slug: Saladict
tags:
  - 实用教程
summary: 介绍了通过沙拉查词+anki导出的方式，对学习的单词进行可视化整理
title: '[外语学习] 沙拉查词+anki进行记忆强化 '
status: Published
cover: 'https://bu.dusays.com/2023/09/28/6514dc0f581b6.png'
urlname: c0568225-bbac-4228-80a6-ee40451b009b
updated: '2024-02-25 20:12:00'
---

# 前言


---


   在阅读英文文献或者是其他的作品时，通常网页进行翻译已经适应绝大多数的学习情况，而当读者立下目标想要提升自己的语言水平时，沙拉查词+anki就可以派上用场。


   沙拉查词是一款浏览器拓展，对edge，chrome支持良好，safari支持并不完美，支持浏览器内的语言翻译，同时最惊艳的功能是生词摘录和anki的同步，同时也支持扇贝和欧路词典的生词本同步。因此该功能是打通了“摘录+记忆”的关键枢纽。


  anki是一个专注于背诵的软件，具有极高的自由度和丰富的玩法，几乎支持所有平台（在linux上由于输入法框架兼容的问题可能体验并不完美），结合强大的插件，对于常见的win，mac，android，ios都具有强大的适配能力。


# 正文


---


  以下为配置教程：


## 1.沙拉查词的安装


---


详见[沙拉查词的官网](https://saladict.crimx.com/)，写得非常好！


## 2.结合quicker（win）或者popclip（mac）实现浏览器外查词（进阶）（可选）


详见沙拉查词的[进阶文档](https://saladict.crimx.com/native.html)


## 3.同步anki


---


详见沙拉查词的[配合anki使用的文档](https://saladict.crimx.com/anki.html)，对您的anki进行同步


## 4.沙拉查词的生词本功能


---


选择适合您的翻译引擎，您可以对您的词典进行精确地匹配


![6514d42f1fe06.png](https://bu.dusays.com/2023/09/28/6514d42f1fe06.png)


![6514d43677b69.png](https://bu.dusays.com/2023/09/28/6514d43677b69.png)


![6514dd8b8030b.png](https://bu.dusays.com/2023/09/28/6514dd8b8030b.png)


## 5.优化沙拉查词独立窗口的体验


---


![6514d5dd4345d.png](https://bu.dusays.com/2023/09/28/6514d5dd4345d.png)


![6514d5ea35021.png](https://bu.dusays.com/2023/09/28/6514d5ea35021.png)


## 6.anki导出的步骤


---


  首先您需要安装anki软件，可以访问anki的[官网](https://apps.ankiweb.net/)进行安装
  如果配置正确，能够进行同步，那么您可以看到在您的anki中会出现沙拉查词的牌组


![6514d7ef79545.png](https://bu.dusays.com/2023/09/28/6514d7ef79545.png)


  接下来我将介绍最重要和有趣的功能，即anki的牌组如何导出为PDF
  首先您可以参照[这篇文章](https://weownthenight.github.io/2020/12/29/Anki导出pdf的方法/)做一个简单的了解


  您需要根具上述的参考文章进行相应的插件的安装，路径在：**工具-插件-获取插件-插件代码**
  插件的代码是`1897277426`


![6514d806417c0.png](https://bu.dusays.com/2023/09/28/6514d806417c0.png)


  
  当您需要对摘录的卡组进行导出的时候，**点击：工具-Export deck to HTML**


  由于插件版本的升级，可能会让大家感到无从下手


![6514d83f9342c.png](https://bu.dusays.com/2023/09/28/6514d83f9342c.png)


  最主要的是html的模版的编写，我这里提供了针对沙拉查词的模板，可以根据自己的需要，自行编写和修改html和css，同时提供针对沙拉查词的html模板（右键下载）


[%E5%BE%B7%E8%AF%AD.html](https://prod-files-secure.s3.us-west-2.amazonaws.com/81a75f5f-eb3b-47db-bd61-d87d1cd413a6/c4372573-9156-4aa9-8233-b249b7e1691e/%E5%BE%B7%E8%AF%AD.html?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240510%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240510T162203Z&X-Amz-Expires=3600&X-Amz-Signature=b318f2cc36d30f3a83ae3e3cba763b417359acf101a178ba409979dd1f96dd89&X-Amz-SignedHeaders=host&x-id=GetObject)


```html
<head>
    <meta charset="UTF-8">
    <style>
        table {
            font-family: sans-serif, NSimSun, SimSun;
            font-size: 13px;
            color: #333333;
            border-width: 1px;
            border-color: #666666;
            border-collapse: collapse;
            width: 100%;
        }

        th {
            border-width: 1px;
            padding: 8px;
            border-style: solid;
            border-color: #666666;
            background-color: #dedede;
        }

        td.column1 {
            border-width: 1px;
            padding: 8px;
            border-style: solid;
            border-color: #666666;
            background-color: #ffffff;
            width: 20%;
        }

        td.column2 {
            border-width: 1px;
            padding: 8px;
            border-style: solid;
            border-color: #666666;
            background-color: #ffffff;
            width: 50%;
        }

        td.column3 {
            border-width: 1px;
            padding: 8px;
            border-style: solid;
            border-color: #666666;
            background-color: #ffffff;
            width: 30%;
        }

        img {
            max-width: 50%;
            height: auto;
        }
    </style>
</head>

<body>
    <table>
        <tr>
            <td class="column1">{{Text}}</td>
            <td class="column2">{{Context}}</td>
            <td class="column3">{{Note}}</td>
        </tr>
    </table>
</body>


<!-- 
**代码理解****：**
这段代码是一个简单的HTML代码片段，用于创建一个包含表格的网页。下面是代码的解析：
- `<head>` 标签包含了一些关于文档的元数据和样式信息。
- `<meta charset="UTF-8">` 定义了文档的字符编码为 UTF-8，以支持显示多种语言和字符集。
- `<style>` 标签用于定义内部样式表，其中包含了一些CSS样式规则。
- `table` 样式规则定义了表格的样式，包括字体、字号、颜色、边框等属性。
- `th` 样式规则定义了表头单元格的样式，包括边框、填充、背景颜色等属性。
- `td` 样式规则定义了表格数据单元格的样式，包括边框、填充、背景颜色等属性。
   此外，设置了单元格的宽度为50%。
- `img` 样式规则定义了图片的样式，设置了图片的最大宽度为50%，高度自适应。
   在 `<body>` 标签中，创建了一个表格 `<table>`，其中包含一行 `<tr>`，
   该行包含了三个单元格 `<td>`。这些单元格中的内容使用了模板语法 `{{...}}`，
表示这些内容将在后台动态生成或填充。
总体来说，这段代码创建了一个带有样式的表格，用于展示文本、上下文和注释等信息。
这些信息可以通过后台代码动态生成，并通过模板语法插入到表格中。
 -->

<!-- 
**修改单元格宽度的办法：**
要让三列单元格设置为自定义的宽度，你可以使用不同的CSS选择器为每个单元格指定特定的宽度。
<style>
    td.column1 {
        width: 20%; 进行自定义宽度
    }

    td.column2 {
       width: 20%;
    }

    td.column3 {
       width: 20%;
    }
</style>
<table>
    <tr>
        <td class="column1">内容1</td>
        <td class="column2">内容2</td>
        <td class="column3">内容3</td>
    </tr>
</table>
在上述示例中，我们为每个单元格添加了一个类名，分别是 column1、column2 和 column3。
然后，在 <style> 标签中，我们使用这些类名作为选择器来定义相应的样式属性。

你可以根据实际情况修改类名和样式属性，以适应你的代码和设计需求。
这样，这些样式将仅应用于具有相应类名的单元格。
 -->
```


## 7.浏览您的导出文件，在浏览器进行打印导出为PDF


---


![65142d97ef111.png](https://bu.dusays.com/2023/09/27/65142d97ef111.png)


# 总结


---


  介绍了通过沙拉查词+anki导出的方式，对学习的单词进行可视化整理，方便后续的复习！


  🍒如果您觉得沙拉查词对您帮助很大，也可以赞助一下[开发者](https://saladict.crimx.com/support.html)，为开源社区贡献自己的一份努力！


  如果有任何问题，也欢迎在评论区留言，有时间我将及时为您解答！

