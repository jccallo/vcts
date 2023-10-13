import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '@/modules/auth/composables'
import Module from '@/modules/Module.vue'

import {
  AuthRoutes,
  SaleRoutes,
  UserRoutes,
  CustomerRoutes,
  DashboardRoutes,
  BeneficiaryRoutes,
} from '@/modules/routes'

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
  const { getToken, getRememberToken, removeUser, removeTokens } = useAuth()
  const loginRouteName = import.meta.env.VITE_LOGIN_ROUTE_NAME
  const dashboardRouteName = import.meta.env.VITE_DASHBOARD_ROUTE_NAME

  const needsAuth = to.meta.requiresAuth
  const token = getToken()
  const remember_token = getRememberToken()
  
  if (needsAuth) {
    if (token) next()
    else {
      removeUser()
      removeTokens()
      next({ name: loginRouteName })
    }
  } else if (to.name === loginRouteName) {
    if (remember_token && token) next({ name: dashboardRouteName })
    else {
      removeUser()
      removeTokens()
      next()
    }
  } else {
    console.error('from:', from.fullPath)
    next()
  }
})

export default router
