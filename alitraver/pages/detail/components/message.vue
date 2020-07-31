<template>
	<view>
		<!-- 评论 -->
		<view class="cont-message cont-back">
			<view class="img-video">宝贝评价({{ leaveword.length }})</view>
			<!-- 分类 -->
			<view class="menu-block">
				<block v-for="(item, index) in newMessageWord" :key="index">
					<view :class="{ activetext: index == num }" @click="menubtn(index, item)">{{ item }}</view>
				</block>
			</view>
			<!-- 评价 -->
			<block v-for="(item, index) in leaveword" :key="index">
				<view class="message-dist">
					<view class="users-message">
						<view class="cont-name">
							<image :src="item.avatarUrl" mode="widthFix"></image>
							<text>{{ item.nickname }}</text>
						</view>
						<!-- 时间 -->
						<view class="message-time">{{ item.time.substr(0, 10) }}</view>
					</view>
					<view class="cont-name-text">
						<text>{{ item.usermess }}</text>
					</view>
				</view>
			</block>
		</view>

		<!-- 评论按钮 -->
		<view class="evaluation" @click="popup()"><input type="text" placeholder="我来说两句" disabled="disabled" /></view>

		<!-- 评论框 -->
		<view class="Comment-box" v-if="box" :catchtouchmove="true">
			<view class="Comment-text"><textarea placeholder="写下你对这篇游记的评价" show-confirm-bar="false" focus="true" v-model="Comment" /></view>
			<!-- 发表按钮 -->
			<view class="published">
				<view @click="messcancel()">取消</view>
				<view @click="btn()">发表</view>
			</view>
		</view>
		<!-- 登录模态框-->
		<motal ref="mon"></motal>
		<!-- 及时反馈组件 -->
		<HMmessages ref="HMmessages" @complete="HMmessages = $refs.HMmessages" @clickMessage="clickMessage"></HMmessages>
	</view>
</template>

<script>
import motal from '../../../element/motal.vue'; //引入登录模态框
import HMmessages from '@/common/components/HM-messages/HM-messages.vue';

var db = wx.cloud.database();
var users = db.collection('user');
var message = db.collection('message');
// 引入当前时间的js
var util = require('../../../common/util.js');
var time = util.formatTime(new Date());

export default {
	name: 'message',
	components: {
		motal,
		HMmessages
	},
	props:{
		messageWord:Array,
		leaveword:Array,
		dataId:String
	},
	data() {
		return {
			num: 0,
			box: false,
			Comment:'',//评价信息
			avatarUrl: '', //头像
			nickname: '', //昵称
			newMessageWord:[] ,//添加一个‘全部’分词
			id:''
		};
	},
	methods: {
		menubtn(index, item) {
			this.num = index;
			this.$parent.fatherMethod(item)
		},
		//显示评论框
		popup() {
			users
				.get()
				.then(res => {
					if (res.data.length == 0) {
						let message = '请登录后再评价';
						this.$nextTick(() => {
							this.$refs.mon.init(message);
						});
					} else {
						let userData = res.data[0];
						this.avatarUrl = userData.avatarUrl;
						this.nickname = userData.nickName;
						this.box = true;
					}
				})
				.catch(err => {
					console.log(err);
				});
		},
		//提交评价
		btn() {
			if (this.Comment == "") {
				let tip = '评论不能为空';
				let icon = 'error';
				this.tips(tip, icon);
			}else {
				//调用云函数
				//1.先提交到百度做分析处理，返回数据 2.提交到数据库
				this.submit()
			}
		},
		async submit(){
			//调用云函数到百度云分析处理返回标签
			let stamess = await this.aiMessage()
			//console.log(stamess)
			let classif = ''
			if(stamess.length > 0){
				let ali = stamess[stamess.length - 1]
				let [prop,adj] = [ali.prop,ali.adj]//es6结构
				classif = prop + adj
			}
			//提交到数据库
			await this.messdata(classif)
		},
		//提交到数据库
		messdata(classif){
			return new Promise((resolve,reject) => {
				//把所有需要提交的数据以对象的形式提交
				var messArray = {
					usermess: this.Comment,//评价内容
					time: time,//提交的时间
					nickname: this.nickname,//用户昵称
					avatarUrl: this.avatarUrl//用户头像
				}
				message.add({
					data: {
						id: this.id,
						classMessage: classif, //分析词
						messageData: messArray //数据
					}
				}).then((res) => {
					let tip = '评论成功';
					let icon = 'success';
					this.tips(tip, icon);
					//清空输入框
					this.Comment = ''
					//评价成功刷新评价
					let className = '全部'
					this.$parent.fatherMethod(className)
					this.num = 0
					this.box = false
				}).catch((err) => {
					console.log(err)
				})
			})
		},
		//调用云函数到百度云分析处理返回标签
		aiMessage(){
			return new Promise((resolve,reject) => {
				wx.cloud.callFunction({
					name:'aimessage',
					data:{
						message:this.Comment
					}
				}).then((res) => {
					let aidata = res.result.aimessage.items
					resolve(aidata)
				}).catch((err) => {
					reject('出错了')
				})
			})
		},
		//点击取消，隐藏评论框
		messcancel() {
			this.box = false;
		},
		tips(tip, icon) {
			this.HMmessages.show(tip, {
				icon: icon,
				iconColor: '#ffffff',
				fontColor: '#ffffff',
				background: 'rgba(102,0,51,0.8)'
			});
		}
	},
		
	watch:{
		//添加一个“全部”分词
		messageWord(newValue,oldValue){
			this.newMessageWord = ['全部',...newValue]
		},
		dataId(newValue,oldValue){
			console.log(newValue);
			this.id = newValue;
		}
	}
};
</script>

<style scoped>
/* 评价 */
.cont-message {
	margin-top: 20upx;
	margin-bottom: 80upx;
}
.cont-back {
	padding: 20upx;
	background: #ffffff;
}
.img-video {
	color: #333333;
	font-size: 30upx;
	font-weight: bold;
	padding: 20upx 0;
}
.users-message {
	display: flex;
	justify-content: space-between;
	height: 50upx;
	align-items: center;
	margin-bottom: 15upx;
}
.message-time {
	font-size: 25upx;
	color: #a8a8a8;
}
.cont-name image {
	width: 50upx !important;
	height: 50upx !important;
	border-radius: 50%;
	margin-right: 9upx;
}
.cont-name text {
	font-size: 30upx;
	color: #a8a8a8;
}
.cont-name {
	display: flex;
	align-items: center;
	height: 50upx;
}
.cont-name-text text {
	font-size: 27upx;
	color: #333333;
	line-height: 1.5;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	overflow: hidden;
}
.message-dist {
	margin-bottom: 30upx;
	border-bottom: 1rpx solid #f8f8f8;
	padding-bottom: 25upx;
}
/* 评论按钮 */
.evaluation {
	background: #f8f8f8;
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	height: 90upx;
	display: flex;
	align-items: center;
}
.evaluation input {
	font-size: 30upx;
	color: #9a9a9a;
	background: #f0f0f0;
	height: 70upx;
	width: 100%;
	border-radius: 50upx;
	margin: 0 30upx;
	padding-left: 10upx;
}
/* 评论框 */
.Comment-text textarea {
	width: 100%;
	color: #808080 !important;
	font-size: 30upx;
	padding: 8upx;
}
.Comment-box {
	position: fixed;
	top: 0;
	bottom: 0;
	right: 0;
	left: 0;
	background: #f1f1f1;
	z-index: 99;
}
.Comment-text {
	background: #ffffff;
	padding-top: 70upx;
}
.published view {
	font-size: 35upx;
	background: #ffdd00;
	width: 200upx;
	text-align: center;
	padding: 10upx 0;
	border-radius: 10upx;
}
.published {
	display: flex;
	justify-content: space-around;
	margin-top: 20upx;
}
/* 分类 */
.activetext {
	color: #4cd964;
	background: #ffdd00 !important;
	border: 1px solid #ffdd00 !important;
}
.menu-block view {
	background: #ffffff;
	border: 1px solid #c2c5cc;
	border-radius: 6upx;
	font-size: 25upx;
	color: #292c33;
	font-weight: bold;
	text-align: center;
	padding: 15upx;
	margin: 15upx;
}

.menu-block {
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	flex-wrap: wrap;
}
</style>
