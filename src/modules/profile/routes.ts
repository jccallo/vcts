import { RouteRecordRaw } from 'vue-router'
import Module from './Module.vue'
import { CreatePage, IndexPage } from './pages'

const routes: RouteRecordRaw[] = [
  {
    path: 'users',
    component: Module,
    children: [
      {
        path: '',
        name: 'users.index',
        component: IndexPage,
      },
      
      {
        path: 'create',
        name: 'users.create',
        component: CreatePage,
      },
    ],
  },
]

export default routes