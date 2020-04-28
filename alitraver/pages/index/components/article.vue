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
	.active {
		margin:0 20upx;
	}
	.conteng{
		display: flex;
		flex-wrap: warp;
		justify-content: space-between;
		width: 100%;
		-webkit-flex-wrap: wrap;
		overflow: hidden;
	}
	
	.content-article{
		width: 48%;
		flex-direction: column;
		display: flex;
		box-sizing: border-box;
	}
	.content-img{
		height: 400upx !important;
		object-fit: cover;
		overflow: hidden;
	}
	.content-img image{
		width: 100% !important;
		height: 100% !important;
		object-fit: cover;
		border-radius: 10rpx;
	}
	.active-title{
		font-size: 32upx;
		color: #d0b083;
		margin: 10upx 0;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
	}
	.active-list{
		font-size: 32upx;
		color: #444444;
		font-weight: bold;
		line-height: 50upx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		height: 100upx !important;
	}
	.active-label{
		font-size: 25upx;
		color: #D0B083;
		padding: 10upx 0;
	}
	.buys{
		display: flex;
		align-items: conter;
		padding-bottom: 10upx;
	}
	.active-price{
		font-size: 36upx;
		color: #ff6b28;
		padding-right: 9upx;
	}
	.active-buy{
		font-size: 30upx;
		color: #cacaca;
	}
	.active-introduce{
		padding-left: 10upx;
	}
	
</style>
