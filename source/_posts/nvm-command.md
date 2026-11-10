---
title: "nvm 常用命令"
date: 2026-11-10 21:06:00
categories:
  - 技术分享
  - 工具链
description: 收集日常使用过程中会使用到但频率不高的命令，以免需要时又查询文档
cover: https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=minimal%20pastel%20landscape%20sunrise%20meadow%20illustration%20fresh%20airy&image_size=landscape_16_9
---

1. 查看当前使用的node版本
```powershell
nvm current
```
2. 切换指定版本
```powershell
nvm use 22.20.0
or
nvm use 22
```
3. 删除指定版本
```powershell
nvm uninstall 22.20.0
```
4. 查看本地安装的node版本列表
```powershell
nvm list
or
nvm ls
```
5. 安装指定版本
```powershell
nvm install 22.20.0
```
6. 列出可安装的node版本列表
```powershell
nvm list-remote

#window使用这个
nvm list available
```
7. 查看当前nvm版本
```powershell
nvm -v
or
nvm --version
```