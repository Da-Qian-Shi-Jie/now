<template>
	<view @click="clearSelection">
		<!-- 搜索框 -->
		<view class="index-search" @click.stop>
			<image class="icon" src="/static/banners/搜索.png" mode="widthFix"></image>
			<input class="inp" type="text" placeholder="关键字">
		</view>

		<!-- 轮播图 -->
		<view class="index-banner" @click.stop>
			<swiper class="swiper-container" indicator-dots autoplay :interval="6500" :duration="1000">
				<swiper-item v-for="item in banners" :key="item.id">
					<image class="swiper-img" :src="item.src" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
		</view>

		<!-- 功能图标 -->
		<view class="function-icons" @click.stop>
			<view class="icon-row">
				<view class="icon-item" @click="navigateToHealthFood">
					<image src="/static/banners/健康食谱.png" mode="widthFix"></image>
					<text>健康食谱</text>
				</view>
				<view class="icon-item" @click="navigateToExercise">
					<image src="/static/banners/宠物运动.png" mode="widthFix"></image>
					<text>运动记录</text>
				</view>
				<!-- 添加收藏夹跳转 -->
				<view class="icon-item" @click="navigateToCollection">
					<image src="/static/banners/收藏夹.png" mode="widthFix"></image>
					<text>趣味收藏夹</text>
				</view>
			</view>
			<view class="icon-row">
				<view class="icon-item" @click="navigateToExercisePlan">
					<image src="/static/banners/训练.png" mode="widthFix"></image>
					<text>训练计划</text>
				</view>
<view class="icon-item">
    <image src="/static/banners/开销记录.png" mode="widthFix"></image>
    <text @click="navigateToCostRecord">开销记录</text>
  </view>
				<view class="icon-item">
					<image src="/static/banners/宠物护理.png" mode="widthFix"></image>
					<text>宠物洗护</text>
				</view>
			</view>
		</view>

		<!-- 记录区域 -->
		<view class="record-section" @click.stop>
			<text class="">宠宝动态</text>
			<image v-for="i in 4" :key="i" src="/static/logo1.png" mode="widthFix"></image>
		</view>
	</view>
</template>

<script setup>
	// 轮播图数据
	const banners = Array(4).fill().map((_, i) => ({
		src: "/static/banners/2.png",
		id: i + 1
	}));

	// 清除选中状态
	const clearSelection = () => {};
	
	// 跳转到健康食谱页面
	const navigateToHealthFood = () => {
		uni.navigateTo({
			url: '/pages/index/health-food/health-food', // 这里的路径要和实际创建的页面路径一致
			success: () => console.log('跳转到健康食谱成功'),
			fail: (err) => console.error('跳转到健康食谱失败:', err)
		});
	};

	// 跳转到运动记录页面
	const navigateToExercise = () => {
		uni.navigateTo({
			url: '/pages/index/exercise/exercise',
			success: () => console.log('跳转成功'),
			fail: (err) => console.error('跳转失败:', err)
		});
	};


	// 跳转到收藏夹页面
	const navigateToCollection = () => {
		uni.navigateTo({
			url: '/pages/index/fun-collection/fun-collection',
			success: () => console.log('跳转到收藏夹成功'),
			fail: (err) => console.error('跳转到收藏夹失败:', err)
		});
	};
	// 跳转到训练计划页面
	const navigateToExercisePlan = () => {
		uni.navigateTo({
			url: '/pages/index/exercise-plan/exercise-plan',
			success: () => console.log('跳转到训练计划成功'),
			fail: (err) => console.error('跳转到训练计划失败:', err)
		});
	};
	//跳转到开销记录页面
	// 新增跳转方法
	const navigateToCostRecord = () => {
	  uni.navigateTo({
	    url: '/pages/index/cost-record/cost-record',
	    success: () => console.log('跳转到开销记录成功'),
	    fail: (err) => console.error('跳转到开销记录失败:', err)
	  });
	};
</script>

<style>
	/* 全局重置 */
	html,
	body,
	#app {
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
		overflow-x: hidden;
	}

	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	/* 轮播图 */
	.index-banner {
		width: 100%;
		height: 200px;
		margin: 10px 0;
	}

	.swiper-container,
	.swiper-img {
		width: 100%;
		height: 100%;
	}

	.swiper-img {
		object-fit: cover;
		display: block;
	}

	/* 搜索框 */
	.index-search {
		margin: 1px auto;
		width: 98%;
		height: 40px;
		padding: 0 5px;
		display: flex;
		align-items: center;
		border: 1px solid #ccc;
		border-radius: 50rpx;
	}

	.icon {
		width: 20px;
		margin-left: 15px;
	}

	.inp {
		font-size: 15px;
		border: 7px solid transparent;
		background: transparent;
		width: calc(100% - 40px);
		height: 40px;
		margin-left: 7px;
	}

	/* 功能图标 */
	.function-icons {
		margin: 10px;
	}

	.icon-row {
		display: flex;
		justify-content: space-around;
		margin-bottom: 10px;
	}

	.icon-item {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.icon-item image {
		width: 40px;
		height: 40px;
		margin-bottom: 5px;
	}

	.icon-item text {
		font-size: 12px;
		color: #333;
	}

	/* 记录区域 */
	.record-section {
		margin: 10px;
		background: #fff;
		border-radius: 10px;
		padding: 10px;
	}

	.record-text {
		font-size: 14px;
		padding: 5rpx 18rpx;
		color: #666;
		background: #ccc;
		border-radius: 50rpx;
		margin-bottom: 5px;
	}

	.record-section image {
		width: 100%;
		height: auto;
		margin-top: 5px;
	}
</style>