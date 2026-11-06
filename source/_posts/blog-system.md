---
title: "个人博客系统"
date: 2026-09-18 10:00:00
updated: 2026-10-01 09:30:00
categories:
  - 作品集
  - Web 应用
description: 一个自用的静态博客系统，支持三大内容模块与分类管理。
cover: https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=minimal%20pastel%20landscape%20mountains%20lake%20illustration%20fresh%20airy&image_size=landscape_16_9
stack:
  - Hexo
  - JavaScript
  - HTML
  - CSS
role: 独立完成需求梳理、信息架构设计与前端实现。
status: 进行中
links:
  - label: 在线预览
    url: "#"
  - label: 代码仓库
    url: "#"
screenshots:
  - https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=minimal%20web%20page%20wireframe%20soft%20mint%20pastel%20clean&image_size=landscape_4_3
---

这是一个自用的静态博客系统，用来集中存放作品、技术文章与学习笔记三类内容。

## 项目背景

原先内容散落在各个笔记软件与代码仓库里，查找和展示都不方便，因此决定做一个统一的出口。

## 核心功能

- 三大内容模块：作品集 / 技术分享 / 学习记录
- 两级分类：一级为模块，二级为具体分类
- 作品集支持技术栈、截图、外链等专属信息

## 技术方案

采用静态生成 + 分类驱动路由，内容与模板分离，部署在 GitHub Pages。
