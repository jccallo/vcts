import { createRouter, createWebHistory } from 'vue-router'
import { $token, $constant } from '@/services'
import { useAuth } from '@/modules/auth/composables'
import routes from '@/modules/routes'

const router = createRouter({
   history: createWebHistory(),
   routes,
   linkExactActiveClass: 'active',
})

router.beforeEach((to, from, next) => { 
   const { isAdmin, hasActiveEmployee, removeSession } = useAuth()

   const needsAuth = to.meta.requiresAuth
   const token = $token.getToken()
   const rememberToken = $token.getRememberToken()

   if (needsAuth) {
      if (to.name === $constant.ACCOUNTS_ROUTE_NAME) {
         if (token) next()
         else {
            removeSession()
            next({ name: $constant.LOGIN_ROUTE_NAME })
         }
      } else {
         if ((hasActiveEmployee || isAdmin) && token) next()
         else {
            removeSession()
            next({ name: $constant.LOGIN_ROUTE_NAME })
         }
      }
   } else {
      if (rememberToken && token) {
         if (from.name) next({ name: from.name })
         else next({ name: $constant.ACCOUNTS_ROUTE_NAME })
      } else {
         removeSession()
         next()
      }
   }
})

export default router
