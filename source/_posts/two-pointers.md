---
title: "算法刷题：双指针专题"
date: 2026-10-08 10:00:00
categories:
  - 学习记录
  - 算法 / 刷题
description: 整理双指针常见题型与解题模板。
cover: https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=minimal%20pastel%20landscape%20sunset%20field%20illustration%20fresh%20airy&image_size=landscape_16_9
---

双指针适合处理数组与字符串中的区间、去重、求和类问题。

## 常见类型

- 左右对撞：有序数组两数之和
- 快慢指针：去重、判断环
- 滑动窗口：最长子串类问题

## 模板（左右对撞）

```js
let left = 0, right = arr.length - 1;
while (left < right) {
  const sum = arr[left] + arr[right];
  if (sum === target) break;
  sum < target ? left++ : right--;
}
```
