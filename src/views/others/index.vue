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
