import { globalShortcut as r, app as t, BrowserWindow as l } from "electron";
import { fileURLToPath as R } from "node:url";
import o from "node:path";
import _ from "electron-screenshots";
function g() {
  const s = new _();
  r.register("Ctrl+Shift+X", () => {
    s.startCapture();
  }), s.on("ok", (n, d, f) => {
    console.log("capture", d, f);
  }), s.on("cancel", () => {
    console.log("capture cancelled");
  }), r.register("esc", () => {
    var n;
    (n = s.$win) != null && n.isFocused() && s.endCapture();
  });
}
const a = o.dirname(R(import.meta.url));
process.env.APP_ROOT = o.join(a, "..");
const i = process.env.VITE_DEV_SERVER_URL, P = o.join(process.env.APP_ROOT, "dist-electron"), p = o.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = i ? o.join(process.env.APP_ROOT, "public") : p;
let e;
function c() {
  e = new l({
    icon: o.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: o.join(a, "preload.mjs")
    }
  }), e.webContents.on("did-finish-load", () => {
    e == null || e.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), i ? e.loadURL(i) : e.loadFile(o.join(p, "index.html"));
}
t.on("window-all-closed", () => {
  process.platform !== "darwin" && (t.quit(), e = null);
});
t.whenReady().then(() => {
  c(), r.register("Ctrl+Shift+Z", () => {
    e != null && e.isFocused() ? e.hide() : e == null || e.show();
  }) || console.log("Hotkey registration failed"), g(), t.on("activate", function() {
    l.getAllWindows().length === 0 && c();
  });
});
export {
  P as MAIN_DIST,
  p as RENDERER_DIST,
  i as VITE_DEV_SERVER_URL
};
