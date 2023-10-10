import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import Module from '@/modules/Module.vue'

import {
  AuthRoutes,
  SaleRoutes,
  UserRoutes,
  CustomerRoutes,
  DashboardRoutes,
  BeneficiaryRoutes,
} from '@/modules/routes'

import { useAuthSessionStore } from '@/modules/auth/stores'

const routes: RouteRecordRaw[] = [
  {
    path: '/app',
    component: Module,
    meta: { requiresAuth: true },
    children: [
      ...DashboardRoutes,
      ...SaleRoutes,
      ...UserRoutes,
      ...CustomerRoutes,
      ...BeneficiaryRoutes,
    ],
  },
  ...AuthRoutes,
  {
    path: '/:pathMatch(.*)*',
    redirect: '/app',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkExactActiveClass: 'active',
})

router.beforeEach((to, from, next) => {
  const authSession = useAuthSessionStore()
  const needsAuth = to.meta.requiresAuth
  const token = authSession.getToken()
  const remember_token = authSession.getRememberToken()
  if (needsAuth) {
    if (!token) {
      authSession.remove()
      next({ name: 'auth.login' })
    } else next()
  } else if (to.name === 'auth.login') {
    if (!remember_token && !token) {
      next()
    } else if (!remember_token && token) {
      authSession.remove()
      next()
    } else {
      next({ name: 'dashboard.index' })
    }
  } else {
    console.log('from:', from.fullPath)
    next()
  }
})

export default router
