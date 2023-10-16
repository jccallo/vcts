import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import { useAuth, useConstant, useToken } from '@/modules/auth/composables'
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
   const { LOGIN_ROUTE_NAME, ACCOUNTS_ROUTE_NAME } = useConstant()
   const { getToken, getRememberToken } = useToken()
   const { isAdmin, hasActiveEmployee, removeSession } = useAuth()

   const needsAuth = to.meta.requiresAuth
   const token = getToken()
   const rememberToken = getRememberToken()

   if (needsAuth) {
      if (to.name === ACCOUNTS_ROUTE_NAME) {
         if (token) next()
         else {
            removeSession()
            next({ name: LOGIN_ROUTE_NAME })
         }
      } else {
         if ((hasActiveEmployee || isAdmin) && token) next()
         else {
            removeSession()
            next({ name: LOGIN_ROUTE_NAME })
         }
      }
   } else {
      if (rememberToken && token) {
         if (from.name) next({ name: from.name })
         else next({ name: ACCOUNTS_ROUTE_NAME })
      } else {
         removeSession()
         next()
      }
   }
})

export default router
