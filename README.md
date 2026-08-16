# 翠拍 App 官方下载页

这是一个可直接部署到阿里云服务器、OSS 静态网站托管或 Nginx 的单页静态站点。

## 文件说明

- `index.html`：页面内容、下载链接、联系方式。
- `styles.css`：页面样式。
- `assets/`：App 截图占位图，后续可替换为真实截图。
- `downloads/`：安装包目录，默认 Android 链接指向 `downloads/cuipai.apk`。

## 上线前需要替换

1. 将 Android 安装包放到 `downloads/cuipai.apk`，或修改 `index.html` 中 Android 下载地址。
2. 将 iOS 链接从 `https://apps.apple.com/` 替换为真实 App Store 地址。
3. 替换客服电话、邮箱、公司名称和备案号。
4. 将 `assets/` 中的占位 SVG 替换为真实 App 截图，或修改 `index.html` 中的图片路径。

## 阿里云 Nginx 部署示例

把本目录上传到服务器，例如 `/www/wwwroot/cuipai-web`，Nginx 可配置：

```nginx
server {
    listen 80;
    server_name example.com;

    root /www/wwwroot/cuipai-web;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```
