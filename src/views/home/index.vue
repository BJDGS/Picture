<template>
  <div class="content">
    <!-- <div>123</div> -->
    <img alt="" class="img" src="../../assets/123.png">
    <div class="button">
      <div class="btn" @click="gotoproject">点击开始</div>
      <!-- <router-link to="/project">点击开始</router-link> -->
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    gotoproject () {
      this.$router.push('/project');
    }
  }
}
</script>
<style lang="less" scoped>
.content {
  .img {
    width: 100%;
    height: 100%;
    /*元素的位置相对于浏览器窗口是固定位置*/
    position:fixed;
    left: 0;
    top: 0;
  }
  .button {
    width: 100%;
    height: 200px;
    position: absolute;
    bottom: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    .btn {
    width: 400px;
    height: 100px;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffffdd;
    font-size: 170%;
    border-radius: 50px;
    cursor: pointer;
  }
  }
}
</style>
