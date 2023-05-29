import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/index.vue'
import Project from '../views/project/index.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Home },
  { path: '/project', component: Project }
]

const router = new VueRouter({
  routes
})

export default router
