import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)


// 首页tab切换传输存储的值
const list = {
	listing: []
}

const loading = {
	loadingstatus: ''
}
// 数据仓库
const state = {
	list,
	loading
}

export default new Vuex.Store({
	state,
	// 同步操作
	mutations:{
		listmuta(state, listdata){
			//console.log(listdata)
			state.list = {
				listing:listdata
			}
		},
		loadmuta(state, loadingstatus){
			//console.log(loadingstatus)
			state.loading = {
				loadingstatus:loadingstatus
			}
		}
	}
})