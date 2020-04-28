<template>
	<view>
		<scroll-view class="scroll" scroll-x="true" scroll-with-animation="true">
			<view>
				<block v-for="(item,index) in tab" :key="index">
					<view class="list-cont" :class="{activea : index == num}" @click="tabs(index, item.nav)">
						<view >
							<text class="con-text-a">{{item.name}}</text>
						</view>
						<view>
							<text class="con-text-b" :class="{activeb : index == num}">{{item.title}}</text>
						</view>
					</view>
				</block>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	// 引入攻略列表的数据库接口
	import {datalist} from '../../../common/cloudfun.js'
	export default{
		name:"tab",
		props:{
			tab:Array
		},
		data(){
			return{
				num: 0
			}
		},
		methods:{
			tabs(index,nav){
				this.num = index
				//加载状态修改
				let loadingstatus = true
				this.$store.commit('loadmuta', loadingstatus)
				
				datalist(nav)
				.then((res) => {
					//console.log(res)
					// vuex传值 
					let listdata = res.data
					this.$store.commit('listmuta', listdata)
					//加载状态修改
					let loadingstatus = false
					this.$store.commit('loadmuta', loadingstatus)
				})
				.catch((err) => {
					console.log(err)
				})
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
		font-size: 20upx;
	}
	.activea {
		background-image: linear-gradient(to right, #ccffff 0%, #ffcc00 100%);
		border-top-right-radius: 50upx;
	}
	.activeb {
		color: #292c33 !important;
	}
</style>
