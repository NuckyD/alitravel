<template>
	<view>
		<scroll-view class="scroll" scroll-x="true" scroll-with-animation="true">
			<view>
				<block v-for="(item,index) in contentData" :key="index">
					<view class="list-cont" :class="{activea : index == num}" @click="tabs(index)">
						<view >
							<text class="con-text-a">{{item.title}}</text>
						</view>
						<view>
							<text class="con-text-b" :class="{activeb : index == num}">{{item.labei}}</text>
						</view>
					</view>
				</block>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default{
		name:"tab",
		data(){
			return{
				num: 0,
				contentData:[
					{
						title: "推荐",
						labei: "猜你喜欢"
					},
					{
						title: "推荐",
						labei: "猜你喜欢"
					},
					{
						title: "推荐",
						labei: "猜你喜欢"
					},
					{
						title: "推荐",
						labei: "猜你喜欢"
					},
					{
						title: "推荐",
						labei: "猜你喜欢"
					},
					{
						title: "推荐",
						labei: "猜你喜欢"
					}
				]
			}
		},
		methods:{
			tabs(index){
				this.num = index
			}
		}
	}
</script>

<style scoped>
	.scroll{
		white-space: nowrap;
		width: 100%;
		position: absolute;
		left: 0;
		right: 0;
		background: #FFFFFF;
		padding: 20upx 0;
	}
	.list-cont{
		width: 180upx;
		display: inline-block;
		text-align: center;
	}
	.con-text-a{
		color: #292C33;
		font-size: 30upx;
		font-weight: bold;
	}
	.con-text-b{
		color: #9EA0A5;
	}
	.activea {
		background-image: linear-gradient(to right, #ccffff 0%, #ffcc00 100%);
		border-top-right-radius: 50upx;
	}
	.activeb {
		color: #292c33 !important;
	}
</style>
