import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import loginView from '../views/loginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ProfileView from '../views/ProfileView.vue'
import ShowUserView from '../views/ShowUserView.vue'
import AddTestView from '../views/AddTestView.vue'
import AddQuestView from '../views/AddQuestView.vue'
import tableQuestionView from '../views/QuestionView'
import tableAnswersView from '../views/AnswersView'
import testingView from '../views/TestView.vue'
import testesView from '../views/TestsView.vue'

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
    path: '/Profile',
    name: 'Profile',
    component: ProfileView
  },
  {
    path: '/showUser',
    name: 'showUser',
    component: ShowUserView
  },
  {
    path: '/addTest',
    name: 'addTest',
    component: AddTestView
  },
  {
    path: '/addQuest',
    name: 'addQuest',
    component: AddQuestView
  },
  {
    path: '/showQuests',
    name: 'showQuests',
    component: tableQuestionView
  },
  {
    path: '/showAnswers',
    name: 'showAnswers',
    component: tableAnswersView
  },
  {
    path: '/tests',
    name: 'tests',
    component: testesView
  },
  {
    path: '/testing',
    name: 'testing',
    component: testingView
  }
 
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
