<template>
	<view>
		<view class="scroll-flex" v-show="navShow" :style="{opacity:opacity}">
			<Navs></Navs>
		</view>
		
		<Banner :detaildata="detaildata" :leaveword="leaveword"></Banner>
		<!-- 图片视频详情 -->
		<view class="matther-page">
			<Matter :detaildata="detaildata"></Matter>
		</view>
		<!-- 评价 -->
		<view class="message-page">
			<Message :messageWord="messageWord" :leaveword="leaveword" :dataId="dataId"></Message>
		</view>
		<!-- 留言为空的提示 -->
		<view style="margin-bottom: 90upx;" v-if="nonedata">
			<none-data></none-data>
		</view>
		<!-- 进入页面的loading加载 -->
		<home-load v-if="homeload"></home-load>
	</view>
</template>

<script>
	import Navs from './components/navs.vue'
	import Banner from './components/banner.vue'
	import Matter from './components/matter.vue'
	import Message from './components/message.vue'
	var db = wx.cloud.database()
	var userdata = db.collection('userdata')
	var messages = db.collection('message')
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
				detaildata:Object,
				messageWord:[],
				leaveword:[],
				nonedata:false,
				homeload:true
			}
		},
		methods:{
			//顶部导航栏
			handleScroll(top){
				if(top > 99){
					this.opacity = top / 170
					this.opacity = this.opacity > 1 ? 1 : this.opacity
					this.navShow = true
				}else{
					this.navShow = false
				}
			},
			//根据id查询数据
			detailrep(id){
				userdata.where({
					_id:id
				}).get()
				.then((res) => {
					this.detaildata = res.data[0].datainfo
				}).catch((err) => {
					console.log(err)
				})
			},
			//请求全部留言数据
			messageData(id){
				messages.where({
					id: id
				}).orderBy('messageData.time','desc')
				.get()
				.then((res) => {
					let resdata = res.data
					//取出ai分类的标签
					this.classdata(resdata)
					//取出评价列表
					this.publicMessage(resdata)
				}).catch((err) => {
					console.log(err)
				})
			},
			messageDataByClass(id,className){
				messages.where({
					id: id,
					classMessage: className
				}).orderBy('messageData.time','desc')
				.get()
				.then((res) => {
					let resdata = res.data
					//取出评价列表
					this.publicMessage(resdata)
				}).catch((err) => {
					console.log(err)
				})
			},
			//取出ai分类的标签
			classdata(resdata){
				var messageWord = resdata.map((item) =>{
					return item.classMessage
				})
				messageWord = Array.from(new Set(messageWord.filter(item => item)))
				//数组去空
				console.log(messageWord)
				this.messageWord = messageWord
			},
			//取出评价列表
			publicMessage(resdata){
				var leaveword = resdata.map((item) => {
					return item.messageData
				})
				if(leaveword.length === 0){
					this.nonedata = true
				}else{
					this.nonedata = false
					this.leaveword = leaveword
				}
				
			},
			fatherTab(index){
				const query = wx.createSelectorQuery()
				if(index === 1){
					query.select('.matther-page').boundingClientRect()
				}else  if(index === 2){
					query.select('.message-page').boundingClientRect()
				}
				query.selectViewport().scrollOffset()
				query.exec(function(res){
					wx.pageScrollTo({
						scrollTop: res[0].top + res[1].scrollTop - 35
					})
				})
			},
			fatherMethod(className){
				console.log(className)
				if(className == '全部'){
					this.messageData(this.dataId)
				}else {
					this.messageDataByClass(this.dataId,className)
				}
			}
		},
		onLoad(e){
			console.log(e)
			this.dataId = e.id
			//请求获取评价数据
			Promise.all([this.detailrep(this.dataId),this.messageData(this.dataId)])
			.then((res) => {
				this.homeload = false
			}).catch((err) => {
				console.log(err)
			})
			
		},
		onPageScroll(e) {
			let top = e.scrollTop
			this.handleScroll(top)
		}
	}
</script>

<style>
	page{
		background-color: #f8f8f8;
	}
	.scroll-flex{
		position: fixed;
		top: 0;
		right: 0;
		left: 0;
		background: #ffd00c;
		z-index: 2;
	}
</style>
