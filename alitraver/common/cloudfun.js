//指定数据库
const db = wx.cloud.database() 

var data = function(table){
	return new Promise((resolve,reject) => {
		const tables = db.collection(table)
		tables.get()
		.then((res) => {
			resolve(res)
		})
		.catch((err) => {
			reject(err)
		})
	})
}

var datalist = function(table, pageNumber){
	return new Promise((resolve,reject) => {
		const tables = db.collection(table).limit(6).skip((pageNumber - 1) * 6)
		tables.get()
		.then((res) => {
			resolve(res)
		})
		.catch((err) => {
			reject(err)
		})
	})
}
export {data,datalist}
