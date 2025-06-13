<template>
  <view class="health-food-container">
    <!-- 页面头部，可复用返回逻辑 -->
    <view class="header">
      <text class="title">健康食谱</text>
      <image class="back-btn" src="/static/icons/back.png" @click="goBack"></image>
    </view>

    <!-- 内容区，根据需求填充，比如食谱列表、添加按钮等 -->
    <view class="content">
      <text>这里展示健康食谱相关内容</text>
      <!-- 示例：列表展示 -->
      <view class="recipe-item" v-for="(recipe, idx) in recipes" :key="idx">
        <text>{{ recipe.name }}</text>
        <text>食材：{{ recipe.ingredients }}</text>
      </view>
      <button class="add-btn" @click="addRecipe">+ 添加食谱</button>
    </view>
  </view>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    // 模拟食谱数据，实际可从接口/存储获取
    const recipes = ref([
      { name: '营养鸡胸肉', ingredients: '鸡胸肉、西兰花、橄榄油' },
      { name: '蔬菜沙拉', ingredients: '生菜、黄瓜、番茄、酸奶' }
    ]);

    // 返回上一页
    const goBack = () => {
      uni.navigateBack();
    };

    // 跳转添加食谱页面（若有），需提前创建对应 add 页面
    const addRecipe = () => {
      uni.navigateTo({
        url: '/pages/health-food/add-recipe' 
      });
    };

    return {
      recipes,
      goBack,
      addRecipe
    };
  }
}
</script>

<style scoped>
.health-food-container {
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
.content {
  background: #f5f5f5;
  padding: 15px;
  border-radius: 10px;
}
.recipe-item {
  margin-bottom: 10px;
  padding: 10px;
  background: #fff;
  border-radius: 5px;
}
.add-btn {
  background: #4CAe90;
  color: white;
  border-radius: 20px;
  padding: 10px 20px;
  border: none;
  font-size: 16px;
  margin-top: 10px;
}
</style>