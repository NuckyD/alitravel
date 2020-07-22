<template>
	<view>
		<addressA :address="address"></addressA>
		<locality></locality>
		<contentA :localdata='localdata' v-if="!loadinglist"></contentA>
		<view class="publish animated fadeInUp">
			<image src="../../static/tab/fab.png" mode="widthFix" @click="addTravels"></image>
		</view>
		<load-list v-if="loadinglist"></load-list>
		<!-- 没有数据的提示 -->
		<none-data v-if="nonedata"></none-data>
		<!-- 进入页面的loading加载 -->
		<home-load v-if="homeload"></home-load>
	</view>
</template>

<script>
	import addressA from './components/address.vue'
	import locality from './components/locality.vue'
	import contentA from './components/content.vue'
	import {addressData} from '../../common/list.js'
	import {mapState} from 'vuex'
	var db = wx.cloud.database()
	var userdata = db.collection('userdata')
	
	export default{
		components:{
			addressA,
			locality,
			contentA
		},
		data(){
			return{
				address:'',
				addressData:'',
				// 列表数据
				localdata:[],
				loadinglist:false,
				nonedata:false,
				homeload:true
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
					this.dataByCity(this.address)
				}).catch((err)=>{
					console.log(err)
					console.log('用户拒绝定位')
					this.address = '广州市'
					this.$store.commit('citymuta', this.address)
				})
			},
			addTravels(){
				uni.navigateTo({
					url: '../travels/travels'
				})
			},
			fatherMethod(name){
				console.log(name)
				this.loadinglist = true
				this.nonedata = false
				if('全部' == name){
					this.dataByCity(this.address)
				}else{
					this.tabCity(this.address,name)
				}
			},
			dataByCity(city){
				userdata.where({
					datainfo:{
						address:city
					}
				})
				.orderBy('datainfo.time', 'desc')
				.get()
				.then((res)=>{
					console.log(res)
					let citydata = res.data
					// 筛选值 _id，datainfo里的数据，合并成一个数组返回来
					this.resultCity(citydata)
				})
				.catch((err)=>{
					console.log(err)
				})
			},
			// tab切换筛选的数据
			tabCity(city,name){
				userdata.where({
					datainfo:{
						address:city,
						classdata:name
					}
				})
				.get()
				.then((res)=>{
					console.log(res)
					let citydata = res.data
					this.resultCity(citydata)
				})
				.catch((err)=>{
					console.log(err)
				})
			},
			// 筛选值 _id，datainfo里的数据，合并成一个数组返回来
			resultCity(citydata){
				var adddata = citydata.map((item)=>{
					let id = item._id
					let datainfo  =item.datainfo
					return{
						id,
						datainfo
					}
					this.loadinglist = flase
				})
				console.log(adddata)
				this.localdata = adddata
				// 数据出来loading消失
				this.homeload = false
				// 数据出来 tab loading消失
				this.loadinglist = false
				// 没有数据给予提示
				if(adddata.length === 0){
					this.nonedata = true
				}else{
					this.nonedata  = false
				}
			}
		},
		created(){
			this.addRess()
		},
		computed:{
			...mapState(['cityData']),
			count(){
				this.addressData = this.cityData.city
			}
		},
		// 侦听器
		watch:{
			addressData(newValue,oldValue){
				console.log(newValue)
				this.address = newValue
				this.dataByCity(newValue)
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
