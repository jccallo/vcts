import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import Module from '@/Module.vue'
import AuthRoutes from '@/modules/auth/routes'
import SaleRoutes from '@/modules/sale/routes'
import ProfileRutes from '@/modules/profile/routes'
import CustomerRoutes from '@/modules/customer/routes'
import DashboardRoutes from '@/modules/dashboard/routes'
import BeneficiaryRoutes from '@/modules/beneficiary/routes'
import { useAuthSessionStore } from '@/modules/auth/stores'

const routes: RouteRecordRaw[] = [
  {
    path: '/app',
    component: Module,
    meta: { requiresAuth: true },
    children: [
      ...DashboardRoutes,
      ...SaleRoutes,
      ...ProfileRutes,
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
