import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import loginView from '../views/loginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ShowUserView from '../views/ShowUserView.vue'
import AddQuestView from '../views/AddQuestView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: loginView
  },
  {
    path: '/Register',
    name: 'Register',
    component: RegisterView
  },
  {
    path: '/showUser',
    name: 'showUser',
    component: ShowUserView
  },
  {
    path: '/creat_test',
    name: 'creatTest',
    component: AddQuestView
  },

 
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
