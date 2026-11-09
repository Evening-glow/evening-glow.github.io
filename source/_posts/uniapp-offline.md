---
title: "uniapp ios离线打包"
date: 2026-11-09 21:54:00
categories:
  - 技术分享
  - 前端
description: 离线打包基础教程
cover: https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=minimal%20pastel%20landscape%20sunrise%20meadow%20illustration%20fresh%20airy&image_size=landscape_16_9
---

## 下载离线SDK
通过官方文档下载离线SDK来配置，需要注意HBuilder和SDK版本号要一样

[原生工程SDK下载](https://nativesupport.dcloud.net.cn/AppDocs/usesdk/ios.html)

## 工程配置
在上面这个文档中也包含了一些项目本地基础配置，配置好应用名称、版本号、图标信息。其他配置可以根据需求修改。
### 图标
在官方文档中给出的应用图标配置截图已经是旧版xcode界面了，当配置app icons and launch screen无方向键添加时，打开image.xcassets或者Assets.xcassets，在空白处右键选择add icon
### SDK依赖库配置
ios对于权限控制要求是很高的，声明了依赖库就要写上权限描述
详细依赖库查询[官方文档](https://nativesupport.dcloud.net.cn/AppDocs/usemodule/iOSModuleConfig/common.html#%E5%9F%BA%E7%A1%80%E6%A8%A1%E5%9D%97)
1、删除不必要的默认依赖库：标有权限描述的依赖库要考虑留不留；

2、添加需要的依赖库：用到的功能就要加上依赖库，并且写上权限描述；

#### 支付宝
[支付宝模块配置文档](https://nativesupport.dcloud.net.cn/AppDocs/usemodule/iOSModuleConfig/pay.html#%E6%94%AF%E4%BB%98%E5%AE%9D)

+ <font style="color:rgb(44, 62, 80);">URL Schemes 填写支付宝appid问题：对于动态appid需求，可省略不填写后面appid；或者使用的是配置scheme</font>

![](https://cdn.nlark.com/yuque/0/2026/jpeg/33568724/1768635072550-12eff1ae-572f-4420-bb09-1b60472b3481.jpeg)

#### 一键登录
[官方配置文档](https://nativesupport.dcloud.net.cn/AppDocs/usemodule/iOSModuleConfig/oauth.html#%E4%B8%80%E9%94%AE%E7%99%BB%E5%BD%95-univerify)

我在配置这项模块时遇到了以下问题：
1、feature.plist 文件在哪

在supporting files -> PandoraApi下
![](https://cdn.nlark.com/yuque/0/2026/png/33568724/1769053023768-a8827015-122c-45a3-b75b-c8dd83196d98.png)

2、UniVerify.framework依赖库 去哪了

在SDK->Libs下，需要手动查找添加，mac系统文件查询不出来。这个文件我也是找了好久，最后在[提问评论区](https://ask.dcloud.net.cn/question/213476)找到了

## 插件
使用本地或云插件，如何配置到xcode项目
先查询[官方文档](https://nativesupport.dcloud.net.cn/NativePlugin/offline_package/ios.html)了解

在细节上一些补充：
1、插件拷贝到离线工程根目录，与.xcodeproj同级目录下
2、.farmework文件添加到依赖库中
3、多个plugins就配置多个dict对应
![](https://cdn.nlark.com/yuque/0/2026/png/33568724/1769501893029-9af18e4a-609c-47df-9cd9-873e07d6cae3.png)

4、使用uni原生插件在[官方文档](https://nativesupport.dcloud.net.cn/NativePlugin/offline_package/ios.html)上也有使用教程

## 其他常用工程配置

1. 禁用横屏配置
配置info.plist文件
```xml
<key>UISupportedInterfaceOrientations</key>
<array>
  <string>UIInterfaceOrientationPortrait</string>
</array>
<key>UISupportedInterfaceOrientations~ipad</key>
<array>
  <string>UIInterfaceOrientationPortrait</string>
</array>
<key>UISupportedInterfaceOrientations~iphone</key>
<array>
  <string>UIInterfaceOrientationPortrait</string>
</array>
```

2. 禁用夜间模式配置
配置info.plist文件
```xml
<key>UIUserInterfaceStyle</key>
<string>Light</string>
```
3. xcode应用名称配置

配置info.plist内的display name

## 扩展链接
+ [MUI、HBuilderX、H5+开发APP本地打包(iOS)](https://www.jianshu.com/p/b21b6f0d2cb4)
+ [离线打包-IOS | 盘古低代码](https://pangea.hisense.com/front-end/mobile-app/app-build-ios.html)
+ [使用HBuilder离线本地打包ipa教程-腾讯云开发者社区-腾讯云](https://cloud.tencent.com/developer/article/1946727)