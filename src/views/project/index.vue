<template>
	<div class="alert-box-item">
		<div ref="ExportDiv" class="pit">
			<div class="imgcontent">
				<div class="bigImg-div" @click="toGetImg" :class="{border: border_show}">
					<img ref="img" id="bigImg" class="bigImg" :src=valueUrl v-if="valueUrl">
				</div>
				<div v-if="shadow_show" :class="{effect: shadow_show}">
					<img class="back_img" src="../../assets/600X450.png" alt="">
				</div>
			</div>
			<div class="content" v-if="tointo">
				<div class="left">
					<img class="logo" src="../../assets/nikon.png" alt="">
					<span class="model">{{ Model }}</span>
				</div>
				<div class="right">
					<div class="up">
						<span>F{{ FNumber }}</span>
						<span>S{{ Speed }}</span>
						<span>ISO{{ ISO }}</span>
					</div>
					<div class="dwon">
						<span>From  {{ Make }}</span>
						<span>{{ DateTime }}</span>
					</div>
				</div>
			</div>
		</div>
		<div class="button">
			<div class="btn shadow" @click="change_shadow">
				<span>阴  影</span>
			</div>
			<div class="btn export" @click="change_import">
				<span>导入参数</span>
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
import EXIF from 'exif-js'
let inputElement = null
export default {
	data() {
		return {
			valueUrl: '',
			shadow_show: false,
			border_show: false,
			tointo: false,
			Make: '', // 品牌
			Model: '', // 机型
			ISO: '', // iso
			Speed: '', // 快门速度 
			FNumber: '', // 光圈
			DateTime: '', // 拍摄时间
		}
	},
	methods: {
		gotoother() {
			this.$router.push('/others');
		},
		change_export() {
      this.useExportImg()
    },
		change_import() {
			this.getImgLocation()
			this.tointo = true
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
				console.log('el', el)
				const files = el.target.files[0]
				const isLt2M = files.size / 1024 / 1024 < 20
				const size = files.size / 1024 / 1024
				console.log('size', size)
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
						that.border_show = true;
						// 数据传到后台
					//const formData = new FormData()
					//formData.append('file', files); // 可以传到后台的数据
					};
				}
			}
		},
		getImgLocation() {
			var _this = this
			EXIF.getData(this.$refs.img, function(){
				//图片包含的所有信息(例：拍照方向、相机设备型号、拍摄时间、ISO 感光度、GPS 地理位置等数据。)
				const imgAllInfo = EXIF.getAllTags(this);
				console.log("imgAllInfo", imgAllInfo)
				_this.Make = EXIF.getTag(this, 'Make')
				console.log("品牌", _this.Make)
				_this.Model = EXIF.getTag(this, 'Model')
				console.log("机型", _this.Model)
				_this.ISO = EXIF.getTag(this, 'ISOSpeedRatings')
				console.log("ISO", _this.ISO)
				const FNumber = EXIF.getTag(this, 'FNumber')
				_this.FNumber = (FNumber.numerator/FNumber.denominator)
				console.log("光圈", _this.FNumber)
				const ExposureTime = EXIF.getTag(this, 'ExposureTime')
				_this.Speed = ExposureTime.numerator + '/' + ExposureTime.denominator
				console.log("快门速度", _this.Speed)
				_this.DateTime = EXIF.getTag(this, 'DateTimeOriginal')
				console.log("拍摄时间", _this.DateTime)
			})
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
		}
	}
}
</script>

<style lang="less">
.alert-box-item {
	overflow: hidden;
	.pit {
		width: 650px;
		height: 580px;
		position: relative;
		display: flex;
		flex-direction: column;
		border: 1px solid #a2a2a2; 
		.imgcontent {
			width: 100%;
			height: 480px;
			position: relative;
			margin-top: 5px;
			.bigImg-div, .bigImg {
				position: absolute;
				left: 0;
				top: 0;
				right: 0;
				bottom: 0;
			}
			.bigImg-div {
				width: 600px;
				height: 450px;
				overflow: hidden;
				border: 1px solid #ddd;
				margin: auto;
				.bigImg {
					display: block;
					width: 600px;
					height: 450px;
				}
			}
			.effect {
				width: 620px;
				height: 470px;
				margin: auto;
				margin-top: 5px;
				z-index: -1;
				.back_img {
					width: 620px;
					height: 470px;
				}
			}
			.border {
				border: 1px solid #ffffff;
			}
		}
		.content {
			width: 600px;
			margin: auto;
			bottom: 0;
			display: flex;
			justify-content: space-between;
			.left {
				height: 100%;
				margin: auto 0;
				display: flex;
				flex-direction: column;
				justify-content: center;
				.logo {
					width: 60px;
					height: 60px;
					margin-bottom: 5px;
				}
				.model {
					display: flex;
					justify-content: center;
					font-size: 15px;
					font-weight: 600;
				}
			}
			.right {
				display: flex;
				flex-direction: column;
				justify-content: center;
				font-weight: 600;
				.up {
					display: flex;
					justify-content: end;
					span {
						margin-left: 15px;
					}
				}
				.dwon {
					display: flex;
					justify-content: end;
					margin-top: 10px;
					span {
						margin-left: 15px;
					}
				}
			}
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
