<template>
	<view>
		<search :banner="banner"></search>
		<ticket></ticket>
		<classify></classify>
		<content :tab="tab" id="boxFixed" :class="{'is_fixed': isFixed}"></content>
		<view style="height: 150upx"></view>
		<articleA></articleA>
	</view>
</template>

<script>
	import search from './components/search.vue'
	import ticket from './components/ticket.vue'
	import classify from './components/classify.vue'
	import content from './components/content.vue'
	import articleA from './components/article.vue'
	
	//打印
	var {log} = console
	export default {
		components:{
			search,
			ticket,
			classify,
			content,
			articleA
		},
		
		data() {
			return {
				title: 'Hello',
				isFixed: false,
				rect: '',
				menutop:'',
				banner:[],
				tab:[]
			}
		},
		
		created() {
			//请求轮播图数据
			const db = wx.cloud.database()
			const banner = db.collection('banner')
			banner.get()
			.then((res) => {
				/* console.log(res) */
				this.banner = res.data
			})
			.catch((err) => {
				console.log(err)
			})
			
			//请求tab切换
			const tab = db.collection('tab')
			tab.get()
			.then((res) => {
				this.tab = res.data
			})
			.catch((err) =>{
				log(err)
			})
		},
		
		onLoad() {
			const query = uni.createSelectorQuery().in(this);
			query.select('#boxFixed').boundingClientRect(data => {
			  this.menutop = data.top
			}).exec();
		},
		onPageScroll(e){
			this.rect = e.scrollTop
		},
		computed: {
			namepage(){
				if(this.rect > this.menutop){
					this.isFixed = true
				}else {
					this.isFixed = false
				}
			}
		}
	}
</script>

<style>
	.is_fixed{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
	}
</style>
