import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import Module from '@/Module.vue'
import AuthRoutes from '@/modules/auth/routes'
import SaleRoutes from '@/modules/sale/routes';
import ProfileRutes from '@/modules/profile/routes'
import CustomerRoutes from '@/modules/customer/routes'
import DashboardRoutes from '@/modules/dashboard/routes'
import BeneficiaryRoutes from '@/modules/beneficiary/routes'
import { useSessionStore } from '@/modules/auth/stores';

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
    ]
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
  const sessionStore = useSessionStore()
  const needsAuth = to.meta.requiresAuth
  const token = sessionStore.getToken()
  const remember_token = sessionStore.getRememberToken()
  if (needsAuth) {
    if (!token) next({ name: 'auth.login' })
    else next()
  }
  if (to.name === 'auth.login') {
    if (remember_token && token) next({ name: 'dashboard.index' })
    else {
      sessionStore.remove()
      next()
    }
  }
  console.log('from:', from.fullPath)
})

export default router