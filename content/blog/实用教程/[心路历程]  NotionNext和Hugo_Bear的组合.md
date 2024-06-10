---
password: ""
icon: ""
date: "2024-05-18"
type: Post
category: 动手实践
slug: NotionNext_Hugo
tags:
  - 实用教程
summary: 已经很晚了，最后还有一点是关于如何兼容Hugo和NotionNext，我觉得markdown语法还是要学的，因为有些block使用elog转换为md之后还是不完美，不如就在一开始写的时候就用md省心。
title: "[心路历程]  NotionNext和Hugo_Bear的组合"
status: Published
urlname: 3fce4caa-8ffb-4d18-96c9-3dba29188ea2
updated: "2024-06-10 13:40:00"
---

# 前言

---

Hugo 的主题从 meme，到 virgo，最后到 hugo-bear，一步步走向极简。我使用 Hugo 的目的是为了弥补 NotionNext 在 block 上的短板，但是今天的部署却没有那么顺利，甚至还有点坎坷，因为之前没做好功课。

# 正文

---

这部分记录我踩坑的经历。

## vscode 的玩笑

---

不知道为啥，win 上的 vscode 在用 git 的时候各种不顺，各种 ssl 失败无法提交的问题，还是偶发性的发生。遂换到了 mac 系统，但不曾想，代码改着改着，黑屏了，这可给我吓了一条，我想我毕设还没演示呢，这电脑可别出点啥问题啊。不过好在 Mac 还是顺利重启了，查看了日志才知道问题如下：

```shell
(cpu 0 caller 0xffffff7fa7ae7704): "[IGPU] ERROR: SafeForceWake acknowledgement never received on MEDIA domain, fFlags.systemInSleep: 0, fFlags.enabled: 1\\n" @IntelAccelerator.cpp:7913
Panicked task 0xffffff869df82670: 175 threads: pid 0: kernel_task
Backtrace (CPU 0), panicked thread: 0xffffff95037e8540, Frame : Return Address
0xffffffb0c23b38c0 : 0xffffff800f47befd mach_kernel : _handle_debugger_trap + 0x41d
0xffffffb0c23b3910 : 0xffffff800f5de636 mach_kernel : _kdp_i386_trap + 0x116
0xffffffb0c23b3950 : 0xffffff800f5cd9a3 mach_kernel : _kernel_trap + 0x4d3
0xffffffb0c23b39a0 : 0xffffff800f41ba70 mach_kernel : _return_from_trap + 0xe0
0xffffffb0c23b39c0 : 0xffffff800f47c2cd mach_kernel : _DebuggerTrapWithState + 0xad
0xffffffb0c23b3ae0 : 0xffffff800f47ba86 mach_kernel : _panic_trap_to_debugger + 0x2b6
0xffffffb0c23b3b40 : 0xffffff800fd14aa3 mach_kernel : _panic + 0x84
0xffffffb0c23b3c30 : 0xffffff7fa7ae7704 com.apple.driver.AppleIntelKBLGraphics : __ZN16IntelAccelerator26SafeForceWakeMultithreadedEbjj.cold.3
0xffffffb0c23b3c60 : 0xffffff7fa7a6ea47 com.apple.driver.AppleIntelKBLGraphics : __ZN16IntelAccelerator26SafeForceWakeMultithreadedEbjj + 0x31f
0xffffffb0c23b3cb0 : 0xffffff7fa7a6eb04 com.apple.driver.AppleIntelKBLGraphics : __ZN16IntelAccelerator19SafeForceWakeSecureEbj10IGHwCsType + 0x68
0xffffffb0c23b3cd0 : 0xffffff7fa7a7bde6 com.apple.driver.AppleIntelKBLGraphics : __ZN26IGHardwareCommandStreamer514submitExecListEj + 0x234
0xffffffb0c23b3d40 : 0xffffff7fa7a7d097 com.apple.driver.AppleIntelKBLGraphics : __ZN26IGHardwareCommandStreamer524prepareExecListAndSubmitEjjPKj + 0xa9
0xffffffb0c23b3d90 : 0xffffff7fa7a7ca06 com.apple.driver.AppleIntelKBLGraphics : __ZN26IGHardwareCommandStreamer515dequeueExecListEj + 0xc6
0xffffffb0c23b3dd0 : 0xffffff7fa7a7c70c com.apple.driver.AppleIntelKBLGraphics : __ZN26IGHardwareCommandStreamer513schedDispatchEj + 0x124
0xffffffb0c23b3df0 : 0xffffff7fa7a7b2c2 com.apple.driver.AppleIntelKBLGraphics : __ZN26IGHardwareCommandStreamer536handleSoftwareContextSwitchInterruptEP22IOInterruptEventSourcei + 0xc8
0xffffffb0c23b3e30 : 0xffffff7fa7250903 com.apple.driver.AppleIntelCFLGraphicsFramebuffer : __ZN31AppleIntelFramebufferController22invokeInterruptHandlerEPNS_16InterruptServiceE + 0x53
0xffffffb0c23b3e50 : 0xffffff7fa7264474 com.apple.driver.AppleIntelCFLGraphicsFramebuffer : __ZN31AppleIntelFramebufferController16ProcessInterruptEv + 0xa56
0xffffffb0c23b3ea0 : 0xffffff7fa7243a6d com.apple.driver.AppleIntelCFLGraphicsFramebuffer : __ZN31AppleIntelFramebufferController18HWInterruptHandlerEP28IOFilterInterruptEventSource + 0x25
0xffffffb0c23b3ec0 : 0xffffff800fc48811 mach_kernel : __ZN28IOFilterInterruptEventSource23normalInterruptOccurredEPvP9IOServicei + 0x81
0xffffffb0c23b3ef0 : 0xffffff801205cf13 com.apple.iokit.IOPCIFamily : __ZN32IOPCIMessagedInterruptController15handleInterruptEPvP9IOServicei + 0x12d
0xffffffb0c23b3f40 : 0xffffff8010570b8e com.apple.driver.AppleACPIPlatform : __ZN23AppleACPIPlatformExpert23dispatchGlobalInterruptEi + 0x2e
0xffffffb0c23b3f50 : 0xffffff8010579c15 com.apple.driver.AppleACPIPlatform : __ZN31AppleACPICPUInterruptController15handleInterruptEPvP9IOServicei + 0x6b
0xffffffb0c23b3f70 : 0xffffff800f5cd217 mach_kernel : _interrupt + 0x117
0xffffffb0c23b3fd0 : 0xffffff800f41bc1d mach_kernel : _hndl_allintrs + 0x11d
0xffffffbe2723bf40 : 0xffffff800f4aba7a mach_kernel : _processor_idle + 0x10a
0xffffffbe2723bf80 : 0xffffff800f4abc79 mach_kernel : _idle_thread + 0x49
0xffffffbe2723bfa0 : 0xffffff800f41b19e mach_kernel : _call_continuation + 0x2e
      Kernel Extensions in backtrace:
         com.apple.iokit.IOPCIFamily(2.9)[6C3EA624-55E3-34FB-B457-D28680D6CFD8]@0xffffff8012037000->0xffffff8012063fff
         com.apple.driver.AppleACPIPlatform(6.1)[94D32D9B-CD53-3125-97FF-BD0FDA4901D9]@0xffffff8010569000->0xffffff80105e0fff
            dependency: com.apple.driver.AppleSMC(3.1.9)[ACDA3C2C-D1A2-373C-82DE-E4F207590D6C]@0xffffff8010c70000->0xffffff8010c88fff
            dependency: com.apple.iokit.IOACPIFamily(1.4)[43F1DE5C-F8A5-3288-A80D-5675094AD4AB]@0xffffff8011b8e000->0xffffff8011b8ffff
            dependency: com.apple.iokit.IOPCIFamily(2.9)[6C3EA624-55E3-34FB-B457-D28680D6CFD8]@0xffffff8012037000->0xffffff8012063fff
         com.apple.driver.AppleIntelCFLGraphicsFramebuffer(18.0.8)[B825FE8A-363B-35C3-9EB1-D87185C118F6]@0xffffff7fa720b000->0xffffff7fa72d0fff
            dependency: com.apple.AppleGraphicsDeviceControl(6.5.7)[095F902D-421B-3DA3-892A-06852348574C]@0xffffff7fa6d28000->0xffffff7fa6d2bfff
            dependency: com.apple.iokit.IOACPIFamily(1.4)[43F1DE5C-F8A5-3288-A80D-5675094AD4AB]@0xffffff8011b8e000->0xffffff8011b8ffff
            dependency: com.apple.iokit.IOAcceleratorFamily2(462.9)[77E89C6E-6FA7-32CC-9CEB-A19DBC916870]@0xffffff7fa83a5000->0xffffff7fa840ffff
            dependency: com.apple.iokit.IOGraphicsFamily(597)[29A6CCA1-B3F6-388E-AFED-BFF0E7ECBAD9]@0xffffff7fa853e000->0xffffff7fa856cfff
            dependency: com.apple.iokit.IOPCIFamily(2.9)[6C3EA624-55E3-34FB-B457-D28680D6CFD8]@0xffffff8012037000->0xffffff8012063fff
            dependency: com.apple.iokit.IOReportFamily(47)[9F30E052-5AA7-34F4-89B0-79719BA819E2]@0xffffff8012075000->0xffffff8012077fff
         com.apple.driver.AppleIntelKBLGraphics(18.0.8)[3A39054F-6C1B-3B4F-BCAF-1F5E5E903404]@0xffffff7fa7a59000->0xffffff7fa7b17fff
            dependency: com.apple.iokit.IOAcceleratorFamily2(462.9)[77E89C6E-6FA7-32CC-9CEB-A19DBC916870]@0xffffff7fa83a5000->0xffffff7fa840ffff
            dependency: com.apple.iokit.IOGraphicsFamily(597)[29A6CCA1-B3F6-388E-AFED-BFF0E7ECBAD9]@0xffffff7fa853e000->0xffffff7fa856cfff
            dependency: com.apple.iokit.IOPCIFamily(2.9)[6C3EA624-55E3-34FB-B457-D28680D6CFD8]@0xffffff8012037000->0xffffff8012063fff
            dependency: com.apple.iokit.IOSurface(302.15)[BBAB88C2-66B2-3E5A-B710-D2E97CA33485]@0xffffff80121aa000->0xffffff80121c6fff

Process name corresponding to current thread (0xffffff95037e8540): kernel_task
Boot args: -lilubetaall -alcbeta -wegbeta keepsyms=1 -wegnoegpu

Mac OS version:
21G646

Kernel version:
Darwin Kernel Version 21.6.0: Mon Apr 24 21:10:53 PDT 2023; root:xnu-8020.240.18.701.5~1/RELEASE_X86_64
Kernel UUID: B91C3306-5CF4-3F44-A94E-F4F006FE99E2
KernelCache slide: 0x000000000f200000
KernelCache base:  0xffffff800f400000
Kernel slide:      0x000000000f210000
Kernel text base:  0xffffff800f410000
__HIB  text base: 0xffffff800f300000
System model name: MacBookPro15,1 (Mac-937A206F2EE63C01)
System shutdown begun: NO
Panic diags file available: YES (0x0)
Hibernation exit count: 0

System uptime in nanoseconds: 7497410225056
Last Sleep:           absolute           base_tsc          base_nano
  Uptime  : 0x000006d1a07925dd
  Sleep   : 0x0000000000000000 0x0000000000000000 0x0000000000000000
  Wake    : 0x0000000000000000 0x00000005b418f738 0x0000000000000000
Compressor Info: 0% of compressed pages limit (OK) and 0% of segments limit (OK) with 0 swapfiles and OK swap space
Zone info:
  Zone map: 0xffffff8035f1b000 - 0xffffffa035f1b000
  . PGZ   : 0xffffff8035f1b000 - 0xffffff8037f1c000
  . VM    : 0xffffff8037f1c000 - 0xffffff850471b000
  . RO    : 0xffffff850471b000 - 0xffffff869df1b000
  . GEN0  : 0xffffff869df1b000 - 0xffffff8b6a71b000
  . GEN1  : 0xffffff8b6a71b000 - 0xffffff9036f1b000
  . GEN2  : 0xffffff9036f1b000 - 0xffffff950371b000
  . GEN3  : 0xffffff950371b000 - 0xffffff99cff1b000
  . DATA  : 0xffffff99cff1b000 - 0xffffffa035f1b000
  Metadata: 0xffffffbdfef9b000 - 0xffffffbe1ef9b000
  Bitmaps : 0xffffffbe1ef9b000 - 0xffffffbe24f9b000

last started kext at 7991915086: >AudioAUUC	1.70 (addr 0xffffff7fa82ac000, size 12288)
last stopped kext at 191893494544: >IOPlatformPluginLegacy	1.0.0 (addr 0xffffff7fa85b0000, size 36864)
loaded kexts:
me.kishorprins.VoodooInput	1.1.3
com.alexandred.VoodooI2CHID	1
com.zxystd.!I!BFirmware	2.1.0
com.insanelymac.RealtekRTL8111	2.4.2
com.zxystd.AirportItlwm	2.2.0
com.alexandred.VoodooI2C	2.7
org.coolstar.VoodooGPIO	1.1
as.acidanthera.BlueToolFixup	2.6.2
as.vit9696.WhateverGreen	1.6.0
com.alexandred.VoodooI2CServices	1
ru.usrsse2.SMCBatteryManager	1.3.0
as.vit9696.VirtualSMC	1.3.0
org.lvs1974.driver.CpuTscSync	1.0.8
as.acidanthera.BrightnessKeys	1.0.2
as.vit9696.!AALC	1.7.2
as.vit9696.Lilu	1.6.1
>AudioAUUC	1.70
>!AHDA	340.2
@filesystems.autofs	3.0
>!APlatformEnabler	2.7.0d0
>AGPM	129
>X86PlatformShim	1.0.0
>!AUpstreamUserClient	3.6.9
>!AGraphicsDevicePolicy	6.5.7
>!A!IKBLGraphics	18.0.8
@AGDCPluginDisplayMetrics	6.5.7
>pmtelemetry	1
|IOUserEthernet	1.0.1
>usb.!UUserHCI	1
>!AHV	1
>!ADiskImages2	126.141.2
>!A!IPCHPMC	2.0.1
>!A!ICFLGraphicsFramebuffer	18.0.8
>!ABacklight	180.8
>!AMCCSControl	1.16
>!A!ISlowAdaptiveClocking	4.0.0
>!ATopCaseHIDEventDriver	5450.8
>!AFileSystemDriver	3.0

```

从您提供的内核恐慌报告来看，问题似乎与您的 Mac 的 Intel 图形处理单元（GPU）驱动有关。错误信息 `[IGPU] ERROR: SafeForceWake acknowledgement never received on MEDIA domain` 指出在尝试唤醒 GPU 的媒体域时，系统没有收到预期的响应。
以下是一些可能的解决步骤：

1. **安全模式启动**：
   重启您的 Mac，并在启动时按住`Shift`键以进入安全模式。这会加载最少的必需内核扩展和登录项，如果问题不再出现，那可能是某个第三方软件或驱动引起的。
2. **更新或重新安装显卡驱动**：
   确保您的系统和所有驱动程序都是最新的。访问苹果的官方网站或使用系统偏好设置中的软件更新功能来检查更新。
3. **检查第三方内核扩展**：
   从报告中可以看到，有一些第三方内核扩展被加载了（如`VoodooI2C`、`AirportItlwm`等）。这些可能与问题有关。您可以尝试卸载这些扩展来看是否解决问题。
4. **重置 NVRAM 和 SMC**：
   重置 NVRAM（非易失性随机存取内存）和 SMC（系统管理控制器）可能有助于解决与硬件相关的问题。苹果官方支持网站提供了如何进行这些操作的指南。
5. **检查硬件问题**：
   如果上述软件方法都不能解决问题，可能是您的 Mac 存在硬件问题。您可以尝试联系苹果的客户服务或预约到最近的苹果零售店或授权服务提供商进行检查。
6. **备份和重新安装 macOS**：
   如果问题依旧存在，您可以考虑备份您的数据，然后重新安装 macOS。
   在进行任何操作之前，请确保您的重要数据已经备份，以避免数据丢失。
   这个问题应该是英伟达的显卡没办法被 mac 驱动，而 vscode 有可能调用了 GPU 加速处理，才导致了这个吓人的问题。解决方法如下：
   编辑 VSCode 配置文件，在某些情况下，您可能希望 VSCode 永久禁用 GPU。这可以通过编辑 VSCode 的配置文件来实现，但需要注意，这种方法并不总是官方支持的，可能会在未来的更新中改变。

- 在 VSCode 中，打开命令面板（`Cmd + Shift + P`  在 macOS 上，`Ctrl + Shift + P`  在 Windows 上）。
- 输入  `Open Settings (JSON)`  并选择它来编辑  `settings.json`  文件。
- 添加或修改以下设置：
  `"disable-hardware-acceleration": true`
- 保存文件并重启 VSCode。
  虽然禁用 GPU 可能会导致性能下降，但是 mac 是真用不了。

## Hugo 的部署

---

之前 Hugo 一直用的 virgo 主题，后来把 hugo 迁移到软云上，但是软云小主机还在维护中，又迁回了 vercel，部署在独立服务器上，有如下问题，如何结合 github 自动脚本进行重新编译上线，第二点，速度和性能如何，这些问题都需要思考，后来还是觉得 vercel 真的很棒。

然后开始了今晚的折腾之旅，因为目前 hugo 是采用目标文件托管的方式，这就导致 github 触发更新后，hugo 不会自动更新，还需要手动编译，为此，肯定最好是采用源码托管的方式。

这里有几个坑很深。感谢[科技小飞哥](https://www.techxiaofei.com/post/hugo/hugo_vercel/)的提示，源码托管主要有三个主意的点，第一个是要在环境变量中指定 hugo 的版本，因为自带的版本很老会报错。第二点，是要检查`theme`是不是软链接，这也会导致报错。然后需要指定编译命令和输出文件，最后将 public 添加到`gitignore`里去。

我踩中的软链接和环境变量的坑，导致我花了很多的时间。小飞哥还出了视频，非常棒了。另外，还遇到了`WARN 2021/11/29 14:03:51 found no layout file for "HTML" for kind "page": You should create a template file which matches Hugo Layouts Lookup Rules for this combination.`的问题，这就是软链接的提示信息。然后需要设置 Hugo 版本，当时我把项目删了重新部署，我记得虽然一开始制定了环境变量，但是结果网页变成了 xml，后来去环境变量里一看，版本还是没指定，指定完重新编译就正常了。

## 使用 Vercel 进行 301 重定向

---

要在 Vercel 上设置 301 重定向，您可以通过 Vercel 的配置文件  `vercel.json`  来实现。

1. **在您的项目根目录下创建** **`vercel.json`** **文件**，如果已经存在，请跳过这一步。
2. **在** **`vercel.json`** **文件中添加重定向规则**，例如：

   ```json
   {
     "cleanUrls": true,
     "trailingSlash": false,
     "headers": [],
     "redirects": [
       {
         "source": "/article/wdf-1",
         "destination": "https://hugo.matrixcore.top/wdf-1/",
         "permanent": true
       },
       {
         "source": "/article/beauty03",
         "destination": "https://hugo.matrixcore.to p/beauty03/",
         "permanent": true
       },
       {
         "source": "/article/beauty07",
         "destination": "https://hugo.matrixcore.top/beauty07/",
         "permanent": true
       }
     ]
   }
   ```

   这个配置将把  `/old-url`  重定向到  `/new-url`，并返回 301 状态码。注意前面的 oldurl 输入路径即可。

3. **将** **`vercel.json`** **文件部署到 Vercel**。

# 总结

---

已经很晚了，最后还有一点是关于如何兼容 Hugo 和 NotionNext，我觉得 markdown 语法还是要学的，因为有些 block 使用 elog 转换为 md 之后还是不完美，不如就在一开始写的时候就用 md 省心。
