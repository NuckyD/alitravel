import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)


// 首页tab切换传输存储的值
const list = {
	listing: [],
	nonedata: ''
}

const loading = {
	loadingstatus: ''
}

const navdata = {
	loadingstatus: '',
	nav: 'recomment',
	pageNumber: 1,
	loadMore: '',
	loadMoreStatus:'',
	nonedata: ''
}

// 数据仓库
const state = {
	list,
	loading,
	navdata
}

export default new Vuex.Store({
	state,
	// 同步操作
	mutations:{
		listmuta(state, list){
			console.log(list)
			state.list = {
				listing:list.listdata,
				nonedata:list.nonedata
			}
		},
		loadmuta(state, loadingstatus){
			//console.log(loadingstatus)
			state.loading = {
				loadingstatus:loadingstatus
			}
		},
		navmuta(state, pullobj){
			state.navdata = {
				loadingstatus:pullobj.loadingstatus,
				nav: pullobj.nav,
				pageNumber: pullobj.pageNumber,
				loadMore: pullobj.loadMore,
				loadMoreStatus: pullobj.loadMoreStatus,
				nonedata: pullobj.nonedata
			}
			
		}
	}
})