---
title: "《JavaScript 高级程序设计》读书笔记"
date: 2026-10-20 10:00:00
categories:
  - 学习记录
  - 读书笔记
description: 关于作用域、闭包与原型链的整理与理解。
cover: https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=minimal%20pastel%20landscape%20hills%20clouds%20illustration%20fresh%20airy&image_size=landscape_16_9
---

这本书把语言基础讲得很系统，这里记录几个印象最深的点。

## 作用域与闭包

闭包让函数可以访问定义时的词法作用域，常用于封装私有变量。

```js
function counter() {
  let count = 0;
  return function () {
    return ++count;
  };
}
```

## 原型链

对象通过原型链查找属性，理解它是理解继承与 this 指向的前提。

## 待续

后续继续补充异步与模块化部分。
