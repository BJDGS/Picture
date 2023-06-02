<template>
	<div class="alert-box-item">
		<div ref="ExportDiv" class="pit">
			<div class="bigImg-div" @click="toGetImg">
				<img class="bigImg" :src=valueUrl v-if="valueUrl">
			</div>
			<div v-if="shadow_show" :class="{effect: shadow_show}">
				<img class="back_img" src="../../assets/600X450.png" alt="">
			</div>
		</div>
		<div class="button">
			<div class="btn shadow" @click="change_shadow">
				<span>阴  影</span>
			</div>
			<div class="btn export" @click="change_export">
				<span>导  出</span>
			</div>
		</div>
		<div class="others" @click="gotoother">
			<span>其  他</span>
		</div>
	</div>
</template>

<script>
import { ExportImg } from '../../vendor/index'
let inputElement = null
export default {
	data() {
		return {
			valueUrl: '',
			shadow_show: false,
		}
	},
	methods: {
		gotoother() {
			this.$router.push('/others');
		},
		change_export() {
      this.useExportImg()
    },
		useExportImg() { // 导出图片
      ExportImg(this.$refs.ExportDiv, `导出示例`, 'png')
    },
		change_shadow() {
			if (this.shadow_show) {
				this.shadow_show = false
			} else {
				this.shadow_show = true
			}
			console.log("if?", this.shadow_show)
		},
		toGetImg() {
			if (inputElement === null) {
			// 生成文件上传的控件
				inputElement = document.createElement('input')
				inputElement.setAttribute('type', 'file')
				inputElement.style.display = 'none'

				if (window.addEventListener) {
					inputElement.addEventListener('change', this.uploadFile, false)
				} else {
					inputElement.attachEvent('onchange', this.uploadFile)
				}

				document.body.appendChild(inputElement)
			}
			inputElement.click()
		},
		uploadFile(el) {
			if (el && el.target && el.target.files && el.target.files.length > 0) {
				console.log(el)
				const files = el.target.files[0]
				const isLt2M = files.size / 1024 / 1024 < 20
				const size = files.size / 1024 / 1024
				console.log(size)
				// 判断上传文件的大小
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 20MB!')
				} else if (files.type.indexOf('image') === -1) { //如果不是图片格式
					// this.$dialog.toast({ mes: '请选择图片文件' });
					this.$message.error('请选择图片文件');
				} else {
					const that = this;
					const reader = new FileReader(); // 创建读取文件对象
					reader.readAsDataURL(el.target.files[0]); // 发起异步请求，读取文件
					reader.onload = function() { // 文件读取完成后
						// 读取完成后，将结果赋值给img的src
						that.valueUrl = this.result;
						console.log(this.result);
						// 数据传到后台
					//const formData = new FormData()
					//formData.append('file', files); // 可以传到后台的数据
					};
				}
			}
		}
	},
	beforeDestroy() {
		if (inputElement) {
			if (window.addEventListener) {
				inputElement.removeEventListener('change', this.onGetLocalFile, false)
			} else {
				inputElement.detachEvent('onchange', this.onGetLocalFile)
			}
			document.body.removeChild(inputElement)
			inputElement = null
			console.log('========inputelement destroy')
		}
	}
}
</script>

<style lang="less">
.alert-box-item {
	overflow: hidden;
	.pit {
		width: 700px;
		height: 600px;
		display: flex;
		justify-content: center;
		.bigImg-div {
			width: 600px;
			height: 450px;
			overflow: hidden;
			border: 1px solid #ddd;
			margin-top: 45px;
			.bigImg {
				display: block;
				width: 600px;
				height: 450px;
			}
		}
		// .effect {
		// 	box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
		// }
	}
	.effect {	
		position: absolute;
		z-index: -1;
		.back_img {
			width: 620px;
			height: 470px;
			margin-top: 36px;
		}
	}
	.button {
		display: flex;
		margin-top: 30px;
		.btn {
			width: 120px;
			height: 40px;
			color: #797979;
			border-radius: 10px;
			border: 1px solid #ccc;
			margin-left: 50px;
			display: flex;
			justify-content: center;
			align-items: center;
			cursor: pointer;
		}
	}
}

.others {
	width: 200px;
	height: 50px;
	color: #797979;
	border-radius: 10px;
	border: 1px solid #ccc;
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	right: 30px;
	top: 100px;
}
</style>
