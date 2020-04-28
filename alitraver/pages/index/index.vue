<template>
	<view>
		<search :banner="banner"></search>
		<ticket></ticket>
		<classify></classify>
		<content :tab="tab" id="boxFixed" :class="{'is_fixed': isFixed}"></content>
		<view style="height: 140upx"></view>
		<load-list v-if="loadingstatus"></load-list>
		<articleA :articles="articles" v-if="!loadingstatus"></articleA>
	</view>
</template>

<script>
	import search from './components/search.vue'
	import ticket from './components/ticket.vue'
	import classify from './components/classify.vue'
	import content from './components/content.vue'
	import articleA from './components/article.vue'
	import {data, datalist} from '../../common/cloudfun.js'
	import {mapState} from 'vuex'
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
				menutop: '',
				banner: [],
				tab: [],
				loadingstatus: false,
				articles: []
			}
		},
		
		created() {
			const banner = 'banner'
			const tab = 'tab'
			const article = 'attract'
			Promise.all([data(banner), data(tab), datalist(article)])
			.then((res) => {
				//console.log(res)
				this.banner = res[0].data
				this.tab = res[1].data
				this.articles = res[2].data
			})
			.catch((err) => {
				console.log(err)
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
		//计算属性会时刻监听数据变化，只要数据发生变化，计算属性就会执行
		computed: {
			namepage(){
				if(this.rect > this.menutop){
					this.isFixed = true
				}else {
					this.isFixed = false
				}
			},
			// 取出vuex数据仓库的数据
			...mapState(['list','loading']),
			// 取到tab切换的数据
			count(){
				this.articles = this.list.listing
			},
			countload(){
				this.loadingstatus = this.loading.loadingstatus
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
