---
title: "一次接口性能优化实录"
date: 2026-09-27 10:00:00
categories:
  - 技术分享
  - 性能优化
description: 记录一次把列表接口从 2s 优化到 200ms 的过程与思路。
cover: https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=minimal%20pastel%20landscape%20river%20valley%20illustration%20fresh%20airy&image_size=landscape_16_9
---

列表接口响应慢，页面加载体验很差。本文记录排查与优化的过程。

## 定位问题

通过日志与耗时埋点，发现问题集中在数据库查询与循环内的重复请求。

## 优化手段

- 合并查询，消除循环中的 N+1 问题
- 为高频查询字段建立索引
- 对不常变的数据增加缓存

## 结果

接口耗时从约 2s 降到约 200ms，列表页首屏明显变快。
