<template>
	<view class="active">
		<view class="conteng">
			<block v-for="(item,index) in localdata" :key="index">
				<view class="content-article">
					<view class="content-img">
						<image src ="https://img.alicdn.com/bao/uploaded/i3/2200538386031/O1CN01UzXSiL1uQFCqHg9r1_!!2200538386031.jpg_400x400.jpg" mode="aspectFill" class=""></image>
					</view>
					<view class="active-introduce">
						<view class="active-title">清晖园</view>
						<view class="active-list">好玩我我我哇</view>
						<view class="active-label">好好玩</view>
					</view>
					<view class="purchase userinfo">
						<image src="https://img.alicdn.com/bao/uploaded/i3/2200538386031/O1CN01UzXSiL1uQFCqHg9r1_!!2200538386031.jpg_400x400.jpg" mode="widthFix"></image>
						<text class="active-purchase">马化腾</text>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
export default {
	name: 'cont',
	props: {
		
	},
	data() {
		return {
			localdata:[
				{
					
				}
			]
		};
	},
	methods: {
		localCont(id) {
			console.log(id);
			uni.navigateTo({
				url: '../details/detalis?id=' + id
			});
		}
	}
};
</script>

<style scoped>
@import '../../../common/common.css';
/* 用户 */
.userinfo image {
	width: 50upx;
	height: 50upx;
	border-radius: 50upx;
}
.userinfo text {
	padding-left: 20upx;
}
.userinfo {
	padding-top: 20upx;
}
.newing {
	padding-bottom: 30upx;
}
</style>
