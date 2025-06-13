<template>
  <view class="add-plan-container">
    <!-- 头部返回 -->
    <view class="nav-bar">
      <text class="back-btn" @click="navigateBack">返回</text>
      <text class="title">添加训练计划</text>
    </view>

    <!-- 表单区域 -->
    <view class="form-section">
      <!-- 训练项目 -->
      <view class="form-item">
        <text class="label">训练项目：</text>
        <input 
          class="input" 
          type="text" 
          placeholder="如：基础指令训练、敏捷训练" 
          v-model="planItem"
        />
      </view>

      <!-- 训练时间 -->
      <view class="form-item">
        <text class="label">训练时间：</text>
        <input 
          class="input" 
          type="text" 
          placeholder="如：每日早晚各20分钟" 
          v-model="planTime"
        />
      </view>

      <!-- 提交按钮 -->
      <button class="submit-btn" @click="submitPlan">提交计划</button>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';

// 响应式数据
const planItem = ref('');
const planTime = ref('');

// 提交计划
const submitPlan = () => {
  if (!planItem.value || !planTime.value) {
    uni.showToast({
      title: '请填写完整信息',
      icon: 'none',
      duration: 1500
    });
    return;
  }

  // 模拟提交（实际可调用接口存后端）
  const newPlan = {
    item: planItem.value,
    time: planTime.value,
    id: Date.now() // 简单生成唯一ID
  };

  // 从本地存储读取已有计划（如果需要持久化）
  let existingPlans = uni.getStorageSync('petTrainingPlans') || [];
  existingPlans.push(newPlan);
  uni.setStorageSync('petTrainingPlans', existingPlans);

  // 提示 + 返回列表页
  uni.showToast({
    title: '添加成功',
    icon: 'success',
    duration: 1500,
    success: () => {
      // 返回并通知列表页更新
      uni.navigateBack({
        delta: 1,
        success: () => {
          // 触发列表页的更新事件（可通过uni.$emit实现跨页面通信）
          uni.$emit('updateTrainingPlans', existingPlans);
        }
      });
    }
  });
};

// 返回上一页
const navigateBack = () => {
  uni.navigateBack();
};

// import { ref } from 'vue';

// // 明确初始化响应式数据（避免 undefined 问题）
// const planItem = ref(''); 
// const planTime = ref('');

// const submitPlan = () => {
//   if (!planItem.value || !planTime.value) {
//     uni.showToast({ title: '请填写完整信息', icon: 'none' });
//     return;
//   }

//   const newPlan = {
//     item: planItem.value,
//     time: planTime.value,
//     id: Date.now()
//   };

//   let existingPlans = uni.getStorageSync('petTrainingPlans') || [];
//   existingPlans.push(newPlan);
//   uni.setStorageSync('petTrainingPlans', existingPlans);

//   uni.showToast({ title: '添加成功', icon: 'success' });
//   uni.navigateBack({
//     success: () => uni.$emit('updateTrainingPlans', existingPlans)
//   });
// };

// const navigateBack = () => {
//   uni.navigateBack();
// };
</script>

<style scoped>
.add-plan-container {
  padding: 15px;
  background-color: #fff;
  min-height: 100vh;
}

/* 导航栏 */
.nav-bar {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.back-btn {
  font-size: 16px;
  color: #007aff;
  margin-right: 10px;
}
.title {
  font-size: 18px;
  font-weight: bold;
}

/* 表单 */
.form-section {
  background: #f8f8f8;
  padding: 15px;
  border-radius: 8px;
}
.form-item {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}
.label {
  font-size: 14px;
  color: #333;
  margin-bottom: 5px;
}
.input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

/* 提交按钮 */
.submit-btn {
  background-color: #007aff;
  color: #fff;
  font-size: 16px;
  padding: 10px;
  border-radius: 4px;
}
</style>