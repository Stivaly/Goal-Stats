import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/dashboard",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import('@/views/Dashboard.vue'),
    meta: { hideNavbar: false },
  },
  {
    path: "/usuarios",
    name: "Usuarios",
    component: () => import('@/views/Tables.vue'),
    meta: { hideNavbar: false },
  },
  {
    path: "/billing",
    name: "Billing",
    component: () => import('@/views/Billing.vue'),
  },
  {
    path: "/virtual-reality",
    name: "Virtual Reality",
    component: () => import('@/views/VirtualReality.vue'),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import('@/views/Profile.vue'),
    meta: { hideNavbar: false },
  },
  {
    path: "/rtl-page",
    name: "Rtl",
    component: () => import('@/views/Rtl.vue'),
  },
  {
    path: "/sign-in",
    name: "Sign In",
    component: () => import('@/views/SignIn.vue'),
    meta: { hideNavbar: true },
  },
  {
    path: "/sign-up",
    name: "Sign Up",
    component: () => import('@/views/SignUp.vue'),
    meta: { hideNavbar: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router;
