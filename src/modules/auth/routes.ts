import { RouteRecordRaw } from 'vue-router'
import { LoginPage } from './pages'
import Module from './Module.vue'

const routes:RouteRecordRaw[] = [
  {
    path: '/auth',
    component: Module,
    children: [
      {
        path: '',
        name: 'auth.login',
        component: LoginPage,
      },
    ],
  },
]

export default routes
