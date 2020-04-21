<template>
	<view >
		<search></search>
	</view>
</template>

<script>
	import search from './components/search.vue'
	export default {
		components:{
			search
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
