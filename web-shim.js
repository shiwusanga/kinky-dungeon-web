// ============================================================
//  Kinky Dungeon — 纯网页版桥接层 (web-shim.js)
//  原桌面版用 Electron 的 preload.js 向页面注入 window.kdAPI
//  (setFullscreen / setWindowed / close / getMods)。
//  这里在浏览器里用原生 API 实现同样的接口，使游戏无需 exe 即可运行。
//  本文件由 index.html 在 ./out/main.js 之前加载。
// ============================================================
(function () {
  "use strict";

  // ---- file:// 防护：浏览器在 file:// 下会拦截 fetch，导致贴图/mod 全部丢失 ----
  if (location.protocol === "file:") {
    function showFileWarn() {
      var d = document.createElement("div");
      d.style.cssText = "position:fixed;inset:0;z-index:99999;background:#111;color:#fff;font-family:sans-serif;padding:40px;line-height:1.9;overflow:auto;";
      d.innerHTML = "<h1 style='color:#ff6b6b'>⚠️ 不能用 file:// 直接打开</h1>" +
        "<p>Kinky Dungeon 网页版通过 <b>fetch</b> 加载图集与 mod，浏览器在 <code>file://</code> 协议下会拦截这些请求，导致<b>贴图全部消失 / 一堆 not found</b>。</p>" +
        "<p><b>正确打开方式（二选一）：</b></p>" +
        "<ol>" +
        "<li>双击本文件夹里的 <b>start.bat</b>（自动启动本地服务器并打开浏览器）；</li>" +
        "<li>或命令行运行 <code>python serve.py</code>，再访问 <b>http://127.0.0.1:8080/</b></li>" +
        "</ol>" +
        "<p style='color:#9ad'>提示：直接双击 index.html 一定会失败，必须用上面的本地服务器方式。</p>";
      document.body.appendChild(d);
    }
    if (document.body) showFileWarn();
    else document.addEventListener("DOMContentLoaded", showFileWarn);
  }

  // ---- 自动加载 Mods ----
  // 对应 Electron 版 electron.js 里 ipcMain.handle('getMods') 读取 ../../Mods/ 的逻辑。
  // 网页版改为：读取 Mods/manifest.json（zip 文件名数组），逐个 fetch 字节后返回。
  async function getMods() {
    try {
      const manifestRes = await fetch("Mods/manifest.json", { cache: "no-store" });
      if (!manifestRes.ok) {
        console.warn("[web-shim] Mods/manifest.json 未找到，跳过自动加载");
        return [];
      }
      const names = await manifestRes.json();
      if (!Array.isArray(names)) return [];
      const mods = [];
      for (const name of names) {
        const res = await fetch("Mods/" + name, { cache: "no-store" });
        if (!res.ok) {
          console.warn("[web-shim] Mod 未找到:", name);
          continue;
        }
        const buf = await res.arrayBuffer();
        mods.push({ base: name, file: new Uint8Array(buf) });
      }
      console.log("[web-shim] 自动加载 mod 数量:", mods.length);
      return mods;
    } catch (e) {
      console.warn("[web-shim] getMods 失败:", e);
      return [];
    }
  }

  // ---- 全屏 / 窗口 / 关闭 ----
  function setFullscreen() {
    const el = document.documentElement;
    if (el.requestFullscreen) el.requestFullscreen().catch(() => {});
  }
  function setWindowed() {
    if (document.exitFullscreen) document.exitFullscreen().catch(() => {});
  }
  function closeWindow() {
    try { window.close(); } catch (e) { /* 浏览器可能禁止脚本关窗，忽略 */ }
  }

  window.kdAPI = {
    getMods: getMods,
    setFullscreen: setFullscreen,
    setWindowed: setWindowed,
    close: closeWindow,
  };

  console.log("[web-shim] window.kdAPI 已注入（纯网页版，无需 Electron）");
})();
