<template>
  <view class="cost-record-container">
    <!-- 导航栏 -->
    <view class="nav-bar">
      <text class="back-btn" @click="navigateBack">← 返回</text>
      <text class="title">开销记录</text>
    </view>

    <!-- 记录表单 -->
    <view class="form-section">
      <view class="form-item">
        <text class="label">开销项目：</text>
        <input 
          class="input" 
          type="text" 
          placeholder="如：购买零食、体检费用" 
          v-model="costItem"
        />
      </view>
      <view class="form-item">
        <text class="label">开销金额：</text>
        <input 
          class="input" 
          type="number" 
          placeholder="如：50" 
          v-model.number="costAmount"
        />
      </view>
      <view class="form-item">
        <text class="label">开销时间：</text>
        <input 
          class="input" 
          type="date" 
          v-model="costDate"
        />
      </view>
      <button class="submit-btn" @click="submitRecord">提交记录</button>
    </view>

    <!-- 记录列表 -->
    <view class="record-list" v-if="costRecords.length > 0">
      <view 
        class="record-item" 
        v-for="(record, index) in costRecords" 
        :key="record.id"
      >
        <text class="item-title">项目：{{ record.item }}</text>
        <text class="item-desc">金额：{{ record.amount }} 元</text>
        <text class="item-desc">时间：{{ record.date }}</text>
        <button class="delete-btn" @click="deleteRecord(index)">删除</button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// 响应式数据
const costItem = ref('');
const costAmount = ref(0);
const costDate = ref('');
const costRecords = ref([]);

// 页面加载时读取本地存储
onMounted(() => {
  const records = uni.getStorageSync('petCostRecords') || [];
  costRecords.value = records;
});

// 提交记录
const submitRecord = () => {
  if (!costItem.value || !costAmount.value || !costDate.value) {
    uni.showToast({ title: '请填写完整信息', icon: 'none' });
    return;
  }

  const newRecord = {
    item: costItem.value,
    amount: costAmount.value,
    date: costDate.value,
    id: Date.now()
  };

  let existingRecords = uni.getStorageSync('petCostRecords') || [];
  existingRecords.push(newRecord);
  uni.setStorageSync('petCostRecords', existingRecords);
  costRecords.value = existingRecords;

  uni.showToast({ title: '记录成功', icon: 'success' });
  // 清空表单
  costItem.value = '';
  costAmount.value = 0;
  costDate.value = '';
};

// 删除记录
const deleteRecord = (index) => {
  uni.showModal({
    title: '提示',
    content: '确定删除该记录吗？',
    success: (res) => {
      if (res.confirm) {
        costRecords.value.splice(index, 1);
        uni.setStorageSync('petCostRecords', costRecords.value);
        uni.showToast({ title: '删除成功', icon: 'success' });
      }
    }
  });
};

// 返回上一页
const navigateBack = () => {
  uni.navigateBack();
};
</script>

<style scoped>
.cost-record-container {
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

/* 表单区域 */
.form-section {
  background: #f8f8f8;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 15px;
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
.submit-btn {
  background-color: #007aff;
  color: #fff;
  font-size: 16px;
  padding: 10px;
  border-radius: 4px;
}

/* 记录列表 */
.record-list {
  background: #f8f8f8;
  padding: 15px;
  border-radius: 8px;
}
.record-item {
  padding: 10px;
  margin-bottom: 10px;
  background: #fff;
  border-radius: 4px;
}
.item-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
}
.item-desc {
  font-size: 14px;
  color: #666;
  margin-bottom: 3px;
}
.delete-btn {
  margin-top: 5px;
  background-color: #ff4d4f;
  color: #fff;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 4px;
}
</style>