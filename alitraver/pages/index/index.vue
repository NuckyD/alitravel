<template>
	<view>
		<search></search>
		<ticket></ticket>
		<classify></classify>
		<view>test</view>
	</view>
</template>

<script>
	import search from './components/search.vue'
	import ticket from './components/ticket.vue'
	import classify from './components/classify.vue'
	export default {
		components:{
			search,
			ticket,
			classify
		},
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
</style>
