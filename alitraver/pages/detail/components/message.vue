<template>
	<view>
		<!-- 评论 -->
		<view class="cont-message cont-back">
			<view class="img-video">宝贝评价({{ leaveword.length }})</view>
			<!-- 分类 -->
			<view class="menu-block">
				<block v-for="(item, index) in newmessage" :key="index">
					<view :class="{ activetext: index == num }" @click="menubtn(index, item)">{{ item }}</view>
				</block>
			</view>
			<!-- 评价 -->
			<block v-for="(item, index) in leaveword" :key="index">
				<view class="message-dist">
					<view class="users-message">
						<view class="cont-name">
							<image :src="item.avatarUrl" mode="widthFix"></image>
							<text>{{ item.nickName }}</text>
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
				<view @click="bTn()">发表</view>
			</view>
		</view>
		<!-- 登录模态框-->
		<motal ref="mon"></motal>
		<!-- 及时反馈组件 -->
		<HMmessages ref="HMmessages" @complete="HMmessages = $refs.HMmessages" @clickMessage="clickMessage"></HMmessages>
	</view>
</template>

<script>
	export default{
		name:'message',
		data(){
			return{
				num:0,
				box:false,
				newmessage:[
					'服务好',
					'风景优美'
				],
				leaveword:[
					{
						"avatarUrl":'cloud://brx-jiwur.6272-brx-jiwur-1259748271/static/1595215191983-3780951.jpg',
						'nickName':'马云',
						'time':'2020-7-24',
						'usermess':'年前和闺蜜去普吉度假，找了个行程比较自由轻松的团，普吉岛几乎可以不用英文，商场里都是国人!'
					},
					{
						"avatarUrl":'cloud://brx-jiwur.6272-brx-jiwur-1259748271/static/1595215191983-3780951.jpg',
						'nickName':'马化腾',
						'time':'2020-7-24',
						'usermess':'随时因为肺炎疫情没有去成，但是感觉服务比较专业，咨询了很多准备工作。最后全额退款啦!'
					}
				]
			}
		},
		methods:{
			menubtn(index,item){
				this.num = index
			},
			//显示评论框
			popup(){
				this.box = true
			},
			//隐藏评论框
			messcancel(){
				this.box = false
			}
		}
	}
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
	z-index: 9999;
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
