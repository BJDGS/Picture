import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/index.vue'
import Project from '../views/project/index.vue'
import Others from '../views/others/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    redirect: {
      path: '/project'
    }
  },
  {
    path: '/project',
    component: Project
  },
  {
    path: '/others',
    component: Others
  }
]

const router = new VueRouter({
  routes
})

export default router
