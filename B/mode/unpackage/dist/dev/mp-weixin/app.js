"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/exercise/exercise.js";
  "./pages/exercise/add.js";
}
const _sfc_main = {
  onLaunch: function() {
    common_vendor.index.__f__("log", "at App.vue:4", "App Launch");
  },
  onShow: function() {
    common_vendor.index.__f__("log", "at App.vue:7", "App Show");
  },
  onHide: function() {
    common_vendor.index.__f__("log", "at App.vue:10", "App Hide");
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  app.config.errorHandler = (err, instance, info) => {
    common_vendor.index.__f__("error", "at main.js:33", "Vue Error:", err, info);
  };
  const platform = common_vendor.index.getSystemInfoSync().platform;
  app.config.globalProperties.$platform = platform;
  app.config.performance = true;
  return {
    app
  };
}
common_vendor.index.addInterceptor({
  returnValue(res) {
    if (!(!!res && (typeof res === "object" || typeof res === "function") && typeof res.then === "function")) {
      return res;
    }
    return new Promise((resolve, reject) => {
      res.then((res2) => res2[0] ? reject(res2[0]) : resolve(res2[1]));
    });
  }
});
createApp().app.mount("#app");
exports.createApp = createApp;
//# sourceMappingURL=../.sourcemap/mp-weixin/app.js.map
