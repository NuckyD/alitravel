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
	import {addressData} from '../../common/list.js'
	import {mapState} from 'vuex'
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
				addressData()
				.then((res)=>{
					console.log(res)
					this.address = res.result.ad_info.city
					this.$store.commit('citymuta', this.address)
					/* console.log(this.address) */
					// 定位成功查询数据库取出该城市下的景点数据
				}).catch((err)=>{
					console.log('用户拒绝定位')
					this.address = '广州市'
					this.$store.commit('citymuta', this.address)
				})
			}
		},
		created(){
			this.addRess()
		},
		computed:{
			...mapState(['cityData']),
			count(){
				this.address = this.cityData.city
			}
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
