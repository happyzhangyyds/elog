---
password: ""
icon: ""
date: "2026-04-07"
type: Post
category: Workflow
slug: "260407"
tags:
  - Obsidian
  - MinIO
summary: "This article explores practical ways to sync files between a VPS and local devices for note-taking with Obsidian. Starting from the limitations of Nextcloud WebDAV, it compares WebDAV, MinIO, rsync, and Syncthing to find a solution that best fits a personal knowledge workflow."
title: "Part I — WebDAV, MinIO, rsync, or Syncthing for VPS File Sync"
status: Published
urlname: 33b6ddcd-5429-8092-8458-c461bec517c5
updated: "2026-04-08 01:07:00"
---

# 1. Introduction

---

## 1.1 Why I needed sync between a VPS and my local device

---

I often find myself living in at least two different worlds. One is the place where I read, test, deploy, and solve problems on my VPS. The other is my local space, where I think more slowly, write notes, and try to turn scattered ideas into something meaningful. Knowledge usually appears in small sparks across these different scenes. If I do not catch them in time, they fade very quickly.

In the end, I chose Obsidian as a bridge between these fragments. It gives me one place to collect commands, mistakes, ideas, and small conclusions. But collecting is not enough. If I do not review what I wrote, I forget it surprisingly fast. That is why syncing matters to me. I want these notes to move with me, from server to laptop, from one device to another, so I can return to them whenever I need.

There is also a deeper reason. I have a simple dream: to spend more time linking my knowledge together. Not just storing it, but connecting it, refining it, and making it available anywhere and anytime. A good sync tool is not only about convenience. For me, it is part of building a personal knowledge system that I can truly rely on.

## 1.2 The real problem: not just “can it sync”, but “which tool fits my workflow”

---

At first, I used Nextcloud WebDAV to manage my files. For a while, it seemed good enough, especially because I relied on the Obsidian Remote Save plugin to keep my notes connected across devices. It looked like I had already found the bridge I wanted.

But after using it for some time, the real problems started to appear. When I needed to sync a large number of files between two devices, WebDAV often became slow and frustrating. Nextcloud itself also brought extra pressure: frequent updates, ongoing maintenance, and the feeling that I was spending too much time taking care of the tool instead of using it.

That was the moment when I realized the real question was not simply whether a tool could sync files. Many tools can do that. The more important question was whether a tool truly fit my workflow. I did not just want something that worked in theory. I wanted something light, stable, and easy to maintain over time.

So I asked AI for ideas. It suggested several other options, including S3-compatible storage and Google Drive. Those alternatives immediately caught my attention. They felt different from the traditional WebDAV path I had already known, and that curiosity pushed me to start exploring a wider range of solutions.

## 1.3 My two main directions:

---

```text
   - file-service style: WebDAV / SFTP
   - object-storage style: S3-compatible storage
```

After that, I found myself moving in two different directions.

The first direction was still centered on the file-service model I already knew. Instead of continuing with Nextcloud, I started looking for a lighter and more stable replacement for WebDAV. At the same time, I also began to consider whether I should step away from WebDAV itself and try more direct tools such as SFTP, rsync, or rclone.

The second direction was quite different. Rather than thinking in terms of folders, mounting, and file services, I began looking at object-storage-style solutions. This was a new path for me, and it felt more modern, especially because many sync tools seem to work better with S3-compatible storage.

Based on AI’s recommendations, MinIO quickly stood out. It looked like an interesting bridge between self-hosting and the S3 ecosystem, so I knew I would want to try it soon.

# 1.4 Temporary conclusion

---

At this stage, I have not reached a final answer yet, but the direction is becoming clearer. What began as a simple need for syncing notes between my VPS and local device gradually turned into a broader reflection on workflow, maintenance cost, and long-term reliability. I realized that the problem is not just about finding a tool that can move files, but about choosing one that fits the way I actually work.

For now, I have narrowed my exploration to two main paths: traditional file-based solutions such as WebDAV, SFTP, rsync, or rclone, and object-storage-based solutions such as S3-compatible services, especially MinIO. Each path seems to represent a different philosophy of managing data, and I want to understand not only how they work, but also how they feel in daily use.

I do not have the full conclusion yet, but at least the question is now more precise than before. That already feels like progress. Tomorrow, I will continue by testing these options more carefully and comparing which one is truly the best fit for my personal knowledge workflow.
