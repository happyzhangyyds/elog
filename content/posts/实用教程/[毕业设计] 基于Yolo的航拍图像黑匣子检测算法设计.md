---
password: ""
icon: ""
date: "2024-03-01"
type: Post
category: 动手实践
slug: Graduation-Design
tags:
  - 实用教程
summary: 这篇文章随进度更新，用于记录在毕设过程中遇到的心得和问题。
title: "[毕业设计] 基于Yolo的航拍图像黑匣子检测算法设计"
status: Published
urlname: 4953c12f-b064-475e-aa3b-1a7019651192
updated: "2024-03-26 16:10:00"
---

# 前言

---

> 💡 首先需要感谢学校为我们提供的一个良好的学习平台，让我们通过毕设来了解项目开发的流程，并通过标准化的书写来规范格式。感谢罗老师的耐心指导和帮助，在实际毕设的写作过程中，关注着我们的每一个节点。  
>  同时需要感谢公司[Andawell](http://www.andawell.com/)的支持，能为我提供在公司边实习边做毕设的机会。同时能将毕设与项目开发的标准更好地结合。  
>  最后还需要鼓励自己，因为需要付出很多的努力。

# 正文

---

一方面主要是技术上的要求，一方面主要是论文上的排版。然后希望我遇到的问题，也能帮到大家。

## **word 中 mathtype 公式偏上浮或偏下沉怎么办**

---

刚才遇到了公式上浮的问题，我使用的是 amath 进行公式的编写，搭配图片转 latex 进行调整。然后找到了这个问题的解决办法。感谢 whu 数码君提供的[回答](https://jingyan.baidu.com/article/09ea3edef9845480aede39a5.html)。

## 如何使用图片转 latex

---

之前有同学问过我这个问题，我今天也再一次遇到了这个问题，看到论文中复杂的公式，一筹莫展怎么办，可以通过图片转 latex 的方式，这是我比较常用的方式，但是现在主流的转 latex 的好的软件不多，在此特别感谢[simpletex](https://simpletex.cn/ai/latex_ocr)提供的支持。

## 关于语病的修改

---

感谢 up 主：[用镜头记录成长](https://space.bilibili.com/26021795)，参考[论文写作表达语句表达系列课程 一 病句修改 成分残缺\_哔哩哔哩\_bilibili](https://www.bilibili.com/video/BV1PB4y1U7JU/?buvid=XYA9A96A2DBF2E51A918ECE55EFA494C98935&is_story_h5=false&mid=nPIoZdTfuXw2Qtcat9xxZw%3D%3D&p=1&plat_id=114&share_from=ugc&share_medium=android&share_plat=android&share_session_id=e1117509-5d59-4fd0-b122-21d23e500899&share_source=WEIXIN&share_tag=s_i&timestamp=1693714483&unique_k=HFqrbnI&up_id=26021795&share_times=1&vd_source=237e295a40d7aaea043ead8c0d2c78ab)该视频进行总结。

<details>
  <summary>  以下内容是对该视频进行的笔记梳理。</summary>

### 一、主语残缺

---

- **滥用介词**

> 从这件小事，说明一个道理

应改为，这件小事说明一个道理。上述例子中缺少主语。

> 当学生了解了美是什么，就会以美的标准米规范自己的行为和思想。

应去除“当”字。

- **滥用使令动词**

> 通过这件小事，使我明白了一个道理。

去除”通过“二字。

> 通过对该课题的研究，得出新时代精神的含义。

需添加主语，例如“笔者得出……”**(另外还需要尽量避免在论文中使用“我”字)**

- **偏正短语缺中心语**

> 课堂教学低效，一直未得到解决。

需在”低效“后面加上”的问题“

> 我对经济与生活这本教材感到困感。

需在“教材”后面加上“的内容”

- **滥用省略**

> 在经历了几千年的封建统治后，人们又开始重视被禁锯的古典文化，并成为人文主义者的武器，用米反对神权。

应改为”古典文化并成为人文主义者的武器“

- **助词用错**

> 2022 年颁布了《家庭教育指导法》，是我国首部家庭教育法。

把“了”改成“的”

### 二、谓语残缺

---

- **句首缺谓另起头**

> 经过几十年的努力，我国己经独立自主地研制、发射、跟踪和测检地球同步通讯卫星的能力。

具备……的能力

> 某大学工商管理学院在课程设置上除了专业课、外语课、政治理论课，还包括演讲与口才、基础写作等课程，以进一步提高说写方面的技能。

除了设置有…… **(第一句话缺少谓语)**

- **动宾缺动**

> 我市最近发动了全面的质量大检查运动，要在这个运动中建立与加强技术管理制度等一系列工作。

要在这个运动中**完成**建立与加强技术管理制度等一系列**工作**

> 政府必须严厉打击食品安全违法违规行为的高压态势，及时消除各环节领域的隐患，创新食品安全监管惩处体制机制。

保持严厉打击…

> 教师在法律专业知识和逻辑思维能力提升方面面临困难。

教师在法律专业知识拓展… (知识和提升搭配不是非常好，搭配知识拓展可能会更好)

### 三、宾语残缺

---

- **动宾缺宾**

> 学校宿舍、教学楼等人群密集区，一且发生火灾，后果不堪设想，因此学生掌握火灾中自救互教相当重要。

掌握…技能

- **介宾缺宾**

> 这部电影在塑造人物形象所提供的经验是非常宝贵的，

在…方面

- **误将定语当宾语**

> 桃花乡走可持续发展之路，按照建成生态环境和谐优美、资源集约节约利用、经济和社会协调发展的生态乡，制定了五年发展建设规划。

按照…目标，规划

### 四、虚词残缺

---

- **介宾缺介**

> 2014 年底，我国探月工程三期“再入返回飞行”试验获得成功，确保嫦娥五号任务顺利实施和探月工程持续推进莫定坚实基础，

为…奠定坚实基础

- **被动缺被**

> 这本书非常有价值，常常图书馆收藏。

常常被图书馆收藏

- **对象缺对**

> 现代女性越来越独立，她们除了自己独立挣钱外，对自身的价值、生活环境也越发重视，那些价值剥削、性骚扰，她们将说不。

对那些价值剥削、性骚扰，她们将说不。

  </details>

## 搭建 yolov5 环境

---

详细参照 up 主：[**思绪亦无限**](https://space.bilibili.com/456667721)的介绍：

[**Win11 中从头安装软件和配置环境运行深度学习项目**](https://www.bilibili.com/video/BV1Hg4y1t78v/?spm_id_from=333.999.0.0&vd_source=237e295a40d7aaea043ead8c0d2c78ab)

然后最主要的还需要引入英伟达的 CUDA，可以现在本地装，但我还是倾向于选择[autodl](https://www.autodl.com/home)，因为这里已经预装了 cuda 环境。

这里细节很多，但现在又过了好久了，**有点忘了**，在选择基础镜像的时候就应该要注意选择合适的版本，不然后面配置 cuda 会麻烦死。（看来日志还是要即使记录，当时费了一下午的劲，真是服了）

## 数据集的预处理

---

课题中 yolov5 的数据集是采用的航拍视角，和我当时课设做得很不一样，一张 4K 的图十几兆，直接读取极为不现实，就和蚂蚁一样，还有很多干扰，不好办。所以需要预先对数据集进行切片处理。

然后挑出切片完后包含黑匣子的图片，再进行标注。

## 验证集

---

最开始验证集是用的数据集的一部分，但是后面采用新的验证集，难度瞬间就上来了，测试精度从 0.996 瞬间跌到都到不了 0.7。

然后问题就来了，一方面需要扩充数据集，另一方面需要选择合适的模型对网络参数的挑战。

### 扩充验证集

---

感谢 CSDN 博主：[**我要变胖哇**](https://blog.csdn.net/qq_44421796)**、**[**路人贾'ω'**](https://blog.csdn.net/weixin_43334693)

参考文章：[**YOLO 数据集实现数据增强的方法（裁剪、平移 、旋转、改变亮度、加噪声等）**](https://blog.csdn.net/weixin_43334693/article/details/131744918)

<details>
  <summary>数据增强的概念</summary>

**数据增强**是一种重要的机器学习方法之一，是**基于已有的训练样本数据来生成更多的训练数据**，其目的就是**为了使扩增的训练数据尽可能接近真实分布的数据，从而提高检测精度**。此外，数据增强能够迫使模型**学习到更多鲁棒性的特征，从而有效提高模型的泛化能力**。

在实际的应用场景中，足量且高保真的优质数据集通常是可遇不可求的，这不仅**费钱费时费力，而且隐私保护和极端概率问题，数据集的获取变得尤为困难**。因此，一种低成本且有效的方法便是**利用数据增强来减少对训练数据的依赖**，从而帮助开发人员更好更快地构建高精度的 AI 模型。

  </details>

<details>
  <summary>数据增强的作用</summary>

**（1） 避免过拟合。**当数据集具有某种明显的特征，例如数据集中图片基本在同一个场景中拍摄，使用 Cutout 方法和风格迁移变化等相关方法可避免模型学到跟目标无关的信息。

**（2）提升模型鲁棒性，降低模型对图像的敏感度。**当训练数据都属于比较理想的状态，碰到一些特殊情况，如遮挡，亮度，模糊等情况容易识别错误，对训练数据加上噪声，掩码等方法可提升模型鲁棒性。

**（3）增加训练数据，提高模型泛化能力。**

**（4）避免样本不均衡。**在工业缺陷检测方面，医疗疾病识别方面，容易出现正负样本极度不平衡的情况，通过对少样本进行一些数据增强方法，降低样本不均衡比例。

  </details>

<details>
  <summary>常见的数据增强的办法</summary>

（1）比较常用的**几何变换**方法主要有：

- 翻转
- 旋转
- 裁剪
- 缩放
- 平移
- 抖动

值得注意的是，在某些具体的任务中，当使用这些方法时需要主要标签数据的变化，如目标检测中若使用翻转，则需要将 gt 框进行相应的调整。

（2）比较常用的**像素变换**方法主要有：

- 加椒盐噪声
- 高斯噪声
- 进行高斯模糊
- 调整 HSV 对比度
- 调节亮度
- 饱和度
- 直方图均衡化
- 调整白平衡等

  </details>

### 实操思路

---

1. txt 转 xml
2. 读取 xml 进行扩充
3. 扩充完的 xml 转 txt
4. 打包数据集上传服务器

<details>
  <summary>进行txt转xml操作，代码如下：</summary>

```python
# -*- coding: utf-8 -*-
import os
import cv2
from lxml.etree import Element, SubElement, tostring


def txt_xml(img_path, img_name, txt_path, img_txt, xml_path, img_xml):
    clas = []
    # 读取txt的信息
    txt_img = os.path.join(txt_path, img_txt)

    # 图像的宽度和高度
    imw = 640  # 应当根据实际图片大小进行调整
    imh = 640  # 应当根据实际图片大小进行调整

    with open(txt_img, "r") as f:
        for line in f.readlines():
            line = line.strip('\n')
            list = line.split(" ")
            print(list)
            clas.append(list)

    # 创建XML文档的根节点和相关子节点
        # 创建XML文档的根节点
        node_root = Element('annotation')
        node_folder = SubElement(node_root, 'folder')
        node_folder.text = '1'
        node_filename = SubElement(node_root, 'filename')

        # 图像名称
        node_filename.text = img_name
        node_size = SubElement(node_root, 'size')
        node_width = SubElement(node_size, 'width')
        node_width.text = str(imw)
        node_height = SubElement(node_size, 'height')
        node_height.text = str(imh)
        node_depth = SubElement(node_size, 'depth')
        node_depth.text = '3'

    # 遍历所有的标注信息并添加到XML中
        # 遍历所有的标注信息
        for i in range(len(clas)):
            x_center_norm = float(clas[i][1])
            y_center_norm = float(clas[i][2])
            width_norm = float(clas[i][3])
            height_norm = float(clas[i][4])
            # 转换归一化坐标到像素坐标
            x_center = x_center_norm * imw
            y_center = y_center_norm * imh
            width = width_norm * imw
            height = height_norm * imh
            # 计算并转换为字符串
            xmin = str(int(round(x_center - (width / 2))))
            ymin = str(int(round(y_center - (height / 2))))
            xmax = str(int(round(x_center + (width / 2))))
            ymax = str(int(round(y_center + (height / 2))))

            # 创建XML节点并赋值
            node_object = SubElement(node_root, 'object')
            node_name = SubElement(node_object, 'name')
            node_name.text = str(clas[i][0])
            node_pose = SubElement(node_object, 'pose')
            node_pose.text = "Unspecified"
            node_truncated = SubElement(node_object, 'truncated')
            node_truncated.text = "0"
            node_difficult = SubElement(node_object, 'difficult')
            node_difficult.text = '0'
            node_bndbox = SubElement(node_object, 'bndbox')
            node_xmin = SubElement(node_bndbox, 'xmin')
            node_xmin.text = xmin
            node_ymin = SubElement(node_bndbox, 'ymin')
            node_ymin.text = ymin
            node_xmax = SubElement(node_bndbox, 'xmax')
            node_xmax.text = xmax
            node_ymax = SubElement(node_bndbox, 'ymax')
            node_ymax.text = ymax

    # 将XML内容写入文件
    xml = tostring(node_root, pretty_print=True)
    img_newxml = os.path.join(xml_path, img_xml)
    with open(img_newxml, 'wb') as file_object:
        file_object.write(xml)


if __name__ == "__main__":
    # 图像、标注和XML文件夹所在位置、更换自己的绝对路径
    img_path = r"D:\@Graduation\enhance\data\images\train"
    txt_path = r"D:\@Graduation\enhance\data\labels\train"
    xml_path = r"D:\@Graduation\enhance\data\labels\xml"
    for img_name in os.listdir(img_path):
        img_base_name = os.path.splitext(img_name)[0]
        img_xml = img_base_name + ".xml"
        img_txt = img_base_name + ".txt"
        txt_xml(img_path, img_name, txt_path, img_txt, xml_path, img_xml)

```

  </details>

**核心原理解释**：如果图像的大小是 640x640 像素，换算从 YOLO 格式到 PASCAL VOC 格式时，你需要使用这个尺寸来将 YOLO 格式中的归一化坐标转换为像素坐标。

以下是转换的具体步骤：

1. 从 YOLO 格式的文本文件中读取每个目标的类别索引和归一化的边界框坐标  `(class_index, x_center_norm, y_center_norm, width_norm, height_norm)`。
2. 将归一化的中心点坐标  `(x_center_norm, y_center_norm)`  和宽度、高度  `(width_norm, height_norm)`  转换为像素坐标。
3. 使用像素坐标来计算 PASCAL VOC 格式的边界框  `(xmin, ymin, xmax, ymax)`

```python
# 计算 PASCAL VOC 的 (xmin, ymin, xmax, ymax)
xmin = int(round(x_center - (width / 2)))
ymin = int(round(y_center - (height / 2)))
xmax = int(round(x_center + (width / 2)))
ymax = int(round(y_center + (height / 2)))
```

<details>
  <summary>进行xml扩充操作</summary>

```python
# -*- coding=utf-8 -*-

import time
import random
import copy
import cv2
import os
import math
import numpy as np
from skimage.util import random_noise
from lxml import etree, objectify
import xml.etree.ElementTree as ET
import argparse


# 显示图片
def show_pic(img, bboxes=None):
    '''
    输入:
        img:图像array
        bboxes:图像的所有boudning box list, 格式为[[x_min, y_min, x_max, y_max]....]
        names:每个box对应的名称
    '''
    for i in range(len(bboxes)):
        bbox = bboxes[i]
        x_min = bbox[0]
        y_min = bbox[1]
        x_max = bbox[2]
        y_max = bbox[3]
        cv2.rectangle(img, (int(x_min), int(y_min)), (int(x_max), int(y_max)), (0, 255, 0), 3)
    cv2.namedWindow('pic', 0)  # 1表示原图
    cv2.moveWindow('pic', 0, 0)
    cv2.resizeWindow('pic', 1200, 800)  # 可视化的图片大小
    cv2.imshow('pic', img)
    cv2.waitKey(0)
    cv2.destroyAllWindows()


# 图像均为cv2读取
class DataAugmentForObjectDetection():
    def __init__(self, rotation_rate=0.5, max_rotation_angle=5,
                 crop_rate=0.5, shift_rate=0.5, change_light_rate=0.5,
                 add_noise_rate=0.5, flip_rate=0.5,
                 cutout_rate=0.5, cut_out_length=50, cut_out_holes=1, cut_out_threshold=0.5,
                 is_addNoise=True, is_changeLight=True, is_cutout=True, is_rotate_img_bbox=True,
                 is_crop_img_bboxes=True, is_shift_pic_bboxes=True, is_filp_pic_bboxes=True):

        # 配置各个操作的属性
        self.rotation_rate = rotation_rate
        self.max_rotation_angle = max_rotation_angle
        self.crop_rate = crop_rate
        self.shift_rate = shift_rate
        self.change_light_rate = change_light_rate
        self.add_noise_rate = add_noise_rate
        self.flip_rate = flip_rate
        self.cutout_rate = cutout_rate

        self.cut_out_length = cut_out_length
        self.cut_out_holes = cut_out_holes
        self.cut_out_threshold = cut_out_threshold

        # 是否使用某种增强方式
        self.is_addNoise = is_addNoise
        self.is_changeLight = is_changeLight
        self.is_cutout = is_cutout
        self.is_rotate_img_bbox = is_rotate_img_bbox
        self.is_crop_img_bboxes = is_crop_img_bboxes
        self.is_shift_pic_bboxes = is_shift_pic_bboxes
        self.is_filp_pic_bboxes = is_filp_pic_bboxes

    # ----1.加噪声---- #
    def _addNoise(self, img):
        '''
        输入:
            img:图像array
        输出:
            加噪声后的图像array,由于输出的像素是在[0,1]之间,所以得乘以255
        '''
        # return cv2.GaussianBlur(img, (11, 11), 0)
        return random_noise(img, mode='gaussian', seed=int(time.time()), clip=True) * 255

    # ---2.调整亮度--- #
    def _changeLight(self, img):
        alpha = random.uniform(0.35, 1)
        blank = np.zeros(img.shape, img.dtype)
        return cv2.addWeighted(img, alpha, blank, 1 - alpha, 0)

    # ---3.cutout--- #
    def _cutout(self, img, bboxes, length=100, n_holes=1, threshold=0.5):
        '''
        原版本：https://github.com/uoguelph-mlrg/Cutout/blob/master/util/cutout.py
        Randomly mask out one or more patches from an image.
        Args:
            img : a 3D numpy array,(h,w,c)
            bboxes : 框的坐标
            n_holes (int): Number of patches to cut out of each image.
            length (int): The length (in pixels) of each square patch.
        '''

        def cal_iou(boxA, boxB):
            '''
            boxA, boxB为两个框，返回iou
            boxB为bouding box
            '''
            # determine the (x, y)-coordinates of the intersection rectangle
            xA = max(boxA[0], boxB[0])
            yA = max(boxA[1], boxB[1])
            xB = min(boxA[2], boxB[2])
            yB = min(boxA[3], boxB[3])

            if xB <= xA or yB <= yA:
                return 0.0

            # compute the area of intersection rectangle
            interArea = (xB - xA + 1) * (yB - yA + 1)

            # compute the area of both the prediction and ground-truth
            # rectangles
            boxAArea = (boxA[2] - boxA[0] + 1) * (boxA[3] - boxA[1] + 1)
            boxBArea = (boxB[2] - boxB[0] + 1) * (boxB[3] - boxB[1] + 1)
            iou = interArea / float(boxBArea)
            return iou

        # 得到h和w
        if img.ndim == 3:
            h, w, c = img.shape
        else:
            _, h, w, c = img.shape
        mask = np.ones((h, w, c), np.float32)
        for n in range(n_holes):
            chongdie = True  # 看切割的区域是否与box重叠太多
            while chongdie:
                y = np.random.randint(h)
                x = np.random.randint(w)

                y1 = np.clip(y - length // 2, 0,
                             h)  # numpy.clip(a, a_min, a_max, out=None), clip这个函数将将数组中的元素限制在a_min, a_max之间，大于a_max的就使得它等于 a_max，小于a_min,的就使得它等于a_min
                y2 = np.clip(y + length // 2, 0, h)
                x1 = np.clip(x - length // 2, 0, w)
                x2 = np.clip(x + length // 2, 0, w)

                chongdie = False
                for box in bboxes:
                    if cal_iou([x1, y1, x2, y2], box) > threshold:
                        chongdie = True
                        break
            mask[y1: y2, x1: x2, :] = 0.
        img = img * mask
        return img

    # ---4.旋转--- #
    def _rotate_img_bbox(self, img, bboxes, angle=5, scale=1.):
        '''
        参考:https://blog.csdn.net/u014540717/article/details/53301195crop_rate
        输入:
            img:图像array,(h,w,c)
            bboxes:该图像包含的所有boundingboxs,一个list,每个元素为[x_min, y_min, x_max, y_max],要确保是数值
            angle:旋转角度
            scale:默认1
        输出:
            rot_img:旋转后的图像array
            rot_bboxes:旋转后的boundingbox坐标list
        '''
        # 旋转图像
        w = img.shape[1]
        h = img.shape[0]
        # 角度变弧度
        rangle = np.deg2rad(angle)  # angle in radians
        # now calculate new image width and height
        nw = (abs(np.sin(rangle) * h) + abs(np.cos(rangle) * w)) * scale
        nh = (abs(np.cos(rangle) * h) + abs(np.sin(rangle) * w)) * scale
        # ask OpenCV for the rotation matrix
        rot_mat = cv2.getRotationMatrix2D((nw * 0.5, nh * 0.5), angle, scale)
        # calculate the move from the old center to the new center combined
        # with the rotation
        rot_move = np.dot(rot_mat, np.array([(nw - w) * 0.5, (nh - h) * 0.5, 0]))
        # the move only affects the translation, so update the translation
        rot_mat[0, 2] += rot_move[0]
        rot_mat[1, 2] += rot_move[1]
        # 仿射变换
        rot_img = cv2.warpAffine(img, rot_mat, (int(math.ceil(nw)), int(math.ceil(nh))), flags=cv2.INTER_LANCZOS4)

        # 矫正bbox坐标
        # rot_mat是最终的旋转矩阵
        # 获取原始bbox的四个中点，然后将这四个点转换到旋转后的坐标系下
        rot_bboxes = list()
        for bbox in bboxes:
            xmin = bbox[0]
            ymin = bbox[1]
            xmax = bbox[2]
            ymax = bbox[3]
            point1 = np.dot(rot_mat, np.array([(xmin + xmax) / 2, ymin, 1]))
            point2 = np.dot(rot_mat, np.array([xmax, (ymin + ymax) / 2, 1]))
            point3 = np.dot(rot_mat, np.array([(xmin + xmax) / 2, ymax, 1]))
            point4 = np.dot(rot_mat, np.array([xmin, (ymin + ymax) / 2, 1]))
            # 合并np.array
            concat = np.vstack((point1, point2, point3, point4))
            # 改变array类型
            concat = concat.astype(np.int32)
            # 得到旋转后的坐标
            rx, ry, rw, rh = cv2.boundingRect(concat)
            rx_min = rx
            ry_min = ry
            rx_max = rx + rw
            ry_max = ry + rh
            # 加入list中
            rot_bboxes.append([rx_min, ry_min, rx_max, ry_max])

        return rot_img, rot_bboxes

    # ---5.裁剪--- #
    def _crop_img_bboxes(self, img, bboxes):
        '''
        裁剪后的图片要包含所有的框
        输入:
            img:图像array
            bboxes:该图像包含的所有boundingboxs,一个list,每个元素为[x_min, y_min, x_max, y_max],要确保是数值
        输出:
            crop_img:裁剪后的图像array
            crop_bboxes:裁剪后的bounding box的坐标list
        '''
        # 裁剪图像
        w = img.shape[1]
        h = img.shape[0]
        x_min = w  # 裁剪后的包含所有目标框的最小的框
        x_max = 0
        y_min = h
        y_max = 0
        for bbox in bboxes:
            x_min = min(x_min, bbox[0])
            y_min = min(y_min, bbox[1])
            x_max = max(x_max, bbox[2])
            y_max = max(y_max, bbox[3])

        d_to_left = x_min  # 包含所有目标框的最小框到左边的距离
        d_to_right = w - x_max  # 包含所有目标框的最小框到右边的距离
        d_to_top = y_min  # 包含所有目标框的最小框到顶端的距离
        d_to_bottom = h - y_max  # 包含所有目标框的最小框到底部的距离

        # 随机扩展这个最小框
        crop_x_min = int(x_min - random.uniform(0, d_to_left))
        crop_y_min = int(y_min - random.uniform(0, d_to_top))
        crop_x_max = int(x_max + random.uniform(0, d_to_right))
        crop_y_max = int(y_max + random.uniform(0, d_to_bottom))

        # 随机扩展这个最小框 , 防止别裁的太小
        # crop_x_min = int(x_min - random.uniform(d_to_left//2, d_to_left))
        # crop_y_min = int(y_min - random.uniform(d_to_top//2, d_to_top))
        # crop_x_max = int(x_max + random.uniform(d_to_right//2, d_to_right))
        # crop_y_max = int(y_max + random.uniform(d_to_bottom//2, d_to_bottom))

        # 确保不要越界
        crop_x_min = max(0, crop_x_min)
        crop_y_min = max(0, crop_y_min)
        crop_x_max = min(w, crop_x_max)
        crop_y_max = min(h, crop_y_max)

        crop_img = img[crop_y_min:crop_y_max, crop_x_min:crop_x_max]

        # 裁剪boundingbox
        # 裁剪后的boundingbox坐标计算
        crop_bboxes = list()
        for bbox in bboxes:
            crop_bboxes.append([bbox[0] - crop_x_min, bbox[1] - crop_y_min, bbox[2] - crop_x_min, bbox[3] - crop_y_min])

        return crop_img, crop_bboxes

    # ---6.平移--- #
    def _shift_pic_bboxes(self, img, bboxes):
        '''
        平移后的图片要包含所有的框
        输入:
            img:图像array
            bboxes:该图像包含的所有boundingboxs,一个list,每个元素为[x_min, y_min, x_max, y_max],要确保是数值
        输出:
            shift_img:平移后的图像array
            shift_bboxes:平移后的bounding box的坐标list
        '''
        # 平移图像
        w = img.shape[1]
        h = img.shape[0]
        x_min = w  # 裁剪后的包含所有目标框的最小的框
        x_max = 0
        y_min = h
        y_max = 0
        for bbox in bboxes:
            x_min = min(x_min, bbox[0])
            y_min = min(y_min, bbox[1])
            x_max = max(x_max, bbox[2])
            y_max = max(y_max, bbox[3])

        d_to_left = x_min  # 包含所有目标框的最大左移动距离
        d_to_right = w - x_max  # 包含所有目标框的最大右移动距离
        d_to_top = y_min  # 包含所有目标框的最大上移动距离
        d_to_bottom = h - y_max  # 包含所有目标框的最大下移动距离

        x = random.uniform(-(d_to_left - 1) / 3, (d_to_right - 1) / 3)
        y = random.uniform(-(d_to_top - 1) / 3, (d_to_bottom - 1) / 3)

        M = np.float32([[1, 0, x], [0, 1, y]])  # x为向左或右移动的像素值,正为向右负为向左; y为向上或者向下移动的像素值,正为向下负为向上
        shift_img = cv2.warpAffine(img, M, (img.shape[1], img.shape[0]))

        #  平移boundingbox
        shift_bboxes = list()
        for bbox in bboxes:
            shift_bboxes.append([bbox[0] + x, bbox[1] + y, bbox[2] + x, bbox[3] + y])

        return shift_img, shift_bboxes

    # ---7.镜像--- #
    def _filp_pic_bboxes(self, img, bboxes):
        '''
            平移后的图片要包含所有的框
            输入:
                img:图像array
                bboxes:该图像包含的所有boundingboxs,一个list,每个元素为[x_min, y_min, x_max, y_max],要确保是数值
            输出:
                flip_img:平移后的图像array
                flip_bboxes:平移后的bounding box的坐标list
        '''
        # 翻转图像

        flip_img = copy.deepcopy(img)
        h, w, _ = img.shape

        sed = random.random()

        if 0 < sed < 0.33:  # 0.33的概率水平翻转，0.33的概率垂直翻转,0.33是对角反转
            flip_img = cv2.flip(flip_img, 0)  # _flip_x
            inver = 0
        elif 0.33 < sed < 0.66:
            flip_img = cv2.flip(flip_img, 1)  # _flip_y
            inver = 1
        else:
            flip_img = cv2.flip(flip_img, -1)  # flip_x_y
            inver = -1

        # 调整boundingbox
        flip_bboxes = list()
        for box in bboxes:
            x_min = box[0]
            y_min = box[1]
            x_max = box[2]
            y_max = box[3]

            if inver == 0:
                # 0：垂直翻转
                flip_bboxes.append([x_min, h - y_max, x_max, h - y_min])
            elif inver == 1:
                # 1：水平翻转
                flip_bboxes.append([w - x_max, y_min, w - x_min, y_max])
            elif inver == -1:
                # -1：水平垂直翻转
                flip_bboxes.append([w - x_max, h - y_max, w - x_min, h - y_min])
        return flip_img, flip_bboxes

    # 图像增强方法
    def dataAugment(self, img, bboxes):
        '''
        图像增强
        输入:
            img:图像array
            bboxes:该图像的所有框坐标
        输出:
            img:增强后的图像
            bboxes:增强后图片对应的box
        '''
        change_num = 0  # 改变的次数
        # print('------')
        while change_num < 1:  # 默认至少有一种数据增强生效

            if self.is_rotate_img_bbox:
                if random.random() > self.rotation_rate:  # 旋转
                    change_num += 1
                    angle = random.uniform(-self.max_rotation_angle, self.max_rotation_angle)
                    scale = random.uniform(0.7, 0.8)
                    img, bboxes = self._rotate_img_bbox(img, bboxes, angle, scale)

            if self.is_shift_pic_bboxes:
                if random.random() < self.shift_rate:  # 平移
                    change_num += 1
                    img, bboxes = self._shift_pic_bboxes(img, bboxes)

            if self.is_changeLight:
                if random.random() > self.change_light_rate:  # 改变亮度
                    change_num += 1
                    img = self._changeLight(img)

            if self.is_addNoise:
                if random.random() < self.add_noise_rate:  # 加噪声
                    change_num += 1
                    img = self._addNoise(img)
            if self.is_cutout:
                if random.random() < self.cutout_rate:  # cutout
                    change_num += 1
                    img = self._cutout(img, bboxes, length=self.cut_out_length, n_holes=self.cut_out_holes,
                                       threshold=self.cut_out_threshold)
            if self.is_filp_pic_bboxes:
                if random.random() < self.flip_rate:  # 翻转
                    change_num += 1
                    img, bboxes = self._filp_pic_bboxes(img, bboxes)

        return img, bboxes


# xml解析工具
class ToolHelper():
    # 从xml文件中提取bounding box信息, 格式为[[x_min, y_min, x_max, y_max, name]]
    def parse_xml(self, path):
        '''
        输入：
            xml_path: xml的文件路径
        输出：
            从xml文件中提取bounding box信息, 格式为[[x_min, y_min, x_max, y_max, name]]
        '''
        tree = ET.parse(path)
        root = tree.getroot()
        objs = root.findall('object')
        coords = list()
        for ix, obj in enumerate(objs):
            name = obj.find('name').text
            box = obj.find('bndbox')
            x_min = int(box[0].text)
            y_min = int(box[1].text)
            x_max = int(box[2].text)
            y_max = int(box[3].text)
            coords.append([x_min, y_min, x_max, y_max, name])
        return coords

    # 保存图片结果
    def save_img(self, file_name, save_folder, img):
        cv2.imwrite(os.path.join(save_folder, file_name), img)

    # 保持xml结果
    def save_xml(self, file_name, save_folder, img_info, height, width, channel, bboxs_info):
        '''
        :param file_name:文件名
        :param save_folder:#保存的xml文件的结果
        :param height:图片的信息
        :param width:图片的宽度
        :param channel:通道
        :return:
        '''
        folder_name, img_name = img_info  # 得到图片的信息

        E = objectify.ElementMaker(annotate=False)

        anno_tree = E.annotation(
            E.folder(folder_name),
            E.filename(img_name),
            E.path(os.path.join(folder_name, img_name)),
            E.source(
                E.database('Unknown'),
            ),
            E.size(
                E.width(width),
                E.height(height),
                E.depth(channel)
            ),
            E.segmented(0),
        )

        labels, bboxs = bboxs_info  # 得到边框和标签信息
        for label, box in zip(labels, bboxs):
            anno_tree.append(
                E.object(
                    E.name(label),
                    E.pose('Unspecified'),
                    E.truncated('0'),
                    E.difficult('0'),
                    E.bndbox(
                        E.xmin(box[0]),
                        E.ymin(box[1]),
                        E.xmax(box[2]),
                        E.ymax(box[3])
                    )
                ))

        etree.ElementTree(anno_tree).write(os.path.join(save_folder, file_name), pretty_print=True)


if __name__ == '__main__':

    need_aug_num = 5  # 每张图片需要增强的次数

    is_endwidth_dot = True  # 文件是否以.jpg或者png结尾

    dataAug = DataAugmentForObjectDetection()  # 数据增强工具类

    toolhelper = ToolHelper()  # 工具

    # 获取相关参数
    parser = argparse.ArgumentParser()
    parser.add_argument('--source_img_path', type=str, default='D:\@Graduation\enhance\images')
    parser.add_argument('--source_xml_path', type=str, default='D:\@Graduation\enhance\labels')
    parser.add_argument('--save_img_path', type=str, default='D:\@Graduation\enhance\images2')
    parser.add_argument('--save_xml_path', type=str, default='D:\@Graduation\enhance\Annotations2')
    args = parser.parse_args()
    source_img_path = args.source_img_path  # 图片原始位置
    source_xml_path = args.source_xml_path  # xml的原始位置

    save_img_path = args.save_img_path  # 图片增强结果保存文件
    save_xml_path = args.save_xml_path  # xml增强结果保存文件

    # 如果保存文件夹不存在就创建
    if not os.path.exists(save_img_path):
        os.mkdir(save_img_path)

    if not os.path.exists(save_xml_path):
        os.mkdir(save_xml_path)

    for parent, _, files in os.walk(source_img_path):
        files.sort()
        for file in files:
            cnt = 0
            pic_path = os.path.join(parent, file)
            xml_path = os.path.join(source_xml_path, file[:-4] + '.xml')
            values = toolhelper.parse_xml(xml_path)  # 解析得到box信息，格式为[[x_min,y_min,x_max,y_max,name]]
            coords = [v[:4] for v in values]  # 得到框
            labels = [v[-1] for v in values]  # 对象的标签

            # 如果图片是有后缀的
            if is_endwidth_dot:
                # 找到文件的最后名字
                dot_index = file.rfind('.')
                _file_prefix = file[:dot_index]  # 文件名的前缀
                _file_suffix = file[dot_index:]  # 文件名的后缀
            img = cv2.imread(pic_path)

            # show_pic(img, coords)  # 显示原图
            while cnt < need_aug_num:  # 继续增强
                auged_img, auged_bboxes = dataAug.dataAugment(img, coords)
                auged_bboxes_int = np.array(auged_bboxes).astype(np.int32)
                height, width, channel = auged_img.shape  # 得到图片的属性
                img_name = '{}_{}{}'.format(_file_prefix, cnt + 1, _file_suffix)  # 图片保存的信息
                toolhelper.save_img(img_name, save_img_path,
                                    auged_img)  # 保存增强图片

                toolhelper.save_xml('{}_{}.xml'.format(_file_prefix, cnt + 1),
                                    save_xml_path, (save_img_path, img_name), height, width, channel,
                                    (labels, auged_bboxes_int))  # 保存xml文件
                # show_pic(auged_img, auged_bboxes)  # 强化后的图
                print(img_name)
                cnt += 1  # 继续增强下一张
```

  </details>

今天不想写了，又遇到一件悲伤的事情，tmd 开启了流量限制，结果 scp 传文件传到 93%断掉了，我真的服了。（原谅我的坏心情，写不下去了，到凌晨了，累麻了）

## 后续多模态的融合

---

后续完成基础可见光条件的训练之后，还要尝试进行多光谱的融合，提高模型的精确度。

# 总结

---

这篇文章随进度更新，用于记录在毕设过程中遇到的心得和问题。
