import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BookCollection from '../views/BookCollection.vue'
import bookDetail from '../views/bookDetail.vue'
import LoginView from '../views/LoginView.vue'
import signUp from '../views/signUp.vue'
import orderHistory from '../views/orderHistory.vue'
import Edit_profile from '../views/Edit_profile.vue'



const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView
  },
    {
    path: '/bookCollection',
    name: 'BookCollection',
    component:BookCollection
  },
  {
    path: '/login',
    name: 'LoginView',
    component:LoginView
  },
  {
    path: '/signUp',
    name:'signUp',
    component:signUp
  },
  {
    path: '/bookDetail',
    name:'bookDetail',
    component:bookDetail
  },
  {
    path:'/editUserData',
    name:'Edit_profile',
    component:Edit_profile
  },
  {
    path:'/orderHistory',
    name:'orderHistory',
    component:orderHistory
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
