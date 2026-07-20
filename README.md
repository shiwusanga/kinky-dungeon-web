# Kinky Dungeon — 网页版

> 浏览器直接玩的 Roguelike 地牢游戏，**无需下载安装**。

[▶ 立即游玩（GitHub Pages）](https://shiwusanga.github.io/kinky-dungeon-web/)

## 在线试玩
打开上面的链接即可在浏览器中直接游玩。游戏主脚本约 11 MB，首次加载需要十几秒，请等待加载界面结束。

## 本地运行
如果不想依赖 GitHub Pages，也可以在本机运行：

1. 克隆仓库
   ```bash
   git clone https://github.com/shiwusanga/kinky-dungeon-web.git
   cd kinky-dungeon-web
   ```
2. 启动本地服务器
   - Windows：双击 `start.bat`
   - 其他：运行 `python serve.py`
3. 浏览器访问 `http://127.0.0.1:8080/`

> 注意：不能直接双击 `index.html`（`file://` 协议会被浏览器拦截，导致贴图全部丢失），必须通过本地服务器打开——这也是 GitHub Pages 在线版的优势：它天然就是 http 服务。

## 说明
- 纯网页构建，不含桌面端 mod 系统（已用 `web-shim.js` 桥接窗口 / 全屏 / Mod 接口）。
- 已启用 viewport 自适应，桌面与移动端浏览器均可游玩。

## 技术栈
PixiJS · HTML5 Canvas · 纯静态 GitHub Pages 部署
