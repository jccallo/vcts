import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import Module from '@/Module.vue'
import AuthRoutes from '@/modules/auth/routes'
import SaleRoutes from '@/modules/sale/routes';
import CustomersRoutes from '@/modules/customers/routes'
import DashboardRoutes from '@/modules/dashboard/routes'
import ProfileRutes from '@/modules/profiles/routes'
import { $storage } from '@/services';

const routes: RouteRecordRaw[] = [
  {
    path: '/app',
    component: Module,
    meta: { requiresAuth: true },
    children: [
      ...DashboardRoutes,
      ...SaleRoutes,
      ...CustomersRoutes,
      ...ProfileRutes,
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
  const needsAuth = to.meta.requiresAuth
  const token = $storage.get($storage.TOKEN)
  const remember_token = $storage.get($storage.REMEMBER_TOKEN)
  if (needsAuth) {
    if (!token) next({ name: 'auth.login' })
    else next()
  }
  if (to.name === 'auth.login') {
    if (remember_token && token) next({ name: 'dashboard.index' })
    else {
      $storage.remove($storage.TOKEN)
      $storage.remove($storage.USER)
      $storage.remove($storage.REMEMBER_TOKEN)
      next()
    }
  }
  console.log('from', from)
})

export default router