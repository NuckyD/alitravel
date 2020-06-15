// 定位
// 引入SDK核心类
var QQMapWX = require('../common/qqmap-wx-jssdk.js');
var qqmapsdk = new QQMapWX({
			key: 'Q32BZ-3PBKW-SLGRP-RLUEO-I4OZF-XWBEG'
		});

var addressData = function(){
	return new Promise((resolve,reject) => {
		qqmapsdk.reverseGeocoder({
			success:(res)=>{
				resolve(res)
			},
			fail:(err)=>{
				reject(err)
			}
		})
	})
}

var seekCityData = function(input){
	return new Promise((resolve,reject) => {
		qqmapsdk.getSuggestion({
			keyword: input,
			success:(res) => {
				var cityData = res.data.map((item) => {
					return item.title
				})
				resolve(cityData)
			},
			fail:(err) => {
				reject(err)
			}
		})
	})
}
export {addressData,seekCityData}	