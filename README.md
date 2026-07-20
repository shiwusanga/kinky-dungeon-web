# Kinky Dungeon — 网页版 / Web Edition

> 浏览器直接玩的 Roguelike 地牢游戏，**无需下载安装**。
> A browser-playable Roguelike dungeon crawler — **no download or install required**.

[▶ 立即游玩 / Play now (GitHub Pages)](https://shiwusanga.github.io/kinky-dungeon-web/)

---

## 在线试玩 / Play Online

打开上面的链接即可在浏览器中直接游玩。游戏主脚本约 11 MB，首次加载需要十几秒，请等待加载界面结束。
Open the link above to play directly in your browser. The main game script is ~11 MB, so the first load takes ~10–20 seconds — please wait for the loading screen to finish.

## 本地运行 / Run Locally

如果不想依赖 GitHub Pages，也可以在本机运行：
If you prefer not to rely on GitHub Pages, you can also run it on your own machine:

1. **克隆仓库 / Clone the repo**
   ```bash
   git clone https://github.com/shiwusanga/kinky-dungeon-web.git
   cd kinky-dungeon-web
   ```
2. **启动本地服务器 / Start a local server**
   - Windows：双击 `start.bat`
   - 其他 / Other：运行 `python serve.py`
3. **浏览器访问 / Open in browser** — `http://127.0.0.1:8080/`

> ⚠️ 注意：不能直接双击 `index.html`（`file://` 协议会被浏览器拦截，导致贴图全部丢失），必须通过本地服务器打开——这也是 GitHub Pages 在线版的优势：它天然就是 http 服务。
> ⚠️ Note: do not double-click `index.html` — the `file://` protocol is blocked by browsers and will cause all textures to disappear. You must open it through a local server. This is also why the GitHub Pages online version is convenient: it is served over HTTP by nature.

## 说明 / Notes

- 纯网页构建，不含桌面端 mod 系统（已用 `web-shim.js` 桥接窗口 / 全屏 / Mod 接口）。
  Pure web build, without the desktop mod system (window / fullscreen / mod interfaces are bridged via `web-shim.js`).
- 已启用 viewport 自适应，桌面与移动端浏览器均可游玩。
  Viewport is enabled for responsive scaling, so it works on both desktop and mobile browsers.

## 技术栈 / Tech Stack

PixiJS · HTML5 Canvas · 纯静态 GitHub Pages 部署 / Static GitHub Pages deployment
