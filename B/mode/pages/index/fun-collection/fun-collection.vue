<template>
  <view class="collection-container">
    <!-- 页面头部 -->
    <view class="header">
      <text class="title">趣味收藏夹</text>
      <image class="back-btn" src="/static/icons/back.png" @click="goBack"></image>
    </view>

    <!-- 收藏列表 -->
    <view class="collection-list" v-if="collections.length > 0">
      <view class="collection-item" v-for="item in collections" :key="item.id">
        <image :src="item.image" mode="aspectFill"></image>
        <view class="item-info">
          <text class="item-title">{{ item.title }}</text>
          <text class="item-desc">{{ item.description }}</text>
          <text class="item-date">{{ item.date }}</text>
        </view>
        <view class="item-actions">
          <image src="/static/icons/delete.png" mode="widthFix" @click.stop="removeCollection(item.id)"></image>
        </view>
      </view>
    </view>

    <!-- 空状态 -->
    <view class="empty-state" v-else>
      <image src="/static/icons/empty-collection.png" mode="widthFix"></image>
      <text>暂无收藏内容</text>
      <button class="explore-btn" @click="goExplore">去发现</button>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';

// 模拟收藏数据
const collections = ref([
  {
    id: 1,
    title: "狗狗的100种可爱瞬间",
    description: "收集了狗狗们最萌的表情和动作",
    image: "/static/banners/dog-cute.jpg",
    date: "2025-06-01"
  },
  {
    id: 2,
    title: "宠物训练技巧大全",
    description: "掌握这些技巧，轻松训练你的毛孩子",
    image: "/static/banners/training.jpg",
    date: "2025-05-20"
  }
]);

// 返回上一页
const goBack = () => {
  uni.navigateBack();
};

// 删除收藏
const removeCollection = (id) => {
  collections.value = collections.value.filter(item => item.id !== id);
  uni.showToast({
    title: '已取消收藏',
    icon: 'success'
  });
};

// 跳转到发现页面
const goExplore = () => {
  uni.navigateTo({
    url: '/pages/discover/discover' // 假设存在发现页面
  });
};
</script>

<style scoped>
.collection-container {
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

.back-btn {
  width: 24px;
  height: 24px;
}

.collection-list {
  background: #f5f5f5;
  border-radius: 10px;
  padding: 10px;
}

.collection-item {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
}

.collection-item image {
  width: 80px;
  height: 80px;
  border-radius: 4px;
  margin-right: 10px;
}

.item-info {
  flex: 1;
}

.item-title {
  font-size: 16px;
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
}

.item-desc {
  font-size: 12px;
  color: #666;
  display: block;
  margin-bottom: 5px;
}

.item-date {
  font-size: 10px;
  color: #999;
}

.item-actions {
  margin-left: 10px;
}

.item-actions image {
  width: 20px;
  height: 20px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
}

.empty-state image {
  width: 100px;
  height: 100px;
  margin-bottom: 15px;
}

.empty-state text {
  font-size: 14px;
  color: #666;
  margin-bottom: 15px;
}

.explore-btn {
  background: #4CAF50;
  color: white;
  border-radius: 20px;
  padding: 8px 20px;
  border: none;
  font-size: 14px;
}
</style>