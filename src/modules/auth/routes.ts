import { RouteRecordRaw } from 'vue-router'
import { Login } from './pages'
import Module from './Module.vue'

const routes:RouteRecordRaw[] = [
  {
    path: '/auth',
    component: Module,
    children: [
      {
        path: '',
        name: 'auth.login',
        component: Login,
      },
    ],
  },
]

export default routes
