<template>
	<view class="active">
		<block v-for="(item,index) in articles" :key="index">
			<view class="content-article">
				<view class="content-img">
					<image :src ="item.image" mode="aspectFill" class=""></image>
				</view>
				<view class="active-introduce">
					<view class="active-name">{{item.name}}</view>
					<view class="active-description">{{item.description}}</view>
					<view class="active-label">{{item.label}}</view>
					<view class="purchases">
						<text class="active-price">￥{{item.price}}</text>
						<text class="active-purchase">{{item.purchase}}人已购买</text>
					</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	export default{
		name: "articleA",
		data(){
			return{
				articles: [
					{
						"image":"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3104782390,412364191&fm=26&gp=0.jpg",
						"name":"三亚租车",
						"description":"描述描述啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊",
						"label":"标签",
						"price":80,
						"purchase":100
					},
					{
						"image":"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3104782390,412364191&fm=26&gp=0.jpg",
						"name":"三亚租车",
						"description":"描述描述啊啊啊啊啊啊啊啊",
						"label":"标签",
						"price":80,
						"purchase":100
					},
					{
						"image":"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3104782390,412364191&fm=26&gp=0.jpg",
						"name":"三亚租车",
						"description":"描述描述啊啊啊啊啊啊啊啊",
						"label":"标签",
						"price":80,
						"purchase":100
					}
				]
			}
		}
	}
</script>

<style scoped>
	.active {
		margin:0 20upx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		width: 100%;
		-webkit-flex-wrap: wrap;
		overflow: hidden;
	}
	.cotent{
		
	}
	.content-article{
		width: 48%;
		flex-direction: column;
		display: flex;
		box-sizing: border-box;
	}
	.content-img{
		height: 400upx !important;
		object-fit:cover;
		overflow: hidden;
	}
	.content-img image{
		width: 100% !important;
		height: 100% !important;
		object-fit: cover;
		border-radius: 10upx;
	}
	.active-name{
		font-size: 32upx;
		color: #D0B083;
		margin: 10upx 0;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
	}
	.active-introduction{
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
	.purchases{
		display: flex;
		align-items: conter;
		padding-bottom: 10upx;
	}
	.active-price{
		font-size: 36upx;
		color: #f56426;
		padding-right: 9upx;
	}
	.active-purchase{
		font-size: 30upx;
		color: #CACACA;
	}
	.active-introduce{
		padding-left: 10upx;
	}
	
</style>
