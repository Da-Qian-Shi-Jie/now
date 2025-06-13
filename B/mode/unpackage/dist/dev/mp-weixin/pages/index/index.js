"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const banners = Array(4).fill().map((_, i) => ({
      src: "/static/banners/2.png",
      id: i + 1
    }));
    const clearSelection = () => {
    };
    const navigateToExercise = () => {
      common_vendor.index.navigateTo({
        url: "/pages/exercise/exercise",
        success: () => common_vendor.index.__f__("log", "at pages/index/index.vue:72", "跳转成功"),
        fail: (err) => common_vendor.index.__f__("error", "at pages/index/index.vue:73", "跳转失败:", err)
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0,
        b: common_vendor.o(() => {
        }),
        c: common_vendor.f(common_vendor.unref(banners), (item, k0, i0) => {
          return {
            a: item.src,
            b: item.id
          };
        }),
        d: common_vendor.o(() => {
        }),
        e: common_assets._imports_1,
        f: common_assets._imports_2,
        g: common_vendor.o(navigateToExercise),
        h: common_assets._imports_3,
        i: common_assets._imports_4,
        j: common_assets._imports_5,
        k: common_assets._imports_6,
        l: common_vendor.o(() => {
        }),
        m: common_vendor.f(4, (i, k0, i0) => {
          return {
            a: i
          };
        }),
        n: common_assets._imports_7,
        o: common_vendor.o(() => {
        }),
        p: common_vendor.o(clearSelection)
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
