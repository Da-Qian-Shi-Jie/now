"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "add",
  setup(__props) {
    const formData = common_vendor.ref({
      date: getTodayDate(),
      distance: "",
      duration: "",
      notes: ""
    });
    function getTodayDate() {
      const today = /* @__PURE__ */ new Date();
      return today.toISOString().split("T")[0];
    }
    const onDateChange = (e) => {
      formData.value.date = e.detail.value;
    };
    const goBack = () => {
      common_vendor.index.navigateBack();
    };
    const saveRecord = () => {
      if (!validateForm())
        return;
      const pages = getCurrentPages();
      const prevPage = pages[pages.length - 2];
      const newRecord = {
        date: formData.value.date.slice(5),
        // 只显示月-日
        distance: parseFloat(formData.value.distance),
        duration: parseInt(formData.value.duration)
      };
      if (prevPage && prevPage.$vm) {
        prevPage.$vm.records.push(newRecord);
      }
      common_vendor.index.showToast({
        title: "添加成功",
        icon: "success"
      });
      setTimeout(() => {
        common_vendor.index.navigateBack();
      }, 1500);
    };
    const validateForm = () => {
      if (!formData.value.date) {
        common_vendor.index.showToast({ title: "请选择日期", icon: "none" });
        return false;
      }
      if (!formData.value.distance || isNaN(formData.value.distance)) {
        common_vendor.index.showToast({ title: "请输入有效距离", icon: "none" });
        return false;
      }
      if (!formData.value.duration || isNaN(formData.value.duration)) {
        common_vendor.index.showToast({ title: "请输入有效时长", icon: "none" });
        return false;
      }
      return true;
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$1,
        b: common_vendor.o(goBack),
        c: common_vendor.o(saveRecord),
        d: common_vendor.t(formData.value.date || "请选择日期"),
        e: formData.value.date,
        f: common_vendor.o(onDateChange),
        g: formData.value.distance,
        h: common_vendor.o(($event) => formData.value.distance = $event.detail.value),
        i: formData.value.duration,
        j: common_vendor.o(($event) => formData.value.duration = $event.detail.value),
        k: formData.value.notes,
        l: common_vendor.o(($event) => formData.value.notes = $event.detail.value)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-daec7470"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/exercise/add.js.map
