<template>
  <view class="add-container">
    <!-- 头部导航 - 已优化返回按钮 -->
    <view class="header">
      <view class="back-btn-container" @click="goBack">
        <text class="back-text">返回</text>
      </view>
      <text class="title">添加运动记录</text>
      <text class="save-btn" @click="saveRecord">保存</text>
    </view>

    <!-- 表单区域 -->
    <view class="form-container">
      <!-- 日期选择 -->
      <view class="form-item">
        <text class="label">日期</text>
        <picker mode="date" :value="formData.date" @change="onDateChange">
          <view class="picker">{{ formData.date || '请选择日期' }}</view>
        </picker>
      </view>

      <!-- 运动距离 -->
      <view class="form-item">
        <text class="label">运动距离 (km)</text>
        <input type="number" v-model="formData.distance" placeholder="请输入距离" class="input">
      </view>

      <!-- 运动时长 -->
      <view class="form-item">
        <text class="label">运动时长 (分钟)</text>
        <input type="number" v-model="formData.duration" placeholder="请输入时长" class="input">
      </view>

      <!-- 备注 -->
      <view class="form-item">
        <text class="label">备注</text>
        <textarea v-model="formData.notes" placeholder="可选备注信息" class="textarea"></textarea>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad, uniNavigateBack } from '@dcloudio/uni-app'

// 表单数据
const formData = ref({
  date: getTodayDate(),
  distance: '',
  duration: '',
  notes: ''
})

// 获取今天日期 (格式: YYYY-MM-DD)
function getTodayDate() {
  const today = new Date()
  return today.toISOString().split('T')[0]
}

// 日期选择变化
const onDateChange = (e) => {
  formData.value.date = e.detail.value
}

// 返回上一页
const goBack = () => {
  uni.navigateBack()
}

// 保存记录
const saveRecord = () => {
  if (!validateForm()) return

  // 新记录对象
  const newRecord = {
    date: formData.value.date.slice(5), // 只显示月-日
    distance: parseFloat(formData.value.distance),
    duration: parseInt(formData.value.duration)
  }

  // 将新记录保存到本地存储
  let exerciseRecords = uni.getStorageSync('exerciseRecords') || []
  exerciseRecords.push(newRecord)
  uni.setStorageSync('exerciseRecords', exerciseRecords)

  // 提示并返回上一页
  uni.showToast({
    title: '添加成功',
    icon: 'success'
  })

  setTimeout(() => {
    uni.navigateBack()
  }, 1500)
}

// 表单验证
const validateForm = () => {
  if (!formData.value.date) {
    uni.showToast({
      title: '请选择日期',
      icon: 'none'
    })
    return false
  }

  if (!formData.value.distance || isNaN(formData.value.distance)) {
    uni.showToast({
      title: '请输入有效距离',
      icon: 'none'
    })
    return false
  }

  if (!formData.value.duration || isNaN(formData.value.duration)) {
    uni.showToast({
      title: '请输入有效时长',
      icon: 'none'
    })
    return false
  }

  return true
}
</script>

<style scoped>
  /* 原有样式保持不变 */
 .add-container {
    padding: 20px;
    background-color: #f8f8f8;
    min-height: 100vh;
  }

 .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    background: white;
    position: sticky;
    top: 0;
    z-index: 10;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  }

 .back-btn-container {
    display: flex;
    align-items: center;
    padding: 5px 10px 5px 0;
  }

 .back-text {
    font-size: 16px;
    color: #333;
  }

 .title {
    font-size: 18px;
    font-weight: bold;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

 .save-btn {
    color: #4CAF50;
    font-size: 16px;
  }

 .form-container {
    background: white;
    border-radius: 10px;
    padding: 15px;
  }

 .form-item {
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid #eee;
  }

 .label {
    display: block;
    margin-bottom: 8px;
    color: #666;
    font-size: 14px;
  }

 .input,
 .picker {
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
  }

 .textarea {
    width: 100%;
    height: 80px;
    font-size: 16px;
    padding: 8px;
    border: 1px solid #eee;
    border-radius: 4px;
  }
</style>