---
title: "响应式原理浅析：数据是如何驱动视图的"
date: 2026-10-12 10:00:00
categories:
  - 技术分享
  - 前端
description: 从依赖收集到触发更新的角度，梳理响应式系统的核心思路。
cover: https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=minimal%20pastel%20landscape%20sunrise%20meadow%20illustration%20fresh%20airy&image_size=landscape_16_9
---

现代前端框架的核心之一，是「数据变化自动更新视图」。本文从最朴素的思路出发，梳理它的实现脉络。

## 核心三步

- 把数据变成可观测的（劫持读写）
- 渲染时记录用到了哪些数据（依赖收集）
- 数据变化时通知用到它的地方重新执行（派发更新）

## 一个极简示意

```js
function reactive(obj) {
  return new Proxy(obj, {
    get(target, key) {
      track(target, key);        // 依赖收集
      return target[key];
    },
    set(target, key, value) {
      target[key] = value;
      trigger(target, key);      // 派发更新
      return true;
    }
  });
}
```

## 小结

理解了「依赖收集 + 派发更新」，再看具体框架的实现就清晰很多。
