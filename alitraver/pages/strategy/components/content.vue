<template>
	<view class="active">
		<view class="conteng">
			<block v-for="(item,index) in localdata" :key="index">
				<view class="content-article" @click="localCont(item.id)">
					<view class="content-img">
						<block v-for="(itemimg,index) in item.datainfo.staticimg" :key="index" v-if="index == 0">
							<image :src = "itemimg" mode="aspectFill" class=""></image>
						</block>
					</view>
					<view class="active-introduce">
						<view class="active-title">{{item.datainfo.titledata}}</view>
						<view class="active-list">{{item.datainfo.tipsdata}}</view>
						<!-- <view class="active-label">好好玩</view> -->
					</view>
					<view class="purchase userinfo">
						<image :src="item.datainfo.avatarUrl" mode="widthFix"></image>
						<text class="active-purchase">{{item.datainfo.nickName}}</text>
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
		localdata:Array
	},
	data() {
		return {
		};
	},
	methods: {
		localCont(id) {
			console.log(id);
			uni.navigateTo({
				url: '../detail/detail?id=' + id
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
