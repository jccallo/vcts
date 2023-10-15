import { RouteRecordRaw } from 'vue-router'
import Module from './Module.vue'
import { Accounts, Login } from './pages'
// import { useAuth } from './composables'

const routes: RouteRecordRaw[] = [
  {
    path: '/auth',
    component: Module,
    children: [
      {
        path: '',
        name: 'auth.login',
        component: Login,
      },
      {
        path: 'accounts',
        name: 'auth.accounts',
        component: Accounts,
        meta: { requiresAuth: true },
        // beforeEnter: (to) => {
        //   const { getToken, removeSession } = useAuth()
        //   if (to.meta.requiresAuth && !getToken()) {
        //     removeSession()
        //     return { name: 'auth.login' }
        //   }
        // },
      },
    ],
  },
]

export default routes
