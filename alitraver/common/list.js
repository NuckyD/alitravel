// 定位
// 引入SDK核心类
var QQMapWX = require('../common/qqmap-wx-jssdk.js');
var qqmapsdk;

var addressData = function(){
	return new Promise((resolve,reject)=>{
		qqmapsdk = new QQMapWX({
			key: 'Q32BZ-3PBKW-SLGRP-RLUEO-I4OZF-XWBEG'
		});
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

export {addressData}	