<template>
	<view>
		<addressA :address="address"></addressA>
		<locality></locality>
		<contentA></contentA>
		<view class="publish animated fadeInUp">
			<image src="../../static/tab/fab.png" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	import addressA from './components/address.vue'
	import locality from './components/locality.vue'
	import contentA from './components/content.vue'
	// 引入SDK核心类
	var QQMapWX = require('../../common/qqmap-wx-jssdk.js');
	var qqmapsdk;
	
	export default{
		components:{
			addressA,
			locality,
			contentA
		},
		data(){
			return{
				address:''
			}
		},
		methods:{
			addRess(){
				// 实例化API核心类
				qqmapsdk = new QQMapWX({
					key: 'Q32BZ-3PBKW-SLGRP-RLUEO-I4OZF-XWBEG'
				});
				qqmapsdk.reverseGeocoder({
					success:(res)=>{
						console.log(res)
						this.address = res.result.ad_info.city
					},
					fail:(err)=>{
						console.log(err)
						this.address = '广州市'
					}
				})
			}
		},
		created(){
			this.addRess()
		}
	}
</script>
<style>
	.publish{
		position: fixed;
		bottom: 20upx;
		left: 0;
		right: 0;
		display: flex;
		justify-content: center;
	}
	.publish image{
		width: 120upx !important;
		height: 100upx !important;
		border-radius: 40upx;
	}
</style>
