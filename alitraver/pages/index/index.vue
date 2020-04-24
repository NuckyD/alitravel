<template>
	<view>
		<search></search>
		<ticket></ticket>
		<classify></classify>
		<content id="boxFixed" :class="{'is_fixed': isFixed}"></content>
		<view style="height: 2000upx;"></view>
	</view>
</template>

<script>
	import search from './components/search.vue'
	import ticket from './components/ticket.vue'
	import classify from './components/classify.vue'
	import content from './components/content.vue'
	export default {
		components:{
			search,
			ticket,
			classify,
			content
		},
		data() {
			return {
				title: 'Hello',
				isFixed: false,
				rect: '',
				menutop:''
			}
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
