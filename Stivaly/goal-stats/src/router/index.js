import { createRouter, createWebHistory } from 'vue-router'
import InicioSesion from '@/views/UserLogin.vue'
import Register from '@/views/UserRegister.vue'

const routes = [
  {
    path: '/',
    redirect: '/login/' 
  },
  {
    path: '/login/',
    name: 'Login',
    component: InicioSesion,
    meta: { key: () => `view1-${Date.now()}` },
  },
  {
    path: '/register/',
    name: 'Register',
    component: Register,
    meta: { key: () => `view1-${Date.now()}` },
  },
  {
    path: '/dashboard/',
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard.vue'),
        meta: { key: () => `view1-${Date.now()}` },
      },
      {
        path: 'profile/',
        name: 'UserProfile',
        component: () => import('@/views/UserDetails.vue'),
        meta: { key: () => `view1-${Date.now()}` },
      },
      {
        path: 'users/',
        name: 'AdminUsers',
        component: () => import('@/views/DashboardUsers.vue'),
        meta: { key: () => `view1-${Date.now()}` },
      },
    ]
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
