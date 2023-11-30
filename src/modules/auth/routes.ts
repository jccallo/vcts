import { RouteRecordRaw } from 'vue-router'
import Module from './Module.vue'
import { Accounts, Login } from './pages'

const routes: RouteRecordRaw[] = [
  {
    path: '/auth', // ya que esta en la raiz
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
      },
    ],
  },
]

export default routes
