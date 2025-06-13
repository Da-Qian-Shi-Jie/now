<template>
  <view class="exercise-container">
    <!-- 页面头部 -->
    <view class="header">
      <text class="title">宠物运动记录</text>
    </view>

    <!-- 运动数据展示 -->
    <view class="data-section">
      <view class="data-card">
        <text class="data-value">{{ todayData.distance }}</text>
        <text class="data-label">今日运动(km)</text>
      </view>
      <view class="data-card">
        <text class="data-value">{{ weeklyCount }}</text>
        <text class="data-label">本周运动次数</text>
      </view>
    </view>

    <!-- 运动记录表格 -->
    <view class="record-table">
      <view class="table-header">
        <text>日期</text>
        <text>运动量</text>
        <text>时长</text>
      </view>
      <view class="table-row" v-for="(item, index) in records" :key="index">
        <text>{{ item.date }}</text>
        <text>{{ item.distance }} km</text>
        <text>{{ item.duration }} min</text>
      </view>
    </view>

    <!-- 添加记录按钮 -->
    <button class="add-btn" @click="addRecord">+ 添加记录</button>
  </view>
</template>

<script>
import { ref, computed } from 'vue'
import { uniNavigateBack } from '@dcloudio/uni-app'

export default {
  setup() {
    // 运动记录数据
    const records = ref([
      { date: '06-01', distance: 2.5, duration: 30 },
      { date: '06-02', distance: 3.0, duration: 35 },
      { date: '06-03', distance: 1.8, duration: 25 }
    ]);

    // 计算今日数据
    const todayData = computed(() => {
      return {
        distance: '3.5',
        duration: '40'
      };
    });

    // 计算本周运动次数
    const weeklyCount = computed(() => {
      return records.value.length;
    });

    // 返回上一页
    const goBack = () => {
      uni.navigateBack();
    };

    // 添加新记录
    const addRecord = () => {
      uni.navigateTo({
        url: '/pages/index/exercise/add'
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
}
</script>

<style>
  /* 原有样式保持不变 */
 .exercise-container {
    padding: 20px;
  }

 .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

 .title {
    font-size: 18px;
    font-weight: bold;
  }

 .data-section {
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
  }

 .data-card {
    background: #f5f5f5;
    padding: 15px;
    border-radius: 10px;
    text-align: center;
    width: 45%;
  }

 .data-value {
    font-size: 24px;
    font-weight: bold;
    display: block;
  }

 .data-label {
    font-size: 12px;
    color: #666;
  }

 .record-table {
    margin-bottom: 20px;
  }

 .table-header,
 .table-row {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid #eee;
  }

 .table-header {
    font-weight: bold;
  }

 .add-btn {
    background: #4CAF50;
    color: white;
    border-radius: 20px;
    padding: 10px 20px;
    border: none;
    font-size: 16px;
  }
</style>