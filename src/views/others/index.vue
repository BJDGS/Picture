<template>
  <div>
    <button @click="getData">BUTTON</button>
    <div>
      <ol>
        <li v-for="item in userList" :key="item.id">
          <p>姓名：{{ item.name }}</p>
          <p>年龄：{{ item.age }}</p>
          <p>职位：{{ item.job }}</p>
        </li>
      </ol>
    </div>
    <div class="background_shadow"></div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      userList: []
    }
  },
  methods: {
    getData() {
      axios.get('/getUserList').then((res) => {
        console.log(res)
        this.userList = res.data.data.rows;
      })
    }
  }
}
</script>
<style lang="less">
.background_shadow {
  width: 600px;
  height: 450px;
  // background-color: #000000;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  margin: 150px 0 0 150px;
}
</style>
