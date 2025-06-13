"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
common_vendor.index.__f__("log", "at pages/exercise/exercise.vue:45", "运动页面加载成功");
const _sfc_main = {
  setup() {
    const records = common_vendor.ref([
      {
        date: "06-01",
        distance: 2.5,
        duration: 30
      },
      {
        date: "06-02",
        distance: 3,
        duration: 35
      },
      {
        date: "06-03",
        distance: 1.8,
        duration: 25
      }
    ]);
    const todayData = common_vendor.computed(() => {
      return {
        distance: "3.5",
        duration: "40"
      };
    });
    const weeklyCount = common_vendor.computed(() => {
      return records.value.length;
    });
    const goBack = () => {
      common_vendor.index.navigateBack();
    };
    const addRecord = () => {
      common_vendor.index.navigateTo({
        url: "/pages/exercise/add"
      });
    };
    return {
      records,
      todayData,
      weeklyCount,
      goBack,
      addRecord
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0$1,
    b: common_vendor.o((...args) => $setup.goBack && $setup.goBack(...args)),
    c: common_vendor.t($setup.todayData.distance),
    d: common_vendor.t($setup.weeklyCount),
    e: common_vendor.f($setup.records, (item, index, i0) => {
      return {
        a: common_vendor.t(item.date),
        b: common_vendor.t(item.distance),
        c: common_vendor.t(item.duration),
        d: index
      };
    }),
    f: common_vendor.o((...args) => $setup.addRecord && $setup.addRecord(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/exercise/exercise.js.map
