<template>
	<view class="active">
		<view class="conteng">
			<block v-for="(item,index) in articles" :key="index">
				<view class="content-article">
					<view class="content-img">
						<image :src ="item.image" mode="aspectFill" class=""></image>
					</view>
					<view class="active-introduce">
						<view class="active-title">{{item.title}}</view>
						<view class="active-list">{{item.list}}</view>
						<view class="active-label">{{item.label}}</view>
						<view class="buys">
							<text class="active-price">￥{{item.price}}</text>
							<text class="active-buy">{{item.buy}}人已购买</text>
						</view>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default{
		name: "articleA",
		props:{
			articles:Array
		},
		data(){
			return{
			}
		}
	}
</script>

<style scoped>
	@import "../../../common/common.css";
	
</style>
