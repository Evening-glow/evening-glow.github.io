---
title: "uniapp ios原生插件开发"
date: 2026-11-09 23:02:00
categories:
  - 技术分享
  - 前端
description: 原生插件开发基础教程
cover: https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=minimal%20pastel%20landscape%20sunrise%20meadow%20illustration%20fresh%20airy&image_size=landscape_16_9
---

1. 下载ios离线SDK原生工程
官方文档下载：[https://nativesupport.dcloud.net.cn/AppDocs/download/ios.html](https://nativesupport.dcloud.net.cn/AppDocs/download/ios.html)

是的，如果你有看过ios本地离线打包，对这个文档不会陌生，是一样的。同样，需要注意SDK版本号要跟HBuilder版本号一致。
2. xcode新建插件工程

官方文档有详细操作截图：[https://nativesupport.dcloud.net.cn/NativePlugin/course/ios.html#%E5%88%9B%E5%BB%BA%E6%8F%92%E4%BB%B6%E5%B7%A5%E7%A8%8B](https://nativesupport.dcloud.net.cn/NativePlugin/course/ios.html#%E5%88%9B%E5%BB%BA%E6%8F%92%E4%BB%B6%E5%B7%A5%E7%A8%8B)

+ 编写module参考离线SDK内提供的<font style="color:rgb(233, 105, 0);background-color:rgba(27, 31, 35, 0.05);">DCTestUniPlugin</font>

+ 如果有使用第三方SDK引入，按下图配置
![](https://cdn.nlark.com/yuque/0/2026/png/33568724/1772274014745-5329f77a-87ff-4769-8c7d-6dd589321cc1.png)

+ 配置Valid Architectures，新版xcode没有，可以不用配置
![](https://cdn.nlark.com/yuque/0/2026/png/33568724/1772274464545-7ecd621e-400c-494e-b981-f043d3cb77d7.png)

3. 生成插件包
先查看[官方文档](https://nativesupport.dcloud.net.cn/NativePlugin/course/ios.html#%E7%94%9F%E6%88%90%E6%8F%92%E4%BB%B6%E5%8C%85)

补充信息：
+ 配置插件信息，其中hooksClass没有可以为空
![](https://cdn.nlark.com/yuque/0/2026/png/33568724/1772273611417-7018a194-e450-4636-a73d-16f683c1f7dd.png)

+ 运行适配选择，正式打包需要选择真机运行或Any iOS device(arm64)；运行编译后生成的文件名叫<font style="color:rgb(44, 62, 80);">Release-iphoneos才是正确的</font>

+ 编辑构建配置，product->Scheme->edit scheme->run->info->Build configuration切换到Release

4. 新建uni原生插件包
先查看[官方文档](https://nativesupport.dcloud.net.cn/NativePlugin/course/package.html)

+ hooksClass对应插件内编写的Hook系统事件，没有可以填空

5. 在uniapp如何使用原生插件
先查看[官方文档](https://nativesupport.dcloud.net.cn/NativePlugin/use/use_local_plugin.html)

+ 插件内异步方法调用
```javascript
const TestPlugin = uni.requireNativePlugin('TestPlugin');

TestPlugin.getInfoAsync((result)=>{
  //result.info
})
```
