import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import StartView from '../views/StartView.vue'
import AdminView from '../views/AdminView.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/admin',
    name: 'AdminView',
    component: AdminView
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/start',
    name: 'StartView',
    component: StartView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
