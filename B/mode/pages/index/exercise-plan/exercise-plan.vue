<template>
  <view class="exercise-plan-container">
    <!-- 导航栏（包含美化后的返回按钮） -->
    <view class="nav-bar">
      <!-- 改为可点击的容器 + 图标 + 文字，增强交互感 -->
      <view class="back-btn" @click="navigateBack">
        <!-- <image class="back-icon" src="/static/icons/back-arrow.png"></image> -->
        <text class="back-text">返回</text>
      </view>
      <text class="title">训练计划</text>
    </view>

    <!-- 计划列表 -->
    <view class="plan-list">
      <view 
        class="plan-item" 
        v-for="(plan, index) in trainingPlans" 
        :key="plan.id"
      >
        <text class="item-title">训练项目：{{ plan.item }}</text>
        <text class="item-desc">训练时间：{{ plan.time }}</text>
        <button class="delete-btn" @click="deletePlan(index)">删除</button>
      </view>
    </view>

    <!-- 添加按钮 -->
    <navigator url="/pages/index/exercise-plan/add-plan" class="add-btn">
      + 添加新训练计划
    </navigator>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const trainingPlans = ref([]);

onMounted(() => {
  const plans = uni.getStorageSync('petTrainingPlans') || [];
  trainingPlans.value = plans;
  uni.$on('updateTrainingPlans', (newPlans) => {
    trainingPlans.value = newPlans;
  });
});

const navigateBack = () => {
  uni.redirectTo({
    url: '/pages/index/index' 
  });
};

const deletePlan = (index) => {
  uni.showModal({
    title: '提示',
    content: '确定删除该计划吗？',
    success: (res) => {
      if (res.confirm) {
        trainingPlans.value.splice(index, 1);
        uni.setStorageSync('petTrainingPlans', trainingPlans.value);
        uni.showToast({ title: '删除成功', icon: 'success' });
      }
    }
  });
};
</script>

<style scoped>
.exercise-plan-container {
  padding: 15px;
  background-color: #fff;
  min-height: 100vh;
}

/* 导航栏整体布局 */
.nav-bar {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding-left: 5px; 
}

/* 美化后的返回按钮 */
.back-btn {
  display: flex;
  align-items: center;
  color: #007aff;
  cursor: pointer;
  transition: all 0.3s ease; 
}
.back-btn:hover {
  opacity: 0.8; 
}
.back-icon {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}
.back-text {
  font-size: 16px;
}

/* 标题样式 */
.title {
  font-size: 18px;
  font-weight: bold;
  margin-left: 10px; 
}

/* 计划列表 */
.plan-list {
  margin-bottom: 15px;
}
.plan-item {
  background: #f8f8f8;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 8px;
}
.item-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
}
.item-desc {
  font-size: 14px;
  color: #666;
}

/* 删除按钮 */
.delete-btn {
  margin-top: 10px;
  background-color: #ff4d4f;
  color: #fff;
  font-size: 12px;
  padding: 6px 10px;
  border-radius: 4px;
  transition: all 0.3s ease;
}
.delete-btn:hover {
  opacity: 0.8;
}

/* 添加按钮 */
.add-btn {
  display: block;
  text-align: center;
  background-color: #007aff;
  color: #fff;
  padding: 10px;
  border-radius: 4px;
  text-decoration: none;
  transition: all 0.3s ease;
}
.add-btn:hover {
  opacity: 0.8;
}
</style>