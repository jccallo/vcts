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

const loginRouteName = import.meta.env.VITE_LOGIN_ROUTE_NAME
const accountsRouteName = import.meta.env.VITE_ACCOUNTS_ROUTE_NAME

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
  const { isAdmin, hasActiveEmployee, getToken, getRememberToken, removeSession } = useAuth()

  const needsAuth = to.meta.requiresAuth
  const token = getToken()
  const rememberToken = getRememberToken()

  console.log('yyyy', hasActiveEmployee.value)
  console.log('to', to)
  console.log('from', from)

  if (needsAuth) {
    if (to.name === accountsRouteName) {
      if (token) next()
      else {
        removeSession()
        next({ name: loginRouteName })
      }
    } else {
      if ((hasActiveEmployee || isAdmin) && token) next()
      else {
        removeSession()
        next({ name: loginRouteName })
      }
    }
  } else {
    if (rememberToken && token) {
      if (from.name) next({ name: from.name })
      else next({ name: accountsRouteName })
    }
    else {
      removeSession()
      next()
    }
  }
})

export default router
