import { createRouter, createWebHistory } from 'vue-router'
import InicioSesion from '@/views/UserLogin.vue'
import Register from '@/views/UserRegister.vue'
import Dashboard from '@/views/Dashboard.vue'

const routes = [
  {
    path: '/',
    redirect: '/login/' 
  },
  {
    path: '/login/',
    name: 'Login',
    component: InicioSesion
  },
  {
    path: '/register/',
    name: 'Register',
    component: Register
  },
  {
    path: '/dashboard/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/about/',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
