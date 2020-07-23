<template>
	<view>
		<view class="scroll-flex" v-show="navShow" :style="{opacity:opacity}">
			<Navs></Navs>
		</view>
		<Banner :detaildata="detaildata"></Banner>
		<Matter></Matter>
		<Message></Message>
		<view style="height: 2500upx;"></view>
	</view>
</template>

<script>
	import Navs from './components/navs.vue'
	import Banner from './components/banner.vue'
	import Matter from './components/matter.vue'
	import Message from './components/message.vue'
	var db = wx.cloud.database()
	var userdata = db.collection('userdata')
	
	export default{
		name:'detail',
		components:{
			Navs,
			Banner,
			Matter,
			Message
		},
		data() {
			return{
				navShow: false,
				opacity: 0,
				dataId:'0',
				detaildata:Object
			}
		},
		methods:{
			handleScroll(top){
				if(top > 99){
					this.opacity = top / 170
					this.opacity = this.opacity > 1 ? 1 : this.opacity
					this.navShow = true
				}else{
					this.navShow = false
				}
			},
			detailrep(id){
				userdata.where({
					_id:id
				}).get()
				.then((res) => {
					console.log(res)
					this.detaildata = res.data[0].datainfo
				}).catch((err) => {
					console.log(err)
				})
			}
		},
		onLoad(e){
			console.log(e)
			this.dataId = e.id
			this.dataId = '3d23c0a05f194210006ace276c576adc'
			this.detailrep(this.dataId)
		},
		onPageScroll(e) {
			let top = e.scrollTop
			this.handleScroll(top)
		}
	}
</script>

<style>
	.scroll-flex{
		position: fixed;
		top: 0;
		right: 0;
		left: 0;
		background: #ffd00c;
		z-index: 2;
	}
</style>
